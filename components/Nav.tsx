"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/document-library", label: "Document Library" },
  { href: "/document-generator", label: "Document Generator" },
  { href: "/evidence", label: "Live trials" },
  { href: "/articles", label: "Articles" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <nav className="site-nav" aria-label="Main">
      <Link className="brand" href="/">
        <Image
          src="/brand/logo-mark-ink.png"
          alt="Root Cause Analytics"
          width={42}
          height={42}
          priority
        />
        <span className="word">
          Root Cause Analytics
          <small>Document Systems</small>
        </span>
      </Link>
      <ul>
        {LINKS.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
      <Link className="btn" href="/contact">
        Get a preview pack
      </Link>
      <button
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(!open)}
      >
        {open ? "Close" : "Menu"}
      </button>
      {open && (
        <div className="mobile-menu" id="mobile-menu">
          <ul>
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link className="btn menu-cta" href="/contact">
            Get a preview pack
          </Link>
        </div>
      )}
    </nav>
  );
}
