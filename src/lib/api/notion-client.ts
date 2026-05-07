import {
  DateProperties,
  MultiSelectProperties,
  RichTextProperties,
  Select,
  SelectProperties,
  TitleProperties,
  UniqueIdProperties,
  UrlProperties,
} from "@/lib/api/types/properties.types";

const NOTION_API_KEY = process.env.NOTION_API_KEY!;
const NOTION_DATA_SOURCE_ID = process.env.NOTION_DATA_SOURCE_ID!;
const NOTION_API_VERSION = process.env.NOTION_API_VERSION!;
const BASE_URL = "https://api.notion.com/v1";

if (!NOTION_API_KEY) throw new Error("NOTION_API_KEY is not defined");
if (!NOTION_DATA_SOURCE_ID) throw new Error("NOTION_DATA_SOURCE_ID is not defined");
if (!NOTION_API_VERSION) throw new Error("NOTION_API_VERSION is not defined");

const headers: HeadersInit = {
  Authorization: `Bearer ${NOTION_API_KEY}`,
  "Notion-Version": NOTION_API_VERSION,
  "Content-Type": "application/json",
};

export type NotionResult<T> = { error: null; payload: T } | { error: string; payload: null };

async function notionFetch<T>(
  path: string,
  options?: { method?: string; body?: object }
): Promise<NotionResult<T>> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: options?.method ?? "GET",
      headers,
      ...(options?.body && { body: JSON.stringify(options.body) }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return {
        error: `Notion API error [${res.status}]: ${body.message ?? res.statusText}`,
        payload: null,
      };
    }

    const data = (await res.json()) as T;
    return { error: null, payload: data };
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Unknown fetch error",
      payload: null,
    };
  }
}

export interface NotionDataSourceResult<T> {
  id: string;
  in_trash: boolean;
  is_archived: boolean;
  is_locked: boolean;
  last_edited_time: string;
  properties: T;
}

// --- Types ---
export interface NotionPaginatedResponse<T> {
  object: "list";
  results: T[];
  has_more: boolean;
  next_cursor: string | null;
  request_id: string;
}

type NotionFilter = Record<string, unknown>;
type NotionSort =
  | { property: string; direction: "ascending" | "descending" }
  | {
      timestamp: "created_time" | "last_edited_time";
      direction: "ascending" | "descending";
    };

interface QueryOptions {
  filter?: NotionFilter;
  sorts?: NotionSort[];
  page_size?: number;
  start_cursor?: string;
  filter_properties?: string[];
}

export interface QueryDataProperties {
  id: UniqueIdProperties;
  category: SelectProperties;
  description: RichTextProperties;
  is_public: SelectProperties;
  slug: RichTextProperties;
  title: TitleProperties;
  type: SelectProperties;
  tags: MultiSelectProperties;

  created_at: DateProperties;
  published_at: DateProperties;
  updated_at: DateProperties;
  deleted_at: DateProperties;
}

type PostsDataSourceProperties = NotionDataSourceResult<QueryDataProperties>;

// --- Data Source (목록 조회) ---

export async function queryDataSource(options: QueryOptions = {}) {
  const { filter_properties, ...body } = options;

  let path = `/data_sources/${NOTION_DATA_SOURCE_ID}/query`;
  if (filter_properties && filter_properties.length > 0) {
    const params = new URLSearchParams();
    for (const id of filter_properties) {
      params.append("filter_properties", id);
    }
    path += `?${params.toString()}`;
  }

  return notionFetch<NotionPaginatedResponse<PostsDataSourceProperties>>(path, {
    method: "POST",
    body,
  });
}

// --- Data Source (스키마 조회) ---

export interface MultiSelectSchemaProperty {
  id: string;
  name: string;
  type: "multi_select";
  multi_select: { options: Select[] };
}

export interface DataSourceSchema {
  id: string;
  properties: {
    tags: MultiSelectSchemaProperty;
  } & Record<string, unknown>;
}

export async function getDataSource() {
  return notionFetch<DataSourceSchema>(`/data_sources/${NOTION_DATA_SOURCE_ID}`);
}

// --- Page (상세 조회) ---

export async function getPage(pageId: string) {
  return notionFetch<Record<string, unknown>>(`/pages/${pageId}`);
}

// --- Blocks (본문 조회) ---

export async function getBlocks(
  blockId: string,
  options?: { page_size?: number; start_cursor?: string }
) {
  const params = new URLSearchParams();
  if (options?.page_size) params.set("page_size", String(options.page_size));
  if (options?.start_cursor) params.set("start_cursor", options.start_cursor);

  const query = params.toString();
  return notionFetch<NotionPaginatedResponse<Record<string, unknown>>>(
    `/blocks/${blockId}/children${query ? `?${query}` : ""}`
  );
}

export async function getAllBlocks(
  blockId: string
): Promise<NotionResult<Record<string, unknown>[]>> {
  const blocks: Record<string, unknown>[] = [];
  let cursor: string | undefined;

  do {
    const result = await getBlocks(blockId, {
      page_size: 100,
      start_cursor: cursor,
    });

    if (result.error || !result.payload) {
      return { error: result.error ?? "Unknown error", payload: null };
    }

    const { payload: data } = result;

    for (const block of data.results) {
      if (block.has_children) {
        const childResult = await getAllBlocks(block.id as string);
        if (childResult.error || !childResult.payload) {
          return { error: childResult.error ?? "Unknown error", payload: null };
        }
        block.children = childResult.payload;
      }
      blocks.push(block);
    }

    cursor = data.has_more ? (data.next_cursor ?? undefined) : undefined;
  } while (cursor);

  return { error: null, payload: blocks };
}

// --- Markdown (본문 마크다운 조회) ---

export async function getPageMarkdown(pageId: string) {
  return notionFetch<{ markdown: string }>(`/pages/${pageId}/markdown`);
}
