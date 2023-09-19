import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dhaga: A Thread Clone',
  description: 'Thread Clone',
};

export default function RootLayout({ children }: { children: ReactNode; }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}
        <Toaster />
      </body>
    </html>
  );
}
