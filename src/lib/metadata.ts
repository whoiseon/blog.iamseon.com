import { Metadata } from "next";

import { getPostBySlug } from "@/lib/api/services/posts.service";

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
      description: "프론트엔드 엔지니어 황인선 개발 블로그",
      url: "https://iamseon.com",
      images: [{ url: "/opengraph-image.png", alt: "iamseon", width: 1200, height: 630 }],
      siteName: "iamseon",
      ...metadata.openGraph,
    },
    twitter: {
      card: "summary_large_image" as const,
      title: {
        default: "황인선 개발 블로그",
        template: "%s",
      },
      description: "프론트엔드 엔지니어 황인선 개발 블로그",
      images: [{ url: "/opengraph-image.png", alt: "iamseon" }],
      ...metadata.twitter,
    },
  };
}

export async function generatePostMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const { payload: post } = await getPostBySlug(slug);

  if (!post)
    return {
      title: "포스트를 찾을 수 없습니다.",
      description: "요청하신 포스트를 찾을 수 없습니다.",
    };

  const title = post.title;
  const description = post.description ?? undefined;
  const pathPrefix = post.type === "short" ? "shorts" : "posts";
  const canonicalPath = `/${pathPrefix}/${post.slug}`;

  return createMetadata({
    title,
    description,
    keywords: [post.title, post.category.name, ...post.tags.map((tag) => tag.name)],
    alternates: { canonical: canonicalPath },
    openGraph: {
      title,
      description,
      url: canonicalPath,
      type: "article",
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt ?? undefined,
      tags: post.tags.map((tag) => tag.name),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  });
}
