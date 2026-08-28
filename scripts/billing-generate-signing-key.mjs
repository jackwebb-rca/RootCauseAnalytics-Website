// Generates the Ed25519 signing keypair for balance statements.
// Run once, locally: node scripts/billing-generate-signing-key.mjs
// - The PRIVATE key (base64) goes into the Vercel env var
//   BILLING_SIGNING_KEY_B64. It must never enter the repo.
// - The PUBLIC key PEM is printed for the desktop app (unit B3).

import { generateKeyPairSync } from "crypto";

const { publicKey, privateKey } = generateKeyPairSync("ed25519");

const privatePem = privateKey.export({ type: "pkcs8", format: "pem" });
const publicPem = publicKey.export({ type: "spki", format: "pem" });

console.log("BILLING_SIGNING_KEY_B64 (set this in Vercel, keep it secret):");
console.log(Buffer.from(privatePem).toString("base64"));
console.log("");
console.log("Public key PEM (ships inside the desktop app):");
console.log(publicPem);
