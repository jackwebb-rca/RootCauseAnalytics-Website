import type { Metadata } from "next";
import { releases } from "./releases";

export const metadata: Metadata = {
  title: "Downloads",
  description:
    "Download RCA Document Library. Installer files, checksums and install notes for pilot customers.",
  alternates: { canonical: "/downloads" },
};

function formatSize(bytes: number): string {
  const mb = bytes / (1024 * 1024);
  return `${mb >= 100 ? Math.round(mb) : mb.toFixed(1)} MB`;
}

export default function DownloadsPage() {
  return (
    <>
      <section className="page-hero">
        <p className="kicker rv-auto">Pilot release downloads</p>
        <h1 className="rv-auto d1">Downloads</h1>
      </section>
      <section className="section">
        <div className="prose rv">
          {releases.length === 0 ? (
            <>
              <p>
                The pilot release of RCA Document Library is being prepared.
                Installer files will appear on this page when the release is
                ready.
              </p>
              <p>
                The pilot is for known customers. To take part,{" "}
                <a href="/contact">contact us</a>.
              </p>
            </>
          ) : (
            releases.map((r) => (
              <div key={r.tag}>
                <h2>
                  RCA Document Library {r.version}{" "}
                  <small>· released {r.date}</small>
                </h2>
                <ul>
                  {r.files.map((f) => (
                    <li key={f.name}>
                      <p>
                        <a href={`/downloads/release/${r.tag}/${f.name}`}>
                          {f.name}
                        </a>{" "}
                        · {f.label} · {formatSize(f.sizeBytes)}
                      </p>
                      <p>
                        <b>SHA-512:</b> <code>{f.sha512}</code>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
          <h2>Check your download</h2>
          <p>
            Each file on this page has a SHA-512 checksum printed beside it.
            After you download a file, you can compute its checksum and
            compare the two values. On Windows, open Command Prompt in your
            Downloads folder and run:
          </p>
          <p>
            <code>certutil -hashfile RCA-Document-Library-Setup.exe SHA512</code>
          </p>
          <p>
            The value the command prints must match the value on this page
            exactly. If it does not match, delete the file and download it
            again.
          </p>
          <h2>About the install warning</h2>
          <p>
            Pilot builds are not yet code-signed, because code signing is a
            paid service we add later. Windows SmartScreen will show a
            warning for an unsigned installer. The install notes that come
            with your pilot invitation walk through this step. If you did
            not receive install notes, <a href="/contact">contact us</a>{" "}
            before you install.
          </p>
        </div>
      </section>
    </>
  );
}
