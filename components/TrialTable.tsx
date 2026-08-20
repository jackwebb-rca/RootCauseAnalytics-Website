import evidence from "@/lib/evidence.json";

const MODEL_NAMES: Record<string, string> = {
  "claude-sonnet-5": "Sonnet",
  "claude-haiku-4-5": "Haiku",
};

// Renders the live-trial field accuracy table straight from lib/evidence.json,
// which is generated from the raw result files. Nothing typed by hand.
export default function TrialTable() {
  const { fieldRows, runs, docs } = evidence.liveTrial;
  const verdict = (correct: number, total: number) => {
    const r = correct / total;
    if (r >= 1) return { label: "clean", cls: "ok" };
    if (r >= 0.85) return { label: "strong", cls: "ok" };
    return { label: "needs work", cls: "miss" };
  };
  return (
    <table>
      <caption>Field accuracy · {docs}-document live trial</caption>
      <thead>
        <tr>
          <th scope="col">Field</th>
          {runs.map((r) => (
            <th scope="col" key={r.model}>
              {MODEL_NAMES[r.model] ?? r.model}
            </th>
          ))}
          <th scope="col">Result</th>
        </tr>
      </thead>
      <tbody>
        {fieldRows.map((row) => {
          const worst = Math.min(
            ...row.cells.map((c) => (c.correct ?? 0) / (c.total ?? 1))
          );
          const v = verdict(worst, 1);
          return (
            <tr key={row.key}>
              <td>{row.label}</td>
              {row.cells.map((c) => (
                <td className="num" key={c.model}>
                  {c.correct}/{c.total}
                </td>
              ))}
              <td className="num">
                <span className={v.cls}>{v.label}</span>
              </td>
            </tr>
          );
        })}
        <tr>
          <td>Overall field checks</td>
          {runs.map((r) => (
            <td className="num" key={r.model}>
              <b>
                {r.overall.correct}/{r.overall.total}
              </b>
            </td>
          ))}
          <td className="num">
            <span className="ok">honest</span>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
