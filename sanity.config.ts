import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { articleSchema } from './sanity/schemas/article'

export default defineConfig({
  name: 'default',
  title: 'Medical Records Intelligence',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  plugins: [structureTool()],
  schema: { types: [articleSchema] },
})
