import { Metadata } from "next";

export const baseUrl =
  process.env.NODE_ENV === "development" || !process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? new URL("http://localhost:3060")
    : new URL(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);

export function createMetadata(metadata: Metadata) {
  return {
    ...metadata,
    openGraph: {
      title: {
        default: "황인선 개발 블로그",
        template: "%s",
      },
      description: "황인선 개발 블로그",
      url: "https://iamseon.com",
      images: [{ url: "/opengraph-image.png", alt: "iamseon" }],
      siteName: "iamseon",
      ...metadata.openGraph,
    },
  };
}
