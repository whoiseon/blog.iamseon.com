import type { MetadataRoute } from "next";

import { getPosts, type Post } from "@/lib/api/services/posts.service";

const SITE_URL = "https://iamseon.com";

function lastModifiedOf(post: Post): string | undefined {
  return post.updatedAt ?? post.publishedAt ?? undefined;
}

function pickLatest(posts: Post[]): string | undefined {
  return posts.map(lastModifiedOf).filter((d): d is string => Boolean(d))[0];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [{ payload: postsPayload }, { payload: shortsPayload }] = await Promise.all([
    getPosts({ type: "post" }),
    getPosts({ type: "short" }),
  ]);

  const posts = postsPayload?.results ?? [];
  const shorts = shortsPayload?.results ?? [];

  const latestPostDate = pickLatest(posts);
  const latestShortDate = pickLatest(shorts);
  const latestOverall = [latestPostDate, latestShortDate]
    .filter((d): d is string => Boolean(d))
    .sort()
    .at(-1);

  return [
    {
      url: SITE_URL,
      lastModified: latestOverall,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/posts`,
      lastModified: latestPostDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/shorts`,
      lastModified: latestShortDate,
      changeFrequency: "daily",
      priority: 0.8,
    },
    ...posts.map((post): MetadataRoute.Sitemap[number] => ({
      url: `${SITE_URL}/posts/${post.slug}`,
      lastModified: lastModifiedOf(post),
      changeFrequency: "monthly",
      priority: 0.7,
    })),
    ...shorts.map((post): MetadataRoute.Sitemap[number] => ({
      url: `${SITE_URL}/shorts/${post.slug}`,
      lastModified: lastModifiedOf(post),
      changeFrequency: "monthly",
      priority: 0.6,
    })),
  ];
}
