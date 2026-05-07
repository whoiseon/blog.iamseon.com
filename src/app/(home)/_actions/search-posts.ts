"use server";

import { getPostsWithContent } from "@/lib/api/services/posts.service";

export type SearchResultType = "post" | "short";

export interface SearchResult {
  id: string;
  type: SearchResultType;
  slug: string;
  title: string;
  snippet: string;
}

const SEARCH_PAGE_SIZE = 100;
const SNIPPET_RADIUS = 60;
const SNIPPET_MAX_LENGTH = 140;

function stripMarkdown(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_~|-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function buildSnippet(source: string, query: string): string {
  if (!source) return "";

  const lowerSource = source.toLowerCase();
  const idx = lowerSource.indexOf(query);

  if (idx === -1) {
    return source.slice(0, SNIPPET_MAX_LENGTH).trim();
  }

  const start = Math.max(0, idx - SNIPPET_RADIUS);
  const end = Math.min(source.length, idx + query.length + SNIPPET_RADIUS);
  const prefix = start > 0 ? "…" : "";
  const suffix = end < source.length ? "…" : "";
  return `${prefix}${source.slice(start, end).trim()}${suffix}`;
}

export async function searchPosts(rawQuery: string): Promise<SearchResult[]> {
  const query = rawQuery.trim().toLowerCase();
  if (!query) return [];

  const [postsResult, shortsResult] = await Promise.all([
    getPostsWithContent({ type: "post", page_size: SEARCH_PAGE_SIZE }),
    getPostsWithContent({ type: "short", page_size: SEARCH_PAGE_SIZE }),
  ]);

  const matches: SearchResult[] = [];

  for (const result of [postsResult, shortsResult]) {
    if (!result.payload) continue;

    for (const post of result.payload.results) {
      const title = post.title;
      const description = post.description ?? "";
      const content = stripMarkdown(post.markdown);

      const titleMatch = title.toLowerCase().includes(query);
      const descriptionMatch = description.toLowerCase().includes(query);
      const contentMatch = content.toLowerCase().includes(query);

      if (!titleMatch && !descriptionMatch && !contentMatch) continue;

      const snippetSource = contentMatch
        ? content
        : descriptionMatch
          ? description
          : description || content;

      matches.push({
        id: post.id,
        type: post.type === "short" ? "short" : "post",
        slug: post.slug,
        title,
        snippet: buildSnippet(snippetSource, query),
      });
    }
  }

  return matches;
}
