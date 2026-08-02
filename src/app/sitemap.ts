import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.udawalawasafari.lk'
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
      images: [
        `${baseUrl}/opengraph-image`,
        `${baseUrl}/logo.png`,
      ],
    },
  ]
}
