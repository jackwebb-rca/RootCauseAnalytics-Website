'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle, ArrowRight, ChevronRight, ChevronLeft, Briefcase, Stethoscope, Target, Package } from 'lucide-react'
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
  const badgeClass = libraryName === 'Insurance' ? 'bg-[#1E3A8A]/5 text-[#1E3A8A] border-[#1E3A8A]/20' : 'bg-[#0D9488]/10 text-[#0D9488] border-[#0D9488]/30'
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
            <button type="button" onClick={prev} aria-label="Previous sample" className="w-7 h-7 rounded-md border border-slate-200 hover:border-[#0D9488] hover:text-[#0D9488] text-slate-500 flex items-center justify-center transition-colors"><ChevronLeft size={14} /></button>
            <button type="button" onClick={next} aria-label="Next sample" className="w-7 h-7 rounded-md border border-slate-200 hover:border-[#0D9488] hover:text-[#0D9488] text-slate-500 flex items-center justify-center transition-colors"><ChevronRight size={14} /></button>
          </div>
        </div>
      </div>
      <div className="relative bg-slate-100 aspect-[707/1000]">
        {slides.map((s, i) => (
          <Image key={s.src} src={s.src} alt={`RCA ${libraryName} Library sample: ${s.label}`} fill sizes="(min-width: 1024px) 560px, 100vw" priority={i === 0} className={`object-contain transition-opacity duration-500 ${i === idx ? 'opacity-100' : 'opacity-0'}`} />
        ))}
      </div>
      <div className="flex items-center justify-center gap-1.5 px-5 py-3 border-t border-slate-200 bg-slate-50">
        {slides.map((s, i) => (
          <button key={s.src} type="button" onClick={() => setIdx(i)} aria-label={`Go to slide ${i + 1}: ${s.label}`} className={`h-1.5 rounded-full transition-all ${i === idx ? `w-6 ${activeDotClass}` : 'w-1.5 bg-slate-300 hover:bg-slate-400'}`} />
        ))}
      </div>
    </div>
  )
}

const packs = [
  {
    icon: Briefcase,
    name: 'Insurance QA Sprint Pack',
    bullets: [
      '10 complete commercial P&C submission packs',
      'Ground truth, bboxes, scanned variants, and engineered red flag summary',
      '30-minute handover call to walk through the schema and red flag inventory',
      'AUD $2,500 fixed price',
      'Same-day delivery from order confirmation',
      'Designed for QA-ing an existing extraction pipeline against a controlled, varied input set',
    ],
    color: '#0D9488',
    highlight: true,
    cta: '/contact?pack=insurance-qa-sprint',
    ctaLabel: 'Order the Insurance QA Sprint Pack',
  },
  {
    icon: Briefcase,
    name: 'Insurance QA Starter Pack',
    bullets: [
      '4 complete commercial P&C submission packs',
      'Ground truth, bboxes, scanned variants, and engineered red flag summary',
      'AUD $1,000 fixed price',
      'Same-day delivery from order confirmation',
      'Smaller first-look than the 10-pack Sprint. Same library, same quality, fewer packs.',
    ],
    color: '#1E3A8A',
    cta: '/contact?pack=insurance-qa-starter',
    ctaLabel: 'Order the Insurance QA Starter Pack',
  },
  {
    icon: Target,
    name: 'Insurance Procurement Pack',
    bullets: [
      '5 to 10 packs scoped for vendor evaluation',
      'All vendors get the same PDFs and the same ground truth',
      'You score them against the same baseline',
      'Contact for quote (depends on scope and number of vendors)',
    ],
    color: '#1E3A8A',
    cta: '/contact?pack=insurance-procurement',
    ctaLabel: 'Talk to us about a Procurement Pack',
  },
  {
    icon: Stethoscope,
    name: 'Medical Review Pack',
    bullets: [
      '25 to 35 representative medical documents across the major document types',
      'Designed for a five-minute review path documented in the pack README',
      'Free for qualified prospects',
      'Paid extension available if you want a larger review',
    ],
    color: '#0D9488',
    cta: '/contact?pack=medical-review',
    ctaLabel: 'Request the Medical Review Pack',
  },
  {
    icon: Package,
    name: 'Medical Pilot Pack',
    bullets: [
      '100 to 200 documents curated against your specific use case (discharge summary heavy, or pathology heavy, or a specific clinical specialty)',
      'Priced per scope',
      'Designed to feed an internal pilot before committing to a full QA library or a vendor',
    ],
    color: '#1E3A8A',
    cta: '/contact?pack=medical-pilot',
    ctaLabel: 'Scope a Medical Pilot Pack',
  },
]

