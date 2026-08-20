// Voice-rule lint from BUILD-HANDOFF.md section 4.
// Checks the rendered HTML output (.next/server/app/**/*.html) so it lints
// what visitors actually see, not source code.
// Usage: node scripts/copy-lint.mjs
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const root = path.resolve(new URL(".", import.meta.url).pathname, "..");
const htmlDir = path.join(root, ".next", "server", "app");

function walk(dir) {
  const out = [];
  for (const f of readdirSync(dir)) {
    const p = path.join(dir, f);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (f.endsWith(".html")) out.push(p);
  }
  return out;
}

// Strip tags/scripts/styles to get visible-ish text.
function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"');
}

const BANNED_WORDS = [
  "seamless",
  "unlock",
  "empower",
  "cutting-edge",
  "revolutionise",
  "revolutionize",
  "effortless",
  "supercharge",
];

const failures = [];
const files = walk(htmlDir);

for (const file of files) {
  const rel = path.relative(htmlDir, file);
  const html = readFileSync(file, "utf8");
  const text = visibleText(html);

  // 1. No em dashes anywhere in visible copy.
  if (text.includes("\u2014")) {
    const i = text.indexOf("\u2014");
    failures.push([rel, "em dash", text.slice(Math.max(0, i - 40), i + 40)]);
  }

  // 2. Brand name always spaced.
  for (const bad of ["RootCause", "Rootcause", "rootcause analytics"]) {
    // allow the domain rootcauseanalytics.com.au
    const re = new RegExp(bad + "(?!analytics\\.com)", "g");
    let m;
    while ((m = re.exec(text))) {
      const ctx = text.slice(Math.max(0, m.index - 30), m.index + 40);
      if (!ctx.includes("rootcauseanalytics.com")) {
        failures.push([rel, `unspaced brand "${bad}"`, ctx]);
      }
    }
  }

  // 3. No middot slogan strings: word · word · word (three-part chains).
  const middotSlogan = /[A-Za-z][\w ]{0,20}\s\u00B7\s[\w ]{1,20}\s\u00B7\s[\w ]{1,20}/g;
  let m;
  while ((m = middotSlogan.exec(text))) {
    // Footer legal-link separators and copyright lines are navigation, not slogans.
    const s = m[0];
    const allow =
      /Privacy|Terms|Security|Sydney|\u00A9|jack\.webb/i.test(
        text.slice(Math.max(0, m.index - 40), m.index + s.length + 40)
      ) ||
      // Film-strip specimen captions carried from the approved preview:
      // "<Document name> · MED" / "· INS" category tags.
      /\u00B7\s(MED|INS|LEG|FIN|GOV)\b/.test(s);
    if (!allow) failures.push([rel, "middot slogan", s]);
  }

  // 4. Banned words (case-insensitive, word-ish boundaries).
  for (const w of BANNED_WORDS) {
    const re = new RegExp(`\\b${w}\\w*`, "gi");
    let mm;
    while ((mm = re.exec(text))) {
      failures.push([
        rel,
        `banned word "${w}"`,
        text.slice(Math.max(0, mm.index - 40), mm.index + 50),
      ]);
    }
  }

  // 5. American spellings to avoid (quick spot checks).
  for (const w of ["organize", "analyze", "color:", "digitization"]) {
    if (w.endsWith(":")) continue; // skip CSS-ish
    const re = new RegExp(`\\b${w}`, "gi");
    let mm;
    while ((mm = re.exec(text))) {
      failures.push([
        rel,
        `US spelling "${w}"`,
        text.slice(Math.max(0, mm.index - 40), mm.index + 50),
      ]);
    }
  }
}

if (failures.length) {
  console.log(`COPY LINT: ${failures.length} failure(s)\n`);
  for (const [file, rule, ctx] of failures) {
    console.log(`- [${file}] ${rule}\n    ...${ctx.replace(/\s+/g, " ").trim()}...`);
  }
  process.exit(1);
} else {
  console.log(`COPY LINT: clean. ${files.length} rendered pages checked.`);
}
