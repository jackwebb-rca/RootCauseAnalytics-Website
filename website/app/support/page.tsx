'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Mail, ExternalLink, ChevronDown, ChevronUp, Book, LifeBuoy,
  Zap, Shield, DollarSign, Database, ArrowRight, CheckCircle
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

interface FaqItem {
  question: string
  answer: string
}

interface FaqCategory {
  category: string
  icon: React.ElementType
  items: FaqItem[]
}

const faqs: FaqCategory[] = [
  {
    category: 'Getting Started',
    icon: Zap,
    items: [
      {
        question: 'How do I deploy MEDISCAN?',
        answer: 'MEDISCAN is available on the Snowflake Marketplace. Simply search for "MEDISCAN" in the marketplace, click Install, and follow the guided setup. The entire process takes approximately 10 minutes - no infrastructure provisioning or data migration required.',
      },
      {
        question: 'What do I need to get started?',
        answer: 'You need an active Snowflake account with a supported edition (Business Critical or Enterprise recommended for HIPAA workloads). MEDISCAN installs as a Snowflake Native App, so your data never leaves your existing environment.',
      },
      {
        question: 'Which Snowflake editions are supported?',
        answer: 'MEDISCAN supports Snowflake Standard, Enterprise, and Business Critical editions. Business Critical is strongly recommended for healthcare organisations requiring HIPAA compliance and enhanced security features.',
      },
    ],
  },
  {
    category: 'Document Processing',
    icon: Book,
    items: [
      {
        question: 'What document types does MEDISCAN support?',
        answer: 'MEDISCAN supports PDF, TIFF, PNG, JPEG, and BMP formats. Multi-page PDFs are fully supported. Documents can be staged in Snowflake internal stages or referenced from external cloud storage (S3, Azure Blob, GCS).',
      },
      {
        question: 'What OCR accuracy can I expect?',
        answer: 'MEDISCAN achieves 99% accuracy on clean, high-quality printed documents. Overall accuracy ranges from 97-99% depending on document quality and type. Handwritten notes and low-resolution scans may achieve lower extraction rates. Contact our team for document-specific benchmarks relevant to your use case.',
      },
      {
        question: 'What clinical entities can MEDISCAN extract?',
        answer: 'MEDISCAN extracts a wide range of clinical entities including diagnoses (ICD-10 codes), medications (with dosage and frequency), procedures (CPT codes), lab results, patient demographics, dates and timestamps, provider names, and free-text clinical notes. Custom entity schemas are available on Professional and Enterprise plans.',
      },
      {
        question: 'Does MEDISCAN support handwritten notes?',
        answer: 'Handwritten text extraction is supported but accuracy varies significantly based on handwriting legibility. We recommend using MEDISCAN\'s printed document pipeline for clinical workflows where possible, and reviewing handwritten extraction results as part of your quality assurance process.',
      },
    ],
  },
  {
    category: 'Pricing & Billing',
    icon: DollarSign,
    items: [
      {
        question: 'How is MEDISCAN priced?',
        answer: 'MEDISCAN is priced at $0.10 per page processed, with volume discounts for organisations processing 10,000+ pages per month. There are no setup fees, minimum monthly commitments, or charges for pages that fail processing.',
      },
      {
        question: 'Are there volume discounts?',
        answer: 'Yes. Organisations processing 10,000+ pages per month are eligible for volume discounts. Contact jack.webb@rootcauseanalytics.com.au for a custom pricing proposal tailored to your anticipated volume.',
      },
      {
        question: 'How is billing handled?',
        answer: 'MEDISCAN billing is managed through the Snowflake Marketplace. Charges appear on your regular Snowflake invoice - there is no separate billing relationship or credit card required.',
      },
    ],
  },
  {
    category: 'Security & Compliance',
    icon: Shield,
    items: [
      {
        question: 'Is MEDISCAN HIPAA compliant?',
        answer: 'Yes. MEDISCAN is designed to support HIPAA-compliant deployments. A Business Associate Agreement (BAA) is available upon request. All document processing occurs within your Snowflake environment using a zero data movement architecture - patient data never leaves your account.',
      },
      {
        question: 'Is MEDISCAN SOC 2 Type II certified?',
        answer: 'Yes. MEDISCAN\'s infrastructure is SOC 2 Type II certified. Certification documentation is available to Enterprise customers upon request under NDA.',
      },
      {
        question: 'Does MEDISCAN store or access our documents?',
        answer: 'No. MEDISCAN operates as a Snowflake Native App within your account. Documents and extracted data remain entirely within your Snowflake environment. Root Cause Analytics does not have access to your documents or processed data.',
      },
    ],
  },
  {
    category: 'Technical Integration',
    icon: Database,
    items: [
      {
        question: 'What does the output data schema look like?',
        answer: 'MEDISCAN produces structured output tables in your Snowflake schema. Output includes: document metadata, extracted entity tables (diagnoses, medications, procedures), confidence scores per extraction, processing timestamps, and audit logs. FHIR-aligned output schemas are available on Professional and Enterprise plans.',
      },
      {
        question: 'Can I connect MEDISCAN output to my BI tools?',
        answer: 'Yes. Since output lands directly in Snowflake tables, you can connect any Snowflake-compatible BI tool - including Tableau, Power BI, Looker, and Sigma. No additional data movement or ETL is required.',
      },
    ],
  },
]

