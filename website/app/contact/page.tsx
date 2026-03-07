'use client'

import { useEffect, useState } from 'react'
import {
  Mail, MapPin, ExternalLink, Send, CheckCircle, ChevronDown, User, Building, MessageSquare
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

const roles = [
  'Clinical Informatics Lead',
  'IT / Data Engineering',
  'Health System Executive',
  'Healthcare Analyst',
  'Vendor / Partner',
  'Other',
]

const enquiryTypes = [
  'General Enquiry',
  'Pricing & Licensing',
  'Technical Support',
  'Deployment Assistance',
  'Partnership Opportunities',
]

interface FormData {
  name: string
  email: string
  organisation: string
  role: string
  enquiryType: string
  message: string
}

export default function ContactPage() {
  useScrollAnimation()

  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    organisation: '',
    role: '',
    enquiryType: 'General Enquiry',
    message: '',
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
        {/* ===== HERO ===== */}
        <section
          className="pt-24 pb-12 bg-gradient-to-br from-[#1E3A8A] to-[#0D9488]"
          aria-label="Contact hero"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 text-balance">
              Get in Touch
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Our Sydney-based team is ready to help you deploy MEDISCAN, answer technical questions, or discuss custom solutions for your organisation.
            </p>
          </div>
        </section>

        {/* ===== CONTACT METHODS ===== */}
        <section className="py-10 bg-white border-b border-slate-200" aria-label="Contact methods">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Email */}
              <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="w-11 h-11 rounded-lg bg-[#CCFBF1] flex items-center justify-center mb-4">
                  <Mail size={20} className="text-[#0D9488]" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-1">Email Enquiries</h3>
                <p className="text-sm text-slate-500 mb-3 leading-relaxed">
                  For general enquiries and partnership discussions.
                </p>
                <a
                  href="mailto:jack.webb@rootcauseanalytics.com.au"
                  className="text-sm font-medium text-[#0D9488] hover:underline break-all"
                >
                  jack.webb@rootcauseanalytics.com.au
                </a>
              </div>

              {/* Snowflake Marketplace - featured */}
              <div className="p-6 bg-gradient-to-br from-[#1E3A8A] to-[#0D9488] rounded-xl">
                <div className="w-11 h-11 rounded-lg bg-white/20 flex items-center justify-center mb-4">
                  <ExternalLink size={20} className="text-white" />
                </div>
                <h3 className="font-semibold text-white mb-1">Snowflake Marketplace</h3>
                <p className="text-sm text-white/70 mb-3 leading-relaxed">
                  Deploy MEDISCAN directly in 10 minutes. No sales process required.
                </p>
                <a
                  href="https://app.snowflake.com/marketplace/listing/GZSUZU1HJP/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-white bg-white/20 hover:bg-white/30 transition-colors px-3 py-1.5 rounded-lg"
                >
                  Open Marketplace
                  <ExternalLink size={13} />
                </a>
              </div>

              {/* Location */}
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

        {/* ===== FORM + INFO ===== */}
        <section className="py-20 bg-slate-50" aria-label="Contact form">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left - info */}
              <div className="animate-on-scroll">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1E3A8A] mb-4 text-balance">
                  Talk to Our Team
                </h2>
                <p className="text-slate-600 leading-relaxed mb-8">
                  Whether you are evaluating MEDISCAN for the first time, need deployment assistance, or want to discuss a custom enterprise solution - our team is here to help.
                </p>

                <div className="flex flex-col gap-5">
                  {[
                    {
                      title: 'Deployment Support',
                      description: 'Get step-by-step guidance on installing and configuring MEDISCAN within your Snowflake environment.',
                    },
                    {
                      title: 'Custom Enterprise Solutions',
                      description: 'Discuss custom model fine-tuning, bespoke output schemas, and volume pricing for large health systems.',
                    },
                    {
                      title: 'Technical Integration',
                      description: 'Connect with our data engineering team for help integrating MEDISCAN output into your existing analytics stack.',
                    },
                    {
                      title: 'Compliance & Security',
                      description: 'Request our HIPAA BAA, SOC 2 Type II documentation, or arrange a security review with our team.',
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
                  <p className="text-sm font-semibold text-slate-700 mb-1">Response Time</p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Our Australian team typically responds within one business day (AEST). For urgent technical issues, email{' '}
                    <a href="mailto:jack.webb@rootcauseanalytics.com.au" className="text-[#0D9488] hover:underline">
                      jack.webb@rootcauseanalytics.com.au
                    </a>{' '}
                    directly.
                  </p>
                </div>
              </div>

              {/* Right - form */}
              <div className="animate-on-scroll">
                {submitted ? (
                  <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm">
                    <div className="w-16 h-16 rounded-full bg-[#CCFBF1] flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={30} className="text-[#0D9488]" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Message Received</h3>
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
                    <h3 className="text-lg font-semibold text-slate-800 mb-6">Send Us a Message</h3>

                    <div className="flex flex-col gap-5">
                      {/* Name + Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">
                            Full Name <span className="text-red-500">*</span>
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
                            Email Address <span className="text-red-500">*</span>
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
                              placeholder="jane@hospital.com.au"
                              className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/20 transition-colors"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Organisation */}
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
                            placeholder="St Vincent's Hospital"
                            className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/20 transition-colors"
                          />
                        </div>
                      </div>

                      {/* Role + Enquiry Type */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="role" className="block text-sm font-medium text-slate-700 mb-1.5">
                            Your Role
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
                            Enquiry Type
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

                      {/* Message */}
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
                            placeholder="Tell us about your use case, document types, or any questions you have..."
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
                            Send Message
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
