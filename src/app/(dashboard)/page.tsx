import { redirect } from 'next/navigation';

import { getCurrent } from '@/features/auth/server/actions';

export default async function Home() {
  const user = await getCurrent();
  if (!user) redirect('/sign-in');

  return <div>home page</div>;
}
