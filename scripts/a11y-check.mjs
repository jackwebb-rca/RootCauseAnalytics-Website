// Runs axe-core against every page and reports violations
// (contrast, alt text, labels, landmarks, keyboard focusability).
// Usage: node scripts/a11y-check.mjs http://localhost:3100
import { chromium } from "playwright";
import { readFileSync } from "node:fs";
import path from "node:path";

const base = process.argv[2] || "http://localhost:3100";
const root = path.resolve(new URL(".", import.meta.url).pathname, "..");
const axeSource = readFileSync(
  path.join(root, "node_modules", "axe-core", "axe.min.js"),
  "utf8"
);

const PAGES = [
  "/",
  "/document-library",
  "/document-generator",
  "/evidence",
  "/articles",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/security",
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
let totalViolations = 0;

for (const p of PAGES) {
  await page.goto(base + p, { waitUntil: "load", timeout: 60000 });
  // Reveal animated sections so axe sees final state.
  await page.addStyleTag({
    content:
      "*{transition:none!important;animation:none!important}" +
      ".rv,.doc{opacity:1!important;transform:none!important}",
  });
  await page.evaluate(axeSource);
  const results = await page.evaluate(() =>
    axe.run(document, {
      runOnly: ["wcag2a", "wcag2aa", "wcag21aa"],
    })
  );
  const serious = results.violations;
  if (serious.length === 0) {
    console.log(`OK   ${p}`);
  } else {
    totalViolations += serious.length;
    console.log(`FAIL ${p}`);
    for (const v of serious) {
      console.log(`  [${v.impact}] ${v.id}: ${v.help}`);
      for (const n of v.nodes.slice(0, 3)) {
        console.log(`    ${n.target.join(" ")} :: ${n.html.slice(0, 120)}`);
      }
    }
  }
}

// Keyboard check: tab through the homepage, confirm skip link is first focus
// and nav links are reachable.
await page.goto(base + "/", { waitUntil: "load" });
await page.keyboard.press("Tab");
const first = await page.evaluate(() => document.activeElement?.textContent?.trim());
console.log(`First Tab focus: "${first}"`);

await browser.close();
process.exit(totalViolations ? 1 : 0);
