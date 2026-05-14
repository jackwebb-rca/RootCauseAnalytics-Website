'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight, Briefcase, Stethoscope, Layers, Cog, ChevronRight, ChevronLeft
} from 'lucide-react'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

const libraries = [
  {
    icon: Briefcase,
    name: 'RCA Insurance Library',
    blurb: 'Complete commercial P&C submission packs. Broker emails, loss runs, statements of values, policy schedules, certificates of currency, applications, FNOL forms, claim reports.',
    proof: 'Per-row labels on loss run and SOV. Engineered cross-document red flags.',
    href: '/libraries/insurance',
    color: '#1E3A8A',
    highlight: true,
  },
  {
    icon: Stethoscope,
    name: 'RCA Medical Library',
    blurb: 'Synthetic Australian medical records. 40+ document types: discharge, ED, referral, imaging, pathology and 35+ specialist types.',
    proof: 'NSW conventions: postcodes, Medicare format, provider postnominals, AU clinician names.',
    href: '/libraries/medical',
    color: '#0D9488',
  },
  {
    icon: Layers,
    name: 'RCA Benchmark Packs',
    blurb: 'Smaller paid packs for procurement evaluation, vendor bake-offs, and pre-rollout QA.',
    proof: 'Insurance QA Sprint Pack ships at AUD $2,500 with 48 to 72 hour delivery.',
    href: '/libraries/benchmark-packs',
    color: '#1E3A8A',
  },
  {
    icon: Cog,
    name: 'RCA Custom Libraries',
    blurb: 'Your document types, your field schema, your style profiles. Built deterministically and shipped with ground truth and bboxes.',
    proof: 'Scoped per order. Same delivery shape as the standard libraries.',
    href: '/contact?service=custom-library',
    color: '#10B981',
  },
]

const sampleSlides = [
  { src: '/samples/insurance_broker_email.png',          library: 'Insurance', label: 'Broker submission email' },
  { src: '/samples/insurance_loss_run_clean.png',        library: 'Insurance', label: 'Loss run report' },
  { src: '/samples/insurance_sov_clean.png',             library: 'Insurance', label: 'Statement of values' },
  { src: '/samples/insurance_policy_schedule.png',       library: 'Insurance', label: 'Policy schedule' },
  { src: '/samples/insurance_fnol.png',                  library: 'Insurance', label: 'First notice of loss' },
  { src: '/samples/medical_discharge_summary_clean.png', library: 'Medical',   label: 'Discharge summary' },
  { src: '/samples/medical_ed_assessment.png',           library: 'Medical',   label: 'ED assessment' },
  { src: '/samples/medical_referral_letter.png',         library: 'Medical',   label: 'Referral letter' },
  { src: '/samples/medical_pathology_report.png',        library: 'Medical',   label: 'Pathology report' },
]

