import type { Metadata } from "next";
import "./fonts.css";
import "./globals.css";
import FileStrip from "@/components/FileStrip";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollFx from "@/components/ScrollFx";

const SITE_URL = "https://www.rootcauseanalytics.com.au";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Root Cause Analytics · Document extraction and synthetic data systems",
    template: "%s · Root Cause Analytics",
  },
  description:
    "Root Cause Analytics turns large quantities of PDFs and paper documents into clean, catalogued tables, and generates realistic synthetic Australian documents for AI training and evaluation. Sydney, Australia.",
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: SITE_URL,
    siteName: "Root Cause Analytics",
    images: [{ url: "/og/og-home.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Root Cause Analytics",
  url: SITE_URL,
  logo: `${SITE_URL}/brand/logo-mark-ink.png`,
  email: "jack.webb@rootcauseanalytics.com.au",
  founder: { "@type": "Person", name: "Jack Webb" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sydney",
    addressRegion: "NSW",
    addressCountry: "AU",
  },
};

// Same IntersectionObserver reveal as ScrollFx, but placed at the end of body
// so it runs as soon as the DOM is parsed, without waiting for React
// hydration (keeps LCP fast on slow devices). ScrollFx takes over for
// client-side navigations; adding "in" twice is harmless.
const revealInit = `(function(){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.2});document.querySelectorAll(".rv,.doc").forEach(function(el){io.observe(el)})})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU">
      <head>
        {/* The display face used by the inner pages' h1 and the home page's
            catalogue heading (weight 550). One preload only: more of them
            delays first paint. */}
        <link
          rel="preload"
          href="/fonts/fraunces-normal-550-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <FileStrip />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <ScrollFx />
        <script dangerouslySetInnerHTML={{ __html: revealInit }} />
      </body>
    </html>
  );
}
