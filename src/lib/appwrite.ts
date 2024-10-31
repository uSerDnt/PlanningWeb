// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Account, Client, Databases, Storage, Users } from 'node-appwrite';

import 'server-only';
import { env } from '@/env.mjs';

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(env.NEXT_PUBLIC_APPWRITE_PROJECT)
    .setKey(env.NEXT_APPWRITE_KEY);

  return {
    get account() {
      return new Account(client);
    },
  };
}
