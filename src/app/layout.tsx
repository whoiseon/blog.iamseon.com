import type { Metadata, Viewport } from "next";

import "@/styles/globals.css";

import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { personSchema, serializeJsonLd, websiteSchema } from "@/lib/json-ld";
import { baseUrl, createMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { Providers } from "@/app/providers";

export const metadata: Metadata = createMetadata({
  metadataBase: baseUrl,
  title: {
    default: "황인선 개발 블로그",
    template: "%s",
  },
  description: "프론트엔드 엔지니어 황인선 개발 블로그",
  keywords: [
    "황인선",
    "개발자",
    "프론트엔드",
    "백엔드",
    "웹 개발",
    "기술 블로그",
    "개발 블로그",
    "프로그래밍",
    "자바스크립트",
    "타입스크립트",
    "frontend",
    "backend",
    "javascript",
    "typescript",
    "react",
    "next",
  ],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html
      lang="ko"
      data-scroll-behavior="smooth"
      className={cn(
        "antialiased motion-reduce:scroll-auto",
        "bg-app-background text-foreground",
        geist.variable,
        mono.variable
      )}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(personSchema) }}
        />
        <Providers>{children}</Providers>
      </body>

      {process.env.NODE_ENV === "production" && (
        <>
          <SpeedInsights />
          <GoogleAnalytics />
          <Analytics />
        </>
      )}
    </html>
  );
}
