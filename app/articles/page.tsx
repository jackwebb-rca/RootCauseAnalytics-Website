'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ExternalLink, BookOpen, Rss, ArrowRight, Linkedin } from 'lucide-react'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { getArticles } from '@/lib/sanity'

const categoryColours: Record<string, string> = {
  'Medical Records': 'bg-blue-50 text-blue-700 border-blue-200',
  'Healthcare AI': 'bg-teal-50 text-teal-700 border-teal-200',
  'Insurance': 'bg-indigo-50 text-indigo-700 border-indigo-200',
  'Document AI': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Industry Insight': 'bg-purple-50 text-purple-700 border-purple-200',
  'Synthetic Data': 'bg-amber-50 text-amber-700 border-amber-200',
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getArticles()
      .then(setArticles)
      .catch(() => setArticles([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Navigation />
      <main id="main-content">

        <section className="relative pt-24 pb-16 bg-gradient-to-br from-[#1E3A8A] via-[#1a3278] to-[#0D9488] overflow-hidden" aria-label="Articles hero">
          <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
            <div className="absolute top-20 right-20 w-80 h-80 rounded-full bg-white/20 blur-3xl" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-sm text-white/90 mb-6">
                <Rss size={14} />
                Medical Records Intelligence Newsletter
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Articles and insights
              </h1>
              <p className="text-lg text-white/80 mb-8 leading-relaxed max-w-2xl">
                Perspectives on document AI for regulated industries: healthcare document processing, insurance submission extraction, synthetic training data, and self-hosted deployment.
              </p>
              <a
                href="https://www.linkedin.com/newsletters/medical-records-intelligence"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/30 rounded-lg text-sm font-medium text-white transition-colors"
              >
                <Linkedin size={16} />
                Follow on LinkedIn
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </section>

        <section className="py-16 bg-slate-50" aria-label="Article list">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white border border-slate-200 rounded-xl p-6 animate-pulse">
                    <div className="h-4 bg-slate-200 rounded w-1/3 mb-4" />
                    <div className="h-5 bg-slate-200 rounded w-full mb-2" />
                    <div className="h-5 bg-slate-200 rounded w-3/4 mb-4" />
                    <div className="h-4 bg-slate-200 rounded w-full mb-2" />
                    <div className="h-4 bg-slate-200 rounded w-5/6" />
                  </div>
                ))}
              </div>
            ) : articles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                  <article key={article._id} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md hover:border-[#0D9488] transition-all duration-200 flex flex-col">
                    <div className="px-6 pt-6 pb-0">
                      <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full border ${categoryColours[article.category] ?? 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                        {article.category}
                      </span>
                    </div>
                    <div className="px-6 py-4 flex-1 flex flex-col">
                      <h2 className="text-base font-bold text-slate-900 mb-2 leading-snug">{article.title}</h2>
                      <p className="text-sm text-slate-500 mb-4 leading-relaxed flex-1">{article.summary}</p>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                        <div className="text-xs text-slate-400">
                          <span>{formatDate(article.publishedAt)}</span>
                          {article.readTime && (
                            <>
                              <span className="mx-2">·</span>
                              <span>{article.readTime}</span>
                            </>
                          )}
                        </div>
                        {article.linkedinUrl && (
                          <a
                            href={article.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#0D9488] hover:text-[#0B7D73] transition-colors"
                          >
                            Read article
                            <ExternalLink size={11} />
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#CCFBF1] rounded-full mb-6">
                  <BookOpen size={28} className="text-[#0D9488]" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-3">Articles coming soon</h2>
                <p className="text-slate-500 mb-8 max-w-md mx-auto text-sm leading-relaxed">
                  We publish regular insights via the Medical Records Intelligence newsletter on LinkedIn.
                </p>
                <a
                  href="https://www.linkedin.com/newsletters/medical-records-intelligence"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#0D9488] hover:bg-[#0B7D73] text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  <Linkedin size={16} />
                  Follow Newsletter
                  <ExternalLink size={13} />
                </a>
              </div>
            )}
          </div>
        </section>

        <section className="py-16 bg-white border-t border-slate-100" aria-label="Newsletter CTA">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-teal-50 border border-teal-200 rounded-full text-sm text-teal-700 font-medium mb-6">
              <Rss size={13} />
              Medical Records Intelligence
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Stay up to date</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Follow the Medical Records Intelligence newsletter on LinkedIn for regular insights on document AI, healthcare and insurance document processing, and synthetic training data.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://www.linkedin.com/newsletters/medical-records-intelligence"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0D9488] hover:bg-[#0B7D73] text-white rounded-lg text-sm font-semibold transition-colors shadow-sm"
              >
                <Linkedin size={16} />
                Follow Newsletter
                <ExternalLink size={13} />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 border border-slate-300 hover:border-[#0D9488] text-slate-700 hover:text-[#0D9488] rounded-lg text-sm font-semibold transition-colors"
              >
                Get in touch
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
