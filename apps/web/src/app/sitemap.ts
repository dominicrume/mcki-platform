import { MetadataRoute } from 'next'
import { listDocs } from '@mcki/content'

type BlogFrontmatter = { publishedAt?: string }

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://mckisolutions.com'
  const posts = listDocs<BlogFrontmatter>('blog')

  return [
    { url: `${base}`, lastModified: new Date(), changeFrequency: 'yearly', priority: 1 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    ...posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: p.data.publishedAt ? new Date(p.data.publishedAt) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
