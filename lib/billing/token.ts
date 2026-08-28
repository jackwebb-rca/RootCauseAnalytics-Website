import { createHash, randomBytes, timingSafeEqual } from "crypto";

// Credit tokens identify a prepaid account. The customer pastes the
// token into the desktop app. The server stores only the SHA-256 hash;
// the plaintext exists in the database solely inside the one-time
// reveal row, which is deleted after reveal or expiry.

const TOKEN_PREFIX = "rca_credit_";

export function generateToken(): string {
  // 32 random bytes, base32-like alphabet without ambiguous characters.
  const alphabet = "abcdefghjkmnpqrstuvwxyz23456789";
  const bytes = randomBytes(32);
  let out = "";
  for (let i = 0; i < bytes.length; i++) {
    out += alphabet[bytes[i] % alphabet.length];
  }
  return TOKEN_PREFIX + out;
}

export function isTokenShape(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.startsWith(TOKEN_PREFIX) &&
    value.length === TOKEN_PREFIX.length + 32 &&
    /^[a-z2-9]+$/.test(value.slice(TOKEN_PREFIX.length))
  );
}

export function hashToken(token: string): string {
  return createHash("sha256").update(`rca-billing-v1:${token}`).digest("hex");
}

/** Constant-time comparison of two hex hashes. */
export function hashesEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a, "hex");
  const bb = Buffer.from(b, "hex");
  if (ba.length !== bb.length || ba.length === 0) return false;
  return timingSafeEqual(ba, bb);
}
