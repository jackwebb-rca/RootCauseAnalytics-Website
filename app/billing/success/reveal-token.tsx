"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

// The webhook that creates the credit code can land a few seconds
// after Stripe redirects here, so poll briefly before concluding
// there is no new code (top-ups never produce one).
const ATTEMPTS = 10;
const DELAY_MS = 2000;

export function RevealToken() {
  const params = useSearchParams();
  const cs = params.get("cs") ?? "";
  const [token, setToken] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (!cs || started.current) return;
    started.current = true;
    let cancelled = false;
    (async () => {
      for (let i = 0; i < ATTEMPTS && !cancelled; i++) {
        try {
          const res = await fetch(
            `/api/billing/reveal?cs=${encodeURIComponent(cs)}`
          );
          const data = await res.json();
          if (data.token) {
            if (!cancelled) {
              setToken(data.token);
              setDone(true);
            }
            return;
          }
        } catch {
          // network hiccup; retry
        }
        await new Promise((r) => setTimeout(r, DELAY_MS));
      }
      if (!cancelled) setDone(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [cs]);

  if (!cs) {
    return <p>This page only works after a completed payment.</p>;
  }
  if (!done) {
    return <p>Confirming your payment with Stripe. This can take a moment...</p>;
  }
  if (token) {
    return (
      <>
        <p>
          Your payment is complete. This is your <b>credit code</b>. It is
          shown <b>once only</b>, so copy it and keep it somewhere safe:
        </p>
        <p>
          <code>{token}</code>
        </p>
        <p>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(token).then(() => setCopied(true));
            }}
          >
            {copied ? "Copied" : "Copy code"}
          </button>
        </p>
        <p>
          Paste the code into RCA Document Library under{" "}
          <b>Settings, Billing</b>. The app will show your balance. Use the
          same code on the <a href="/pricing">pricing page</a> when you top
          up later.
        </p>
        <p>
          If you lose the code, <a href="/contact">contact us</a> from the
          email address you paid with.
        </p>
      </>
    );
  }
  return (
    <>
      <p>Your payment is complete.</p>
      <p>
        If this purchase was a <b>top-up</b>, the amount has been added to
        your existing credit code and the app will show the new balance the
        next time it checks in. No new code is issued for top-ups.
      </p>
      <p>
        If you expected a new credit code and none appeared here, the payment
        record may still be settling. Refresh this page in a minute. If it
        still does not appear, <a href="/contact">contact us</a> from the
        email address you paid with and we will re-issue your code.
      </p>
    </>
  );
}
