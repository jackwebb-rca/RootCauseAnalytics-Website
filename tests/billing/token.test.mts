import { describe, it, expect } from "vitest";
import {
  generateToken,
  isTokenShape,
  hashToken,
  hashesEqual,
} from "@/lib/billing/token";

describe("token", () => {
  it("generates tokens of the documented shape", () => {
    const t = generateToken();
    expect(t.startsWith("rca_credit_")).toBe(true);
    expect(t.length).toBe("rca_credit_".length + 32);
    expect(isTokenShape(t)).toBe(true);
  });

  it("two tokens are never equal", () => {
    expect(generateToken()).not.toBe(generateToken());
  });

  it("rejects wrong shapes", () => {
    expect(isTokenShape("")).toBe(false);
    expect(isTokenShape("rca_credit_short")).toBe(false);
    expect(isTokenShape("sk_live_" + "a".repeat(32))).toBe(false);
    expect(isTokenShape("rca_credit_" + "A".repeat(32))).toBe(false); // uppercase
    expect(isTokenShape("rca_credit_" + "a".repeat(31) + "1")).toBe(false); // ambiguous 1
  });

  it("hash is stable, 64 hex chars, and not the token", () => {
    const t = "rca_credit_" + "a".repeat(32);
    const h = hashToken(t);
    expect(h).toMatch(/^[0-9a-f]{64}$/);
    expect(hashToken(t)).toBe(h);
    expect(h.includes("rca_credit")).toBe(false);
  });

  it("hashesEqual compares correctly", () => {
    const h = hashToken(generateToken());
    expect(hashesEqual(h, h)).toBe(true);
    expect(hashesEqual(h, hashToken(generateToken()))).toBe(false);
    expect(hashesEqual("", "")).toBe(false);
  });
});
