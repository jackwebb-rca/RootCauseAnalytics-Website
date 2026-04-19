export const articleSchema = {
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'slug', title: 'Slug (URL)', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (Rule: any) => Rule.required() },
    { name: 'publishedAt', title: 'Published Date', type: 'date', validation: (Rule: any) => Rule.required() },
    { name: 'category', title: 'Category', type: 'string', options: { list: [{ title: 'Medical Records', value: 'Medical Records' }, { title: 'Healthcare AI', value: 'Healthcare AI' }, { title: 'Snowflake', value: 'Snowflake' }, { title: 'Industry Insight', value: 'Industry Insight' }], layout: 'radio' }, validation: (Rule: any) => Rule.required() },
    { name: 'readTime', title: 'Read Time', type: 'string' },
    { name: 'summary', title: 'Summary', type: 'text', rows: 3, validation: (Rule: any) => Rule.required().max(300) },
    { name: 'linkedinUrl', title: 'LinkedIn Article URL', type: 'url' },
    { name: 'body', title: 'Article Body', type: 'array', of: [{ type: 'block' }] },
  ],
  preview: { select: { title: 'title', subtitle: 'publishedAt' } },
}
