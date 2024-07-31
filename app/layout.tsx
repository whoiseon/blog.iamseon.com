import '@/src/app/styles/globals.css';

import type { Metadata, Viewport } from 'next';
import { cn, fontSans } from '@/src/shared/lib/styles';
import { AppProvider } from '@/src/app/providers';

export const metadata: Metadata = {
  title: 'imslow',
  description: '프론트엔드 기술 블로그',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className="scroll-smooth antialiased motion-reduce:scroll-auto"
      suppressHydrationWarning
    >
      <body
        className={cn(
          'min-h-dvh bg-white text-neutral-950 dark:bg-black dark:text-neutral-50 font-sans transition',
          fontSans.variable,
        )}
      >
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
