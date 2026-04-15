import { cacheLife, cacheTag } from "next/cache";

import {
  getPageMarkdown,
  queryDataSource,
  type NotionDataSourceResult,
  type NotionPaginatedResponse,
  type QueryDataProperties,
} from "@/lib/api/notion-client";

// --- Types ---

interface PostCategory {
  id: string;
  name: string;
}

interface PostTag {
  id: string;
  name: string;
}

export interface Post {
  id: string;
  category: PostCategory;
  description: string | null;
  isPublic: boolean;
  slug: string;
  tags: PostTag[];
  title: string;
  type: string;
  createdAt: string | null;
  updatedAt: string | null;
  publishedAt: string | null;
  deletedAt: string | null;
}

export interface PostsResult {
  results: Post[];
  has_more: boolean;
  next_cursor: string | null;
}

// --- Transform ---

function transformPost(raw: NotionDataSourceResult<QueryDataProperties>): Post {
  const p = raw.properties;
  return {
    id: raw.id,
    category: {
      id: p.category.select.id,
      name: p.category.select.name,
    },
    description: p.description.rich_text[0]?.plain_text ?? null,
    isPublic: p.is_public.select.name === "public",
    slug: p.slug.rich_text[0]?.plain_text ?? "",
    tags: p.tags.multi_select.map((tag) => ({ id: tag.id, name: tag.name })),
    title: p.title.title[0]?.plain_text ?? "",
    type: p.type.select.name,
    createdAt: p.created_at.date?.start ?? null,
    updatedAt: p.updated_at.date?.start ?? null,
    publishedAt: p.published_at.date?.start ?? null,
    deletedAt: p.deleted_at.date?.start ?? null,
  };
}

function transformPosts(
  payload: NotionPaginatedResponse<NotionDataSourceResult<QueryDataProperties>>
): PostsResult {
  return {
    results: payload.results.map(transformPost),
    has_more: payload.has_more,
    next_cursor: payload.next_cursor,
  };
}

function transformPostsGroupByCategory(payload: PostsResult | null) {
  const groups = new Map<string, Post[]>();

  if (!payload) return groups;

  payload.results.forEach((post) => {
    const category = post.category.name;

    if (!groups.has(category)) {
      groups.set(category, []);
    }

    groups.get(category)?.push(post);
  });

  return groups;
}

// --- Cached Service ---

export async function getPosts(
  type: string = "post",
  cursor?: string,
  page_size: number = 100
): Promise<{ error: string | null; payload: PostsResult | null }> {
  "use cache";
  cacheLife("minutes");
  cacheTag("posts", `posts:${type}`);

  const { error, payload } = await queryDataSource({
    filter: {
      and: [
        { property: "type", select: { equals: type } },
        { property: "deleted_at", date: { is_empty: true } },
        { property: "published_at", date: { is_not_empty: true } },
      ],
    },
    sorts: [{ property: "published_at", direction: "descending" }],
    start_cursor: cursor,
    page_size,
  });

  if (error || !payload) {
    return { error: error ?? "Unknown error", payload: null };
  }

  return { error: null, payload: transformPosts(payload) };
}

export async function getPostsByCategory(type: string = "post") {
  "use cache";
  cacheLife("minutes");
  cacheTag("posts", `posts:${type}:by-category`);

  const posts = await getPosts(type);

  if (posts.error || !posts.payload) {
    return { error: posts.error ?? "Unknown error", payload: null };
  }

  return { error: null, payload: transformPostsGroupByCategory(posts.payload) };
}

export interface PostDetail extends Post {
  markdown: string;
}

export async function getPostBySlug(
  slug: string
): Promise<{ error: string | null; payload: PostDetail | null }> {
  "use cache";
  cacheLife("hours");
  cacheTag("posts", `post:${slug}`);

  const { error, payload } = await queryDataSource({
    filter: {
      and: [
        { property: "slug", rich_text: { equals: decodeURIComponent(slug) } },
        { property: "deleted_at", date: { is_empty: true } },
      ],
    },
    page_size: 1,
  });

  if (error || !payload) {
    return { error: error ?? "Unknown error", payload: null };
  }

  const page = payload.results[0];
  if (!page) {
    return { error: "Post not found", payload: null };
  }

  const mdResult = await getPageMarkdown(page.id);

  if (mdResult.error || !mdResult.payload) {
    return { error: mdResult.error ?? "Failed to load content", payload: null };
  }

  return {
    error: null,
    payload: {
      ...transformPost(page),
      markdown: mdResult.payload.markdown,
    },
  };
}
