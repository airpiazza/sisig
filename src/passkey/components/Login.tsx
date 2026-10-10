"use client";

import {
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser";
import { useState, useTransition } from "react";
import {
  finishPasskeyLogin,
  finishPasskeyRegistration,
  startPasskeyLogin,
  startPasskeyRegistration,
} from "../functions";

export function Login() {
  const [username, setUsername] = useState("");
  const [result, setResult] = useState("");
  const [isPending, startTransition] = useTransition();

  const passkeyLogin = async () => {
    try {
      // 1. Get a challenge from the worker
      const options = await startPasskeyLogin();

      // 2. Ask the browser to sign the challenge
      const login = await startAuthentication({ optionsJSON: options });

      // 3. Give the signed challenge to the worker to finish the login process
      // On success the worker responds with a redirect to /items
      const success = await finishPasskeyLogin(login);

      if (success === false) {
        setResult("Login failed");
      }
    } catch (error: unknown) {
      setResult(
        `Login error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      );
    }
  };

  const passkeyRegister = async () => {
    if (!username.trim()) {
      setResult("Please enter a username");
      return;
    }

    try {
      // 1. Get a challenge from the worker
      const options = await startPasskeyRegistration(username);
      if ("error" in options) {
        setResult(options.error);
        return;
      }
      // 2. Ask the browser to sign the challenge
      const registration = await startRegistration({ optionsJSON: options });

      // 3. Give the signed challenge to the worker to finish the registration process
      const success = await finishPasskeyRegistration(username, registration);

      if (!success) {
        setResult("Registration failed");
      } else {
        setResult("Registration successful!");
      }
    } catch (error: unknown) {
      setResult(
        `Registration error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      );
    }
  };

  const handlePerformPasskeyLogin = () => {
    startTransition(() => void passkeyLogin());
  };

  const handlePerformPasskeyRegister = () => {
    startTransition(() => void passkeyRegister());
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = e.currentTarget.value;
    setUsername(newUsername);
  };

  return (
    <>
      <img
        src="/sisig-logo.svg"
        alt=""
        className="mx-auto block h-auto w-full max-w-48 sm:max-w-64 md:max-w-80"
      />
      <input
        type="text"
        value={username}
        onChange={handleUsernameChange}
        placeholder="Username"
      />
      <button onClick={handlePerformPasskeyLogin} disabled={isPending}>
        {isPending ? <>...</> : "Login with passkey"}
      </button>
      <button onClick={handlePerformPasskeyRegister} disabled={isPending}>
        {isPending ? <>...</> : "Register with passkey"}
      </button>
      {result && <div>{result}</div>}
    </>
  );
}
