'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  FileText, Zap, Shield, Clock, TrendingDown, CheckCircle, ArrowRight,
  ExternalLink, Database, Brain, Lock, BarChart3, Layers, ChevronRight
} from 'lucide-react'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts'

// ----- Scroll animation hook -----
function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )
    const els = document.querySelectorAll('.animate-on-scroll')
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

// ----- Stat Counter -----
interface StatCounterProps {
  value: number
  suffix?: string
  prefix?: string
  label: string
  highlight?: boolean
}
function StatCounter({ value, suffix = '', prefix = '', label, highlight = false }: StatCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const animated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true
          let start = 0
          const end = value
          const duration = 1200
          const step = (end / duration) * 16
          const timer = setInterval(() => {
            start += step
            if (start >= end) {
              setCount(end)
              clearInterval(timer)
            } else {
              setCount(Math.floor(start))
            }
          }, 16)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={ref} className="text-center">
      <div className={`text-3xl lg:text-4xl font-bold ${highlight ? 'text-[#10B981]' : 'text-white'}`}>
        {prefix}{count}{suffix}
      </div>
      <div className="text-sm text-white/70 mt-1">{label}</div>
    </div>
  )
}

// ----- Cost comparison chart data -----
const costData = [
  { method: 'Manual Entry', cost: 8.50, fill: '#DC2626' },
  { method: 'Outsourced', cost: 4.20, fill: '#F97316' },
  { method: 'On-Prem OCR', cost: 1.80, fill: '#F59E0B' },
  { method: 'MEDISCAN', cost: 0.10, fill: '#10B981' },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3">
        <p className="font-semibold text-slate-800 text-sm">{label}</p>
        <p className="text-[#0D9488] font-bold">${payload[0].value.toFixed(2)} per page</p>
      </div>
    )
  }
  return null
}

// ----- Benefits -----
const benefits = [
  {
    icon: Brain,
    title: 'AI-Powered Accuracy',
    description: 'Advanced OCR and NLP models trained on healthcare documents deliver 90-99% extraction accuracy on clean, high-quality printed documents.',
    stat: '90-99%',
    statLabel: 'Extraction Accuracy',
    color: '#0D9488',
  },
  {
    icon: TrendingDown,
    title: 'Dramatically Lower Costs',
    description: 'At just $0.10 per page processed, MEDISCAN reduces healthcare document processing costs by up to 80% compared to manual methods.',
    stat: '80%',
    statLabel: 'Cost Reduction',
    color: '#10B981',
    highlight: true,
  },
  {
    icon: Clock,
    title: 'Instant Deployment',
    description: 'Deploy directly from the Snowflake Marketplace with zero infrastructure setup. Start processing documents in minutes, not months.',
    stat: '10 Minutes',
    statLabel: 'Deployment Time',
    color: '#1E3A8A',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'HIPAA compliant and SOC 2 Type II certified. Your data never leaves your Snowflake environment - zero data movement architecture.',
    stat: '100%',
    statLabel: 'Data Stays in Snowflake',
    color: '#1E3A8A',
  },
]

// ----- Features -----
const features = [
  {
    icon: FileText,
    title: 'Intelligent Document Parsing',
    description: 'Automatically classify and extract structured data from discharge summaries, referral letters, pathology reports, and more.',
  },
  {
    icon: Brain,
    title: 'Clinical NLP',
    description: 'Identify medical entities, diagnoses, medications, and procedures using healthcare-specific language models.',
  },
  {
    icon: Database,
    title: 'Native Snowflake Integration',
    description: 'Results land directly in your Snowflake tables. No ETL pipelines, no data movement, no additional infrastructure.',
  },
  {
    icon: Layers,
    title: 'Multi-Format Support',
    description: 'Process PDFs, scanned images, handwritten notes, and structured forms - all through a single unified pipeline.',
  },
  {
    icon: BarChart3,
    title: 'Analytics-Ready Output',
    description: 'Structured output schemas optimised for downstream analytics, reporting, and population health workloads.',
  },
  {
    icon: Lock,
    title: 'HIPAA & SOC 2 Certified',
    description: 'Full audit trails, encryption at rest and in transit, and compliance documentation available upon request.',
  },
]

