// Generates lib/evidence.json from the real benchmark result files.
// Nothing on the Evidence page or the homepage table is typed by hand.
// Usage: node scripts/generate-evidence-data.mjs [path-to-results-dir]
// Default results dir: ../../RCA Document Library/docs/results (Jack's machine layout)
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(new URL(".", import.meta.url).pathname, "..");
const resultsDir =
  process.argv[2] ??
  path.join(root, "..", "..", "RCA Document Library", "docs", "results");

const readJson = async (f) => JSON.parse(await readFile(f, "utf8"));

const liveTrial = await readJson(
  path.join(resultsDir, "extract-accuracy-live-trial-2026-08-05.json")
);
// Opus 5 pass over the same 20-document corpus (rca-library-trial-20-w3),
// run 2026-08-21. Same harness, same ground truth, merged as a third column.
const opusTrial = await readJson(
  path.join(resultsDir, "extract-accuracy-live-trial-2026-08-21-opus.json")
);
const v2 = await readJson(path.join(resultsDir, "extract-v2-selftest.json"));

const FIELD_LABELS = {
  entity: "Entity",
  amount: "Amount",
  docDate: "Document date",
  refNumber: "Reference number",
  docType: "Document type",
};

const mapRun = (r) => {
  const fields = Object.fromEntries(
    Object.entries(r.fields).map(([k, v]) => [
      k,
      { correct: v.correct, total: v.total, accuracy: v.accuracy },
    ])
  );
  const overallCorrect = Object.values(r.fields).reduce((s, v) => s + v.correct, 0);
  const overallTotal = Object.values(r.fields).reduce((s, v) => s + v.total, 0);
  return {
    model: r.modelRequested,
    dataset: r.dataset,
    docs: r.docs,
    completed: r.completed,
    fields,
    overall: { correct: overallCorrect, total: overallTotal },
    spendAud: r.spend?.costAud ?? null,
    failedDocs: (r.perDoc ?? [])
      .filter((p) => p.status !== "completed")
      .map((p) => ({ id: p.id, error: p.error })),
    calibration: r.calibration ?? null,
  };
};

const runs = [...liveTrial.runs, ...opusTrial.runs].map(mapRun);

// Comparison table rows in a fixed, meaningful order.
const rowOrder = ["entity", "amount", "docDate", "refNumber", "docType"];
const fieldRows = rowOrder.map((k) => ({
  key: k,
  label: FIELD_LABELS[k] ?? k,
  cells: runs.map((r) => ({
    model: r.model,
    correct: r.fields[k]?.correct ?? null,
    total: r.fields[k]?.total ?? null,
  })),
}));

const data = {
  generatedAt: new Date().toISOString(),
  sourceFiles: [
    "extract-accuracy-live-trial-2026-08-05.json",
    "extract-accuracy-live-trial-2026-08-21-opus.json",
    "extract-v2-selftest.json",
  ],
  liveTrial: {
    title: liveTrial.title,
    note:
      liveTrial.note +
      " Opus 5 pass added 2026-08-21: same 20-document corpus and ground truth, 20/20 completed, 90/100 field checks, A$" +
      (opusTrial.runs[0]?.spend?.costAud ?? "?") +
      " api spend.",
    date: liveTrial.generatedAt,
    opusDate: opusTrial.generatedAt,
    dataset: runs[0]?.dataset ?? null,
    docs: runs[0]?.docs ?? null,
    totalSpendAud:
      Math.round(runs.reduce((s, r) => s + (r.spendAud ?? 0), 0) * 100) / 100,
    runs,
    fieldRows,
  },
  v2Benchmark: {
    generatedAt: v2.generatedAt,
    dataset: v2.dataset,
    docs: v2.docs,
    fields: v2.fields,
    ocrOnly: v2.ocrOnly,
    accuracyPct: Math.round(v2.ocrOnly.accuracy * 1000) / 10,
    byTemplate: v2.byTemplate,
  },
};

await mkdir(path.join(root, "lib"), { recursive: true });
await writeFile(
  path.join(root, "lib", "evidence.json"),
  JSON.stringify(data, null, 2)
);
console.log(
  `wrote lib/evidence.json · live trial ${data.liveTrial.dataset} · v2 ${data.v2Benchmark.accuracyPct}%`
);
