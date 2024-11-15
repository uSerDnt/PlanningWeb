import { z } from 'zod';

import { env } from '@/env.mjs';
import * as m from '@/paraglide/messages';

export const siteConfig = {
  title: m.meta_title,
  description: m.meta_description,
  keywords: () => [
    m.meta_keyword_nextjs(),
    m.meta_keyword_react(),
    m.meta_keyword_tailwindcss(),
    m.meta_keyword_typescript(),
    m.meta_keyword_shadcn_ui(),
    m.meta_keyword_next_auth(),
  ],
  NEXT_PUBLIC_API_URL: z.string().url().min(1),
  url: () => env.NEXT_PUBLIC_API_URL,
};
