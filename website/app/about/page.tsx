'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import {
  Heart, Globe, Shield, Users, CheckCircle, ExternalLink, ArrowRight, Target, Lightbulb, Lock
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
    description: 'We chose a zero data movement architecture not as a feature - but as a foundational design principle. Your patients\' data stays where it belongs.',
  },
  {
    icon: Target,
    title: 'Accuracy Over Speed',
    description: 'Healthcare data demands precision. We continuously validate our models against real-world clinical documents to maintain 90-99% extraction accuracy.',
  },
  {
    icon: Lightbulb,
    title: 'Simplicity at Scale',
    description: 'Enterprise healthcare data challenges shouldn\'t require enterprise-scale implementation projects. Our 10 Minute Deployment Time reflects that belief.',
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
  'Clinical NLP with ICD-10, CPT, and SNOMED entity extraction',
  'Snowflake Native App architecture for zero data movement',
  'FHIR-aligned output schemas for interoperability',
  'HIPAA compliance and SOC 2 Type II certification',
  'Volume processing for large health system workloads',
  'Australian healthcare data standards support',
]

export default function AboutPage() {
  useScrollAnimation()

  return (
    <>
      <Navigation />
      <main id="main-content">
        {/* ===== HERO ===== */}
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
                About MEDISCAN
              </h1>
              <p className="text-lg text-white/80 leading-relaxed max-w-2xl">
                MEDISCAN is built by Root Cause Analytics - a healthcare data consultancy based in Sydney, Australia. We created MEDISCAN to solve a specific, persistent problem in Australian and global healthcare: the enormous cost and complexity of digitising and extracting value from unstructured medical documents.
              </p>
            </div>
          </div>
        </section>

        {/* ===== MISSION ===== */}
        <section className="py-20 bg-white" aria-label="Our mission">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-on-scroll">
                <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A8A] mb-6 text-balance">
                  Making Healthcare Data Work
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Australian healthcare organisations process millions of paper and digital documents each year - discharge summaries, referral letters, pathology reports, consent forms. The information locked inside these documents has enormous clinical and operational value, yet most of it remains inaccessible because extracting it manually is too slow, too expensive, and too error-prone.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  We built MEDISCAN to change that. By deploying AI-powered OCR and clinical NLP as a Snowflake Native App, we eliminated the infrastructure barriers, the data movement risks, and the long implementation timelines that have historically made document intelligence impractical for healthcare.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  At $0.10 per page with a 10 Minute Deployment Time, MEDISCAN makes high-accuracy document processing accessible to health systems of every size - from regional hospitals to national networks.
                </p>
              </div>

              <div className="animate-on-scroll grid grid-cols-1 gap-4">
                {[
                  { label: 'Pricing', value: '$0.10 per page', color: '#10B981', description: 'Transparent, usage-based pricing with no setup fees' },
                  { label: 'Accuracy', value: '90-99%', color: '#10B981', description: 'On clean, high-quality printed healthcare documents' },
                  { label: 'Deployment', value: '10 Minutes', color: '#0D9488', description: 'From Snowflake Marketplace to live processing' },
                  { label: 'Data Location', value: 'Your Snowflake', color: '#1E3A8A', description: 'Zero data movement - fully in your environment' },
                ].map(({ label, value, color, description }) => (
                  <div key={label} className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="text-2xl font-bold shrink-0 w-28" style={{ color }}>{value}</div>
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

        {/* ===== VALUES ===== */}
        <section className="py-20 bg-slate-50" aria-label="Our values">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14 animate-on-scroll">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A8A] mb-4 text-balance">
                What We Stand For
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

        {/* ===== TEAM ===== */}
        <section className="py-20 bg-white" aria-label="Our team">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14 animate-on-scroll">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A8A] mb-4 text-balance">
                Built by Root Cause Analytics
              </h2>
              <p className="text-slate-600 leading-relaxed">
                MEDISCAN is developed and maintained by Root Cause Analytics, a specialist healthcare data and analytics consultancy based in Sydney, Australia.
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

        {/* ===== CAPABILITIES ===== */}
        <section className="py-20 bg-slate-50" aria-label="Technical capabilities">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-on-scroll">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1E3A8A] mb-4 text-balance">
                  Technical Capabilities
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  MEDISCAN combines state-of-the-art OCR with healthcare-specific NLP models, all deployed as a Snowflake Native App for seamless integration with your existing data platform.
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
                  <h3 className="text-lg font-bold text-[#1E3A8A] mb-6">Compliance & Certification</h3>
                  <div className="flex flex-col gap-4">
                    {[
                      { label: 'HIPAA Compliant', detail: 'BAA available on request', icon: Shield },
                      { label: 'SOC 2 Type II Certified', detail: 'Documentation available to Enterprise customers', icon: Lock },
                      { label: 'Snowflake Verified App', detail: 'Listed on the Snowflake Marketplace', icon: CheckCircle },
                      { label: 'Australian Privacy Act', detail: 'Compliant with APP and state health privacy laws', icon: Globe },
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

        {/* ===== CTA ===== */}
        <section className="py-16 bg-gradient-to-br from-[#0D9488] to-[#1E3A8A]" aria-label="CTA">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-on-scroll">
            <h2 className="text-3xl font-bold text-white mb-4 text-balance">
              Ready to Get Started?
            </h2>
            <p className="text-white/80 mb-8 leading-relaxed">
              Deploy MEDISCAN from the Snowflake Marketplace in 10 minutes, or reach out to our Sydney team to discuss your organisation's specific requirements.
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
                Contact Us
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
