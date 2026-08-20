// Renders the Open Graph card (1200x630) in the specimen style using the
// site's own fonts and tokens, via headless Chromium.
// Usage: node scripts/generate-og.mjs
import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(new URL(".", import.meta.url).pathname, "..");
const outDir = path.join(root, "public", "og");
await mkdir(outDir, { recursive: true });

const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8">
<style>
@font-face{font-family:'Fraunces';src:url('file://${root}/public/fonts/fraunces-normal-400-550-latin.woff2') format('woff2');font-weight:400 550;}
@font-face{font-family:'IBM Plex Mono';src:url('file://${root}/public/fonts/ibm-plex-mono-normal-600-latin.woff2') format('woff2');font-weight:600;}
@font-face{font-family:'Hanken Grotesk';src:url('file://${root}/public/fonts/hanken-grotesk-normal-500-latin.woff2') format('woff2');font-weight:500;}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#F5EFE3;font-family:'Hanken Grotesk',sans-serif;color:#191510;overflow:hidden;position:relative}
.strip{display:flex;justify-content:space-between;padding:14px 48px;background:#191510;color:#F5EFE3;font-family:'IBM Plex Mono',monospace;font-size:15px;letter-spacing:.1em;text-transform:uppercase}
.strip .dot{color:#E8B84B}
.wrap{display:grid;grid-template-columns:1.35fr 1fr;gap:40px;padding:64px 48px 0;align-items:start}
h1{font-family:'Fraunces',serif;font-weight:550;font-size:76px;line-height:1.05;letter-spacing:-.02em}
h1 .hl{background-image:linear-gradient(rgba(232,184,75,.35),rgba(232,184,75,.35));background-repeat:no-repeat;background-position:0 72%;background-size:100% 38%}
.sub{margin-top:28px;font-size:24px;line-height:1.5;color:#6E6353;max-width:560px}
.note{position:absolute;left:48px;bottom:44px;display:flex;align-items:center;gap:18px}
.note img{height:64px}
.note span{font-family:'IBM Plex Mono',monospace;font-size:16px;letter-spacing:.12em;text-transform:uppercase;color:#6E6353}
.doc{border:2px solid #191510;background:#fff;box-shadow:12px 12px 0 #EBE2CE,12px 12px 0 2px #191510;transform:rotate(1.2deg);width:360px}
.doc img{display:block;width:100%}
.stamp{position:absolute;right:36px;top:96px;transform:rotate(6deg);font-family:'IBM Plex Mono',monospace;font-size:15px;font-weight:600;letter-spacing:.2em;color:#C93A20;border:3px solid #C93A20;padding:10px 16px;text-transform:uppercase;background:#FDFAF2;border-radius:3px}
</style></head>
<body>
<div class="strip"><span>Root Cause Analytics <span class="dot">●</span> Sydney, Australia</span><span>File № RCA-2026</span></div>
<div class="wrap">
  <div>
    <h1>Ten thousand PDFs in. <span class="hl">One clean table</span> out.</h1>
    <p class="sub">Document extraction and synthetic data systems. Self-hosted, offline, benchmarks published, misses included.</p>
  </div>
  <div class="doc"><img src="file://${root}/public/specimens/spec-treatment-plan-1.png"></div>
</div>
<div class="stamp">Synthetic · No PHI</div>
<div class="note"><img src="file://${root}/public/brand/logo-mark-ink.png"><span>rootcauseanalytics.com.au</span></div>
</body></html>`;

const tmp = path.join(outDir, "_og-template.html");
await writeFile(tmp, html);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.goto("file://" + tmp, { waitUntil: "load" });
await page.waitForTimeout(600);
await page.screenshot({ path: path.join(outDir, "og-home.png") });
await browser.close();
console.log("wrote public/og/og-home.png");
