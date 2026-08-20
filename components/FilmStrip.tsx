import Image from "next/image";

const CELLS = [
  { src: "/specimens/spec-ed-assessment-1.png", cap: "ED assessment · MED", alt: "Synthetic emergency department assessment specimen" },
  { src: "/specimens/spec-imaging-1.png", cap: "Imaging report · MED", alt: "Synthetic imaging report specimen" },
  { src: "/specimens/spec-mhcp-1.png", cap: "MH care plan · MED", alt: "Synthetic mental health care plan specimen" },
  { src: "/specimens/spec-policy-1.png", cap: "Policy schedule · INS", alt: "Synthetic insurance policy schedule specimen" },
  { src: "/specimens/spec-lossrun-1.png", cap: "Loss run report · INS", alt: "Synthetic insurance loss run report specimen" },
  { src: "/specimens/spec-treatment-plan-1.png", cap: "Care plan · MED", alt: "Synthetic staged care plan specimen" },
];

function Cells({ hidden = false }: { hidden?: boolean }) {
  return (
    <>
      {CELLS.map((c) => (
        <figure className="cell" key={c.src + (hidden ? "-b" : "-a")} aria-hidden={hidden || undefined}>
          <Image src={c.src} alt={hidden ? "" : c.alt} width={190} height={250} style={{ width: "100%", height: 250, objectFit: "cover", objectPosition: "top" }} />
          <figcaption>{c.cap}</figcaption>
        </figure>
      ))}
    </>
  );
}

export default function FilmStrip() {
  return (
    <div className="strip">
      <div className="strip-head">
        <span>From the current libraries · real generator output, reduced</span>
        <span>Hover to pause</span>
      </div>
      <div className="strip-track">
        <Cells />
        <Cells hidden />
      </div>
    </div>
  );
}
