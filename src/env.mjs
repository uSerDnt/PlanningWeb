import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    NEXT_PUBLIC_API_URL: z.string().url().min(1),
    NEXT_PUBLIC_APPWRITE_ENDPOINT: z.string().url().min(1),
    NEXT_PUBLIC_APPWRITE_PROJECT: z.string().min(1),
    NEXT_PUBLIC_APPWRITE_DATABASE_ID: z.string().min(1),
    NEXT_PUBLIC_APPWRITE_WORKSPACES_ID: z.string().min(1),
    NEXT_PUBLIC_APPWRITE_MEMBERS_ID: z.string().min(1),
    NEXT_PUBLIC_APPWRITE_PROJECTS_ID: z.string().min(1),
    NEXT_PUBLIC_APPWRITE_TASKS_ID: z.string().min(1),
    NEXT_PUBLIC_APPWRITE_IMAGES_BUCKET_ID: z.string().min(1),
    NEXT_APPWRITE_KEY: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_API_URL: z.string().url().min(1),
  },
  runtimeEnv: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_APPWRITE_ENDPOINT: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
    NEXT_PUBLIC_APPWRITE_PROJECT: process.env.NEXT_PUBLIC_APPWRITE_PROJECT,
    NEXT_PUBLIC_APPWRITE_DATABASE_ID:
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
    NEXT_PUBLIC_APPWRITE_WORKSPACES_ID:
      process.env.NEXT_PUBLIC_APPWRITE_WORKSPACES_ID,
    NEXT_PUBLIC_APPWRITE_IMAGES_BUCKET_ID:
      process.env.NEXT_PUBLIC_APPWRITE_IMAGES_BUCKET_ID,
    NEXT_PUBLIC_APPWRITE_MEMBERS_ID:
      process.env.NEXT_PUBLIC_APPWRITE_MEMBERS_ID,
    NEXT_PUBLIC_APPWRITE_PROJECTS_ID:
      process.env.NEXT_PUBLIC_APPWRITE_PROJECTS_ID,
    NEXT_APPWRITE_KEY: process.env.NEXT_APPWRITE_KEY,
    NEXT_PUBLIC_APPWRITE_TASKS_ID: process.env.NEXT_PUBLIC_APPWRITE_TASKS_ID,
  },
});
