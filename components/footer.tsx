import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, MapPin, Mail, Shield, Lock } from 'lucide-react'

const productLinks = [
  { label: 'RCA Extract', href: '/products/rca-extract' },
  { label: 'RCA Insurance Library', href: '/libraries/insurance' },
  { label: 'RCA Medical Library', href: '/libraries/medical' },
  { label: 'RCA Benchmark Packs', href: '/libraries/benchmark-packs' },
  { label: 'RCA Custom Libraries', href: '/contact?service=custom-library' },
  { label: 'Snowflake Marketplace', href: 'https://app.snowflake.com/marketplace/listing/GZSUZU1HJP/', external: true },
]

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Articles', href: '/articles' },
  { label: 'Contact', href: '/contact' },
]

const supportLinks = [
  { label: 'Documentation', href: '/support', external: false },
  { label: 'FAQ', href: '/support#faq', external: false },
  { label: 'Support Email', href: 'mailto:jack.webb@rootcauseanalytics.com.au', external: true },
]

const legalLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Security Notice', href: '#' },
]

export default function Footer() {
  return (
    <footer role="contentinfo" className="bg-[#0f172a] text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4" aria-label="Root Cause Analytics home">
              <Image
                src="/logo-white.png"
                alt="Root Cause Analytics"
                width={44}
                height={44}
                className="w-10 h-10 object-contain"
              />
              <span className="font-bold text-sm text-white tracking-tight leading-tight">ROOT CAUSE<br />ANALYTICS</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-5 max-w-xs">
              Document AI tools and synthetic training document libraries for regulated industries. Based in Sydney, Australia.
            </p>

            <div className="flex flex-wrap gap-2 mb-5">
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 rounded-full text-xs font-medium text-slate-300 border border-slate-700">
                <Shield size={12} className="text-[#0D9488]" />
                Synthetic disclaimer on every page
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 rounded-full text-xs font-medium text-slate-300 border border-slate-700">
                <Lock size={12} className="text-[#0D9488]" />
                Direct delivery, no third parties
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <MapPin size={14} className="text-[#0D9488] shrink-0" />
                <span>Sydney, NSW, Australia</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Mail size={14} className="text-[#0D9488] shrink-0" />
                <a
                  href="mailto:jack.webb@rootcauseanalytics.com.au"
                  className="hover:text-[#0D9488] transition-colors"
                >
                  jack.webb@rootcauseanalytics.com.au
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Product</h3>
            <ul className="flex flex-col gap-2">
              {productLinks.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-slate-400 hover:text-[#0D9488] transition-colors"
                    >
                      {link.label}
                      <ExternalLink size={11} />
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-[#0D9488] transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h3>
            <ul className="flex flex-col gap-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-[#0D9488] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 mt-6">Support</h3>
            <ul className="flex flex-col gap-2">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-[#0D9488] transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-[#0D9488] transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal</h3>
            <ul className="flex flex-col gap-2">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-[#0D9488] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Root Cause Analytics. All rights reserved.
          </p>
          <p className="text-xs text-slate-500 text-center sm:text-right">
            Synthetic training documents only. Not for clinical, claims, underwriting, regulatory or legal use.
          </p>
        </div>
      </div>
    </footer>
  )
}