const shippingChecklist = [
  'README_START_HERE.md with the recommended review path',
  'license_summary.md stating what you can and cannot do with the files',
  'validation_summary.md confirming PDF / ground truth / bbox / scan integrity',
  'file_list.csv mapping each PDF to its document_id, document_type, template_family, style_profile',
  'ground_truth_sample.csv and ground_truth_sample.jsonl',
  'bboxes_sample.jsonl with labelled bboxes (per-claim row and per-location row for insurance)',
  'manifest_sample.json summarising pack composition',
  'Insurance packs additionally ship red_flags_summary.csv with where_to_review pointers',
]

type PricingRow = { tier: string; scope: string; price: string; highlight?: boolean }

const pricing: PricingRow[] = [
  {
    tier: 'Insurance 2-pack preview',
    scope: '2 complete submission packs',
    price: 'Free',
  },
  {
    tier: 'Insurance QA Starter Pack',
    scope: '4 complete packs + engineered red flag summary',
    price: 'AUD $1,000',
  },
  {
    tier: 'Insurance QA Sprint Pack',
    scope: '10 complete packs + engineered red flag summary + 30-minute handover call',
    price: 'AUD $2,500',
    highlight: true,
  },
  {
    tier: 'Insurance Procurement Pack',
    scope: '5 to 10 packs scoped for vendor evaluation. All vendors score against the same documents',
    price: 'Contact for quote',
  },
  {
    tier: 'Medical 25-doc review pack',
    scope: '25 to 35 representative medical documents with a five-minute review path',
    price: 'Free for qualified prospects',
  },
  {
    tier: 'Medical Pilot Pack',
    scope: '100 to 200 documents scoped to your specialty (discharge, pathology, or a specific clinical area)',
    price: 'Contact for quote',
  },
  {
    tier: 'Education and tertiary',
    scope: 'Substantial discount on any library or pack for accredited education and research institutions',
    price: 'Contact for quote',
  },
]

