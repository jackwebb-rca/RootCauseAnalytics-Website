'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  FileText, Shield, CheckCircle, ArrowRight, ExternalLink, Database,
  Layers, Library, Briefcase, Stethoscope, Cog, ChevronRight, Code,
  Repeat, Eye, Search, Box, Hash, Scan, ChevronLeft
} from 'lucide-react'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.1 }
    )
    const els = document.querySelectorAll('.animate-on-scroll')
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

const stats = [
  { value: 'Free preview', label: 'Same-day delivery' },
  { value: '40+', label: 'Medical document types' },
  { value: 'Per-row labels', label: 'Insurance bbox precision' },
  { value: 'Australian-built', label: 'Healthcare conventions' },
]

// Slideshow of actual documents shipped in the libraries
type Slide = { src: string; label: string }
type Library = 'Insurance' | 'Medical'

const insuranceSlides: Slide[] = [
  { src: '/samples/insurance_broker_email.png',    label: 'Broker submission email' },
  { src: '/samples/insurance_loss_run_clean.png',  label: 'Loss run report' },
  { src: '/samples/insurance_sov_clean.png',       label: 'Statement of values' },
  { src: '/samples/insurance_policy_schedule.png', label: 'Policy schedule' },
  { src: '/samples/insurance_fnol.png',            label: 'First notice of loss' },
]

const medicalSlides: Slide[] = [
  { src: '/samples/medical_discharge_summary_clean.png', label: 'Discharge summary' },
  { src: '/samples/medical_ed_assessment.png',           label: 'ED assessment' },
  { src: '/samples/medical_referral_letter.png',         label: 'Referral letter' },
  { src: '/samples/medical_imaging_report_clean.png',    label: 'Imaging report' },
  { src: '/samples/medical_pathology_report.png',        label: 'Pathology report' },
]

const trustBadges = [
  'Deterministic by seed',
  'Ground truth + bounding boxes',
  'Scanned variants for every PDF',
  'Visible synthetic disclaimer on every page',
  'Australian document conventions',
]

const buyerPersonas = [
  {
    icon: Code,
    label: 'ML engineers',
    headline: 'Shipping healthcare or insurance extraction to production',
    description: 'You need labeled training data and a regression suite that catches regressions before they hit a customer document. RCA libraries give you pre-labelled PDFs, ground truth, bounding boxes, and scanned variants in one bundle.',
  },
  {
    icon: Search,
    label: 'Procurement & QA leads',
    headline: 'Evaluating extraction vendors against a real-world target',
    description: 'You need every vendor to score against the same documents and the same ground truth. The Insurance QA Sprint Pack ships 10 complete submission packs with engineered red flags. Same input, same target, fair comparison.',
  },
  {
    icon: Database,
    label: 'Data platform teams',
    headline: 'Deploying document extraction inside your own environment',
    description: 'RCA Extract ships as a self-hosted Docker container that runs in your cloud or on-prem. Zero data egress. Customer-managed compute, customer-managed costs. Your existing RBAC and audit policies apply.',
  },
]

const productLines = [
  {
    icon: Stethoscope,
    name: 'RCA Extract',
    blurb: 'Self-hosted document extraction for healthcare PDFs. Discharge summaries, ED assessments, referrals, imaging and pathology reports. Ships as a Docker container that runs in your cloud or on-prem. Built and tested against the RCA Medical Library.',
    href: '/products/rca-extract',
    cta: 'See the supported types',
    color: '#0D9488',
  },
  {
    icon: Briefcase,
    name: 'RCA Insurance Library',
    blurb: 'Synthetic commercial P&C submission packs. Broker emails, loss runs, statements of values, policy schedules, certificates of currency, applications, FNOL forms, claim reports. Engineered red flag categories. Per-claim and per-location bbox rows.',
    href: '/libraries/insurance',
    cta: 'See the pack structure',
    color: '#1E3A8A',
    highlight: true,
  },
  {
    icon: Library,
    name: 'RCA Medical Library',
    blurb: 'Synthetic Australian medical training documents. 40+ document types across hospital, ED, GP clinic, pathology, imaging and specialist correspondence. NSW postcodes, Medicare format, provider postnominals.',
    href: '/libraries/medical',
    cta: 'Browse the document types',
    color: '#0D9488',
  },
  {
    icon: Layers,
    name: 'RCA Benchmark Packs',
    blurb: 'Smaller paid review packs, QA packs and pilot packs that sit on top of the libraries. Use them for procurement evaluation, vendor comparison or pre-rollout QA. Insurance QA Sprint Pack ships at AUD $2,500.',
    href: '/libraries/benchmark-packs',
    cta: 'See the pack menu',
    color: '#1E3A8A',
  },
  {
    icon: Cog,
    name: 'RCA Custom Libraries',
    blurb: 'Your document types. Your field schema. Your style profiles. Built deterministically and shipped with ground truth and bboxes.',
    href: '/contact?service=custom-library',
    cta: 'Scope a custom library',
    color: '#10B981',
  },
]

