import type { Post } from "@/lib/api/services/posts.service";

const SITE_URL = "https://iamseon.com";
const SITE_NAME = "황인선 개발 블로그";
const SITE_DESCRIPTION = "프론트엔드 엔지니어 황인선 개발 블로그";
const SITE_OG_IMAGE = `${SITE_URL}/opengraph-image.png`;
const AUTHOR_NAME = "황인선";
const AUTHOR_ALTERNATE_NAME = "Inseon Hwang";

const authorSchema = {
  "@type": "Person",
  name: AUTHOR_NAME,
  url: SITE_URL,
} as const;

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: AUTHOR_NAME,
  alternateName: AUTHOR_ALTERNATE_NAME,
  url: SITE_URL,
  jobTitle: "프론트엔드 엔지니어",
  knowsAbout: ["JavaScript", "TypeScript", "React", "Next.js"],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "ko",
  description: SITE_DESCRIPTION,
  author: {
    "@type": "Person",
    name: AUTHOR_NAME,
    url: SITE_URL,
  },
};

export function createBlogPostingSchema(post: Post, pathPrefix: "posts" | "shorts") {
  const url = `${SITE_URL}/${pathPrefix}/${encodeURIComponent(post.slug)}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description ?? undefined,
    image: SITE_OG_IMAGE,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: post.publishedAt ?? undefined,
    dateModified: post.updatedAt ?? post.publishedAt ?? undefined,
    author: authorSchema,
    publisher: authorSchema,
    articleSection: post.category.name,
    keywords: post.tags.map((tag) => tag.name),
    inLanguage: "ko",
  };
}

export function serializeJsonLd(schema: Record<string, unknown>) {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}
