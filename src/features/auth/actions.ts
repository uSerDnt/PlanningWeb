import { cookies } from 'next/headers';
import { Account, Client } from 'node-appwrite';

import { AUTH_COOKIE } from './contants';

import { env } from '@/env.mjs';

export const getCurrent = async () => {
  try {
    const client = new Client()
      .setEndpoint(env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
      .setProject(env.NEXT_PUBLIC_APPWRITE_PROJECT);

    const sesstion = await cookies().get(AUTH_COOKIE);
    if (!sesstion) return null;

    client.setSession(sesstion.value);
    const account = new Account(client);

    return await account.get();
  } catch {
    return null;
  }
};
