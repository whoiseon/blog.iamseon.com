# Notion REST API Reference (2026 기준)

> **API Version**: `2025-09-03`
> **Base URL**: `https://api.notion.com/v1`
> **주요 변경**: `POST /databases/{id}/query` deprecated → `POST /data_sources/{id}/query` 사용

---

## 1. 공통 헤더

```ts
const headers = {
  Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
  "Notion-Version": "2025-09-03",
  "Content-Type": "application/json",
};
```

---

## 2. 데이터소스 조회 (목록)

기존 `POST /v1/databases/{id}/query` 대신 새 엔드포인트 사용.

### 요청

```
POST https://api.notion.com/v1/data_sources/{data_source_id}/query
```

```ts
const response = await fetch(`https://api.notion.com/v1/data_sources/${DATA_SOURCE_ID}/query`, {
  method: "POST",
  headers,
  body: JSON.stringify({
    filter: {
      /* ... */
    },
    sorts: [
      /* ... */
    ],
    start_cursor: undefined, // 페이지네이션 커서
    page_size: 10, // 한 번에 가져올 개수
  }),
});
const data = await response.json();
```

### 응답

```json
{
  "object": "list",
  "results": [
    /* Page 객체 배열 */
  ],
  "has_more": true,
  "next_cursor": "cursor-string-or-null"
}
```

---

## 3. 필터 (Filter)

### 3.1 단일 필터

```jsonc
// 텍스트 (title, rich_text)
{ "property": "title", "rich_text": { "contains": "검색어" } }
{ "property": "title", "rich_text": { "equals": "정확한 값" } }
{ "property": "title", "rich_text": { "is_not_empty": true } }

// 셀렉트 (select)
{ "property": "category", "select": { "equals": "Tech" } }
{ "property": "category", "select": { "does_not_equal": "Draft" } }

// 멀티셀렉트 (multi_select)
{ "property": "tags", "multi_select": { "contains": "Next.js" } }
{ "property": "tags", "multi_select": { "does_not_contain": "deprecated" } }

// 상태 (status)
{ "property": "status", "status": { "equals": "Published" } }

// 체크박스 (checkbox)
{ "property": "is_published", "checkbox": { "equals": true } }

// 날짜 (date)
{ "property": "publish_at", "date": { "is_not_empty": true } }
{ "property": "publish_at", "date": { "before": "2026-01-01" } }
{ "property": "publish_at", "date": { "after": "2025-01-01" } }
{ "property": "publish_at", "date": { "on_or_before": "2026-04-14" } }
{ "property": "publish_at", "date": { "on_or_after": "2026-01-01" } }
{ "property": "publish_at", "date": { "equals": "2026-04-14" } }

// 날짜 - 상대 값
{ "property": "publish_at", "date": { "before": "today" } }
{ "property": "publish_at", "date": { "after": "one_week_ago" } }
{ "property": "publish_at", "date": { "past_week": {} } }
{ "property": "publish_at", "date": { "past_month": {} } }
{ "property": "publish_at", "date": { "this_week": {} } }

// 숫자 (number)
{ "property": "views", "number": { "greater_than": 100 } }
{ "property": "views", "number": { "less_than_or_equal_to": 1000 } }

// 파일 (files)
{ "property": "thumbnail", "files": { "is_not_empty": true } }

// 타임스탬프 (created_time, last_edited_time) - property 대신 timestamp 사용
{ "timestamp": "created_time", "created_time": { "after": "2026-01-01" } }
{ "timestamp": "last_edited_time", "last_edited_time": { "past_week": {} } }
```

### 3.2 복합 필터 (and / or)

```jsonc
// AND: 모든 조건 충족
{
  "and": [
    { "property": "status", "status": { "equals": "Published" } },
    { "property": "deleted_at", "date": { "is_empty": true } },
    { "property": "publish_at", "date": { "on_or_before": "2026-04-14" } }
  ]
}

// OR: 하나라도 충족
{
  "or": [
    { "property": "category", "select": { "equals": "Tech" } },
    { "property": "category", "select": { "equals": "Life" } }
  ]
}

