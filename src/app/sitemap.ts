import { MetadataRoute } from 'next';

import { env } from '@/env.mjs';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: env.NEXT_PUBLIC_API_URL || '/',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
      alternates: {
        languages: {
          vi: `${env.NEXT_PUBLIC_API_URL}/vi`,
        },
      },
    },
  ];
}
