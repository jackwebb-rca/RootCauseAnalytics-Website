'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import {
  CheckCircle, X, ExternalLink, ArrowRight, FileText, Brain, Database,
  Zap, Shield, BarChart3, Layers, ChevronRight, Info
} from 'lucide-react'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip
} from 'recharts'

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

const radarData = [
  { subject: 'Accuracy', MEDISCAN: 97, Traditional: 72 },
  { subject: 'Speed', MEDISCAN: 95, Traditional: 40 },
  { subject: 'Cost', MEDISCAN: 92, Traditional: 20 },
  { subject: 'Compliance', MEDISCAN: 98, Traditional: 60 },
  { subject: 'Scalability', MEDISCAN: 95, Traditional: 35 },
  { subject: 'Integration', MEDISCAN: 99, Traditional: 45 },
]

const comparisonRows = [
  {
    feature: 'Cost per page',
    mediscan: '$0.10 per page',
    traditional: '$4.20 - $7.00 per page',
    highlight: true,
  },
  {
    feature: 'Extraction Accuracy',
    mediscan: '97-99% (clean documents)',
    traditional: '70-85% (legacy OCR)',
    highlight: true,
  },
  {
    feature: 'Deployment Time',
    mediscan: '10 Minute Deployment Time',
    traditional: '4-12 weeks',
    highlight: false,
  },
  {
    feature: 'Data Movement',
    mediscan: 'Zero - stays in Snowflake',
    traditional: 'Multiple system transfers',
    highlight: false,
  },
  {
    feature: 'HIPAA Compliance',
    mediscan: true,
    traditional: 'Varies',
    highlight: false,
  },
  {
    feature: 'Volume Discounts',
    mediscan: 'Available 10k+ pages/month',
    traditional: 'Rarely available',
    highlight: false,
  },
  {
    feature: 'Infrastructure Required',
    mediscan: 'None - Snowflake native',
    traditional: 'Servers, VMs, agents',
    highlight: false,
  },
  {
    feature: 'Ongoing Maintenance',
    mediscan: 'Fully managed by MEDISCAN',
    traditional: 'In-house IT required',
    highlight: false,
  },
]

const architectureSteps = [
  {
    icon: Layers,
    title: 'Document Ingestion',
    description: 'Documents are staged directly in Snowflake internal or external stages. Supports PDF, TIFF, PNG, JPEG, and multi-page formats.',
  },
  {
    icon: Brain,
    title: 'AI Processing Pipeline',
    description: 'MEDISCAN\'s OCR engine and clinical NLP models run as Snowflake Native App functions, processing pages at 97-99% accuracy on clean, high-quality printed documents.',
  },
  {
    icon: Database,
    title: 'Structured Output',
    description: 'Extracted entities, values, and metadata land directly in Snowflake tables using pre-defined healthcare schemas (FHIR-aligned output available).',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reporting',
    description: 'Query extracted data with standard SQL. Connect to Tableau, Power BI, or any Snowflake-compatible BI tool for immediate insights.',
  },
]

const pricingTiers = [
  {
    name: 'Starter',
    price: '$0.10',
    unit: 'per page',
    description: 'Perfect for teams getting started with document digitisation.',
    features: [
      'Up to 5,000 pages per month',
      'Standard OCR + NLP extraction',
      'Core entity recognition',
      'Snowflake native deployment',
      'Email support',
    ],
    cta: 'View on Snowflake Marketplace',
    highlight: false,
  },
  {
    name: 'Professional',
    price: '$0.10',
    unit: 'per page',
    description: 'For growing healthcare organisations with higher volume needs.',
    features: [
      'Up to 50,000 pages per month',
      'Advanced clinical NLP models',
      'Custom entity schemas',
      'Priority processing queue',
      'FHIR-aligned output',
      'SLA-backed response times',
    ],
    cta: 'View on Snowflake Marketplace',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    unit: 'volume pricing',
    description: 'Tailored solutions for large health systems and networks.',
    features: [
      'Unlimited pages per month',
      'Custom model fine-tuning',
      'Dedicated support engineer',
      'Custom SLA agreements',
      'BAA included',
      'Volume discounts for 10k+ pages/month',
    ],
    cta: 'View on Snowflake Marketplace',
    highlight: false,
  },
]

