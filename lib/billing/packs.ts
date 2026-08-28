import { parseAudToQuads } from "./money";

// Credit packs. Prices are AUD, GST is not applicable (seller is not
// GST registered). The per-document platform fee is 0.155 AUD, set in
// the desktop app; the server only validates debits against bounds.

export type PackId = "pack25" | "pack50" | "pack100";

export interface Pack {
  id: PackId;
  audCents: number;
  quads: number;
  label: string;
  approxDocs: number;
}

const FEE_QUADS = parseAudToQuads("0.155");

function pack(id: PackId, aud: number, label: string): Pack {
  const quads = parseAudToQuads(String(aud));
  return {
    id,
    audCents: aud * 100,
    quads,
    label,
    approxDocs: Math.floor(quads / FEE_QUADS),
  };
}

export const PACKS: Record<PackId, Pack> = {
  pack25: pack("pack25", 25, "Starter - 25 AUD"),
  pack50: pack("pack50", 50, "Standard - 50 AUD"),
  pack100: pack("pack100", 100, "Bulk - 100 AUD"),
};

export function getPack(id: unknown): Pack | null {
  if (typeof id !== "string") return null;
  return (PACKS as Record<string, Pack>)[id] ?? null;
}

// Debit validation bounds: a single document fee must be positive and
// no more than 1 AUD. This allows a future price change without a
// server release, but blocks garbage and overflow attempts.
export const MAX_DEBIT_QUADS = parseAudToQuads("1");
