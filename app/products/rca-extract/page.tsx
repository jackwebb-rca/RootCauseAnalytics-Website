'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import {
  CheckCircle, ExternalLink, ArrowRight, FileText, Database, Layers,
  Shield, Lock, Stethoscope, ChevronRight, Activity
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

const keyStats = [
  { value: 'Snowflake', label: 'Native App deployment' },
  { value: 'AU', label: 'Healthcare conventions' },
  { value: '10 Min', label: 'Marketplace install time' },
  { value: 'Zero', label: 'Data egress' },
]

const documentTypes = [
  {
    name: 'Discharge summary',
    fields: 'Demographics, registrar, consultant, principal diagnosis, principal ICD, dates, length of stay, medications, follow-up.',
  },
  {
    name: 'ED assessment',
    fields: 'Triage category, presenting complaint, disposition, timings.',
  },
  {
    name: 'Referral letter',
    fields: 'Referrer, recipient specialty, presenting problem, requested action.',
  },
  {
    name: 'Imaging report',
    fields: 'Accession number, modality, body region, findings, impression.',
  },
  {
    name: 'Pathology report',
    fields: 'Lab reference, specimen, test panel, result fields, abnormal flags.',
  },
]

const architectureSteps = [
  {
    icon: Layers,
    title: 'Document Ingestion',
    description: 'Stage PDFs in a Snowflake internal or external stage. Multi-page PDF, TIFF, PNG and JPEG inputs supported.',
  },
  {
    icon: Activity,
    title: 'Extraction Pipeline',
    description: 'RCA Extract runs as a Snowflake Native App function. Per-document extraction returns structured fields plus bounding boxes for the labeled fields.',
  },
  {
    icon: Database,
    title: 'Structured Output',
    description: 'Results land directly in Snowflake tables. Pre-defined healthcare schemas. FHIR-aligned output available where the schema applies.',
  },
  {
    icon: FileText,
    title: 'Analytics-Ready',
    description: 'Query results with standard SQL. Connect to any Snowflake-compatible BI tool. Joins against your existing patient or facility tables work as normal.',
  },
]

const snowflakeBullets = [
  'Runs entirely within your Snowflake account. Patient data never leaves your environment.',
  'Inherits your existing Snowflake RBAC, audit and access policies.',
  'No external API calls. No third-party data processors involved in extraction.',
  'Snowflake Marketplace listing: GZSUZU1HJP.',
  'Encryption at rest and in transit, provided by Snowflake.',
]

const safetyTiles = [
  { label: 'Runs in Your Snowflake Account', icon: Shield, color: '#0D9488' },
  { label: 'No Third-Party Processors', icon: Lock, color: '#1E3A8A' },
  { label: 'FHIR Compatible Output', icon: FileText, color: '#0D9488' },
  { label: 'Zero Data Movement', icon: Database, color: '#10B981' },
]

