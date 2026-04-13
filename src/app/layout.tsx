import type { Metadata, Viewport } from "next";

import "@/styles/globals.css";

import { Geist, Geist_Mono } from "next/font/google";

import { baseUrl, createMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import { Providers } from "@/app/providers";

export const metadata: Metadata = createMetadata({
  metadataBase: baseUrl,
  title: {
    default: "황인선 개발 블로그",
    template: "%s",
  },
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
      className={cn(
        "scroll-smooth antialiased motion-reduce:scroll-auto",
        "bg-app-background text-foreground",
        geist.variable,
        mono.variable
      )}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col">
        <Providers>{children}</Providers>
      </body>

      {/*TODO: google analytics & vercel analytics*/}
    </html>
  );
}
