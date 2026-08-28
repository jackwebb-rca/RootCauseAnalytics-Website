// Exact money maths for the billing service.
//
// All amounts are AUD. To avoid floating point error, every amount is
// held as an integer count of ten-thousandths of a dollar ("quads").
// 0.155 AUD -> 1550 quads. 25 AUD -> 250000 quads.
// This matches the desktop fee ledger, which records amounts to four
// decimal places.

export const QUADS_PER_DOLLAR = 10000;

/** Parse a decimal string like "0.155" or "25" into quads. Throws on bad input. */
export function parseAudToQuads(value: string | number): number {
  const text = String(value).trim();
  if (!/^\d+(\.\d{1,4})?$/.test(text)) {
    throw new Error(`invalid AUD amount: ${JSON.stringify(value)}`);
  }
  const [whole, frac = ""] = text.split(".");
  const fracPadded = (frac + "0000").slice(0, 4);
  const quads = Number(whole) * QUADS_PER_DOLLAR + Number(fracPadded);
  if (!Number.isSafeInteger(quads)) {
    throw new Error(`AUD amount out of range: ${text}`);
  }
  return quads;
}

/** Format quads back to a canonical decimal string, e.g. 1550 -> "0.1550". */
export function formatQuadsAsAud(quads: number): string {
  if (!Number.isSafeInteger(quads)) {
    throw new Error(`invalid quads value: ${quads}`);
  }
  const negative = quads < 0;
  const abs = Math.abs(quads);
  const whole = Math.floor(abs / QUADS_PER_DOLLAR);
  const frac = String(abs % QUADS_PER_DOLLAR).padStart(4, "0");
  return `${negative ? "-" : ""}${whole}.${frac}`;
}

/** Quads to whole cents for Stripe (unit_amount). Must divide exactly. */
export function quadsToCents(quads: number): number {
  if (quads % 100 !== 0) {
    throw new Error(`amount ${formatQuadsAsAud(quads)} is not a whole cent`);
  }
  return quads / 100;
}
