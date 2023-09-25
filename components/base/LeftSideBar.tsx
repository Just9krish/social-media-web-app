'use client';

import Image from 'next/image';
import { navigationItems } from '@/constant';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SignoutBtn from '../SignoutBtn';

export default function LeftSideBar() {
  const pathname = usePathname();
  return (
    <section className="sticky left-0 top-0 z-20 h-screen flex w-fit flex-col justify-between gap-6 overflow-auto border-r border-r-[#DADADA] bg-[#F7F7F7] dark:border-r-dark-4 dark:bg-dark-2 pb-5 pt-28 max-md:hidden">
      <div className="flex items-center w-full gap px-6">
        <Image src="/assets/thread.svg" alt="logo" width={50} height={50} />
        <h1 className="text-heading2-bold ml-2 max-lg:hidden">Threads</h1>
      </div>
      <div className="flex w-full flex-1 flex-col gap px-6">
        {navigationItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`relative flex justify-start gap-4 rounded-lg p-4 ${
              pathname === item.href ? 'dark:bg-primary-500 bg-[#B3D1FF]' : ''
            }`}
          >
            {item.icon}
            <p className="max-lg:hidden text-[#333] dark:text-light-1">
              {item.text}
            </p>
          </Link>
        ))}
      </div>
      <div className="flex w-full flex-1 flex-col gap px-6 justify-end">
        <SignoutBtn />
      </div>
    </section>
  );
}
