'use client';

import { navigationItems } from '@/constant';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomBar() {
  const pathname = usePathname();

  return (
    <section className="fixed bottom-0 z-10 w-full rounded-t-3xl dark:bg-glassmorphism p-4 backdrop-blur-lg xs:px-7 md:hidden">
      <div className="flex  items-center justify-between gap-3 xs:gap-5">
        {navigationItems.map((link, idx) => (
          <Link
            href={link.href}
            key={idx}
            className={`relative flex flex-col items-center gap-2 rounded-lg p-2 sm:flex-1 sm:px-2 sm:py-2.5 ${
              pathname === link.href ? 'dark:bg-primary-500 bg-[#B3D1FF]' : ''
            }`}
          >
            {link.icon}{' '}
            <p className="text-subtle-medium dark:text-light-1  max-sm:hidden">
              {link.text}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
