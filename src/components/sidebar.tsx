import Image from 'next/image';
import Link from 'next/link';

import { DottedSeparator } from './dotted-separator';
import { Navigation } from './navigation';

export const Sidebar = () => {
  return (
    <aside className="size-full bg-neutral-100 p-4">
      <Link href={'/'}>
        <Image
          src="/logo.png"
          alt="Logo"
          width={50}
          height={50}
          className="rounded-full"
        />
      </Link>
      <DottedSeparator className="py-4" />
      <Navigation />
    </aside>
  );
};