function SampleSlideshow() {
  const [idx, setIdx] = useState(0)
  const total = sampleSlides.length
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % total), 6000)
    return () => clearInterval(t)
  }, [total])
  const slide = sampleSlides[idx]
  const prev = () => setIdx((i) => (i - 1 + total) % total)
  const next = () => setIdx((i) => (i + 1) % total)

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 bg-slate-50">
        <div className="flex items-center gap-3">
          <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full border ${
            slide.library === 'Insurance'
              ? 'bg-[#1E3A8A]/5 text-[#1E3A8A] border-[#1E3A8A]/20'
              : 'bg-[#0D9488]/10 text-[#0D9488] border-[#0D9488]/30'
          }`}>
            RCA {slide.library} Library
          </span>
          <span className="text-sm font-semibold text-slate-700">{slide.label}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-mono">{idx + 1} / {total}</span>
          <div className="flex items-center gap-1">
            <button type="button" onClick={prev} aria-label="Previous sample"
              className="w-7 h-7 rounded-md border border-slate-200 hover:border-[#0D9488] hover:text-[#0D9488] text-slate-500 flex items-center justify-center transition-colors">
              <ChevronLeft size={14} />
            </button>
            <button type="button" onClick={next} aria-label="Next sample"
              className="w-7 h-7 rounded-md border border-slate-200 hover:border-[#0D9488] hover:text-[#0D9488] text-slate-500 flex items-center justify-center transition-colors">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
      <div className="relative bg-slate-100 aspect-[707/1000]">
        {sampleSlides.map((s, i) => (
          <Image key={s.src} src={s.src} alt={`${s.library} library sample: ${s.label}`}
            fill sizes="(min-width: 1024px) 700px, 100vw" priority={i === 0}
            className={`object-contain transition-opacity duration-500 ${i === idx ? 'opacity-100' : 'opacity-0'}`} />
        ))}
      </div>
      <div className="flex items-center justify-center gap-1.5 px-5 py-3 border-t border-slate-200 bg-slate-50">
        {sampleSlides.map((s, i) => (
          <button key={s.src} type="button" onClick={() => setIdx(i)} aria-label={`Go to slide ${i + 1}: ${s.label}`}
            className={`h-1.5 rounded-full transition-all ${i === idx ? 'w-6 bg-[#0D9488]' : 'w-1.5 bg-slate-300 hover:bg-slate-400'}`} />
        ))}
      </div>
    </div>
  )
}

export default function LibrariesPage() {
  useScrollAnimation()

  return (
    <>
      <Navigation />
      <main id="main-content">
        {/* HERO */}
        <section
          className="relative pt-24 pb-16 bg-gradient-to-br from-[#1E3A8A] to-[#0D9488] overflow-hidden"
          aria-label="Libraries hero"
        >
          <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
            <div className="absolute top-10 right-20 w-64 h-64 rounded-full bg-white/30 blur-3xl" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-sm text-white/90 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                Pre-labelled. Pre-bbox'd. Pre-scanned.
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 text-balance">
                Pre-labelled synthetic document libraries
              </h1>
              <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-2xl">
                Real-looking PDFs at scale. Ground truth, bounding boxes and scanned variants shipped alongside every document. Built by Root Cause Analytics in Sydney.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact?pack=preview"
                  className="flex items-center gap-2 px-6 py-3 bg-white text-[#1E3A8A] rounded-lg font-semibold hover:bg-white/90 transition-colors shadow-lg"
                >
                  Get a free preview pack
                  <ChevronRight size={16} />
                </Link>
                <Link
                  href="#samples"
                  className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/30 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors"
                >
                  See the documents
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SAMPLES - real documents first */}
        <section id="samples" className="py-20 bg-slate-50 border-b border-slate-200" aria-label="Real samples">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-10 animate-on-scroll">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#CCFBF1] text-[#0D9488] rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
                Real samples
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A8A] mb-4 text-balance">
                Nine real pages from the libraries
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Browse representative documents from the RCA Insurance and Medical libraries. Same generator stack, different document types. Every page ships with ground truth, bounding boxes, a scanned variant, and a visible synthetic disclaimer.
              </p>
            </div>
            <div className="animate-on-scroll">
              <SampleSlideshow />
            </div>
          </div>
        </section>

        {/* PRODUCT LINES */}
        <section className="py-20 bg-white" aria-label="Library product lines">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14 animate-on-scroll">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A8A] mb-4 text-balance">
                The four product lines
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Same generator stack. Different domain, different field schema, different style profile.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {libraries.map((p, i) => {
                const Icon = p.icon
                return (
                  <Link
                    key={p.name}
                    href={p.href}
                    className={`animate-on-scroll p-6 rounded-xl border transition-shadow hover:shadow-md block ${
                      p.highlight
                        ? 'bg-gradient-to-br from-[#CCFBF1] to-[#d1fae5] border-[#0D9488]/30'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                    style={{ transitionDelay: `${i * 80}ms` }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${p.color}20` }}
                    >
                      <Icon size={22} style={{ color: p.color }} />
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-2 text-lg">{p.name}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-2">{p.blurb}</p>
                    <p className="text-xs text-[#0D9488] font-medium mb-3 leading-relaxed">{p.proof}</p>
                    <span className="text-sm font-medium text-[#0D9488] inline-flex items-center gap-1">
                      Open the page
                      <ArrowRight size={14} />
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* WHAT SHIPS - compressed into a single section */}
        <section className="py-16 bg-slate-50 border-y border-slate-200" aria-label="What ships">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10 animate-on-scroll">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1E3A8A] mb-3 text-balance">
                What ships with every order
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Every PDF lands with its labels. Every library lands with its manifest.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-on-scroll">
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#0D9488] mb-3">Per document</div>
                <ul className="flex flex-col gap-2 text-sm text-slate-700">
                  <li>Clean PDF in pdfs/</li>
                  <li>Scanned variant in pdfs_scanned/ (rotation, noise, JPEG)</li>
                  <li>Ground truth row in CSV and JSONL</li>
                  <li>Bounding box record in bboxes.jsonl</li>
                  <li>Visible synthetic disclaimer on every page</li>
                </ul>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#0D9488] mb-3">Per library</div>
                <ul className="flex flex-col gap-2 text-sm text-slate-700">
                  <li>manifest.json with document-type distribution and metadata</li>
                  <li>splits.json with train / val / test allocation</li>
                  <li>README.md with schema and regeneration commands</li>
                  <li>validation_summary.md confirming integrity checks</li>
                  <li>license_summary.md confirming the synthetic-only restriction</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-[#0D9488] to-[#1E3A8A]" aria-label="Call to action">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-on-scroll">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">
              Try a free preview pack
            </h2>
            <p className="text-white/80 text-lg mb-2 leading-relaxed">
              Two-pack insurance preview, or a 25 to 35 document medical review pack.
            </p>
            <p className="text-white/60 text-sm mb-8 leading-relaxed">
              Same-day on request. Sent by Jack directly from Sydney.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact?pack=preview"
                className="flex items-center gap-2 px-8 py-3.5 bg-white text-[#1E3A8A] rounded-lg font-semibold hover:bg-white/90 transition-colors shadow-lg"
              >
                Request a preview pack
                <ChevronRight size={16} />
              </Link>
              <Link
                href="/libraries/benchmark-packs"
                className="flex items-center gap-2 px-8 py-3.5 bg-white/10 border border-white/30 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors"
              >
                See paid pack pricing
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
