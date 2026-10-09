"use server";
import {
  AuthenticationResponseJSON,
  generateAuthenticationOptions,
  generateRegistrationOptions,
  RegistrationResponseJSON,
  verifyAuthenticationResponse,
  verifyRegistrationResponse,
} from "@simplewebauthn/server";

import { sessions } from "@/session/store";
import { env } from "cloudflare:workers";
import { requestInfo } from "rwsdk/worker";
import {
  MAX_USERS,
  countUsers,
  createCredential,
  createUser,
  getCredentialById,
  getUserById,
  updateCredentialCounter,
} from "./db";

// Comma-separated list from the ALLOWED_USERNAMES secret. Unset means nobody can sign up.
function isAllowedUsername(username: string) {
  const allowed = (env.ALLOWED_USERNAMES ?? "").split(",");
  return allowed.includes(username);
}

function getWebAuthnConfig(request: Request) {
  const rpID = env.WEBAUTHN_RP_ID ?? new URL(request.url).hostname;
  const rpName = import.meta.env.VITE_IS_DEV_SERVER
    ? "Development App"
    : env.WEBAUTHN_APP_NAME;
  return {
    rpName,
    rpID,
  };
}

export async function startPasskeyRegistration(username: string) {
  if (!isAllowedUsername(username)) {
    return { error: "Sorry, that username isn't allowed to sign up." };
  }
  if ((await countUsers()) >= MAX_USERS) {
    return { error: "Sign ups are closed." };
  }

  const { rpName, rpID } = getWebAuthnConfig(requestInfo.request);
  const { response } = requestInfo;

  const options = await generateRegistrationOptions({
    rpName,
    rpID,
    userName: username,
    authenticatorSelection: {
      // Require the authenticator to store the credential, enabling a username-less login experience
      residentKey: "required",
      // Prefer user verification (biometric, PIN, etc.), but allow authentication even if it's not available
      userVerification: "preferred",
    },
  });

  await sessions.save(response.headers, { challenge: options.challenge });

  return options;
}

export async function startPasskeyLogin() {
  const { rpID } = getWebAuthnConfig(requestInfo.request);
  const { response } = requestInfo;

  const options = await generateAuthenticationOptions({
    rpID,
    userVerification: "preferred",
    allowCredentials: [],
  });

  await sessions.save(response.headers, { challenge: options.challenge });

  return options;
}

export async function finishPasskeyRegistration(
  username: string,
  registration: RegistrationResponseJSON,
) {
  if (!isAllowedUsername(username)) {
    return false;
  }

  const { request, response } = requestInfo;
  const { origin } = new URL(request.url);

  if ((await countUsers()) >= MAX_USERS) {
    return false;
  }

  const session = await sessions.load(request);
  const challenge = session?.challenge;

  if (!challenge) {
    return false;
  }

  const verification = await verifyRegistrationResponse({
    response: registration,
    expectedChallenge: challenge,
    expectedOrigin: origin,
    expectedRPID: (env as any).WEBAUTHN_RP_ID || new URL(request.url).hostname,
  });

  if (!verification.verified || !verification.registrationInfo) {
    return false;
  }

  await sessions.save(response.headers, { challenge: null });

  const user = await createUser(username);

  await createCredential({
    userId: user.id,
    credentialId: verification.registrationInfo.credential.id,
    publicKey: verification.registrationInfo.credential.publicKey,
    counter: verification.registrationInfo.credential.counter,
  });

  return true;
}

export async function finishPasskeyLogin(login: AuthenticationResponseJSON) {
  const { request, response } = requestInfo;
  const { origin } = new URL(request.url);

  const session = await sessions.load(request);
  const challenge = session?.challenge;

  if (!challenge) {
    return false;
  }

  const credential = await getCredentialById(login.id);

  if (!credential) {
    return false;
  }

  const verification = await verifyAuthenticationResponse({
    response: login,
    expectedChallenge: challenge,
    expectedOrigin: origin,
    expectedRPID: env.WEBAUTHN_RP_ID || new URL(request.url).hostname,
    requireUserVerification: false,
    credential: {
      id: credential.credentialId,
      publicKey: credential.publicKey.slice(),
      counter: credential.counter,
    },
  });

  if (!verification.verified) {
    return false;
  }

  await updateCredentialCounter(
    login.id,
    verification.authenticationInfo.newCounter,
  );

  const user = await getUserById(credential.userId);

  if (!user) {
    return false;
  }

  await sessions.save(response.headers, {
    userId: user.id,
    challenge: null,
  });

  // rwsdk's client follows redirect responses returned from server functions
  return new Response(null, { status: 302, headers: { Location: "/items" } });
}
