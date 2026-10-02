declare namespace Cloudflare {
  interface Env {
    // Optional: defaults to the request hostname when unset
    WEBAUTHN_RP_ID?: string;
  }
}
