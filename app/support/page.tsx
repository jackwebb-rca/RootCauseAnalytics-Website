'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Mail, ExternalLink, ChevronDown, ChevronUp, Book, LifeBuoy,
  Zap, Shield, DollarSign, Database, ArrowRight, Library
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
        question: 'How do I deploy RCA Extract?',
        answer: 'RCA Extract is available on the Snowflake Marketplace (listing GZSUZU1HJP). Search for "RCA Extract" or "MEDISCAN" in the Marketplace, click Install, and follow the guided setup. RCA Extract installs as a Snowflake Native App, so your data stays in your existing environment.',
      },
      {
        question: 'What do I need to get started?',
        answer: 'You need an active Snowflake account with a supported edition. RCA Extract installs as a Snowflake Native App, so your data stays in your existing environment.',
      },
      {
        question: 'Which Snowflake editions are supported?',
        answer: "RCA Extract supports Snowflake Standard, Enterprise, and Business Critical editions. Choose the edition and access controls that match your organisation's security requirements.",
      },
      {
        question: 'What was MEDISCAN renamed to?',
        answer: 'MEDISCAN is now RCA Extract. The product itself is unchanged: same Snowflake Native App, same Marketplace listing (GZSUZU1HJP), same supported document types. The rename reflects the broader Root Cause Analytics product line, which now includes synthetic training document libraries (RCA Insurance Library, RCA Medical Library) alongside the extraction product.',
      },
    ],
  },
  {
    category: 'Document Processing',
    icon: Book,
    items: [
      {
        question: 'What document types does RCA Extract support?',
        answer: 'RCA Extract supports PDF, TIFF, PNG, JPEG, and BMP formats. Multi-page PDFs are fully supported. Documents can be staged in Snowflake internal stages or referenced from external cloud storage (S3, Azure Blob, GCS).',
      },
      {
        question: 'What extraction quality can I expect?',
        answer: 'Extraction quality depends on document type, document quality and scanning. We publish per-document-type evaluation alongside benchmark releases. Contact our team for document-specific benchmarks relevant to your use case. If you want to verify quality before committing, we can ship you a free preview pack from the RCA Medical Library so you can score extraction against the same ground truth we test against.',
      },
      {
        question: 'What clinical entities does RCA Extract extract?',
        answer: 'RCA Extract returns structured fields per document type. Discharge summaries return demographics, registrar, consultant, principal diagnosis, principal ICD, admission and discharge dates, length of stay, medications and follow-up. ED assessments return triage category, presenting complaint, disposition and timings. Referral letters, imaging reports and pathology reports return their respective per-type fields. Bounding boxes for labeled fields are returned alongside the extracted values. See the RCA Extract product page for the full schema per document type.',
      },
      {
        question: 'Does RCA Extract support handwritten notes?',
        answer: 'Handwritten text extraction is supported but quality varies significantly based on handwriting legibility. We recommend using the printed document pipeline for clinical workflows where possible, and reviewing handwritten extraction results as part of your quality assurance process.',
      },
    ],
  },
  {
    category: 'Pricing & Billing',
    icon: DollarSign,
    items: [
      {
        question: 'How is RCA Extract priced?',
        answer: 'Pricing depends on volume, deployment shape and SLA. Contact jack.webb@rootcauseanalytics.com.au for a quote. Pilot packs are available before commitment.',
      },
      {
        question: 'Are there volume discounts?',
        answer: 'Yes. Larger volumes attract volume pricing. Contact jack.webb@rootcauseanalytics.com.au for a custom proposal tailored to your anticipated volume and deployment shape.',
      },
      {
        question: 'How is billing handled?',
        answer: 'RCA Extract billing is managed through the Snowflake Marketplace. Charges appear on your regular Snowflake invoice. There is no separate billing relationship or credit card required.',
      },
      {
        question: 'How are the synthetic libraries priced?',
        answer: 'The Insurance 2-pack preview is free. The Insurance QA Sprint Pack ships at AUD $2,500 fixed price with 48 to 72 hour delivery. Medical review packs are free for qualified prospects. Larger libraries and custom variants are priced per scope. See the per-library pricing tables on the Libraries pages for the full menu.',
      },
    ],
  },
  {
    category: 'Security & Data Residency',
    icon: Shield,
    items: [
      {
        question: 'Does RCA Extract keep data inside Snowflake?',
        answer: 'RCA Extract runs as a Snowflake Native App inside your own Snowflake account. Patient data never leaves your environment, and your existing Snowflake security controls, audit logs and access policies apply to every document processed.',
      },
      {
        question: 'What security controls apply?',
        answer: 'RCA Extract inherits the security controls, audit logging and access policies in your Snowflake account. It runs inside your environment and does not introduce third-party data processors for document handling.',
      },
      {
        question: 'Does Root Cause Analytics store or access our documents?',
        answer: 'No. RCA Extract operates as a Snowflake Native App within your account. Documents and extracted data remain entirely within your Snowflake environment. Root Cause Analytics does not have access to your documents or processed data.',
      },
      {
        question: 'Are the synthetic libraries derived from real customer data?',
        answer: 'No. The RCA libraries are generated by a deterministic Python pipeline from curated case files and phrase banks. No real customer or patient data is held, transmitted or stored anywhere in the generator or the libraries. Every PDF carries a visible synthetic disclaimer on every page.',
      },
    ],
  },
  {
    category: 'Synthetic Libraries',
    icon: Library,
    items: [
      {
        question: 'How are the synthetic libraries delivered?',
        answer: 'Libraries are delivered as direct downloads (zip files containing PDFs, ground truth CSVs, JSONLs, bounding box files, and manifests). No third-party file-share processor is involved unless the customer requests one and a data agreement is in place.',
      },
      {
        question: 'Can I use the libraries for training a commercial product?',
        answer: 'Yes. The libraries are licensed for use in training, evaluating and QA-ing document AI models, and for internal demonstration and procurement evaluation. They are not licensed for clinical care, claims handling, underwriting, accounting, or regulatory use. See license_summary.md inside each pack for the full terms.',
      },
      {
        question: 'Are the libraries reproducible?',
        answer: 'Yes. Each library is generated from a deterministic Python pipeline with a fixed random seed. The same seed produces identical PDFs every time. Each release of the library is pinned to a generator seed and version.',
      },
    ],
  },
  {
    category: 'Technical Integration',
    icon: Database,
    items: [
      {
        question: 'What does the output data schema look like?',
        answer: 'RCA Extract produces structured output tables in your Snowflake schema. Output includes document metadata, extracted entity tables (per document type), bounding box coordinates per labeled field, processing timestamps and audit logs. FHIR-aligned output schemas are available for the document types where the FHIR resource model applies.',
      },
      {
        question: 'Can I connect RCA Extract output to my BI tools?',
        answer: 'Yes. Since output lands directly in Snowflake tables, you can connect any Snowflake-compatible BI tool, including Tableau, Power BI, Looker and Sigma. No additional data movement or ETL is required.',
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
        {/* HERO */}
        <section
          className="pt-24 pb-12 bg-gradient-to-br from-[#1E3A8A] to-[#0D9488]"
          aria-label="Support hero"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 text-balance">
              Support Centre
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Answers to common questions about RCA Extract on Snowflake and the RCA training document libraries. Browse the FAQ or reach out to our team in Sydney.
            </p>
          </div>
        </section>

        {/* QUICK LINKS */}
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
                    Open on Snowflake Marketplace
                    <ExternalLink size={12} />
                  </div>
                  <div className="text-xs text-white/70 mt-0.5">Listing GZSUZU1HJP</div>
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
                  <div className="font-semibold text-slate-800 group-hover:text-[#0D9488] transition-colors text-sm">Talk to an expert</div>
                  <div className="text-xs text-slate-500 mt-0.5">Sydney-based team</div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 bg-slate-50" aria-label="Frequently asked questions">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 animate-on-scroll">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A8A] mb-4 text-balance">
                Frequently asked questions
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Browse answers to the most common questions, or reach out to our Sydney team for personalised support.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
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

        {/* CTA */}
        <section className="py-16 bg-[#1E3A8A]" aria-label="CTA">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-on-scroll">
            <h2 className="text-3xl font-bold text-white mb-4 text-balance">
              Ready to deploy RCA Extract?
            </h2>
            <p className="text-white/70 mb-8 leading-relaxed">
              Browse the listing on the Snowflake Marketplace, or talk to our Sydney-based team to discuss your specific deployment.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://app.snowflake.com/marketplace/listing/GZSUZU1HJP/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-3.5 bg-[#10B981] text-white rounded-lg font-semibold hover:bg-[#059669] transition-colors"
              >
                Open on Snowflake Marketplace
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
