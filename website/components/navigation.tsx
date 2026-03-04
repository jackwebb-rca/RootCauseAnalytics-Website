'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, ExternalLink } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/solution', label: 'Solution' },
  { href: '/about', label: 'About' },
  { href: '/support', label: 'Support' },
  { href: '/contact', label: 'Contact' },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center group"
              aria-label="Root Cause Analytics home"
            >
              <Image
                src={isScrolled ? '/logo-dark.png' : '/logo-white.png'}
                alt="Root Cause Analytics"
                width={48}
                height={48}
                className="w-10 h-10 object-contain transition-opacity duration-300"
                priority
              />
              <span
                className={`ml-2 font-bold text-sm tracking-tight transition-colors leading-tight ${
                  isScrolled ? 'text-[#1E3A8A]' : 'text-white'
                }`}
              >
                ROOT CAUSE<br />ANALYTICS
              </span>
            </Link>

            {/* Desktop nav */}
            <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors relative group ${
                      isScrolled
                        ? isActive
                          ? 'text-[#0D9488]'
                          : 'text-slate-700 hover:text-[#0D9488]'
                        : isActive
                        ? 'text-[#CCFBF1]'
                        : 'text-white/90 hover:text-white'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#0D9488] rounded-full" />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/contact"
                className={`px-4 py-2 rounded-md text-sm font-medium border transition-colors ${
                  isScrolled
                    ? 'border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white'
                    : 'border-white/60 text-white hover:bg-white/10'
                }`}
              >
                Contact Us
              </Link>
              <a
                href="https://app.snowflake.com/marketplace/listing/GZSUZU1HJP/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium text-white bg-gradient-to-r from-[#0D9488] to-[#0B7D73] hover:from-[#0B7D73] hover:to-[#0a6b62] transition-all shadow-sm"
              >
                Snowflake Marketplace
                <ExternalLink size={14} />
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              className={`md:hidden p-2 rounded-md transition-colors ${
                isScrolled ? 'text-slate-700' : 'text-white'
              }`}
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          aria-modal="true"
          role="dialog"
          aria-label="Navigation menu"
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-0 right-0 h-full w-72 bg-white shadow-xl flex flex-col animate-slide-in-right">
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Image
                  src="/logo-dark.png"
                  alt="Root Cause Analytics"
                  width={36}
                  height={36}
                  className="w-8 h-8 object-contain"
                />
                <span className="font-bold text-sm text-[#1E3A8A] leading-tight">ROOT CAUSE<br />ANALYTICS</span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                aria-label="Close navigation menu"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 p-4 flex flex-col gap-1" aria-label="Mobile navigation">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#CCFBF1] text-[#0D9488]'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-[#0D9488]'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>

            <div className="p-4 border-t border-slate-200 flex flex-col gap-3">
              <Link
                href="/contact"
                className="w-full text-center px-4 py-2.5 rounded-lg text-sm font-medium border border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white transition-colors"
              >
                Contact Us
              </Link>
              <a
                href="https://app.snowflake.com/marketplace/listing/GZSUZU1HJP/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-[#0D9488] to-[#0B7D73]"
              >
                Snowflake Marketplace
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
