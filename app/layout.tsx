import '@/src/app/styles/globals.css';

import type { Metadata, Viewport } from 'next';
import { cn, fontSans } from '@/src/shared/lib/styles';
import { AppProvider, AuthProvider } from '@/src/app/providers';

export const metadata: Metadata = {
  metadataBase: new URL('https://imslow.me'),
  title: {
    default: '황인선 기술 블로그',
    template: '%s | imslow',
  },
  description: '프론트엔드 엔지니어 황인선 기술 블로그',
  openGraph: {
    title: {
      default: '황인선 기술 블로그',
      template: '%s | imslow',
    },
    description: '프론트엔드 엔지니어 황인선 기술 블로그',
    images: [{ url: '/opengraph-image.png', alt: 'imslow' }],
    type: 'website',
    url: 'https://imslow.me',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: {
      default: '황인선 기술 블로그',
      template: '%s | imslow',
    },
    description: '프론트엔드 엔지니어 황인선 기술 블로그',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'Fe1-qRVjRohoThMNBE08DZGYiMDfoiGAfrPIDDKHQag',
  },
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
      className="antialiased motion-reduce:scroll-auto"
      suppressHydrationWarning
    >
      <body
        className={cn(
          'w-full bg-white text-neutral-950 dark:bg-black dark:text-neutral-50 font-sans transition',
          fontSans.variable,
        )}
      >
        <AppProvider>
          <AuthProvider>{children}</AuthProvider>
        </AppProvider>
      </body>
    </html>
  );
}