const whyCards = [
  {
    icon: Eye,
    title: 'Real-looking PDFs at any scale',
    description: 'Visually varied across eight style profiles and three template families per document type. Not the same template rendered twenty times.',
  },
  {
    icon: Hash,
    title: 'Ground truth shipped with every doc',
    description: 'CSV and JSONL. Bounding boxes for labeled fields. Insurance bboxes include per-claim row entries from claim_rows_json and per-location row entries from location_rows_json.',
  },
  {
    icon: Scan,
    title: 'Scanned variants for the photocopy path',
    description: 'Every PDF ships with a rotated, noised, JPEG-compressed scanned variant in pdfs_scanned/. Same ground truth, harder input.',
  },
  {
    icon: Repeat,
    title: 'Reproducible by seed',
    description: 'The same seed produces the same PDFs every time. Useful for versioned QA, regression suites, and procurement evaluation.',
  },
  {
    icon: Shield,
    title: 'Safe to share inside your company',
    description: 'Every page carries a visible synthetic disclaimer. Nothing is real patient, claimant, broker, or policyholder data. No data agreement required to redistribute internally.',
  },
  {
    icon: Box,
    title: 'Direct delivery, no third parties',
    description: 'Libraries ship as direct downloads. No third-party file-share processor unless requested. RCA Extract runs as a self-hosted Docker container with zero data egress.',
  },
]

const howSteps = [
  { step: '01', title: 'Curated case files', description: 'Hand-authored case archetypes. Phrase banks. Field schemas defined up front.' },
  { step: '02', title: 'Deterministic generator', description: 'A Python pipeline turns a case file plus a seed into a fully-rendered PDF. No LLM calls in the default pipeline.' },
  { step: '03', title: 'Labels generated alongside', description: 'Ground truth, bounding boxes and scanned variants are produced in the same pass as the PDFs.' },
  { step: '04', title: 'Library packaging', description: 'Library ships with manifest, splits, README and a written synthetic safety statement.' },
]

const safetyTiles = [
  { label: 'Synthetic disclaimer on every page', icon: Shield, color: '#0D9488' },
  { label: 'No real customer data anywhere', icon: Database, color: '#1E3A8A' },
  { label: 'RCA Extract runs in your own environment', icon: Shield, color: '#0D9488' },
  { label: 'Direct delivery, no third parties', icon: FileText, color: '#10B981' },
]

