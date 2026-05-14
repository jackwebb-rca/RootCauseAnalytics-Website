'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import {
  CheckCircle, ArrowRight, AlertTriangle, FileText, ChevronRight, Mail, ScrollText, FileCheck
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

const docTypes = [
  { name: 'Broker submission email', desc: 'Cover note, named attachments, broker signature block', icon: Mail },
  { name: 'Loss run report', desc: 'Last 5 years of claims, per-claim rows, displayed totals, status', icon: FileText },
  { name: 'Statement of values', desc: 'Per-location rows, building, contents and BI values, displayed totals', icon: FileText },
  { name: 'Policy schedule', desc: 'Insurer schedule with limits, deductibles, endorsements', icon: ScrollText },
  { name: 'Certificate of currency', desc: 'Broker-issued confirmation of cover', icon: FileCheck },
  { name: 'Insurance application', desc: 'New business questionnaire', icon: FileText },
  { name: 'FNOL form', desc: 'First notice of loss form', icon: AlertTriangle },
  { name: 'Claim report', desc: 'Incumbent renewal claim narrative', icon: FileText },
]

const redFlagCategories = [
  { name: 'Loss run total mismatch', desc: 'Displayed total disagrees with the sum of the claim rows' },
  { name: 'Statement of values total mismatch', desc: 'Displayed total disagrees with the sum of the location rows' },
  { name: 'Missing attachment', desc: 'The broker email lists a doc that is not in the pack' },
  { name: 'ABN formatting inconsistency', desc: 'Same ABN formatted differently across documents in the same pack' },
  { name: 'Policy number mismatch', desc: 'Certificate of currency disagrees with the policy schedule' },
  { name: 'Location address mismatch', desc: 'Statement of values address disagrees with the policy schedule' },
  { name: 'Claim after policy end', desc: 'A loss date is outside the policy period' },
  { name: 'Currency mismatch', desc: 'A non-AUD currency on a single location row inside an otherwise AUD submission' },
]

const styleProfiles = [
  'broker_formal',
  'broker_modern',
  'broker_email_printout',
  'insurer_legacy_system',
  'underwriting_agency_clean',
  'bordereaux_like',
  'spreadsheet_export',
  'claims_system_export',
]

const pricing = [
  { tier: 'Free preview', scale: '2 packs', price: 'Free', delivery: 'Same day on request' },
  { tier: 'QA Sprint Pack', scale: '10 packs + red flag summary + 30-min handover', price: 'AUD $2,500', delivery: '48 to 72 hours', highlight: true },
  { tier: 'QA library', scale: '25, 100, 500 packs', price: 'On request', delivery: 'Scoped per order' },
  { tier: 'Bulk training library', scale: '5,000+ packs', price: 'On request', delivery: 'Scoped per order' },
  { tier: 'Custom variants', scale: 'Your document types or red flag set', price: 'On request', delivery: 'Scoped per order' },
]