export default function SolutionPage() {
  useScrollAnimation()

  return (
    <>
      <Navigation />
      <main id="main-content">
        {/* ===== HERO ===== */}
        <section
          className="relative pt-24 pb-16 bg-gradient-to-br from-[#1E3A8A] to-[#0D9488] overflow-hidden"
          aria-label="Solution hero"
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
                The MEDISCAN Solution
              </h1>
              <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-2xl">
                A Snowflake-native AI document intelligence platform purpose-built for healthcare. Deploy in 10 minutes, process at $0.10 per page, and keep all data within your existing Snowflake environment.
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
                  Talk to Our Team
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ===== KEY STATS ===== */}
        <section className="py-10 bg-[#0f172a] border-b border-slate-800" aria-label="Key statistics">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: '$0.10', label: 'Per page processed', green: true },
                { value: '97-99%', label: 'Extraction accuracy', green: true },
                { value: '10 Min', label: 'Deployment time', green: false },
                { value: '80%', label: 'Average cost reduction', green: true },
              ].map(({ value, label, green }) => (
                <div key={label} className="text-center">
                  <div className={`text-3xl font-bold mb-1 ${green ? 'text-[#10B981]' : 'text-white'}`}>
                    {value}
                  </div>
                  <div className="text-sm text-slate-400">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== ARCHITECTURE ===== */}
        <section className="py-20 bg-white" aria-label="Technical architecture">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14 animate-on-scroll">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A8A] mb-4 text-balance">
                Zero Data Movement Architecture
              </h2>
              <p className="text-slate-600 leading-relaxed">
                MEDISCAN runs entirely within your Snowflake account. With a 10 Minute Deployment Time, you can start processing medical documents without moving data outside your secure environment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {architectureSteps.map((step, i) => {
                const Icon = step.icon
                return (
                  <div
                    key={step.title}
                    className="animate-on-scroll relative bg-slate-50 border border-slate-200 rounded-xl p-6 hover:border-[#0D9488]/40 hover:shadow-md transition-all"
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-[#CCFBF1] flex items-center justify-center">
                        <Icon size={18} className="text-[#0D9488]" />
                      </div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Step {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ===== COMPARISON ===== */}
        <section className="py-20 bg-slate-50" aria-label="MEDISCAN vs traditional solutions">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14 animate-on-scroll">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A8A] mb-4 text-balance">
                MEDISCAN vs. Traditional Solutions
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Compare how MEDISCAN stacks up against manual entry, outsourced processing, and on-premise OCR systems.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              {/* Comparison table */}
              <div className="animate-on-scroll overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="grid grid-cols-3 bg-[#1E3A8A] text-white text-sm font-semibold">
                  <div className="p-4">Feature</div>
                  <div className="p-4 bg-[#CCFBF1] text-[#0D9488] text-center border-x border-[#0D9488]/30">
                    MEDISCAN
                  </div>
                  <div className="p-4 text-center">Traditional</div>
                </div>

                {comparisonRows.map((row, i) => (
                  <div
                    key={row.feature}
                    className={`grid grid-cols-3 text-sm border-t border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}
                  >
                    <div className="p-4 font-medium text-slate-700">{row.feature}</div>
                    <div className={`p-4 text-center border-x border-[#0D9488]/20 ${row.highlight ? 'bg-[#CCFBF1]' : 'bg-[#CCFBF1]/30'}`}>
                      {typeof row.mediscan === 'boolean' ? (
                        <CheckCircle size={16} className="text-[#0D9488] mx-auto" />
                      ) : (
                        <span className={`font-semibold ${row.highlight ? 'text-[#0D9488]' : 'text-[#0D9488]'}`}>
                          {row.mediscan}
                        </span>
                      )}
                    </div>
                    <div className="p-4 text-center text-slate-500">
                      {typeof row.traditional === 'boolean' ? (
                        row.traditional ? (
                          <CheckCircle size={16} className="text-slate-400 mx-auto" />
                        ) : (
                          <X size={16} className="text-red-400 mx-auto" />
                        )
                      ) : (
                        <span className="text-red-500">{row.traditional}</span>
                      )}
                    </div>
                  </div>
                ))}

                {/* Summary callout */}
                <div className="p-4 bg-gradient-to-r from-[#CCFBF1] to-[#d1fae5] border-t border-[#0D9488]/30">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-700">Average Cost Reduction</span>
                    <span className="text-2xl font-bold text-[#0D9488] border border-[#0D9488] rounded-lg px-3 py-1">
                      80% Savings
                    </span>
                  </div>
                </div>
              </div>

              {/* Radar chart */}
              <div className="animate-on-scroll bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Performance Comparison</h3>
                <p className="text-sm text-slate-500 mb-6">Relative performance scores (higher is better)</p>
                <ResponsiveContainer width="100%" height={320}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fill: '#64748b', fontSize: 12 }}
                    />
                    <Radar
                      name="MEDISCAN"
                      dataKey="MEDISCAN"
                      stroke="#0D9488"
                      fill="#0D9488"
                      fillOpacity={0.25}
                      strokeWidth={2}
                    />
                    <Radar
                      name="Traditional"
                      dataKey="Traditional"
                      stroke="#DC2626"
                      fill="#DC2626"
                      fillOpacity={0.15}
                      strokeWidth={2}
                    />
                    <Tooltip
                      cursor={false}
                      contentStyle={{
                        background: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        fontSize: '12px',
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
                <div className="flex items-center justify-center gap-6 mt-2">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <div className="w-3 h-3 rounded-full bg-[#0D9488]" />
                    MEDISCAN
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <div className="w-3 h-3 rounded-full bg-[#DC2626]" />
                    Traditional Solutions
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== OCR ACCURACY DETAIL ===== */}
        <section className="py-16 bg-white" aria-label="OCR accuracy details">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-[#CCFBF1] to-[#d1fae5] border border-[#0D9488]/30 rounded-2xl p-8 animate-on-scroll">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Brain size={22} className="text-[#0D9488]" />
                    <h2 className="text-2xl font-bold text-[#1E3A8A]">AI-Powered OCR & NLP</h2>
                  </div>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    MEDISCAN achieves 99% accuracy on clean, high-quality printed documents. Accuracy ranges from 97-99% depending on document quality and type, in line with industry benchmarks for AI-based OCR systems.
                  </p>
                  <div className="flex items-start gap-2 text-sm text-slate-600 bg-white/70 rounded-lg p-3 border border-[#0D9488]/20">
                    <Info size={15} className="text-[#0D9488] mt-0.5 shrink-0" />
                    <span>
                      Accuracy is highest on typed, printed text. Handwritten notes and low-resolution scans may achieve lower extraction rates. Contact our team for document-specific benchmarks.
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Printed Documents', range: '99%', color: '#10B981' },
                    { label: 'Mixed Quality', range: '97-99%', color: '#0D9488' },
                    { label: 'Clinical NLP Entities', range: '95%+', color: '#0D9488' },
                    { label: 'Structured Forms', range: '98%+', color: '#10B981' },
                  ].map(({ label, range, color }) => (
                    <div key={label} className="bg-white rounded-xl p-4 border border-[#0D9488]/20 text-center">
                      <div className="text-2xl font-bold mb-1" style={{ color }}>{range}</div>
                      <div className="text-xs text-slate-600">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== PRICING ===== */}
        <section className="py-20 bg-slate-50" aria-label="Pricing">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14 animate-on-scroll">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A8A] mb-4 text-balance">
                Simple, Transparent Pricing
              </h2>
              <p className="text-slate-600 leading-relaxed">
                $0.10 per page processed. No setup fees, no hidden costs, no infrastructure to manage. Volume discounts available for organisations processing 10,000+ pages per month.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pricingTiers.map((tier, i) => (
                <div
                  key={tier.name}
                  className={`animate-on-scroll rounded-2xl border p-8 flex flex-col ${
                    tier.highlight
                      ? 'bg-gradient-to-br from-[#1E3A8A] to-[#0D9488] border-transparent text-white shadow-xl scale-105'
                      : 'bg-white border-slate-200'
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  {tier.highlight && (
                    <div className="inline-flex self-start mb-4 px-3 py-1 bg-[#10B981] text-white rounded-full text-xs font-semibold">
                      Most Popular
                    </div>
                  )}
                  <h3 className={`text-xl font-bold mb-1 ${tier.highlight ? 'text-white' : 'text-slate-800'}`}>
                    {tier.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className={`text-4xl font-bold ${tier.highlight ? 'text-[#CCFBF1]' : 'text-[#10B981]'}`}>
                      {tier.price}
                    </span>
                    <span className={`text-sm ${tier.highlight ? 'text-white/70' : 'text-slate-500'}`}>
                      {tier.unit}
                    </span>
                  </div>
                  <p className={`text-sm mb-6 leading-relaxed ${tier.highlight ? 'text-white/80' : 'text-slate-600'}`}>
                    {tier.description}
                  </p>
                  <ul className="flex-1 flex flex-col gap-2.5 mb-8">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <CheckCircle
                          size={15}
                          className={`mt-0.5 shrink-0 ${tier.highlight ? 'text-[#CCFBF1]' : 'text-[#0D9488]'}`}
                        />
                        <span className={tier.highlight ? 'text-white/90' : 'text-slate-700'}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="https://app.snowflake.com/marketplace/listing/GZSUZU1HJP/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 w-full py-3 rounded-lg font-semibold text-sm transition-colors ${
                      tier.highlight
                        ? 'bg-white text-[#1E3A8A] hover:bg-white/90'
                        : 'bg-[#0D9488] text-white hover:bg-[#0B7D73]'
                    }`}
                  >
                    {tier.cta}
                    <ExternalLink size={14} />
                  </a>
                </div>
              ))}
            </div>

            <p className="text-center text-sm text-slate-500 mt-8">
              All plans include HIPAA compliance, SOC 2 Type II certification, and zero data movement architecture.
            </p>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="py-16 bg-[#1E3A8A]" aria-label="Get started CTA">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-on-scroll">
            <h2 className="text-3xl font-bold text-white mb-4 text-balance">
              Start Processing Medical Documents Today
            </h2>
            <p className="text-white/70 mb-8 leading-relaxed">
              Deploy MEDISCAN from the Snowflake Marketplace in 10 minutes. No infrastructure setup, no data migration, no risk.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://app.snowflake.com/marketplace/listing/GZSUZU1HJP/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-3.5 bg-[#10B981] text-white rounded-lg font-semibold hover:bg-[#059669] transition-colors"
              >
                View on Snowflake Marketplace
                <ExternalLink size={16} />
              </a>
              <Link
                href="/contact"
                className="flex items-center gap-2 px-8 py-3.5 bg-white/10 border border-white/30 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors"
              >
                Talk to Our Team
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
