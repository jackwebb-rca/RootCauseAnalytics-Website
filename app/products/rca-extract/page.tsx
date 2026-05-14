'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import {
  CheckCircle, ArrowRight, FileText, Database, Layers,
  Shield, Lock, Stethoscope, ChevronRight, Box, Terminal, Cloud
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
  { value: 'Self-hosted', label: 'Docker container' },
  { value: 'Zero', label: 'Data egress' },
  { value: 'Australian', label: 'Healthcare conventions' },
  { value: 'REST API', label: 'PDF in, JSON out' },
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
    icon: Box,
    title: 'Pull the container',
    description: 'Pull the RCA Extract image from a private registry, signed and versioned per release. Runs on any Docker-compatible host. AMD64 and ARM64.',
  },
  {
    icon: Terminal,
    title: 'Run with a license key',
    description: 'docker run with a license env var and a volume mount for input PDFs. Health-checks via /healthz. The container exposes a REST API on a port you choose.',
  },
  {
    icon: FileText,
    title: 'POST a PDF, get JSON',
    description: 'POST /extract with a PDF body. Get back the structured fields plus bounding boxes for the labeled fields. Same schema as the RCA Medical Library.',
  },
  {
    icon: Database,
    title: 'Land where you want',
    description: 'Write results to your warehouse, your EMR, your S3 bucket, your Postgres. The container does extraction. You own the data path.',
  },
]

const deploymentBullets = [
  'Runs entirely inside your cloud or on-prem. Patient data never leaves your environment.',
  'Customer-managed compute. You pay your cloud bill, not ours.',
  'No external API calls during extraction. No third-party data processors involved.',
  'Inherits your existing RBAC, audit and network policies.',
  'Encryption at rest and in transit, provided by your infrastructure.',
]

const deploymentTiles = [
  { label: 'Runs in your cloud or on-prem', icon: Shield, color: '#0D9488' },
  { label: 'No third-party processors', icon: Lock, color: '#1E3A8A' },
  { label: 'FHIR-aligned output', icon: FileText, color: '#0D9488' },
  { label: 'Zero data egress', icon: Database, color: '#10B981' },
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
                Self-hosted Docker container
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 text-balance">
                RCA Extract
              </h1>
              <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-2xl">
                Self-hosted document extraction for healthcare PDFs. Ships as a Docker container that runs in your cloud or on-prem. POST a PDF, get back structured fields plus bounding boxes. Zero data egress.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact?service=rca-extract"
                  className="flex items-center gap-2 px-6 py-3 bg-white text-[#1E3A8A] rounded-lg font-semibold hover:bg-white/90 transition-colors shadow-lg"
                >
                  Talk to us about deployment
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/libraries/medical"
                  className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/30 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors"
                >
                  See the supported document types
                  <ChevronRight size={16} />
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
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight">{s.value}</div>
                  <div className="text-xs sm:text-sm text-white/70 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW THE CONTAINER WORKS */}
        <section className="py-20 bg-white" aria-label="How the container works">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14 animate-on-scroll">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A8A] mb-4 text-balance">
                How it deploys
              </h2>
              <p className="text-slate-600 leading-relaxed">
                A single container image. Your infrastructure. Your data stays where it is.
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

        {/* DEPLOYMENT MODEL */}
        <section className="py-16 bg-slate-50 border-y border-slate-200" aria-label="Deployment model">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="animate-on-scroll">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1E3A8A] mb-4 text-balance">
                  What you get with a self-hosted deployment
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  RCA Extract runs as a Docker container inside your own cloud account, your own Kubernetes cluster, or on-prem on any Docker-compatible host. Your infrastructure, your compute bill, your data residency story.
                </p>
                <ul className="flex flex-col gap-3">
                  {deploymentBullets.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                      <CheckCircle size={16} className="text-[#0D9488] mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 p-4 bg-white border border-slate-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Cloud size={16} className="text-[#1E3A8A] mt-0.5 shrink-0" />
                    <p className="text-xs text-slate-600 leading-relaxed">
                      <span className="font-semibold text-slate-700">Other deployment shapes</span> (managed API for teams without their own infrastructure, air-gapped builds for high-security environments) are available on request as part of an enterprise plan. Contact us to scope.
                    </p>
                  </div>
                </div>
              </div>

              <div className="animate-on-scroll grid grid-cols-2 gap-4">
                {deploymentTiles.map(({ label, icon: Icon, color }) => (
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
                Per-seat or per-month, not per-page. You control the compute. Contact us with your scope: volume, document types, deployment shape and SLA. A pilot pack from the RCA Medical Library is the recommended first step.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact?service=rca-extract"
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
              Talk to us about deployment
            </h2>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              Self-hosted container in your cloud, on-prem, or air-gapped. Managed API available on enterprise plans.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact?service=rca-extract"
                className="flex items-center gap-2 px-8 py-3.5 bg-white text-[#1E3A8A] rounded-lg font-semibold hover:bg-white/90 transition-colors shadow-lg"
              >
                Talk to us about deployment
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/libraries/medical"
                className="flex items-center gap-2 px-8 py-3.5 bg-white/10 border border-white/30 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors"
              >
                See the test data first
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
