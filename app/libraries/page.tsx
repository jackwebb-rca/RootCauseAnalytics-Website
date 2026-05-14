'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import {
  CheckCircle, ArrowRight, Briefcase, Stethoscope, Layers, Cog, ChevronRight
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
    useCase: 'Commercial P&C submission extraction QA and training',
    scale: '25, 100, 500, 5,000+ packs',
    href: '/libraries/insurance',
    color: '#1E3A8A',
    highlight: true,
  },
  {
    icon: Stethoscope,
    name: 'RCA Medical Library',
    useCase: 'Healthcare document extraction QA and training',
    scale: '200, 500, 5,000+ documents',
    href: '/libraries/medical',
    color: '#0D9488',
  },
  {
    icon: Layers,
    name: 'RCA Benchmark Packs',
    useCase: 'Procurement evaluation, vendor bake-off, pre-rollout QA',
    scale: 'Smaller curated subsets',
    href: '/libraries/benchmark-packs',
    color: '#1E3A8A',
  },
  {
    icon: Cog,
    name: 'RCA Custom Libraries',
    useCase: 'Your document types, your schema, your style profiles',
    scale: 'Scope-dependent',
    href: '/contact?service=custom-library',
    color: '#10B981',
  },
]

const shippingChecklist = [
  'A PDF in pdfs/ (clean, born-digital)',
  'A scanned variant in pdfs_scanned/ (rotation, noise, JPEG artefacts)',
  'A ground truth row in CSV (ground_truth.csv) and JSONL (ground_truth.jsonl)',
  'A bounding box record in bboxes.jsonl with page index and field coordinates',
  'A visible synthetic disclaimer rendered on every page',
]

const libraryChecklist = [
  'A library-level manifest.json documenting document type distribution, pack composition (insurance), case mix (medical), red flag inventory (insurance), and per-document metadata',
  'A splits.json with train / val / test allocation by document_id (ships with libraries above the standard QA scale)',
  'A README.md explaining schema, regeneration commands, and the synthetic safety statement',
  'A validation_summary.md confirming PDF / ground truth / bbox / scan integrity',
]

const useCases = [
  'Train, fine-tune, evaluate or QA document AI models',
  'Stress-test extraction pipelines against varied layouts and scanned input',
  'Demonstrate an internal extraction system to stakeholders using safe data',
  'Run a procurement evaluation: shortlist vendors against the same ground truth',
  'Build a regression suite for an existing extraction pipeline that is currently un-tested',
]

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
                Pre-labelled synthetic document libraries for document AI teams
              </h1>
              <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-2xl">
                Real-looking PDFs at scale, with ground truth, bounding boxes and scanned variants shipped alongside every document. Built by Root Cause Analytics in Sydney.
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
                  href="/libraries/insurance"
                  className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/30 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors"
                >
                  See the Insurance Library
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCT LINES */}
        <section className="py-20 bg-white" aria-label="Library product lines">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14 animate-on-scroll">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A8A] mb-4 text-balance">
                The product lines
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Three libraries from the same generator stack, plus benchmark packs and custom builds.
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
                    <h3 className="font-semibold text-slate-800 mb-1 text-lg">{p.name}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-3">{p.useCase}</p>
                    <p className="text-xs text-slate-500 mb-3">Scale: {p.scale}</p>
                    <span className="text-sm font-medium text-[#0D9488] inline-flex items-center gap-1">
                      Learn more
                      <ArrowRight size={14} />
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* WHAT EVERY DOCUMENT SHIPS WITH */}
        <section className="py-20 bg-slate-50" aria-label="What every document ships with">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="animate-on-scroll">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1E3A8A] mb-4 text-balance">
                  What every document ships with
                </h2>
                <ul className="flex flex-col gap-3">
                  {shippingChecklist.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                      <CheckCircle size={16} className="text-[#0D9488] mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-slate-600 leading-relaxed mt-4">
                  Insurance documents additionally ship per-claim row bboxes (from claim_rows_json) and per-location row bboxes (from location_rows_json). Reviewers can click through to individual rows on the loss run and statement of values, not just the document-level bbox.
                </p>
              </div>

              <div className="animate-on-scroll">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1E3A8A] mb-4 text-balance">
                  What every library ships with
                </h2>
                <ul className="flex flex-col gap-3">
                  {libraryChecklist.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                      <CheckCircle size={16} className="text-[#0D9488] mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* HOW LIBRARIES ARE BUILT */}
        <section className="py-20 bg-white" aria-label="How libraries are built">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-on-scroll">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A8A] mb-4 text-balance">
              How libraries are built
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              A deterministic Python generator. Cases are curated by hand, not LLM-generated. Phrase banks supply narrative variety. Style profiles and template families control visual variety so models trained on the library cannot memorise a single layout. Seeds are reproducible: the same seed produces the same PDFs every time.
            </p>
          </div>
        </section>

        {/* WHAT YOU CAN DO */}
        <section className="py-16 bg-slate-50 border-y border-slate-200" aria-label="What you can do with the libraries">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div className="animate-on-scroll">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1E3A8A] mb-4 text-balance">
                  What you can do
                </h2>
                <ul className="flex flex-col gap-3">
                  {useCases.map((u) => (
                    <li key={u} className="flex items-start gap-3 text-sm text-slate-700">
                      <CheckCircle size={16} className="text-[#0D9488] mt-0.5 shrink-0" />
                      {u}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="animate-on-scroll">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1E3A8A] mb-4 text-balance">
                  What libraries are not
                </h2>
                <ul className="flex flex-col gap-3 text-sm text-slate-700">
                  <li>They are not real patient or claimant data. They are not de-identified records. Nothing here is real.</li>
                  <li>They are not validated for clinical care, claims handling, underwriting, accounting, regulatory or legal use.</li>
                  <li>They are not statistically representative of any specific hospital, broker, insurer book or jurisdiction beyond the conventions documented in the README.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-[#0D9488] to-[#1E3A8A]" aria-label="Call to action">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-on-scroll">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">
              Get a free preview pack
            </h2>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              Two-pack insurance preview, or a 25 to 35 document medical review pack. Five-minute review path documented in the pack README.
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
                See Benchmark Packs
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
