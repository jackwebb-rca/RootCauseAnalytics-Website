# Billing service

Prepaid credit billing for RCA Document Library. The desktop app records
a flat 0.155 AUD platform fee per completed LLM extraction; this service
collects it through prepaid credit packs.

## How the money flows

1. The customer buys a credit pack on /pricing. Stripe Checkout takes
   the payment (card, AUD).
2. The Stripe webhook credits an account and, for a first purchase,
   creates a credit code. The success page reveals the code once.
3. The customer pastes the code into the desktop app. The app reports
   fee-ledger rows to POST /api/billing/usage; the server debits the
   balance once per ledger row id.
4. When the balance is spent, the app blocks LLM extraction until the
   customer tops up with the same code.

The server balance is billing truth. The desktop fee ledger is the local
record. Both sides are idempotent: credits are unique by Stripe event
id, debits are unique by the ledger row's content-hash id.

## Endpoints

- POST /api/billing/checkout - body { pack, token? }; returns the
  Stripe Checkout URL. token makes the purchase a top-up.
- POST /api/billing/stripe-webhook - Stripe events; signature verified;
  only checkout.session.completed does anything.
- POST /api/billing/usage - Bearer credit token; body { rows: [...] }
  of fee-ledger rows; returns new balance plus a signed statement.
- GET /api/billing/balance - Bearer credit token; balance plus signed
  statement.
- GET /api/billing/reveal?cs=... - one-time reveal of a new credit code
  for the checkout success page.

Signed statements are Ed25519, verified offline by the desktop app, and
expire after 7 days. That expiry IS the offline grace window.

## Environment variables (Vercel project settings)

- STRIPE_SECRET_KEY - from the Stripe dashboard. Use the test key
  until unit B7 (live proof) passes.
- STRIPE_WEBHOOK_SECRET - create a webhook endpoint in the Stripe
  dashboard pointing at https://<domain>/api/billing/stripe-webhook
  with the event checkout.session.completed; Stripe shows the secret.
- DATABASE_URL - Postgres connection string. Add a Neon database from
  the Vercel Storage tab; Vercel can inject this automatically.
- BILLING_SIGNING_KEY_B64 - run
  `node scripts/billing-generate-signing-key.mjs` locally, put the
  private value here, give the printed public key to the desktop app.
- NEXT_PUBLIC_SITE_URL - optional; set to the production URL so
  checkout success links go to the right host.

## Invoicing rules (do not break these)

- Never the words "tax invoice", never a GST line. The seller is not
  GST registered. The ABN goes on customer-facing payment documents.
- Never a card-fee or surcharge line (RBA surcharge ban from
  2026-10-01). The pack price is the whole price.

## Tests

`npm test` runs vitest. The database tests run the real schema and SQL
on pg-mem, proving credit and debit idempotency at the SQL level. In
this sandbox use `npx --yes node@22.13.0 node_modules/vitest/vitest.mjs run`
if the default node is older than 20 (vitest 2 also runs on node 18).
