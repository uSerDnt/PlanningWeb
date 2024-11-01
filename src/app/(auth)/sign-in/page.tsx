import { redirect } from 'next/navigation';

import { SignInCard } from '@/features/auth/components/sign-in-card';
import { getCurrent } from '@/features/auth/server/actions';

const SignInPage = async () => {
  const user = await getCurrent();
  if (user) redirect('/');

  return <SignInCard />;
};
export default SignInPage;
