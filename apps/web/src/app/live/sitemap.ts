import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://live.mckisolutions.com',
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1,
    },
  ]
}
