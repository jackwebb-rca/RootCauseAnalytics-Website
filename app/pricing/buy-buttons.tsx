"use client";

import { useState } from "react";

interface PackInfo {
  id: string;
  label: string;
  approxDocs: number;
}

export function BuyButtons({ packs }: { packs: PackInfo[] }) {
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState("");

  async function buy(packId: string) {
    setBusy(packId);
    setError(null);
    try {
      const res = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pack: packId, token: token.trim() || undefined }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || "checkout failed");
      }
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "checkout failed");
      setBusy(null);
    }
  }

  return (
    <div>
      <ul>
        {packs.map((p) => (
          <li key={p.id}>
            <p>
              <b>{p.label}</b> · about {p.approxDocs} documents{" "}
              <button
                type="button"
                onClick={() => buy(p.id)}
                disabled={busy !== null}
                aria-busy={busy === p.id}
              >
                {busy === p.id ? "Opening checkout..." : "Buy"}
              </button>
            </p>
          </li>
        ))}
      </ul>
      <p>
        <label>
          Topping up? Paste your existing credit code so the purchase adds to
          your balance:{" "}
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="rca_credit_..."
            autoComplete="off"
            spellCheck={false}
          />
        </label>
      </p>
      {error ? <p role="alert">Something went wrong: {error}</p> : null}
    </div>
  );
}
