'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  CheckCircle, ArrowRight, ChevronRight, Stethoscope, Microscope, Heart, FileText, Hash
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

const docGroups = [
  {
    title: 'Hospital and ED',
    icon: Heart,
    docs: [
      { name: 'Discharge summary', extract: true },
      { name: 'ED assessment', extract: true },
      { name: 'Admission checklist' },
      { name: 'ICU daily plan' },
      { name: 'Anaesthetic record' },
      { name: 'Fluid order' },
      { name: 'Progress note' },
      { name: 'Patient safety checklist' },
      { name: 'Transfusion compatibility report' },
      { name: 'Haemodialysis flow sheet' },
      { name: 'Infusion pump checklist' },
      { name: 'Medication administration record' },
    ],
  },
  {
    title: 'GP and primary care',
    icon: Stethoscope,
    docs: [
      { name: 'Referral letter', extract: true },
      { name: 'Medical certificate' },
      { name: 'Prescription' },
      { name: 'Mental health care plan' },
      { name: 'Mental health assessment' },
      { name: 'Advance care directive' },
      { name: 'Home care plan' },
      { name: 'Treatment plan' },
      { name: 'External correspondence' },
    ],
  },
  {
    title: 'Pathology, imaging, specialist',
    icon: Microscope,
    docs: [
      { name: 'Pathology request' },
      { name: 'Pathology report', extract: true },
      { name: 'Imaging request' },
      { name: 'Imaging report', extract: true },
      { name: 'Bone density report' },
      { name: 'ECG (12-lead and rhythm)' },
      { name: 'Echo report' },
      { name: 'Vascular ultrasound report' },
      { name: 'Pacemaker report' },
      { name: 'Ophthalmology assessment' },
      { name: 'Audiology assessment' },
      { name: 'Speech pathology assessment' },
      { name: 'Physiotherapy assessment' },
      { name: 'Endoscopy report' },
      { name: 'HADS questionnaire' },
    ],
  },
]

const auRealism = [
  'Patient names use AU-common first names and surnames drawn from broad surname pools (not a single ethnicity).',
  'Addresses use NSW postcodes that match the stated suburb. Postcode-to-suburb mapping is sourced from public ABS data and is computer-generated; no real residential address is referenced.',
  'Medicare numbers follow the displayed AU format (10 digits plus IRN) but are computer-generated and do not validate against the real Medicare system.',
  'Provider numbers use the TRN-PROV-XXXXX format with the synthetic TRN prefix. The TRN prefix is deliberate so any pipeline that ingests these documents can filter out synthetic provider numbers.',
  'Clinician postnominals use AU specialty fellowships: FRACGP, FRACP, FRCPA, FRANZCR, FACEM, FRACS.',
  'Hospitals carry NSW Local Health District labels (synthetic, not real LHD names).',
  'Phone numbers use AU area codes.',
]

const styleProfiles = [
  'nsw_hospital_letter',
  'gp_clinic_letter',
  'pathology_lis_report',
  'imaging_ris_report',
  'ed_system_printout',
  'discharge_summary_emr',
  'specialist_clinic_letter',
  'faxed_external_correspondence',
]

type PricingRow = { tier: string; size: string; bestFor: string; price: string; delivery: string; highlight?: boolean }

const pricing: PricingRow[] = [
  {
    tier: 'Free sample',
    size: '25 to 35 representative documents',
    bestFor: 'First look. Review the schema, AU conventions and disclaimer.',
    price: 'Free',
    delivery: 'Same-day',
    highlight: true,
  },
  {
    tier: 'Pilot pack',
    size: '100 to 200 documents scoped to your specialty',
    bestFor: 'Internal pilot. Specialty-focused review (discharge, pathology, imaging, etc.).',
    price: 'On request',
    delivery: '1 to 2 weeks',
  },
  {
    tier: 'Production library',
    size: '500 to 1,000 documents across 40+ types',
    bestFor: 'Production regression suite. Internal QA at scale.',
    price: 'On request',
    delivery: '2 to 3 weeks',
  },
  {
    tier: 'Training library',
    size: '5,000+ documents with train / val / test splits',
    bestFor: 'ML model fine-tuning at scale. Clinical-NLP training.',
    price: 'On request',
    delivery: '4 to 6 weeks',
  },
]

