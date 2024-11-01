import { redirect } from 'next/navigation';

import UserButton from '@/features/auth/components/user-button';
import { getCurrent } from '@/features/auth/server/actions';

export default async function Home() {
  const user = await getCurrent();
  if (!user) redirect('/sign-in');

  return (
    <div>
      <UserButton />
    </div>
  );
}