function SampleSlideshow({ slides, libraryName }: { slides: Slide[]; libraryName: Library }) {
  const [idx, setIdx] = useState(0)
  const total = slides.length

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % total), 6000)
    return () => clearInterval(t)
  }, [total])

  const slide = slides[idx]
  const prev = () => setIdx((i) => (i - 1 + total) % total)
  const next = () => setIdx((i) => (i + 1) % total)

  const badgeClass = libraryName === 'Insurance'
    ? 'bg-[#1E3A8A]/5 text-[#1E3A8A] border-[#1E3A8A]/20'
    : 'bg-[#0D9488]/10 text-[#0D9488] border-[#0D9488]/30'
  const activeDotClass = libraryName === 'Insurance' ? 'bg-[#1E3A8A]' : 'bg-[#0D9488]'

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 bg-slate-50 gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full border shrink-0 ${badgeClass}`}>
            RCA {libraryName} Library
          </span>
          <span className="text-sm font-semibold text-slate-700 truncate">{slide.label}</span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs text-slate-400 font-mono">{idx + 1} / {total}</span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous sample"
              className="w-7 h-7 rounded-md border border-slate-200 hover:border-[#0D9488] hover:text-[#0D9488] text-slate-500 flex items-center justify-center transition-colors"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next sample"
              className="w-7 h-7 rounded-md border border-slate-200 hover:border-[#0D9488] hover:text-[#0D9488] text-slate-500 flex items-center justify-center transition-colors"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Slide stage - fixed aspect ratio so layout doesn't jump between slides */}
      <div className="relative bg-slate-100 aspect-[707/1000]">
        {slides.map((s, i) => (
          <Image
            key={s.src}
            src={s.src}
            alt={`RCA ${libraryName} Library sample: ${s.label}`}
            fill
            sizes="(min-width: 1024px) 560px, 100vw"
            priority={i === 0}
            className={`object-contain transition-opacity duration-500 ${i === idx ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-1.5 px-5 py-3 border-t border-slate-200 bg-slate-50">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => setIdx(i)}
            aria-label={`Go to slide ${i + 1}: ${s.label}`}
            className={`h-1.5 rounded-full transition-all ${
              i === idx ? `w-6 ${activeDotClass}` : 'w-1.5 bg-slate-300 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default function HomePage() {
  useScrollAnimation()

  return (
    <>
      <Navigation />
      <main id="main-content">
        {/* HERO */}
        <section
          className="relative min-h-screen flex flex-col justify-center bg-gradient-to-br from-[#1E3A8A] via-[#1a3278] to-[#0D9488] overflow-hidden"
          aria-label="Hero section"
        >
          <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
            <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-white/20 blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-[#0D9488]/30 blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-sm text-white/90 mb-6 animate-fade-in">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                Founder-led. Built in Sydney.
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight text-balance mb-6 animate-fade-in-up">
                Document AI tools and synthetic training document libraries{' '}
                <span className="text-[#CCFBF1]">for regulated industries</span>
              </h1>

              <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl animate-fade-in-up delay-100">
                Root Cause Analytics builds document extraction products and pre-labelled synthetic document libraries for teams working with healthcare, insurance and other privacy-sensitive documents.
              </p>

              <div className="flex flex-wrap gap-4 animate-fade-in-up delay-200">
                <Link
                  href="/libraries"
                  className="flex items-center gap-2 px-6 py-3 bg-white text-[#1E3A8A] rounded-lg font-semibold hover:bg-white/90 transition-colors shadow-lg"
                >
                  See the libraries
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="#sample"
                  className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/30 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors"
                >
                  See an actual sample
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="relative bg-white/10 backdrop-blur-sm border-t border-white/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight">{s.value}</div>
                    <div className="text-xs sm:text-sm text-white/70 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TRUST STRIP */}
        <section className="py-10 bg-slate-50 border-b border-slate-200" aria-label="Trust indicators">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {trustBadges.map((badge) => (
                <div
                  key={badge}
                  className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm"
                >
                  <CheckCircle size={14} className="text-[#0D9488]" />
                  <span className="text-sm font-medium text-slate-700">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHO THIS IS FOR */}
        <section className="py-20 bg-white" aria-label="Who this is for">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14 animate-on-scroll">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A8A] mb-4 text-balance">
                Built for teams who actually have to ship
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Three buyer profiles where the libraries and RCA Extract earn their keep.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {buyerPersonas.map((persona, i) => {
                const Icon = persona.icon
                return (
                  <div
                    key={persona.label}
                    className="animate-on-scroll bg-slate-50 border border-slate-200 rounded-xl p-6 hover:border-[#0D9488]/40 hover:shadow-md transition-all flex flex-col"
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#CCFBF1] flex items-center justify-center mb-4">
                      <Icon size={22} className="text-[#0D9488]" />
                    </div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#0D9488] mb-2">
                      {persona.label}
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-3 text-lg leading-snug">
                      {persona.headline}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{persona.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* WHAT YOU ACTUALLY GET (slideshow) */}
        <section id="sample" className="py-20 bg-slate-50 border-y border-slate-200" aria-label="What you actually get">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-10 animate-on-scroll">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#CCFBF1] text-[#0D9488] rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
                Real samples, not mock-ups
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A8A] mb-4 text-balance">
                A few pages from the libraries
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Real pages from the RCA Insurance and Medical libraries. Same generator stack, different document types. Every page ships with ground truth, bounding boxes, a scanned variant, and a visible synthetic disclaimer.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-on-scroll">
              <SampleSlideshow slides={insuranceSlides} libraryName="Insurance" />
              <SampleSlideshow slides={medicalSlides} libraryName="Medical" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 animate-on-scroll">
              <div className="bg-white border border-slate-200 rounded-lg p-4 text-sm">
                <div className="text-[10px] uppercase tracking-wider text-[#0D9488] font-semibold mb-1">RCA Insurance Library</div>
                <div className="text-slate-700 leading-relaxed">Complete commercial P&amp;C submission packs. Broker email, loss run, statement of values, policy schedule, COC, application, FNOL, claim report.</div>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-4 text-sm">
                <div className="text-[10px] uppercase tracking-wider text-[#1E3A8A] font-semibold mb-1">RCA Medical Library</div>
                <div className="text-slate-700 leading-relaxed">Forty-plus document types across hospital, ED, GP clinic, pathology, imaging and specialist correspondence. NSW conventions throughout.</div>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-4 text-sm">
                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">Ships alongside every PDF</div>
                <div className="text-slate-700 leading-relaxed">CSV + JSONL ground truth, bboxes.jsonl with labelled fields, manifest, scanned variant.</div>
              </div>
            </div>

            <div className="text-center mt-10 animate-on-scroll">
              <Link
                href="/contact?pack=preview"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1E3A8A] text-white rounded-lg font-semibold hover:bg-[#172d6b] transition-colors shadow-sm"
              >
                Request a preview pack
                <ChevronRight size={16} />
              </Link>
              <p className="text-xs text-slate-500 mt-3">
                Free. Same-day delivery. Two complete insurance packs or 25 to 35 medical documents, with ground truth and scanned variants.
              </p>
            </div>
          </div>
        </section>

        {/* WHAT WE SHIP */}
        <section className="py-20 bg-white" aria-label="Product lines">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14 animate-on-scroll">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A8A] mb-4 text-balance">
                What we ship
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Three product lines from the same generator stack, plus benchmark packs and custom libraries.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {productLines.map((p, i) => {
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
                    <p className="text-sm text-slate-600 leading-relaxed mb-3">{p.blurb}</p>
                    <span className="text-sm font-medium text-[#0D9488] inline-flex items-center gap-1">
                      {p.cta}
                      <ArrowRight size={14} />
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* WHY TEAMS USE US - now a card grid */}
        <section className="py-20 bg-[#1E3A8A]" aria-label="Why teams use the libraries">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14 animate-on-scroll">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">
                Why teams pick the RCA libraries
              </h2>
              <p className="text-white/70 leading-relaxed">
                Six properties that matter for QA, training and procurement evaluation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {whyCards.map((card, i) => {
                const Icon = card.icon
                return (
                  <div
                    key={card.title}
                    className="animate-on-scroll bg-white/5 border border-white/15 rounded-xl p-6 hover:border-white/30 transition-colors"
                    style={{ transitionDelay: `${i * 60}ms` }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#0D9488]/20 flex items-center justify-center mb-3">
                      <Icon size={18} className="text-[#10B981]" />
                    </div>
                    <h3 className="text-white font-semibold mb-2 leading-snug">{card.title}</h3>
                    <p className="text-sm text-white/70 leading-relaxed">{card.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* HOW IT IS BUILT */}
        <section className="py-20 bg-white" aria-label="How it is built">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14 animate-on-scroll">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A8A] mb-4 text-balance">
                How the libraries are built
              </h2>
              <p className="text-slate-600 leading-relaxed">
                A deterministic Python generator, curated case files and phrase banks. No LLM calls in the default pipeline.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {howSteps.map((step, i) => (
                <div key={step.step} className="animate-on-scroll" style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center hover:border-[#0D9488]/40 transition-colors h-full">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0D9488] to-[#1E3A8A] text-white font-bold flex items-center justify-center mx-auto mb-4 text-sm">
                      {step.step}
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECURITY AND SYNTHETIC SAFETY */}
        <section className="py-16 bg-slate-50 border-y border-slate-200" aria-label="Synthetic safety">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="animate-on-scroll">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1E3A8A] mb-4 text-balance">
                  Synthetic by design. Safe to share.
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Every document we ship is computer-generated. The names, ABNs, Medicare numbers, addresses, phone numbers, policy numbers, claim numbers and dollar values are all synthetic. Every PDF page carries a visible synthetic disclaimer.
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    'Synthetic data only. Every PDF carries a visible synthetic disclaimer on every page.',
                    'Not for clinical, claims, underwriting, regulatory, accounting or legal use.',
                    'RCA Extract runs as a self-hosted Docker container inside your environment. Zero data egress. Inherits your existing RBAC, audit and access policies.',
                    'Library deliveries are direct downloads. No third-party data processors involved.',
                    'No real customer or patient data is held, transmitted or stored anywhere in the generator or the libraries.',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                      <CheckCircle size={16} className="text-[#0D9488] mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="animate-on-scroll grid grid-cols-2 gap-4">
                {safetyTiles.map(({ label, icon: Icon, color }) => (
                  <div
                    key={label}
                    className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col items-center gap-3 text-center hover:border-[#0D9488]/40 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
                      <Icon size={22} style={{ color }} />
                    </div>
                    <span className="text-sm font-semibold text-slate-700">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA BAND */}
        <section
          id="preview-pack"
          className="py-20 bg-gradient-to-br from-[#0D9488] to-[#1E3A8A]"
          aria-label="Request a free preview pack"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-on-scroll">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">
              Try the libraries in five minutes
            </h2>
            <p className="text-white/80 text-lg mb-2 leading-relaxed">
              Request the free 2-pack insurance preview or a 25 to 35 document medical review pack.
            </p>
            <p className="text-white/60 text-sm mb-8 leading-relaxed">
              No credit card. Same-day delivery. Each pack ships with a README_START_HERE.md and a recommended five-minute review path.
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
                href="/products/rca-extract"
                className="flex items-center gap-2 px-8 py-3.5 bg-white/10 border border-white/30 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors"
              >
                Talk to us about deployment
                <ArrowRight size={16} />
              </Link>
            </div>
            <p className="text-white/60 text-sm mt-10 leading-relaxed">
              Built and supported from Sydney, Australia.{' '}
              <Link href="/about" className="text-white underline underline-offset-2 hover:no-underline">
                More about Root Cause Analytics
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