function FaqAccordion({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left py-4 flex items-start justify-between gap-4 group"
        aria-expanded={open}
      >
        <span className="font-medium text-slate-800 group-hover:text-[#0D9488] transition-colors text-sm leading-relaxed">
          {item.question}
        </span>
        <span className="shrink-0 mt-0.5 text-slate-400 group-hover:text-[#0D9488] transition-colors">
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </button>
      {open && (
        <div className="pb-4 text-sm text-slate-600 leading-relaxed pr-8">
          {item.answer}
        </div>
      )}
    </div>
  )
}

export default function SupportPage() {
  useScrollAnimation()
  const [activeCategory, setActiveCategory] = useState('Getting Started')

  const currentFaqs = faqs.find((f) => f.category === activeCategory)

  return (
    <>
      <Navigation />
      <main id="main-content">
        {/* ===== HERO ===== */}
        <section
          className="pt-24 pb-12 bg-gradient-to-br from-[#1E3A8A] to-[#0D9488]"
          aria-label="Support hero"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 text-balance">
              Support Centre
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Everything you need to get MEDISCAN deployed, configured, and running smoothly. Browse our FAQ or reach out to our team in Sydney.
            </p>
          </div>
        </section>

        {/* ===== QUICK LINKS ===== */}
        <section className="py-10 bg-white border-b border-slate-200" aria-label="Quick support links">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <a
                href="mailto:jack.webb@rootcauseanalytics.com.au"
                className="flex items-center gap-4 p-5 bg-slate-50 border border-slate-200 rounded-xl hover:border-[#0D9488]/40 hover:shadow-sm transition-all group"
              >
                <div className="w-11 h-11 rounded-lg bg-[#CCFBF1] flex items-center justify-center shrink-0">
                  <Mail size={20} className="text-[#0D9488]" />
                </div>
                <div>
                  <div className="font-semibold text-slate-800 group-hover:text-[#0D9488] transition-colors text-sm">Email Support</div>
                  <div className="text-xs text-slate-500 mt-0.5">jack.webb@rootcauseanalytics.com.au</div>
                </div>
              </a>

              <a
                href="https://app.snowflake.com/marketplace/listing/GZSUZU1HJP/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 bg-gradient-to-br from-[#1E3A8A] to-[#0D9488] rounded-xl hover:shadow-md transition-all group"
              >
                <div className="w-11 h-11 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                  <ExternalLink size={20} className="text-white" />
                </div>
                <div>
                  <div className="font-semibold text-white text-sm flex items-center gap-1">
                    Deploy on Marketplace
                    <ExternalLink size={12} />
                  </div>
                  <div className="text-xs text-white/70 mt-0.5">Snowflake Marketplace</div>
                </div>
              </a>

              <Link
                href="/contact"
                className="flex items-center gap-4 p-5 bg-slate-50 border border-slate-200 rounded-xl hover:border-[#0D9488]/40 hover:shadow-sm transition-all group"
              >
                <div className="w-11 h-11 rounded-lg bg-[#CCFBF1] flex items-center justify-center shrink-0">
                  <LifeBuoy size={20} className="text-[#0D9488]" />
                </div>
                <div>
                  <div className="font-semibold text-slate-800 group-hover:text-[#0D9488] transition-colors text-sm">Talk to an Expert</div>
                  <div className="text-xs text-slate-500 mt-0.5">Sydney-based team</div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section id="faq" className="py-20 bg-slate-50" aria-label="Frequently asked questions">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 animate-on-scroll">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A8A] mb-4 text-balance">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Browse answers to our most common questions, or reach out to our Sydney team for personalised support.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Category sidebar */}
              <div className="animate-on-scroll">
                <nav aria-label="FAQ categories" className="flex flex-col gap-2">
                  {faqs.map((cat) => {
                    const Icon = cat.icon
                    const isActive = activeCategory === cat.category
                    return (
                      <button
                        key={cat.category}
                        onClick={() => setActiveCategory(cat.category)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-left transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-[#0D9488] to-[#0B7D73] text-white shadow-sm'
                            : 'bg-white border border-slate-200 text-slate-700 hover:border-[#0D9488]/40 hover:text-[#0D9488]'
                        }`}
                      >
                        <Icon size={16} />
                        {cat.category}
                      </button>
                    )
                  })}
                </nav>
              </div>

              {/* FAQ content */}
              <div className="lg:col-span-3 animate-on-scroll">
                {currentFaqs && (
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                      {(() => {
                        const Icon = currentFaqs.icon
                        return <Icon size={18} className="text-[#0D9488]" />
                      })()}
                      {currentFaqs.category}
                    </h3>
                    {currentFaqs.items.map((item) => (
                      <FaqAccordion key={item.question} item={item} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="py-16 bg-[#1E3A8A]" aria-label="Deploy CTA">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-on-scroll">
            <h2 className="text-3xl font-bold text-white mb-4 text-balance">
              Ready to Deploy MEDISCAN?
            </h2>
            <p className="text-white/70 mb-8 leading-relaxed">
              Get started in 10 minutes from the Snowflake Marketplace. Our Sydney-based team is available to support your deployment and onboarding.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://app.snowflake.com/marketplace/listing/GZSUZU1HJP/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-3.5 bg-[#10B981] text-white rounded-lg font-semibold hover:bg-[#059669] transition-colors"
              >
                Deploy on Snowflake Marketplace
                <ExternalLink size={16} />
              </a>
              <Link
                href="/contact"
                className="flex items-center gap-2 px-8 py-3.5 bg-white/10 border border-white/30 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors"
              >
                Contact Support
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
