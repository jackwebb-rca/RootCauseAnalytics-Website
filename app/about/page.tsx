'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import {
  Heart, Globe, Shield, Users, CheckCircle, ExternalLink, ArrowRight, Target, Lightbulb, Lock, Library
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

const values = [
  {
    icon: Heart,
    title: 'Patient-First Design',
    description: 'Every feature is designed with the downstream impact on patient care in mind. Better data quality leads to better clinical decisions.',
  },
  {
    icon: Shield,
    title: 'Security by Architecture',
    description: 'We chose a zero data movement architecture not as a feature - but as a foundational design principle. Patient data stays where it belongs.',
  },
  {
    icon: Target,
    title: 'Evidence Over Marketing',
    description: 'We publish per-document-type evaluation alongside benchmark releases rather than headline accuracy numbers. Numbers without methodology do not help buyers.',
  },
  {
    icon: Lightbulb,
    title: 'Simplicity at Scale',
    description: 'Enterprise data challenges should not require enterprise-scale implementation projects. Our Snowflake Native deployment shape reflects that belief.',
  },
]

const teamMembers = [
  {
    name: 'Jack Webb',
    role: 'Founder & Lead Data Engineer',
    bio: 'Healthcare data specialist with extensive experience in clinical informatics and data platform architecture across Australian health systems.',
    email: 'jack.webb@rootcauseanalytics.com.au',
  },
]

const capabilities = [
  'Healthcare-specific OCR fine-tuned on clinical documents',
  'Snowflake Native App architecture for zero data movement',
  'FHIR-aligned output schemas for interoperability',
  'Synthetic training document libraries shipped with ground truth and bounding boxes',
  'Deterministic generators, reproducible by seed',
  'AU-specific document conventions: NSW postcodes, Medicare format, provider postnominals',
]

const propositionTiles = [
  { label: 'Deployment', value: 'Snowflake Native', color: '#0D9488', description: 'Runs inside your existing Snowflake account' },
  { label: 'Data Location', value: 'Your account', color: '#1E3A8A', description: 'Zero data movement - extraction inside your environment' },
  { label: 'Synthetic data', value: 'Built-in', color: '#10B981', description: 'Sister product is the library we test against' },
  { label: 'Disclaimer', value: 'On every page', color: '#0D9488', description: 'Library outputs are safe to share inside your company' },
]

