'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCurrent } from '@/features/auth/api/use-current';
import { useLogout } from '@/features/auth/api/use-logout';

export default function Home() {
  const { data, isLoading } = useCurrent();

  const { mutate } = useLogout();

  const router = useRouter();

  useEffect(() => {
    if (!data && !isLoading) {
      router.push('/sign-in');
    }
  }, [data]);

  return (
    <div className="space-x-2 space-y-2 p-2">
      <Button onClick={() => mutate()}>Log out</Button>
      <Button variant="destructive">destructive button</Button>
      <Button variant={'secondary'}>secondary button</Button>
      <Button variant={'ghost'}>ghost button</Button>
      <Button variant={'muted'}>muted button</Button>
      <Button variant={'teritary'}>teritary button</Button>
      <Input placeholder="take me!" />
    </div>
  );
}
