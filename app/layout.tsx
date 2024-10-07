import '@/src/app/styles/globals.css';

import type { Metadata, Viewport } from 'next';
import { cn, fontSans } from '@/src/shared/lib/styles';
import { AppProvider, AuthProvider } from '@/src/app/providers';

export const revalidate = 180;

export const metadata: Metadata = {
  metadataBase: new URL('https://iamseon.com'),
  title: {
    default: '황인선 기술 블로그',
    template: '%s | iamseon',
  },
  description: '프론트엔드 엔지니어 황인선 기술 블로그',
  keywords:
    '황인선, 개발자, 프론트엔드, 웹 개발, 기술 블로그, 개발 블로그, 프로그래밍, 자바스크립트, 타입스크립트, javascript, typescript, react, nextjs',
  openGraph: {
    title: {
      default: '황인선 기술 블로그',
      template: '%s | iamseon',
    },
    description: '프론트엔드 엔지니어 황인선 기술 블로그',
    images: [{ url: '/opengraph-image.png', alt: 'iamseon' }],
    type: 'website',
    url: 'https://iamseon.com',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: {
      default: '황인선 기술 블로그',
      template: '%s | iamseon',
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
    google: 'nIW1MQD-rog1RwAp0Y81-pBwuY9SXIN5fn2sqBDOrpY',
    other: {
      'naver-site-verification': '618c84dab64f70c76ba5189daf788cd0c231558d',
    },
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