export default function AboutPage() {
  useScrollAnimation()

  return (
    <>
      <Navigation />
      <main id="main-content">
        {/* HERO */}
        <section
          className="relative pt-24 pb-16 bg-gradient-to-br from-[#1E3A8A] via-[#1a3278] to-[#0D9488] overflow-hidden"
          aria-label="About hero"
        >
          <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
            <div className="absolute top-20 right-20 w-80 h-80 rounded-full bg-white/20 blur-3xl" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-sm text-white/90 mb-6">
                <Globe size={14} />
                Sydney, NSW, Australia
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 text-balance">
                About Root Cause Analytics
              </h1>
              <p className="text-lg text-white/80 leading-relaxed max-w-2xl">
                Root Cause Analytics builds document extraction products and pre-labelled synthetic document libraries for teams working with healthcare, insurance and other privacy-sensitive documents. RCA Extract (formerly MEDISCAN) is our hosted extraction product, available on the Snowflake Marketplace. The RCA libraries are the test data the product is built against, sold separately.
              </p>
            </div>
          </div>
        </section>

        {/* MISSION */}
        <section className="py-20 bg-white" aria-label="Our mission">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-on-scroll">
                <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A8A] mb-6 text-balance">
                  Making document data work
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Healthcare and insurance organisations process millions of paper and digital documents each year. Discharge summaries, referral letters, pathology reports, broker submissions, policy schedules. The information locked inside these documents has enormous operational value, yet most of it remains inaccessible because extracting it manually is too slow, too expensive, and too error-prone.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  We built RCA Extract to change that for healthcare PDFs, and we built the RCA Medical and Insurance libraries to make sure RCA Extract (and other extraction pipelines) have somewhere safe to be tested.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  RCA Extract runs as a Snowflake Native App inside the customer's Snowflake account. The libraries ship as direct downloads with ground truth, bounding boxes and scanned variants for every document.{' '}
                  <Link href="/products/rca-extract" className="text-[#0D9488] underline underline-offset-2 hover:text-[#1E3A8A] transition-colors font-medium">
                    See how RCA Extract works
                  </Link>
                </p>
              </div>

              <div className="animate-on-scroll grid grid-cols-1 gap-4">
                {propositionTiles.map(({ label, value, color, description }) => (
                  <div key={label} className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="text-xl font-bold shrink-0 w-32" style={{ color }}>{value}</div>
                    <div>
                      <div className="font-semibold text-slate-800 text-sm">{label}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* VALUES */}
        <section className="py-20 bg-slate-50" aria-label="Our values">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14 animate-on-scroll">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A8A] mb-4 text-balance">
                What we stand for
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Our values guide every product decision, from architecture choices to pricing models.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((value, i) => {
                const Icon = value.icon
                return (
                  <div
                    key={value.title}
                    className="animate-on-scroll bg-white border border-slate-200 rounded-xl p-6 hover:border-[#0D9488]/40 hover:shadow-md transition-all"
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    <div className="w-11 h-11 rounded-lg bg-[#CCFBF1] flex items-center justify-center mb-4">
                      <Icon size={20} className="text-[#0D9488]" />
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-2">{value.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{value.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section className="py-20 bg-white" aria-label="Our team">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14 animate-on-scroll">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A8A] mb-4 text-balance">
                Founder-led
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Root Cause Analytics is a specialist document AI and healthcare data company based in Sydney, Australia.
              </p>
            </div>

            <div className="max-w-md mx-auto">
              {teamMembers.map((member) => (
                <div
                  key={member.name}
                  className="animate-on-scroll bg-gradient-to-br from-[#1E3A8A] to-[#0D9488] rounded-2xl p-8 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                    <Users size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-[#CCFBF1] text-sm font-medium mb-4">{member.role}</p>
                  <p className="text-white/80 text-sm leading-relaxed mb-5">{member.bio}</p>
                  <a
                    href={`mailto:${member.email}`}
                    className="inline-flex items-center gap-1.5 text-sm text-white bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-lg"
                  >
                    {member.email}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section className="py-20 bg-slate-50" aria-label="Technical capabilities">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-on-scroll">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1E3A8A] mb-4 text-balance">
                  Technical capabilities
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  The product line combines healthcare-specific OCR and NLP, deployed as a Snowflake Native App, alongside synthetic training document libraries used internally for validation and sold externally for QA.
                </p>
                <ul className="flex flex-col gap-3">
                  {capabilities.map((cap) => (
                    <li key={cap} className="flex items-start gap-3 text-sm text-slate-700">
                      <CheckCircle size={15} className="text-[#0D9488] mt-0.5 shrink-0" />
                      {cap}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="animate-on-scroll">
                <div className="bg-gradient-to-br from-[#CCFBF1] to-[#d1fae5] border border-[#0D9488]/30 rounded-2xl p-8">
                  <h3 className="text-lg font-bold text-[#1E3A8A] mb-6">Security & Synthetic Safety</h3>
                  <div className="flex flex-col gap-4">
                    {[
                      { label: 'RCA Extract runs in Your Snowflake Account', detail: 'No data egress, no third-party processors', icon: Shield },
                      { label: 'Snowflake Native App', detail: 'Listing ID GZSUZU1HJP', icon: Lock },
                      { label: 'Customer-managed Access Controls', detail: 'Uses your RBAC and audit logs', icon: CheckCircle },
                      { label: 'Library outputs are synthetic only', detail: 'Visible disclaimer on every page', icon: Library },
                    ].map(({ label, detail, icon: Icon }) => (
                      <div key={label} className="flex items-start gap-3 bg-white/70 rounded-xl p-4 border border-[#0D9488]/20">
                        <div className="w-8 h-8 rounded-lg bg-[#0D9488] flex items-center justify-center shrink-0">
                          <Icon size={15} className="text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800 text-sm">{label}</div>
                          <div className="text-xs text-slate-500 mt-0.5">{detail}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-br from-[#0D9488] to-[#1E3A8A]" aria-label="CTA">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-on-scroll">
            <h2 className="text-3xl font-bold text-white mb-4 text-balance">
              Talk to the team
            </h2>
            <p className="text-white/80 mb-8 leading-relaxed">
              Browse RCA Extract on the Snowflake Marketplace, request a free preview pack from one of the libraries, or reach out to our Sydney team to discuss your specific requirements.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://app.snowflake.com/marketplace/listing/GZSUZU1HJP/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-3.5 bg-white text-[#1E3A8A] rounded-lg font-semibold hover:bg-white/90 transition-colors shadow-lg"
              >
                Browse on Snowflake Marketplace
                <ExternalLink size={16} />
              </a>
              <Link
                href="/contact"
                className="flex items-center gap-2 px-8 py-3.5 bg-white/10 border border-white/30 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors"
              >
                Contact us
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