export default function InsuranceLibraryPage() {
  useScrollAnimation()

  return (
    <>
      <Navigation />
      <main id="main-content">
        {/* HERO */}
        <section
          className="relative pt-24 pb-16 bg-gradient-to-br from-[#1E3A8A] to-[#0D9488] overflow-hidden"
          aria-label="Insurance Library hero"
        >
          <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
            <div className="absolute top-10 right-20 w-64 h-64 rounded-full bg-white/30 blur-3xl" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-sm text-white/90 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                Synthetic. Not real broker, insurer or claimant data.
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 text-balance">
                RCA Insurance Library
              </h1>
              <p className="text-xl text-[#CCFBF1] mb-6">
                Synthetic commercial P&amp;C submission packs
              </p>
              <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-2xl">
                Pre-labelled broker submissions for QA, evaluation and training of document extraction pipelines. Built and shipped by Root Cause Analytics.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact?pack=insurance-2-preview"
                  className="flex items-center gap-2 px-6 py-3 bg-white text-[#1E3A8A] rounded-lg font-semibold hover:bg-white/90 transition-colors shadow-lg"
                >
                  Get the free 2-pack preview
                  <ChevronRight size={16} />
                </Link>
                <Link
                  href="/contact?pack=insurance-qa-sprint"
                  className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/30 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors"
                >
                  Order the QA Sprint Pack (AUD $2,500)
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* DOCUMENT TYPES */}
        <section className="py-20 bg-white" aria-label="Document types">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 animate-on-scroll">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A8A] mb-4 text-balance">
                What is in the library
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Each submission pack is a complete broker submission as you would receive it in a real underwriting inbox. Eight document types ship today.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {docTypes.map((d) => {
                const Icon = d.icon
                return (
                  <div key={d.name} className="animate-on-scroll bg-slate-50 border border-slate-200 rounded-xl p-5 hover:border-[#0D9488]/40 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-[#CCFBF1] flex items-center justify-center mb-3">
                      <Icon size={18} className="text-[#0D9488]" />
                    </div>
                    <h3 className="font-semibold text-slate-800 text-sm mb-1">{d.name}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{d.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* RED FLAGS */}
        <section className="py-20 bg-[#1E3A8A]" aria-label="Engineered red flags">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 animate-on-scroll">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">
                Engineered red flags
              </h2>
              <p className="text-white/80 leading-relaxed">
                A subset of packs contain engineered cross-document inconsistencies. Eight categories ship today.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl">
              {redFlagCategories.map((rf) => (
                <div key={rf.name} className="animate-on-scroll bg-white/5 border border-white/15 rounded-xl p-4">
                  <div className="flex items-start gap-2 mb-2">
                    <AlertTriangle size={16} className="text-[#10B981] mt-0.5 shrink-0" />
                    <h3 className="font-semibold text-white text-sm">{rf.name}</h3>
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed ml-6">{rf.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 max-w-3xl mx-auto text-center animate-on-scroll">
              <p className="text-white/80 leading-relaxed text-sm">
                Red flag inventory ships as red_flags_summary.csv with each pack. The CSV includes a where_to_review column pointing to the two documents to compare. This file is the most useful artefact for QA workflows.
              </p>
            </div>
          </div>
        </section>

        {/* BBOX STRUCTURE */}
        <section className="py-20 bg-white" aria-label="Bbox structure">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 animate-on-scroll">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A8A] mb-6 text-balance">
              Bbox structure (a real differentiator)
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Insurance bboxes are more granular than a single document-level box. For loss run reports, bboxes are returned per claim row from claim_rows_json. For statement of values, bboxes are returned per location row from location_rows_json.
            </p>
            <p className="text-slate-600 leading-relaxed">
              A reviewer can click a specific row in the structured ground truth and highlight the exact pixels on the rendered PDF. That makes the Insurance Library useful for vendor bake-offs: every extractor under test gets the same row-level supervision target, not just a document-level one.
            </p>
            <div className="mt-6 bg-slate-50 border border-slate-200 rounded-xl p-5 font-mono text-xs text-slate-700 overflow-x-auto">
              <div className="text-slate-500 mb-2">// Excerpt from bboxes.jsonl</div>
              <div>{`{ "claim_rows_json[0].paid": { "page": 0, "x": 390.4, "y": 366.3, "width": 39, "height": 23.6, "row_index": 0, "sub_key": "paid" } }`}</div>
              <div>{`{ "location_rows_json[2].building_value": { "page": 1, "x": 237.9, "y": 303.3, "width": 37.8, "height": 11.7, "row_index": 2, "sub_key": "building_value" } }`}</div>
            </div>
          </div>
        </section>

        {/* DIVERSITY CONTROLS */}
        <section className="py-16 bg-slate-50 border-y border-slate-200" aria-label="Diversity controls">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 animate-on-scroll">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1E3A8A] mb-4 text-balance">
              Diversity controls
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Each PDF is rendered with a deterministically chosen style profile. Eight profiles ship today:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
              {styleProfiles.map((sp) => (
                <span key={sp} className="text-xs font-mono bg-white border border-slate-200 rounded-md px-3 py-2 text-slate-700 text-center">
                  {sp}
                </span>
              ))}
            </div>
            <p className="text-slate-600 leading-relaxed text-sm">
              Each document type has three named template families that vary header / footer / section ordering without changing field labels or ground truth values. The chosen profile and family are recorded per row in the ground truth.
            </p>
          </div>
        </section>

        {/* PRICING */}
        <section className="py-20 bg-white" aria-label="Pricing">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 animate-on-scroll">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A8A] mb-4 text-balance">
                Pricing
              </h2>
            </div>

            <div className="overflow-x-auto animate-on-scroll">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200">
                    <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">Tier</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">Scale</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">Price</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">Delivery</th>
                  </tr>
                </thead>
                <tbody>
                  {pricing.map((row) => (
                    <tr key={row.tier} className={`border-b border-slate-200 ${row.highlight ? 'bg-[#CCFBF1]/40' : ''}`}>
                      <td className="px-4 py-3 text-sm font-semibold text-slate-800">{row.tier}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{row.scale}</td>
                      <td className={`px-4 py-3 text-sm font-semibold ${row.highlight ? 'text-[#0D9488]' : 'text-slate-700'}`}>{row.price}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{row.delivery}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SYNTHETIC SAFETY */}
        <section className="py-16 bg-slate-50 border-t border-slate-200" aria-label="Synthetic safety">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 animate-on-scroll">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1E3A8A] mb-4 text-balance">
              Synthetic safety
            </h2>
            <p className="text-slate-600 leading-relaxed mb-3">
              Every PDF carries a visible synthetic disclaimer on every page. All broker names, insurer names, insured business names, ABNs, addresses, phone numbers, policy numbers, claim numbers and dollar values are computer-generated and do not refer to any real organisation, broker, insurer or claim.
            </p>
            <p className="text-slate-700 font-medium">
              Not for underwriting, claims handling, accounting, or regulatory use.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-[#0D9488] to-[#1E3A8A]" aria-label="Call to action">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-on-scroll">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">
              Try the free 2-pack preview
            </h2>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              Two complete submission packs, ground truth, bboxes and scanned variants. The pack ships with a five-minute review path.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact?pack=insurance-2-preview"
                className="flex items-center gap-2 px-8 py-3.5 bg-white text-[#1E3A8A] rounded-lg font-semibold hover:bg-white/90 transition-colors shadow-lg"
              >
                Request the preview pack
                <ChevronRight size={16} />
              </Link>
              <Link
                href="/contact?pack=insurance-qa-sprint"
                className="flex items-center gap-2 px-8 py-3.5 bg-white/10 border border-white/30 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors"
              >
                Order the QA Sprint Pack
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