export default function BenchmarkPacksPage() {
  useScrollAnimation()

  return (
    <>
      <Navigation />
      <main id="main-content">
        {/* HERO */}
        <section
          className="relative pt-24 pb-16 bg-gradient-to-br from-[#1E3A8A] to-[#0D9488] overflow-hidden"
          aria-label="Benchmark Packs hero"
        >
          <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
            <div className="absolute top-10 right-20 w-64 h-64 rounded-full bg-white/30 blur-3xl" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-sm text-white/90 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                Synthetic. Same generator stack as the full libraries.
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 text-balance">
                RCA Benchmark Packs
              </h1>
              <p className="text-xl text-[#CCFBF1] mb-6">
                Smaller paid packs for QA, vendor evaluation, and pilots
              </p>
              <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-2xl">
                Pre-built subsets of the RCA Insurance and Medical libraries, scoped for fast review or procurement evaluation.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact?pack=insurance-qa-sprint"
                  className="flex items-center gap-2 px-6 py-3 bg-white text-[#1E3A8A] rounded-lg font-semibold hover:bg-white/90 transition-colors shadow-lg"
                >
                  Order the Insurance QA Sprint Pack
                  <ChevronRight size={16} />
                </Link>
                <Link
                  href="/contact?pack=preview"
                  className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/30 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors"
                >
                  Get a free preview
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SAMPLE SLIDESHOW */}
        <section id="samples" className="py-20 bg-slate-50 border-b border-slate-200" aria-label="Pack contents preview">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-10 animate-on-scroll">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#CCFBF1] text-[#0D9488] rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
                What is in a pack
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A8A] mb-4 text-balance">
                Real pages from the libraries
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Every Benchmark Pack is curated from one of the full libraries. Browse representative pages here. Each pack ships with ground truth, bounding boxes, scanned variants, and a recommended review path.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-on-scroll">
              <SampleSlideshow slides={insuranceSlides} libraryName="Insurance" />
              <SampleSlideshow slides={medicalSlides} libraryName="Medical" />
            </div>
          </div>
        </section>

        {/* PACK MENU */}
        <section className="py-20 bg-white" aria-label="Available packs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 animate-on-scroll">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A8A] mb-4 text-balance">
                The current pack menu
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Each pack is a small, paid, curated subset designed for a specific evaluation use case. Smaller than a full library, larger than a preview. New pack types are added as customer use cases emerge.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {packs.map((p) => {
                const Icon = p.icon
                return (
                  <div
                    key={p.name}
                    className={`animate-on-scroll rounded-xl border p-6 ${
                      p.highlight
                        ? 'bg-gradient-to-br from-[#CCFBF1] to-[#d1fae5] border-[#0D9488]/40'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${p.color}20` }}
                      >
                        <Icon size={22} style={{ color: p.color }} />
                      </div>
                      <h3 className="font-semibold text-slate-800 text-lg">{p.name}</h3>
                    </div>
                    <ul className="flex flex-col gap-2 mb-5">
                      {p.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm text-slate-700">
                          <CheckCircle size={14} className="text-[#0D9488] mt-1 shrink-0" />
                          <span className="leading-relaxed">{b}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={p.cta}
                      className="inline-flex items-center gap-2 text-sm font-medium text-[#0D9488] hover:text-[#1E3A8A] transition-colors"
                    >
                      {p.ctaLabel}
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* WHAT EVERY PACK SHIPS */}
        <section className="py-20 bg-slate-50 border-y border-slate-200" aria-label="What every Benchmark Pack ships with">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 animate-on-scroll">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A8A] mb-6 text-balance">
              What every Benchmark Pack ships with
            </h2>
            <ul className="flex flex-col gap-3">
              {shippingChecklist.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                  <CheckCircle size={16} className="text-[#0D9488] mt-0.5 shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* WHY PACKS NOT LIBRARIES */}
        <section className="py-20 bg-white" aria-label="Why packs not libraries">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 animate-on-scroll">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A8A] mb-4 text-balance">
              Why packs and not just libraries
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              A library is for ML training and bulk QA. A Benchmark Pack is for a specific human-led evaluation: a review, a vendor comparison, a pre-rollout QA, a stakeholder demo. Smaller, more curated, faster to consume, and shipped with a recommended review path.
            </p>
            <p className="text-slate-600 leading-relaxed">
              If your use case is "we want to evaluate three vendors against the same baseline", a pack is the right unit. If your use case is "we need 500 labelled discharge summaries to train a model", a library is the right unit.
            </p>
          </div>
        </section>

        {/* PRICING */}
        <section className="py-16 bg-slate-50 border-y border-slate-200" aria-label="Pricing">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10 animate-on-scroll">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1E3A8A] mb-4 text-balance">
                Pricing summary
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Every pack ships same-day. The generator is a deterministic Python pipeline that produces the documents in minutes.
              </p>
            </div>

            <div className="overflow-x-auto animate-on-scroll">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-white border-b border-slate-200">
                    <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">Pack</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">What is in it</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {pricing.map((row) => (
                    <tr key={row.tier} className={`border-b border-slate-200 bg-white ${row.highlight ? 'bg-[#CCFBF1]/40' : ''}`}>
                      <td className="px-4 py-3 text-sm font-semibold text-slate-800 align-top">{row.tier}</td>
                      <td className="px-4 py-3 text-sm text-slate-600 align-top max-w-xl">{row.scope}</td>
                      <td className={`px-4 py-3 text-sm font-semibold align-top whitespace-nowrap ${row.highlight ? 'text-[#0D9488]' : 'text-slate-700'}`}>{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-[#0D9488] to-[#1E3A8A]" aria-label="Call to action">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-on-scroll">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">
              Order the Insurance QA Sprint Pack
            </h2>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              10 complete submission packs. Engineered red flags. AUD $2,500. Same-day delivery. 30-minute handover call.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact?pack=insurance-qa-sprint"
                className="flex items-center gap-2 px-8 py-3.5 bg-white text-[#1E3A8A] rounded-lg font-semibold hover:bg-white/90 transition-colors shadow-lg"
              >
                Order now
                <ChevronRight size={16} />
              </Link>
              <Link
                href="/contact?service=custom-pack"
                className="flex items-center gap-2 px-8 py-3.5 bg-white/10 border border-white/30 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors"
              >
                Talk to us about a custom Benchmark Pack
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
