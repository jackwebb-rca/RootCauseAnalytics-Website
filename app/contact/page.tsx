'use client'

import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Mail, MapPin, Send, CheckCircle, ChevronDown, User, Building, MessageSquare, Library
} from 'lucide-react'
import { useSearchParams } from 'next/navigation'
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

const roles = [
  'Data / ML Engineering',
  'Clinical Informatics Lead',
  'Procurement / Evaluation',
  'Underwriting / Claims',
  'Health System Executive',
  'Vendor / Partner',
  'Other',
]

const enquiryTypes = [
  'General Enquiry',
  'Free preview pack',
  'Insurance QA Sprint Pack (AUD $2,500)',
  'Insurance Library (larger volume)',
  'Medical Library (larger volume)',
  'RCA Extract deployment',
  'Custom library',
  'Pricing & Licensing',
  'Technical Support',
  'Partnership',
]

interface FormData {
  name: string
  email: string
  organisation: string
  role: string
  enquiryType: string
  message: string
  pack: string
}

function packParamToEnquiry(pack: string | null, service: string | null): string {
  if (pack === 'insurance-qa-sprint') return 'Insurance QA Sprint Pack (AUD $2,500)'
  if (pack === 'insurance-2-preview') return 'Free preview pack'
  if (pack === 'medical-review') return 'Free preview pack'
  if (pack === 'preview') return 'Free preview pack'
  if (pack === 'insurance-procurement') return 'Insurance Library (larger volume)'
  if (pack === 'medical-pilot') return 'Medical Library (larger volume)'
  if (service === 'custom-library' || service === 'custom-pack') return 'Custom library'
  return 'General Enquiry'
}