// 중첩 (2단계까지 가능)
{
  "and": [
    { "property": "deleted_at", "date": { "is_empty": true } },
    {
      "or": [
        { "property": "category", "select": { "equals": "Tech" } },
        { "property": "category", "select": { "equals": "Life" } }
      ]
    }
  ]
}
```

### 3.3 필터 조건 요약표

| 타입                  | 조건                                                                                                                                                                                |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **rich_text / title** | `equals`, `does_not_equal`, `contains`, `does_not_contain`, `starts_with`, `ends_with`, `is_empty`, `is_not_empty`                                                                  |
| **number**            | `equals`, `does_not_equal`, `greater_than`, `greater_than_or_equal_to`, `less_than`, `less_than_or_equal_to`, `is_empty`, `is_not_empty`                                            |
| **checkbox**          | `equals`, `does_not_equal`                                                                                                                                                          |
| **select**            | `equals`, `does_not_equal`, `is_empty`, `is_not_empty`                                                                                                                              |
| **multi_select**      | `contains`, `does_not_contain`, `is_empty`, `is_not_empty`                                                                                                                          |
| **status**            | `equals`, `does_not_equal`, `is_empty`, `is_not_empty`                                                                                                                              |
| **date**              | `equals`, `before`, `after`, `on_or_before`, `on_or_after`, `is_empty`, `is_not_empty`, `past_week`, `past_month`, `past_year`, `next_week`, `next_month`, `next_year`, `this_week` |
| **people**            | `contains`, `does_not_contain`, `is_empty`, `is_not_empty`                                                                                                                          |
| **files**             | `is_empty`, `is_not_empty`                                                                                                                                                          |
| **relation**          | `contains`, `does_not_contain`, `is_empty`, `is_not_empty`                                                                                                                          |
| **formula**           | 결과 타입에 따라 `checkbox`, `date`, `number`, `string` 조건 사용                                                                                                                   |

---

## 4. 정렬 (Sort)

```jsonc
// 프로퍼티 기준 정렬
{ "property": "publish_at", "direction": "descending" }
{ "property": "title", "direction": "ascending" }

// 타임스탬프 기준 정렬
{ "timestamp": "created_time", "direction": "descending" }
{ "timestamp": "last_edited_time", "direction": "ascending" }