export default function HomePage() {
  useScrollAnimation()

  return (
    <>
      <Navigation />
      <main id="main-content">
        {/* ===== HERO ===== */}
        <section
          className="relative min-h-screen flex flex-col justify-center bg-gradient-to-br from-[#1E3A8A] via-[#1a3278] to-[#0D9488] overflow-hidden"
          aria-label="Hero section"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
            <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-white/20 blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-[#0D9488]/30 blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
            <div className="max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-sm text-white/90 mb-6 animate-fade-in">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                Available on Snowflake Marketplace
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight text-balance mb-6 animate-fade-in-up">
                Healthcare Document Processing,{' '}
                <span className="text-[#CCFBF1]">Reimagined</span>
              </h1>

              <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl animate-fade-in-up delay-100">
                MEDISCAN uses AI-powered OCR and NLP to transform unstructured medical documents into structured, analytics-ready data - directly within your Snowflake environment. 10 Minute Deployment Time. $0.10 per page.
              </p>

              <div className="flex flex-wrap gap-4 animate-fade-in-up delay-200">
                <a
                  href="https://app.snowflake.com/marketplace"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-white text-[#1E3A8A] rounded-lg font-semibold hover:bg-white/90 transition-colors shadow-lg"
                >
                  Get Started on Snowflake
                  <ExternalLink size={16} />
                </a>
                <Link
                  href="/solution"
                  className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/30 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors"
                >
                  See How It Works
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="relative bg-white/10 backdrop-blur-sm border-t border-white/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <StatCounter value={99} suffix="%" label="Average OCR Accuracy" highlight />
                <StatCounter value={80} suffix="%" label="Cost Reduction" highlight />
                <StatCounter value={10} suffix=" Min" label="Deployment Time" />
                <StatCounter value={100} suffix="%" label="Data Stays in Snowflake" />
              </div>
            </div>
          </div>
        </section>

        {/* ===== TRUST LOGOS ===== */}
        <section className="py-10 bg-slate-50 border-b border-slate-200" aria-label="Trust indicators">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm font-medium text-slate-500 uppercase tracking-wider mb-6">
              Trusted by healthcare organisations across Australia
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8">
              {['HIPAA Compliant', 'SOC 2 Type II', 'Snowflake Native App', 'FHIR Compatible', 'HL7 Ready'].map((badge) => (
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

        {/* ===== BENEFITS ===== */}
        <section className="py-20 bg-white" aria-label="Key benefits">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14 animate-on-scroll">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A8A] mb-4 text-balance">
                Why Healthcare Organisations Choose MEDISCAN
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Built specifically for healthcare data challenges, MEDISCAN combines enterprise-grade accuracy with the simplicity of a cloud-native deployment.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, i) => {
                const Icon = benefit.icon
                return (
                  <div
                    key={benefit.title}
                    className={`animate-on-scroll p-6 rounded-xl border transition-shadow hover:shadow-md ${
                      benefit.highlight
                        ? 'bg-gradient-to-br from-[#CCFBF1] to-[#d1fae5] border-[#0D9488]/30'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${benefit.color}20` }}
                    >
                      <Icon size={22} style={{ color: benefit.color }} />
                    </div>
                    <div
                      className="text-2xl font-bold mb-0.5"
                      style={{ color: benefit.highlight ? '#10B981' : benefit.color }}
                    >
                      {benefit.stat}
                    </div>
                    <div className="text-xs text-slate-500 mb-3">{benefit.statLabel}</div>
                    <h3 className="font-semibold text-slate-800 mb-2">{benefit.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{benefit.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ===== COST SAVINGS SECTION ===== */}
        <section className="py-20 bg-[#1E3A8A]" aria-label="Cost savings">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14 animate-on-scroll">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">
                Reduce Document Processing Costs by{' '}
                <span className="text-[#10B981]">Up to 80%</span>
              </h2>
              <p className="text-white/70 leading-relaxed">
                At $0.10 per page, MEDISCAN delivers a fraction of the cost of manual entry or outsourced processing - with higher accuracy and faster turnaround.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* Chart */}
              <div className="animate-on-scroll bg-white/10 rounded-2xl p-6 border border-white/20">
                <h3 className="text-white font-semibold mb-6 text-lg">Cost Per Page - Processing Methods</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={costData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.15)" />
                    <XAxis
                      dataKey="method"
                      tick={{ fill: 'rgba(255,255,255,0.75)', fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tickFormatter={(v) => `$${v}`}
                      tick={{ fill: 'rgba(255,255,255,0.75)', fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={false} />
                    <Bar dataKey="cost" radius={[6, 6, 0, 0]} stroke="white" strokeWidth={1}>
                      {costData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Savings breakdown cards */}
              <div className="flex flex-col gap-4 animate-on-scroll">
                {[
                  {
                    label: 'Per Page Cost',
                    mediscan: '$0.10',
                    traditional: '$8.50',
                    savings: '99% cheaper',
                    color: '#10B981',
                  },
                  {
                    label: 'Annual Savings (100k pages/yr)',
                    mediscan: '$10,000',
                    traditional: '$850,000',
                    savings: 'Save $840,000',
                    color: '#10B981',
                  },
                  {
                    label: 'Accuracy',
                    mediscan: '90-99%',
                    traditional: '70-85%',
                    savings: 'Higher accuracy',
                    color: '#10B981',
                  },
                  {
                    label: 'Deployment',
                    mediscan: '10 Minutes',
                    traditional: 'Weeks-months',
                    savings: 'Instant start',
                    color: '#0D9488',
                  },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="bg-white/10 border border-white/20 rounded-xl p-4 flex items-center gap-4"
                  >
                    <div className="flex-1">
                      <p className="text-white/60 text-xs mb-1">{row.label}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold" style={{ color: row.color }}>
                          {row.mediscan}
                        </span>
                        <span className="text-white/30 text-sm">vs</span>
                        <span className="text-red-400 line-through text-sm">{row.traditional}</span>
                      </div>
                    </div>
                    <span
                      className="px-3 py-1.5 rounded-full text-xs font-semibold text-white"
                      style={{ backgroundColor: `${row.color}30`, border: `1px solid ${row.color}50` }}
                    >
                      {row.savings}
                    </span>
                  </div>
                ))}

                <a
                  href="https://app.snowflake.com/marketplace"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#10B981] text-white rounded-lg font-semibold hover:bg-[#059669] transition-colors"
                >
                  Start Saving on Snowflake Marketplace
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FEATURES ===== */}
        <section className="py-20 bg-slate-50" aria-label="Features">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14 animate-on-scroll">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A8A] mb-4 text-balance">
                Everything You Need for Healthcare Document Intelligence
              </h2>
              <p className="text-slate-600 leading-relaxed">
                A complete document intelligence platform purpose-built for the complexity and compliance requirements of healthcare data.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, i) => {
                const Icon = feature.icon
                return (
                  <div
                    key={feature.title}
                    className="animate-on-scroll bg-white p-6 rounded-xl border border-slate-200 hover:border-[#0D9488]/40 hover:shadow-md transition-all group"
                    style={{ transitionDelay: `${i * 80}ms` }}
                  >
                    <div className="w-11 h-11 rounded-lg bg-[#CCFBF1] flex items-center justify-center mb-4 group-hover:bg-[#0D9488] transition-colors">
                      <Icon size={20} className="text-[#0D9488] group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-2">{feature.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ===== HOW IT WORKS ===== */}
        <section className="py-20 bg-white" aria-label="How MEDISCAN works">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14 animate-on-scroll">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A8A] mb-4 text-balance">
                From Document to Insight in Minutes
              </h2>
              <p className="text-slate-600 leading-relaxed">
                MEDISCAN's native Snowflake architecture means zero data movement and instant analytics on extracted results.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  step: '01',
                  title: 'Install from Marketplace',
                  description: 'Find MEDISCAN on the Snowflake Marketplace and install with a single click. No infrastructure setup required.',
                },
                {
                  step: '02',
                  title: 'Upload Documents',
                  description: 'Stage your medical documents - PDFs, scans, images - in your Snowflake internal stage or reference external storage.',
                },
                {
                  step: '03',
                  title: 'AI Extraction',
                  description: 'MEDISCAN\'s OCR and NLP models process each document, extracting entities, values, and structured data at 90-99% accuracy.',
                },
                {
                  step: '04',
                  title: 'Query Results',
                  description: 'Extracted data lands in your Snowflake tables immediately. Query, join, and analyse just like any other Snowflake data.',
                },
              ].map((step, i) => (
                <div key={step.step} className="animate-on-scroll relative" style={{ transitionDelay: `${i * 100}ms` }}>
                  {i < 3 && (
                    <div className="hidden md:block absolute top-6 left-[calc(50%+3rem)] w-full h-px bg-gradient-to-r from-[#0D9488] to-transparent" aria-hidden="true" />
                  )}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center hover:border-[#0D9488]/40 transition-colors">
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

        {/* ===== COMPLIANCE SECTION ===== */}
        <section className="py-16 bg-slate-50 border-y border-slate-200" aria-label="Security and compliance">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="animate-on-scroll">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1E3A8A] mb-4 text-balance">
                  Built for Healthcare Compliance
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  MEDISCAN is architected from the ground up to meet the strict security and privacy requirements of healthcare organisations. Your patient data never leaves your Snowflake environment.
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    'HIPAA Business Associate Agreement (BAA) available',
                    'SOC 2 Type II certified infrastructure',
                    'Zero data movement - processing within your Snowflake account',
                    'Full audit trails for all document processing operations',
                    'Encryption at rest and in transit',
                    'Role-based access controls with Snowflake RBAC',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                      <CheckCircle size={16} className="text-[#0D9488] mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="animate-on-scroll grid grid-cols-2 gap-4">
                {[
                  { label: 'HIPAA Compliant', icon: Shield, color: '#0D9488' },
                  { label: 'SOC 2 Type II', icon: Lock, color: '#1E3A8A' },
                  { label: 'FHIR Compatible', icon: FileText, color: '#0D9488' },
                  { label: 'Zero Data Movement', icon: Database, color: '#10B981' },
                ].map(({ label, icon: Icon, color }) => (
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

        {/* ===== CTA BAND ===== */}
        <section
          className="py-20 bg-gradient-to-br from-[#0D9488] to-[#1E3A8A]"
          aria-label="Call to action"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-on-scroll">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">
              Ready to Transform Your Healthcare Document Processing?
            </h2>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              Join healthcare organisations using MEDISCAN to reduce costs, improve accuracy, and accelerate insights from medical documents. 10 Minute Deployment Time from the Snowflake Marketplace.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://app.snowflake.com/marketplace"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-3.5 bg-white text-[#1E3A8A] rounded-lg font-semibold hover:bg-white/90 transition-colors shadow-lg"
              >
                Deploy on Snowflake Marketplace
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
