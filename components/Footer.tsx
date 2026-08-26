import Image from "next/image";

export default function Footer() {
  return (
    <footer className="site-footer">
      <Image
        src="/brand/logo-full-ink.png"
        alt="Root Cause Analytics"
        width={162}
        height={54}
        style={{ height: 54, width: "auto" }}
      />
      <span className="mid">
        Every document on this site is synthetic. Including the ones that look
        worryingly real.
      </span>
      <span>
        © 2026 · Sydney NSW ·{" "}
        <a href="mailto:jack.webb@rootcauseanalytics.com.au">
          jack.webb@rootcauseanalytics.com.au
        </a>
        <br />
        <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a> ·{" "}
        <a href="/security">Security</a> · <a href="/downloads">Downloads</a>
      </span>
    </footer>
  );
}