// 다중 정렬 (첫 번째가 우선)
"sorts": [
  { "property": "publish_at", "direction": "descending" },
  { "property": "title", "direction": "ascending" }
]
```

---

## 5. 페이지 상세 조회

### 요청

```
GET https://api.notion.com/v1/pages/{page_id}
```

```ts
const response = await fetch(`https://api.notion.com/v1/pages/${pageId}`, { headers });
const page = await response.json();
```

### 특정 프로퍼티만 조회 (성능 최적화)

```ts
const response = await fetch(
  `https://api.notion.com/v1/pages/${pageId}?filter_properties=title&filter_properties=category`,
  { headers }
);
```

### 응답 주요 필드

```jsonc
{
  "object": "page",
  "id": "page-uuid",
  "created_time": "2026-04-01T00:00:00.000Z",
  "last_edited_time": "2026-04-14T12:00:00.000Z",
  "cover": {
    /* file object */
  },
  "icon": {
    /* emoji or file */
  },
  "parent": { "type": "data_source", "data_source_id": "..." },
  "url": "https://www.notion.so/...",
  "public_url": "https://...", // 공개 페이지만
  "in_trash": false,
  "properties": {
    "title": { "id": "title", "type": "title", "title": [{ "plain_text": "글 제목" }] },
    "category": { "type": "select", "select": { "name": "Tech" } },
    "tags": { "type": "multi_select", "multi_select": [{ "name": "Next.js" }] },
    "publish_at": { "type": "date", "date": { "start": "2026-04-01" } },
  },
}
```

> 25개 이상의 참조를 가진 프로퍼티는 별도 엔드포인트로 조회해야 함:
> `GET /v1/pages/{page_id}/properties/{property_id}`

---

## 6. 페이지 콘텐츠 조회 (블록)

### 요청

```
GET https://api.notion.com/v1/blocks/{block_id}/children?page_size=100
```

```ts
// page_id를 block_id로 사용
const response = await fetch(`https://api.notion.com/v1/blocks/${pageId}/children?page_size=100`, {
  headers,
});
const data = await response.json();
// data.results: Block[]
// data.has_more: boolean
// data.next_cursor: string | null
```

### 주요 블록 타입

| 타입                                    | 설명        |
| --------------------------------------- | ----------- |
| `paragraph`                             | 본문 텍스트 |
| `heading_1` / `heading_2` / `heading_3` | 제목        |
| `bulleted_list_item`                    | 불릿 리스트 |
| `numbered_list_item`                    | 번호 리스트 |
| `to_do`                                 | 체크리스트  |
| `toggle`                                | 토글        |
| `code`                                  | 코드 블록   |
| `quote`                                 | 인용문      |
| `callout`                               | 콜아웃      |
| `divider`                               | 구분선      |
| `image`                                 | 이미지      |
| `video`                                 | 비디오      |
| `bookmark`                              | 북마크      |
| `embed`                                 | 임베드      |
| `table` / `table_row`                   | 테이블      |
| `equation`                              | 수식        |

### 중첩 블록 처리

1단계 자식만 반환됨. `has_children: true`인 블록은 재귀 호출 필요.

```ts
async function getAllBlocks(blockId: string): Promise<any[]> {
  const blocks: any[] = [];
  let cursor: string | undefined;

  do {
    const url = new URL(`https://api.notion.com/v1/blocks/${blockId}/children`);
    url.searchParams.set("page_size", "100");
    if (cursor) url.searchParams.set("start_cursor", cursor);

    const res = await fetch(url.toString(), { headers });
    const data = await res.json();

    for (const block of data.results) {
      if (block.has_children) {
        block.children = await getAllBlocks(block.id);
      }
      blocks.push(block);
    }

    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);

  return blocks;
}
```

---

## 7. 마크다운으로 페이지 조회

블록을 일일이 파싱하지 않고 마크다운으로 바로 가져올 수 있음.

```
GET https://api.notion.com/v1/pages/{page_id}/markdown
```

```ts
const response = await fetch(`https://api.notion.com/v1/pages/${pageId}/markdown`, { headers });
const data = await response.json();
// data.markdown: string
```

---

## 8. 페이지네이션 헬퍼

```ts
async function queryAllPages(dataSourceId: string, filter?: object) {
  const pages: any[] = [];
  let cursor: string | undefined;

  do {
    const res = await fetch(`https://api.notion.com/v1/data_sources/${dataSourceId}/query`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        filter,
        sorts: [{ property: "publish_at", direction: "descending" }],
        start_cursor: cursor,
        page_size: 100,
      }),
    });
    const data = await res.json();

    pages.push(...data.results);
    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);

  return pages;
}
```

---

## 9. 블로그에 자주 쓰는 패턴

### 발행된 글 목록

```ts
const res = await fetch(`https://api.notion.com/v1/data_sources/${DATA_SOURCE_ID}/query`, {
  method: "POST",
  headers,
  body: JSON.stringify({
    filter: {
      and: [
        { property: "deleted_at", date: { is_empty: true } },
        { property: "publish_at", date: { is_not_empty: true } },
        { property: "publish_at", date: { on_or_before: new Date().toISOString() } },
      ],
    },
    sorts: [{ property: "publish_at", direction: "descending" }],
    page_size: 20,
  }),
});
```

### 카테고리별 글 조회

```ts
body: JSON.stringify({
  filter: {
    and: [
      { property: "deleted_at", date: { is_empty: true } },
      { property: "publish_at", date: { is_not_empty: true } },
      { property: "category", select: { equals: "Tech" } },
    ],
  },
  sorts: [{ property: "publish_at", direction: "descending" }],
});
```

### 태그별 글 조회

```ts
body: JSON.stringify({
  filter: {
    and: [
      { property: "deleted_at", date: { is_empty: true } },
      { property: "publish_at", date: { is_not_empty: true } },
      { property: "tags", multi_select: { contains: "Next.js" } },
    ],
  },
  sorts: [{ property: "publish_at", direction: "descending" }],
});
```

### 글 상세 (메타 + 본문)

```ts
// 1. 메타데이터
const page = await fetch(`https://api.notion.com/v1/pages/${pageId}`, { headers });

// 2. 본문 - 방법 A: 마크다운 (간편)
const content = await fetch(`https://api.notion.com/v1/pages/${pageId}/markdown`, { headers });

// 2. 본문 - 방법 B: 블록 (커스텀 렌더링 필요 시)
const blocks = await fetch(`https://api.notion.com/v1/blocks/${pageId}/children?page_size=100`, {
  headers,
});
```
