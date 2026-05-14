'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { CheckCircle, ArrowRight, ChevronRight, Briefcase, Stethoscope, Target, Package } from 'lucide-react'
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

const packs = [
  {
    icon: Briefcase,
    name: 'Insurance QA Sprint Pack',
    bullets: [
      '10 complete commercial P&C submission packs',
      'Ground truth, bboxes, scanned variants, and engineered red flag summary',
      '30-minute handover call to walk through the schema and red flag inventory',
      'AUD $2,500 fixed price',
      '48 to 72 hour delivery from order confirmation',
      'Designed for QA-ing an existing extraction pipeline against a controlled, varied input set',
    ],
    color: '#0D9488',
    highlight: true,
    cta: '/contact?pack=insurance-qa-sprint',
    ctaLabel: 'Order the Insurance QA Sprint Pack',
  },
  {
    icon: Target,
    name: 'Insurance Procurement Pack',
    bullets: [
      '5 to 10 packs scoped for vendor bake-off',
      'All vendors get the same PDFs and the same ground truth',
      'You score them against the same baseline',
      'Pricing on request, depending on scope and number of vendors',
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

const pricing = [
  { tier: 'Insurance 2-pack preview', price: 'Free', delivery: 'Same day on request' },
  { tier: 'Insurance QA Sprint Pack', price: 'AUD $2,500', delivery: '48 to 72 hours', highlight: true },
  { tier: 'Insurance Procurement Pack', price: 'On request', delivery: 'Scoped per order' },
  { tier: 'Medical 25-doc review pack', price: 'Free for qualified prospects', delivery: 'Same day on request' },
  { tier: 'Medical Pilot Pack', price: 'On request', delivery: 'Scoped per order' },
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
              A library is for ML training and bulk QA. A Benchmark Pack is for a specific human-led evaluation: a review, a vendor bake-off, a pre-rollout QA, a stakeholder demo. Smaller, more curated, faster to consume, and shipped with a recommended review path.
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
            </div>

            <div className="overflow-x-auto animate-on-scroll">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-white border-b border-slate-200">
                    <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">Pack</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">Price</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">Delivery</th>
                  </tr>
                </thead>
                <tbody>
                  {pricing.map((row) => (
                    <tr key={row.tier} className={`border-b border-slate-200 bg-white ${row.highlight ? 'bg-[#CCFBF1]/40' : ''}`}>
                      <td className="px-4 py-3 text-sm font-semibold text-slate-800">{row.tier}</td>
                      <td className={`px-4 py-3 text-sm font-semibold ${row.highlight ? 'text-[#0D9488]' : 'text-slate-700'}`}>{row.price}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{row.delivery}</td>
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
              10 complete submission packs. Engineered red flags. AUD $2,500. 48 to 72 hour delivery. 30-minute handover call.
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
