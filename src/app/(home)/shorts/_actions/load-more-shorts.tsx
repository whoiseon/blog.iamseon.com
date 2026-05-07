"use server";

import type { ReactNode } from "react";

import { getPostsWithContent } from "@/lib/api/services/posts.service";
import { ShortPostArticle } from "@/app/(home)/shorts/_components/short-post-article";

export interface LoadMoreShortsResult {
  items: ReactNode;
  nextCursor: string | null;
}

export async function loadMoreShorts(
  cursor: string,
  tags: string[]
): Promise<LoadMoreShortsResult> {
  const { error, payload } = await getPostsWithContent({
    type: "short",
    cursor,
    ...(tags.length > 0 && { tags }),
  });

  if (error || !payload) {
    return { items: null, nextCursor: null };
  }

  return {
    items: payload.results.map((post) => <ShortPostArticle key={post.id} post={post} />),
    nextCursor: payload.has_more ? payload.next_cursor : null,
  };
}