export default function RCAExtractPage() {
  useScrollAnimation()

  return (
    <>
      <Navigation />
      <main id="main-content">
        {/* HERO */}
        <section
          className="relative pt-24 pb-16 bg-gradient-to-br from-[#1E3A8A] to-[#0D9488] overflow-hidden"
          aria-label="RCA Extract hero"
        >
          <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
            <div className="absolute top-10 right-20 w-64 h-64 rounded-full bg-white/30 blur-3xl" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-sm text-white/90 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                Snowflake Native App
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 text-balance">
                RCA Extract
              </h1>
              <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-2xl">
                Document extraction for healthcare PDFs. Ingests discharge summaries, ED assessments, referral letters, imaging reports and pathology reports. Returns structured fields ready for downstream analytics, EMR ingest, or audit work.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://app.snowflake.com/marketplace/listing/GZSUZU1HJP/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-white text-[#1E3A8A] rounded-lg font-semibold hover:bg-white/90 transition-colors shadow-lg"
                >
                  Browse on Snowflake Marketplace
                  <ExternalLink size={16} />
                </a>
                <Link
                  href="/contact"
                  className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/30 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors"
                >
                  Talk to our team
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* KEY STATS */}
        <section className="py-10 bg-gradient-to-br from-[#1E3A8A] to-[#0D9488] border-b border-white/20" aria-label="Key statistics">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {keyStats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-white">{s.value}</div>
                  <div className="text-sm text-white/70 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHAT IT DOES */}
        <section className="py-20 bg-white" aria-label="What RCA Extract does">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14 animate-on-scroll">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A8A] mb-4 text-balance">
                From Document to Insight
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Native Snowflake architecture means zero data movement and instant analytics on extracted results.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {architectureSteps.map((step, i) => {
                const Icon = step.icon
                return (
                  <div key={step.title} className="animate-on-scroll" style={{ transitionDelay: `${i * 100}ms` }}>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:border-[#0D9488]/40 transition-colors h-full">
                      <div className="w-11 h-11 rounded-lg bg-[#CCFBF1] flex items-center justify-center mb-4">
                        <Icon size={20} className="text-[#0D9488]" />
                      </div>
                      <h3 className="font-semibold text-slate-800 mb-2">{step.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* SUPPORTED DOCUMENT TYPES */}
        <section className="py-20 bg-slate-50" aria-label="Supported document types">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14 animate-on-scroll">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A8A] mb-4 text-balance">
                Supported document types
              </h2>
              <p className="text-slate-600 leading-relaxed">
                The current production set covers high-volume Australian healthcare document types. Each is evaluated end-to-end against the matching family in the RCA Medical Library, so extraction quality can be scored against known ground truth. Additional document types ship on request.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {documentTypes.map((d) => (
                <div key={d.name} className="animate-on-scroll bg-white border border-slate-200 rounded-xl p-6 hover:border-[#0D9488]/40 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-[#CCFBF1] flex items-center justify-center">
                      <Stethoscope size={18} className="text-[#0D9488]" />
                    </div>
                    <h3 className="font-semibold text-slate-800">{d.name}</h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{d.fields}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12 animate-on-scroll">
              <Link
                href="/libraries/medical"
                className="inline-flex items-center gap-2 text-[#0D9488] font-medium hover:text-[#1E3A8A] transition-colors"
              >
                See the test data shape: RCA Medical Library
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* WHY A SYNTHETIC-FIRST VENDOR */}
        <section className="py-20 bg-white" aria-label="Why a synthetic-first vendor">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-on-scroll">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A8A] mb-6 text-balance">
                Why a synthetic-first vendor
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                RCA Extract is built and tested against the same synthetic medical documents we sell as the RCA Medical Library. That gives us:
              </p>
              <ul className="flex flex-col gap-3 mb-6">
                {[
                  'A controlled test set across 40+ document types where ground truth is known by construction.',
                  'A scanned-variant test set for photocopy and JPEG-noise robustness.',
                  'Versioned releases. Each release of RCA Extract is pinned to a generator seed and library version.',
                  'Transparent evaluation. If you want to verify our extraction quality before committing, we can ship you the same documents and you score against the same ground truth.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-700">
                    <CheckCircle size={16} className="text-[#0D9488] mt-1 shrink-0" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-slate-600 leading-relaxed">
                We do not publish blanket accuracy numbers until we have published benchmark methodology and results. If you need a benchmark for a specific document type, contact us.
              </p>
            </div>
          </div>
        </section>

        {/* SNOWFLAKE NATIVE APP */}
        <section className="py-16 bg-slate-50 border-y border-slate-200" aria-label="Snowflake Native App">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="animate-on-scroll">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1E3A8A] mb-4 text-balance">
                  What you get with a Snowflake Native deployment
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  RCA Extract runs inside your Snowflake account. The product inherits the security and audit capabilities of your own Snowflake environment.
                </p>
                <ul className="flex flex-col gap-3">
                  {snowflakeBullets.map((item) => (
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

        {/* PRICING */}
        <section className="py-20 bg-white" aria-label="Pricing">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-on-scroll">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A8A] mb-4 text-balance">
                Pricing
              </h2>
              <p className="text-slate-600 leading-relaxed mb-8 max-w-2xl mx-auto">
                Contact us. Pricing depends on document volume, deployment shape and SLA. Pilot packs are available before commitment.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="flex items-center gap-2 px-6 py-3 bg-[#1E3A8A] text-white rounded-lg font-semibold hover:bg-[#172d6b] transition-colors shadow-sm"
                >
                  Request a quote
                  <ChevronRight size={16} />
                </Link>
                <Link
                  href="/libraries/medical"
                  className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
                >
                  See sample inputs first
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA BAND */}
        <section className="py-20 bg-gradient-to-br from-[#0D9488] to-[#1E3A8A]" aria-label="Call to action">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-on-scroll">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">
              Browse RCA Extract on Snowflake Marketplace
            </h2>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              Listing ID GZSUZU1HJP. Snowflake Native App. Runs in your account.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://app.snowflake.com/marketplace/listing/GZSUZU1HJP/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-3.5 bg-white text-[#1E3A8A] rounded-lg font-semibold hover:bg-white/90 transition-colors shadow-lg"
              >
                Open on Snowflake Marketplace
                <ExternalLink size={16} />
              </a>
              <Link
                href="/contact"
                className="flex items-center gap-2 px-8 py-3.5 bg-white/10 border border-white/30 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors"
              >
                Talk to our team
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
