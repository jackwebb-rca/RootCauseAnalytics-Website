import { describe, it, expect } from "vitest";
import {
  parseAudToQuads,
  formatQuadsAsAud,
  quadsToCents,
} from "@/lib/billing/money";

describe("money", () => {
  it("parses the platform fee exactly", () => {
    // Hard literal on purpose: 0.155 AUD must be exactly 1550 quads.
    expect(parseAudToQuads("0.155")).toBe(1550);
    expect(parseAudToQuads(0.155)).toBe(1550);
  });

  it("parses whole dollars", () => {
    expect(parseAudToQuads("25")).toBe(250000);
    expect(parseAudToQuads("100")).toBe(1000000);
  });

  it("formats canonically at four decimal places", () => {
    expect(formatQuadsAsAud(1550)).toBe("0.1550");
    expect(formatQuadsAsAud(250000)).toBe("25.0000");
    expect(formatQuadsAsAud(-1550)).toBe("-0.1550");
    expect(formatQuadsAsAud(0)).toBe("0.0000");
  });

  it("rejects bad input", () => {
    for (const bad of ["", "abc", "1.23456", "-5", "1,000", "0.155e2", NaN]) {
      expect(() => parseAudToQuads(bad as never)).toThrow();
    }
  });

  it("converts pack amounts to cents exactly and rejects fractions", () => {
    expect(quadsToCents(250000)).toBe(2500);
    expect(() => quadsToCents(1550)).toThrow(); // 15.5c is not a whole cent
  });

  it("155 documents at the fee equals 24.0250 AUD", () => {
    // Sum computed by hand, not by the code under test.
    expect(formatQuadsAsAud(155 * 1550)).toBe("24.0250");
  });
});
