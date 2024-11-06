'use client';

import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

const ErrorPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-y-4">
      <AlertTriangle className="text-muted-foreground size-6" />
      <p className="text-muted-foreground text-sm">Something went wrong</p>
      <Button variant={'secondary'}>
        <Link href={'/'}>Back to home</Link>
      </Button>
    </div>
  );
};

export default ErrorPage;
