import Image from "next/image";

// One specimen per cell, first page only. Order mixes document types so the
// same type is never next to itself in the reel.
const CELLS = [
  { src: "/specimens/spec-ed-assessment-1.png", cap: "ED assessment · MED", alt: "Synthetic emergency department assessment specimen" },
  { src: "/specimens/spec-progress-note-1.png", cap: "Progress note · MED", alt: "Synthetic ward progress note specimen" },
  { src: "/specimens/spec-imaging-1.png", cap: "Imaging report · MED", alt: "Synthetic imaging report specimen" },
  { src: "/specimens/spec-referral-letter-1.png", cap: "Referral letter · MED", alt: "Synthetic specialist referral letter specimen" },
  { src: "/specimens/spec-policy-1.png", cap: "Policy schedule · INS", alt: "Synthetic insurance policy schedule specimen" },
  { src: "/specimens/spec-fluid-order-1.png", cap: "Fluid order · MED", alt: "Synthetic intravenous fluid order specimen" },
  { src: "/specimens/spec-mhcp-1.png", cap: "MH care plan · MED", alt: "Synthetic mental health care plan specimen" },
  { src: "/specimens/spec-ecg-2.png", cap: "12-lead ECG · MED", alt: "Synthetic 12-lead ECG report specimen" },
  { src: "/specimens/spec-lossrun-1.png", cap: "Loss run report · INS", alt: "Synthetic insurance loss run report specimen" },
  { src: "/specimens/spec-echo-1.png", cap: "Echo report · MED", alt: "Synthetic echocardiography report specimen" },
  { src: "/specimens/spec-treatment-plan-1.png", cap: "Care plan · MED", alt: "Synthetic staged care plan specimen" },
  { src: "/specimens/spec-discharge-1.png", cap: "Discharge summary · MED", alt: "Synthetic hospital discharge summary specimen" },
  { src: "/specimens/spec-referral-letter-2.png", cap: "Referral letter · MED", alt: "Synthetic GP referral letter specimen" },
  { src: "/specimens/spec-safety-checklist-1.png", cap: "Safety checklist · MED", alt: "Synthetic patient safety checklist specimen" },
  { src: "/specimens/spec-histopath-1.png", cap: "Histopathology · MED", alt: "Synthetic histopathology report specimen" },
  { src: "/specimens/spec-mhcp-2.png", cap: "MH care plan · MED", alt: "Synthetic GP mental health treatment plan specimen" },
  { src: "/specimens/spec-consent-1.png", cap: "Consent form · MED", alt: "Synthetic consent for treatment form specimen" },
  { src: "/specimens/spec-transfusion-1.png", cap: "Transfusion report · MED", alt: "Synthetic transfusion compatibility report specimen" },
  { src: "/specimens/spec-immunisation-1.png", cap: "Immunisation statement · MED", alt: "Synthetic immunisation history statement specimen" },
];

// Each cell is 190px wide plus a 22px gap; ~8s per cell keeps the reel at
// about 27px per second regardless of how many specimens are listed.
const SECONDS_PER_CELL = 8;

function Group({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="strip-group" aria-hidden={hidden || undefined}>
      {CELLS.map((c) => (
        <figure className="cell" key={c.src + (hidden ? "-b" : "-a")}>
          <Image src={c.src} alt={hidden ? "" : c.alt} width={190} height={250} style={{ width: "100%", height: 250, objectFit: "cover", objectPosition: "top" }} />
          <figcaption>{c.cap}</figcaption>
        </figure>
      ))}
    </div>
  );
}

export default function FilmStrip() {
  return (
    <div className="strip">
      <div className="strip-head">
        <span>Sample documents from the Document Generator, shown at reduced size</span>
        <span>Pauses when you hover</span>
      </div>
      {/* Two identical groups; the track slides exactly one group width
          (50%) per cycle, so the loop has no visible join. */}
      <div className="strip-track" style={{ animationDuration: `${CELLS.length * SECONDS_PER_CELL}s` }}>
        <Group />
        <Group hidden />
      </div>
    </div>
  );
}
