'use client'

import { useEffect } from 'react'
import Link from 'next/link'
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

const LAST_UPDATED = '14 May 2026'

export default function PrivacyPage() {
  useScrollAnimation()

  return (
    <>
      <Navigation />
      <main id="main-content">
        <section className="pt-24 pb-12 bg-gradient-to-br from-[#1E3A8A] to-[#0D9488]" aria-label="Privacy hero">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 text-balance">
              Privacy Policy
            </h1>
            <p className="text-sm text-white/70">
              Last updated: {LAST_UPDATED}
            </p>
          </div>
        </section>

        <section className="py-16 bg-white" aria-label="Privacy content">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <article className="prose-rca animate-on-scroll">
              <p className="text-slate-600 leading-relaxed mb-6">
                Root Cause Analytics Pty Ltd (we, us, our) operates this website and the Root Cause Analytics product line. This policy explains how we handle personal information collected through our website, our email channels, and our products.
              </p>
              <p className="text-slate-600 leading-relaxed mb-10">
                We are bound by the Australian Privacy Principles (APPs) under the Privacy Act 1988 (Cth). If you have a question or complaint about our handling of your personal information, contact us at <a href="mailto:jack.webb@rootcauseanalytics.com.au" className="text-[#0D9488] hover:underline">jack.webb@rootcauseanalytics.com.au</a>.
              </p>

              <h2 className="text-xl font-bold text-[#1E3A8A] mt-10 mb-3">What we collect</h2>
              <p className="text-slate-600 leading-relaxed mb-3">
                Through the contact form on this site and through email exchanges, we collect:
              </p>
              <ul className="list-disc pl-6 text-slate-600 leading-relaxed mb-6 flex flex-col gap-1">
                <li>Your name, work email address, organisation, role, and any message content you provide.</li>
                <li>The enquiry type or pack reference you selected, if applicable.</li>
                <li>Technical metadata associated with your visit, including IP address, browser type, referrer, and pages viewed (via Google Analytics 4).</li>
                <li>Cookies set by Google Analytics 4 and by Vercel to support the site.</li>
              </ul>
              <p className="text-slate-600 leading-relaxed mb-6">
                We do not collect, store, or process any clinical, claims, underwriting or financial data from website visitors. The synthetic training document libraries we sell do not contain real patient, claimant, broker, insurer or customer data.
              </p>

              <h2 className="text-xl font-bold text-[#1E3A8A] mt-10 mb-3">What we use it for</h2>
              <ul className="list-disc pl-6 text-slate-600 leading-relaxed mb-6 flex flex-col gap-1">
                <li>Responding to your enquiry and delivering any preview packs, libraries or quotes you request.</li>
                <li>Sending you the synthetic libraries you have purchased or requested, plus follow-up communications about your order.</li>
                <li>Improving the site (analytics on page traffic, form conversion, navigation flow).</li>
                <li>Complying with our legal obligations under Australian law.</li>
              </ul>

              <h2 className="text-xl font-bold text-[#1E3A8A] mt-10 mb-3">RCA Extract and Snowflake Marketplace customers</h2>
              <p className="text-slate-600 leading-relaxed mb-3">
                RCA Extract is delivered as a Snowflake Native App that runs inside the customer's own Snowflake account (Snowflake Marketplace listing GZSUZU1HJP). When you use RCA Extract:
              </p>
              <ul className="list-disc pl-6 text-slate-600 leading-relaxed mb-6 flex flex-col gap-1">
                <li>Patient data, documents and extracted output remain entirely within your Snowflake environment.</li>
                <li>Root Cause Analytics does not have access to your documents or the extracted data.</li>
                <li>Your existing Snowflake security controls, audit logs, and access policies apply to every document processed.</li>
                <li>There is no third-party data processor involved in extraction.</li>
              </ul>
              <p className="text-slate-600 leading-relaxed mb-6">
                Snowflake collects billing and usage metadata for Marketplace transactions. Refer to Snowflake's own privacy notice for details.
              </p>

              <h2 className="text-xl font-bold text-[#1E3A8A] mt-10 mb-3">Synthetic libraries and preview packs</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                The RCA Insurance Library, RCA Medical Library and RCA Benchmark Packs are synthetic. They are generated by a deterministic Python pipeline from curated case files and phrase banks. No real patient, claimant, broker, insurer or customer data is held, transmitted or stored anywhere in the generator or the libraries. Every PDF carries a visible synthetic disclaimer on every page.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                When you request a preview pack, we collect your contact details (as described above) so we can deliver the pack and follow up. We do not require or accept any of your real operational data in exchange for a preview.
              </p>

              <h2 className="text-xl font-bold text-[#1E3A8A] mt-10 mb-3">Third-party processors</h2>
              <p className="text-slate-600 leading-relaxed mb-3">
                The current site uses the following third-party services. Each operates under its own privacy notice.
              </p>
              <ul className="list-disc pl-6 text-slate-600 leading-relaxed mb-6 flex flex-col gap-1">
                <li><strong>Vercel</strong>: hosting and edge delivery for this website.</li>
                <li><strong>Google Analytics 4</strong>: aggregate website analytics. Property ID G-ZMCESC0KQG.</li>
                <li><strong>Snowflake</strong>: distribution channel for the RCA Extract Native App (Marketplace listing GZSUZU1HJP).</li>
                <li><strong>Sanity</strong>: content management for the Articles page.</li>
                <li><strong>GitHub</strong>: source control for this site.</li>
              </ul>
              <p className="text-slate-600 leading-relaxed mb-6">
                We do not sell your personal information. We do not use it for advertising. We do not enrich it with third-party data sources.
              </p>

              <h2 className="text-xl font-bold text-[#1E3A8A] mt-10 mb-3">Cookies</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                This site uses cookies set by Google Analytics 4 and by Vercel for routing and analytics. You can disable cookies in your browser. The site will continue to function with cookies disabled, but page analytics will not be recorded for your visit.
              </p>

              <h2 className="text-xl font-bold text-[#1E3A8A] mt-10 mb-3">Data storage and location</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Contact form submissions are emailed to <a href="mailto:jack.webb@rootcauseanalytics.com.au" className="text-[#0D9488] hover:underline">jack.webb@rootcauseanalytics.com.au</a> and stored in our email provider's infrastructure. Analytics data is held by Google. Site assets are hosted on Vercel infrastructure.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                We are based in Sydney, Australia. Data may be processed by our third-party providers in jurisdictions outside Australia (notably the United States and the European Union). We take reasonable steps to ensure these providers comply with applicable privacy standards.
              </p>

              <h2 className="text-xl font-bold text-[#1E3A8A] mt-10 mb-3">Your rights</h2>
              <p className="text-slate-600 leading-relaxed mb-3">
                Under the Australian Privacy Principles, you have the right to:
              </p>
              <ul className="list-disc pl-6 text-slate-600 leading-relaxed mb-6 flex flex-col gap-1">
                <li>Request a copy of the personal information we hold about you.</li>
                <li>Ask us to correct personal information that is inaccurate, out of date, or incomplete.</li>
                <li>Ask us to delete personal information we hold about you, subject to any legal retention requirements.</li>
                <li>Make a complaint about our handling of your personal information. If you are not satisfied with our response, you can complain to the Office of the Australian Information Commissioner (OAIC) at <a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer" className="text-[#0D9488] hover:underline">oaic.gov.au</a>.</li>
              </ul>
              <p className="text-slate-600 leading-relaxed mb-6">
                Email <a href="mailto:jack.webb@rootcauseanalytics.com.au" className="text-[#0D9488] hover:underline">jack.webb@rootcauseanalytics.com.au</a> to exercise any of these rights.
              </p>

              <h2 className="text-xl font-bold text-[#1E3A8A] mt-10 mb-3">Retention</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                We retain contact form submissions and email correspondence for as long as the related commercial relationship is active, plus seven years for tax and accounting purposes. Analytics records are retained according to Google Analytics defaults.
              </p>

              <h2 className="text-xl font-bold text-[#1E3A8A] mt-10 mb-3">Changes to this policy</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                We may update this policy from time to time. The Last updated date at the top of this page reflects the most recent change. Material changes will be notified through the website.
              </p>

              <h2 className="text-xl font-bold text-[#1E3A8A] mt-10 mb-3">Contact us</h2>
              <p className="text-slate-600 leading-relaxed mb-3">
                Root Cause Analytics Pty Ltd<br />
                Sydney, NSW, Australia<br />
                <a href="mailto:jack.webb@rootcauseanalytics.com.au" className="text-[#0D9488] hover:underline">jack.webb@rootcauseanalytics.com.au</a>
              </p>

              <hr className="my-10 border-slate-200" />
              <p className="text-sm text-slate-500 leading-relaxed">
                See also: <Link href="/terms" className="text-[#0D9488] hover:underline">Terms of Service</Link> and <Link href="/security" className="text-[#0D9488] hover:underline">Security Notice</Link>.
              </p>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
