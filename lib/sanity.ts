import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

export async function getArticles() {
  return sanityClient.fetch(
    `*[_type == "article" && defined(publishedAt)] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      summary,
      category,
      readTime,
      linkedinUrl
    }`
  )
}
