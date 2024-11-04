import { cookies } from 'next/headers';
import { Account, Client, Databases } from 'node-appwrite';

import 'server-only';
import { env } from '@/env.mjs';
import { AUTH_COOKIE } from '@/features/auth/contants';

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(env.NEXT_PUBLIC_APPWRITE_PROJECT);

  const session = await cookies().get(AUTH_COOKIE);

  if (!session || !session.value) {
    throw new Error('Unauthorized');
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
  };
}

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
