// Screenshot pages at mobile/tablet/desktop widths for visual verification.
// Usage: node scripts/screenshot.mjs <baseUrlOrFile> <outDir> [paths...]
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const [base, outDir, ...paths] = process.argv.slice(2);
const targets = paths.length ? paths : ["/"];
const widths = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 820, height: 1180 },
  { name: "desktop", width: 1440, height: 900 },
];

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();
for (const t of targets) {
  for (const w of widths) {
    const page = await browser.newPage({
      viewport: { width: w.width, height: w.height },
      reducedMotion: "reduce",
    });
    const url = base.startsWith("http")
      ? new URL(t, base).href
      : "file://" + path.resolve(base);
    await page.goto(url, { waitUntil: "load", timeout: 60000 });
    await page.waitForTimeout(1200);
    // Force reveal-on-scroll content visible for full-page capture.
    await page.evaluate(() => {
      document
        .querySelectorAll(".rv, .doc")
        .forEach((el) => el.classList.add("in"));
    });
    await page.waitForTimeout(700);
    const slug = t === "/" ? "home" : t.replace(/\//g, "-").replace(/^-/, "");
    const file = path.join(outDir, `${slug}-${w.name}.png`);
    await page.screenshot({ path: file, fullPage: true });
    console.log("saved", file);
    await page.close();
  }
}
await browser.close();
