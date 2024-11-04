import Image from 'next/image';
import Link from 'next/link';

import UserButton from '@/features/auth/components/user-button';

interface StandaloneLayoutProps {
  children: React.ReactNode;
}

const StandaloneLayout = ({ children }: StandaloneLayoutProps) => {
  return (
    <main className="min-h-screen bg-neutral-200">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex h-[73px] items-center justify-between">
          <Link href={'/'}>
            <Image
              src="/logo.png"
              alt="logo"
              height={40}
              width={40}
              className="rounded-full"
            />
          </Link>
          <UserButton />
        </nav>
        <div className="flex flex-col items-center justify-center py-4">
          {children}
        </div>
      </div>
    </main>
  );
};

export default StandaloneLayout;