export default function MedicalLibraryPage() {
  useScrollAnimation()

  return (
    <>
      <Navigation />
      <main id="main-content">
        {/* HERO */}
        <section
          className="relative pt-24 pb-16 bg-gradient-to-br from-[#1E3A8A] to-[#0D9488] overflow-hidden"
          aria-label="Medical Library hero"
        >
          <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
            <div className="absolute top-10 right-20 w-64 h-64 rounded-full bg-white/30 blur-3xl" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-sm text-white/90 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                Synthetic. Not real patient data.
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 text-balance">
                RCA Medical Library
              </h1>
              <p className="text-xl text-[#CCFBF1] mb-6">
                Synthetic Australian medical training documents
              </p>
              <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-2xl">
                40+ document types across hospital, ED, GP clinic, pathology, imaging and specialist correspondence. Ground truth, bounding boxes and scanned variants shipped with every document.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact?pack=medical-review"
                  className="flex items-center gap-2 px-6 py-3 bg-white text-[#1E3A8A] rounded-lg font-semibold hover:bg-white/90 transition-colors shadow-lg"
                >
                  Get the free 25-doc review pack
                  <ChevronRight size={16} />
                </Link>
                <a
                  href="#document-types"
                  className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/30 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors"
                >
                  See the document type list
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT YOU ACTUALLY GET - REAL SAMPLE */}
        <section className="py-20 bg-white border-t border-slate-200" aria-label="Real sample">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 animate-on-scroll">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#CCFBF1] text-[#0D9488] rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
                Real sample, not a mock-up
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A8A] mb-4 text-balance">
                What you actually get
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Below is a real discharge summary from the RCA Medical Library: NSW hospital header, AU patient name conventions, Medicare format, NSW Local Health District, AU consultant postnominals, and a medications table. Same page rendered clean and with every labelled field outlined.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-on-scroll">
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 bg-slate-50">
                  <div className="flex items-center gap-2">
                    <FileText size={14} className="text-[#0D9488]" />
                    <span className="text-xs font-semibold text-slate-700 font-mono">
                      discharge_summary
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">clean PDF</span>
                </div>
                <div className="bg-slate-100">
                  <Image
                    src="/samples/medical_discharge_summary_clean.png"
                    alt="Clean synthetic discharge summary from a fictional NSW hospital. Patient demographics with AU name and NSW address, Medicare number in the displayed AU format, ward, consultant, principal diagnosis, additional diagnoses list, hospital course narrative, and medications table. Visible synthetic disclaimer at the bottom."
                    width={1191}
                    height={1684}
                    className="w-full h-auto"
                  />
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 bg-slate-50">
                  <div className="flex items-center gap-2">
                    <Hash size={14} className="text-[#10B981]" />
                    <span className="text-xs font-semibold text-slate-700 font-mono">
                      labelled fields overlay
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">24 bboxes</span>
                </div>
                <div className="bg-slate-100">
                  <Image
                    src="/samples/medical_discharge_summary_bboxes.png"
                    alt="The same discharge summary with every labelled field outlined: patient name, date of birth, MRN, Medicare number, NOK, allergies, admission and discharge dates, ward, consultant, principal diagnosis. Each box maps directly to a column in ground_truth.csv."
                    width={1191}
                    height={1684}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 animate-on-scroll">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-sm">
                <div className="text-[10px] uppercase tracking-wider text-[#0D9488] font-semibold mb-1">Field outlines</div>
                <div className="text-slate-700 leading-relaxed">Each red rectangle maps to one column in ground_truth.csv. Mean: 15 fields per document across the library.</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-sm">
                <div className="text-[10px] uppercase tracking-wider text-[#10B981] font-semibold mb-1">AU conventions</div>
                <div className="text-slate-700 leading-relaxed">NSW hospital name, NSW Local Health District, AU patient and consultant naming, displayed Medicare format, TRN-PROV-XXXXX provider numbers.</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-sm">
                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">Ships alongside</div>
                <div className="text-slate-700 leading-relaxed">CSV + JSONL ground truth, bboxes.jsonl, manifest, plus a scanned variant of every PDF.</div>
              </div>
            </div>

            <div className="text-center mt-10 animate-on-scroll">
              <Link
                href="/contact?pack=medical-review"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1E3A8A] text-white rounded-lg font-semibold hover:bg-[#172d6b] transition-colors shadow-sm"
              >
                Request the free review pack
                <ChevronRight size={16} />
              </Link>
              <p className="text-xs text-slate-500 mt-3">
                25 to 35 representative documents. Same-day delivery on request. PDFs, ground truth, bboxes and scanned variants.
              </p>
            </div>
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
                    <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">Size</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">Best for</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">Price</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">Delivery</th>
                  </tr>
                </thead>
                <tbody>
                  {pricing.map((row) => (
                    <tr key={row.tier} className={`border-b border-slate-200 ${row.highlight ? 'bg-[#CCFBF1]/40' : ''}`}>
                      <td className="px-4 py-3 text-sm font-semibold text-slate-800 align-top whitespace-nowrap">{row.tier}</td>
                      <td className="px-4 py-3 text-sm text-slate-700 align-top">{row.size}</td>
                      <td className="px-4 py-3 text-sm text-slate-600 align-top max-w-md">{row.bestFor}</td>
                      <td className={`px-4 py-3 text-sm font-semibold align-top whitespace-nowrap ${row.highlight ? 'text-[#0D9488]' : 'text-slate-700'}`}>{row.price}</td>
                      <td className="px-4 py-3 text-sm text-slate-600 align-top whitespace-nowrap">{row.delivery}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* DOCUMENT TYPES */}
        <section id="document-types" className="py-20 bg-white" aria-label="Document types">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 animate-on-scroll">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A8A] mb-4 text-balance">
                40+ document types
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Three groups. The five document types covered by RCA Extract are starred.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {docGroups.map((g) => {
                const Icon = g.icon
                return (
                  <div key={g.title} className="animate-on-scroll bg-slate-50 border border-slate-200 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-[#CCFBF1] flex items-center justify-center">
                        <Icon size={18} className="text-[#0D9488]" />
                      </div>
                      <h3 className="font-semibold text-slate-800">{g.title}</h3>
                    </div>
                    <ul className="flex flex-col gap-1.5">
                      {g.docs.map((d) => (
                        <li key={d.name} className="flex items-start gap-2 text-sm text-slate-700">
                          <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${d.extract ? 'bg-[#10B981]' : 'bg-slate-300'}`} />
                          <span>
                            {d.name}
                            {d.extract && <span className="ml-1 text-[#10B981] text-xs font-semibold">RCA Extract</span>}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>

            <p className="text-center text-sm text-slate-500 mt-8 animate-on-scroll">
              Full list with document_type weights documented in the library manifest.json.
            </p>
          </div>
        </section>

        {/* AU REALISM */}
        <section className="py-20 bg-slate-50 border-y border-slate-200" aria-label="AU-specific realism">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 animate-on-scroll">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A8A] mb-6 text-balance">
              AU-specific realism
            </h2>
            <ul className="flex flex-col gap-3 mb-6">
              {auRealism.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                  <CheckCircle size={16} className="text-[#0D9488] mt-0.5 shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-slate-600 leading-relaxed">
              These conventions are commonly the source of extraction failures on models trained primarily on US-only documents. Models that handle US date formats, US ZIP codes and DEA numbers will frequently fail on AU postcodes, Medicare numbers and provider numbers without retraining.
            </p>
          </div>
        </section>

        {/* CASE LIBRARY */}
        <section className="py-20 bg-white" aria-label="Case library">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 animate-on-scroll">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A8A] mb-4 text-balance">
              65+ curated clinical case archetypes
            </h2>
            <p className="text-slate-600 leading-relaxed mb-3">
              The Medical Library is built from hand-authored case archetypes. Each case has internally consistent demographics, presenting complaint, labs, treatments, follow-up plans and discharge instructions. A single case can be rendered as several different document types within the same library so the documents in a pack hang together as a plausible patient journey.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Adding a new case is roughly 50 lines of Python. We accept paid feature requests for new case archetypes. Common requests: paediatric ED, renal failure with dialysis, post-op infection, mental health crisis presentation.
            </p>
          </div>
        </section>

        {/* DIVERSITY CONTROLS */}
        <section className="py-16 bg-slate-50 border-y border-slate-200" aria-label="Diversity controls">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 animate-on-scroll">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1E3A8A] mb-4 text-balance">
              Diversity controls
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Eight style profiles ship today:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
              {styleProfiles.map((sp) => (
                <span key={sp} className="text-xs font-mono bg-white border border-slate-200 rounded-md px-3 py-2 text-slate-700 text-center">
                  {sp}
                </span>
              ))}
            </div>
            <p className="text-slate-600 leading-relaxed text-sm">
              Each document type has three named template families that vary header / footer / section ordering without changing field labels or ground truth values. Visible synthetic disclaimer placement varies per document: footer line, top banner, boxed notice, or pale strip.
            </p>
          </div>
        </section>

        {/* SYNTHETIC SAFETY */}
        <section className="py-16 bg-slate-50 border-t border-slate-200" aria-label="Synthetic safety">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 animate-on-scroll">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1E3A8A] mb-4 text-balance">
              Synthetic safety
            </h2>
            <p className="text-slate-600 leading-relaxed mb-3">
              Every PDF carries a visible synthetic disclaimer on every page. Patient names, dates of birth, Medicare numbers, MRNs, addresses, phone numbers, clinician names, provider numbers and hospital names are computer-generated and do not refer to any real person or organisation.
            </p>
            <p className="text-slate-700 font-medium">
              Not for clinical care, coding, billing, or regulatory use.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-[#0D9488] to-[#1E3A8A]" aria-label="Call to action">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-on-scroll">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">
              Get the free 25-doc review pack
            </h2>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              25 to 35 representative medical documents. Five-minute review path. Free for qualified prospects.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact?pack=medical-review"
                className="flex items-center gap-2 px-8 py-3.5 bg-white text-[#1E3A8A] rounded-lg font-semibold hover:bg-white/90 transition-colors shadow-lg"
              >
                Request the review pack
                <ChevronRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-2 px-8 py-3.5 bg-white/10 border border-white/30 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors"
              >
                Talk about a 200-document QA library
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