function ContactPageInner() {
  useScrollAnimation()
  const searchParams = useSearchParams()
  const packParam = searchParams?.get('pack') ?? null
  const serviceParam = searchParams?.get('service') ?? null

  const initialEnquiry = packParamToEnquiry(packParam, serviceParam)
  const packLabel = packParam ?? serviceParam ?? ''

  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    organisation: '',
    role: '',
    enquiryType: initialEnquiry,
    message: '',
    pack: packLabel,
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          company: form.organisation,
          email: form.email,
          message: form.message,
          enquiryType: form.enquiryType,
          pack: form.pack,
          role: form.role,
        }),
      })
      if (!res.ok) throw new Error('Failed')
      setSubmitted(true)
    } catch {
      alert('Something went wrong sending your message. Please email jack.webb@rootcauseanalytics.com.au directly.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Navigation />
      <main id="main-content">
        {/* HERO */}
        <section
          className="pt-24 pb-12 bg-gradient-to-br from-[#1E3A8A] to-[#0D9488]"
          aria-label="Contact hero"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 text-balance">
              Get in touch
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Our Sydney-based team handles enquiries for RCA Extract deployments and the RCA training document libraries. Use the form below or email us directly.
            </p>
          </div>
        </section>

        {/* CONTACT METHODS */}
        <section className="py-10 bg-white border-b border-slate-200" aria-label="Contact methods">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="w-11 h-11 rounded-lg bg-[#CCFBF1] flex items-center justify-center mb-4">
                  <Mail size={20} className="text-[#0D9488]" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-1">Email enquiries</h3>
                <p className="text-sm text-slate-500 mb-3 leading-relaxed">
                  For general enquiries, library orders, and partnership discussions.
                </p>
                <a
                  href="mailto:jack.webb@rootcauseanalytics.com.au"
                  className="text-sm font-medium text-[#0D9488] hover:underline break-all"
                >
                  jack.webb@rootcauseanalytics.com.au
                </a>
              </div>

              <div className="p-6 bg-gradient-to-br from-[#1E3A8A] to-[#0D9488] rounded-xl">
                <div className="w-11 h-11 rounded-lg bg-white/20 flex items-center justify-center mb-4">
                  <Send size={20} className="text-white" />
                </div>
                <h3 className="font-semibold text-white mb-1">Free preview pack</h3>
                <p className="text-sm text-white/70 mb-3 leading-relaxed">
                  Same-day delivery on request. Two complete insurance packs or 25 to 35 medical documents, with ground truth and scanned variants.
                </p>
                <Link
                  href="/contact?pack=preview"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-white bg-white/20 hover:bg-white/30 transition-colors px-3 py-1.5 rounded-lg"
                >
                  Request a preview pack
                </Link>
              </div>

              <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="w-11 h-11 rounded-lg bg-[#CCFBF1] flex items-center justify-center mb-4">
                  <MapPin size={20} className="text-[#0D9488]" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-1">Location</h3>
                <p className="text-sm text-slate-500 mb-3 leading-relaxed">
                  Sydney, NSW, Australia
                </p>
                <p className="text-sm text-slate-600">
                  Technical support:{' '}
                  <a
                    href="mailto:jack.webb@rootcauseanalytics.com.au"
                    className="text-[#0D9488] hover:underline"
                  >
                    jack.webb@rootcauseanalytics.com.au
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FORM + INFO */}
        <section className="py-20 bg-slate-50" aria-label="Contact form">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="animate-on-scroll">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1E3A8A] mb-4 text-balance">
                  Talk to our team
                </h2>
                <p className="text-slate-600 leading-relaxed mb-8">
                  Whether you are scoping a self-hosted RCA Extract deployment, requesting a free preview pack from one of the synthetic training document libraries, or building a custom library, our Sydney-based team handles it. Use the form, mention the pack or service in the message, and we will respond within one business day (AEST).
                </p>

                <div className="flex flex-col gap-5">
                  {[
                    {
                      title: 'Preview packs',
                      description: 'Free 2-pack insurance preview, or a 25 to 35 document medical review pack. Same day on request.',
                    },
                    {
                      title: 'Insurance QA Sprint Pack',
                      description: 'AUD $2,500 fixed. 10 packs with engineered red flags, ground truth and bboxes. 48 to 72 hour delivery. 30-minute handover call.',
                    },
                    {
                      title: 'RCA Extract deployment',
                      description: 'Self-hosted Docker container that runs in your cloud or on-prem. Talk to us about license, schema mapping, and evaluation against the RCA Medical Library.',
                    },
                    {
                      title: 'Custom libraries',
                      description: 'Your document types. Your field schema. Your style profiles. Scoped per order.',
                    },
                  ].map(({ title, description }) => (
                    <div key={title} className="flex items-start gap-3">
                      <div className="mt-1 w-5 h-5 rounded-full bg-[#CCFBF1] flex items-center justify-center shrink-0">
                        <CheckCircle size={12} className="text-[#0D9488]" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800 text-sm">{title}</div>
                        <div className="text-sm text-slate-600 mt-0.5 leading-relaxed">{description}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-5 bg-white border border-slate-200 rounded-xl">
                  <p className="text-sm font-semibold text-slate-700 mb-1">Response time</p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Our Australian team typically responds within one business day (AEST). For urgent technical issues, email{' '}
                    <a href="mailto:jack.webb@rootcauseanalytics.com.au" className="text-[#0D9488] hover:underline">
                      jack.webb@rootcauseanalytics.com.au
                    </a>{' '}
                    directly.
                  </p>
                </div>
              </div>

              <div className="animate-on-scroll">
                {submitted ? (
                  <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm">
                    <div className="w-16 h-16 rounded-full bg-[#CCFBF1] flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={30} className="text-[#0D9488]" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Message received</h3>
                    <p className="text-slate-600 leading-relaxed mb-6">
                      Thank you for your enquiry. Our Australian team will review your message and respond within one business day (AEST).
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false)
                        setForm({
                          name: '',
                          email: '',
                          organisation: '',
                          role: '',
                          enquiryType: 'General Enquiry',
                          message: '',
                          pack: '',
                        })
                      }}
                      className="text-sm text-[#0D9488] hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm"
                    noValidate
                  >
                    <h3 className="text-lg font-semibold text-slate-800 mb-6">Send us a message</h3>

                    {form.pack && (
                      <div className="mb-5 px-4 py-3 bg-[#CCFBF1]/60 border border-[#0D9488]/30 rounded-lg flex items-start gap-2">
                        <Library size={16} className="text-[#0D9488] mt-0.5 shrink-0" />
                        <p className="text-xs text-slate-700 leading-relaxed">
                          Enquiry pre-filled: <strong>{form.enquiryType}</strong>. Add any details below.
                        </p>
                      </div>
                    )}

                    <div className="flex flex-col gap-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">
                            Full name <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                              id="name"
                              name="name"
                              type="text"
                              required
                              value={form.name}
                              onChange={handleChange}
                              placeholder="Jane Smith"
                              className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/20 transition-colors"
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
                            Work email <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                              id="email"
                              name="email"
                              type="email"
                              required
                              value={form.email}
                              onChange={handleChange}
                              placeholder="jane@example.com.au"
                              className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/20 transition-colors"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="organisation" className="block text-sm font-medium text-slate-700 mb-1.5">
                          Organisation
                        </label>
                        <div className="relative">
                          <Building size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            id="organisation"
                            name="organisation"
                            type="text"
                            value={form.organisation}
                            onChange={handleChange}
                            placeholder="Example Pty Ltd"
                            className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/20 transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="role" className="block text-sm font-medium text-slate-700 mb-1.5">
                            Your role
                          </label>
                          <div className="relative">
                            <select
                              id="role"
                              name="role"
                              value={form.role}
                              onChange={handleChange}
                              className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm appearance-none focus:outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/20 transition-colors bg-white"
                            >
                              <option value="">Select role...</option>
                              {roles.map((r) => (
                                <option key={r} value={r}>{r}</option>
                              ))}
                            </select>
                            <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="enquiryType" className="block text-sm font-medium text-slate-700 mb-1.5">
                            Enquiry type
                          </label>
                          <div className="relative">
                            <select
                              id="enquiryType"
                              name="enquiryType"
                              value={form.enquiryType}
                              onChange={handleChange}
                              className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm appearance-none focus:outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/20 transition-colors bg-white"
                            >
                              {enquiryTypes.map((t) => (
                                <option key={t} value={t}>{t}</option>
                              ))}
                            </select>
                            <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1.5">
                          Message <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <MessageSquare size={15} className="absolute left-3 top-3 text-slate-400" />
                          <textarea
                            id="message"
                            name="message"
                            required
                            rows={4}
                            value={form.message}
                            onChange={handleChange}
                            placeholder="Tell us about your use case, document types, volume estimate, or any questions you have..."
                            className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/20 transition-colors resize-none"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-[#0D9488] to-[#0B7D73] text-white rounded-lg font-semibold hover:from-[#0B7D73] hover:to-[#0a6b62] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {submitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send message
                            <Send size={16} />
                          </>
                        )}
                      </button>

                      <p className="text-xs text-slate-400 text-center">
                        By submitting this form you agree to our Privacy Policy. We will respond within one business day (AEST).
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default function ContactPage() {
  return (
    <Suspense fallback={
      <>
        <Navigation />
        <main id="main-content">
          <section className="pt-24 pb-12 bg-gradient-to-br from-[#1E3A8A] to-[#0D9488]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 text-balance">
                Get in touch
              </h1>
            </div>
          </section>
        </main>
        <Footer />
      </>
    }>
      <ContactPageInner />
    </Suspense>
  )
}
