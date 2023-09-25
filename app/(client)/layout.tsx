import '../globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/provider/ThemeProvider';
import { ReactNode } from 'react';
import BaseComponent from '@/components/base/BaseComponent';

export const metadata: Metadata = {
  title: 'Dhaga: Home',
  description: 'Thread Clone',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <BaseComponent>{children}</BaseComponent>
    </ThemeProvider>
  );
}
