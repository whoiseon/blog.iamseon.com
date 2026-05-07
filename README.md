# Iamseon Blog

A personal technical blog at [iamseon.com](https://iamseon.com), where post content is sourced from Notion and rendered through a Next.js App Router site with Cache Components, PPR, and shiki-powered code blocks.

## Tech Stack

### Core

- **[Next.js 16](https://nextjs.org/)** — App Router, Cache Components (`cacheComponents: true`), PPR-style streaming, `generateStaticParams` for static prerendering of post pages
- **[React 19](https://react.dev/)** — Server Components, server actions, Suspense boundaries
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Tailwind CSS 4](https://tailwindcss.com/)** + `tw-animate-css`

### Content Pipeline

- **[Notion API](https://developers.notion.com/)** — single source of truth for posts. Queried via a typed wrapper around the Data Source / Page / Markdown endpoints
- **[unified](https://unifiedjs.com/)** + remark/rehype — markdown to HTML
- **[shiki](https://shiki.style/)** — syntax highlighting (light/dark themes via CSS variables)
- **[react-medium-image-zoom](https://github.com/rpearce/react-medium-image-zoom)** — inline image zoom in post bodies

### UI & Interaction

- **[shadcn/ui](https://ui.shadcn.com/)** + **[Radix UI](https://www.radix-ui.com/)** primitives — Buttons, Dialog, Slot, etc.
- **[cmdk](https://cmdk.paco.me/)** — Command palette for the in-header search
- **[lucide-react](https://lucide.dev/)** — icon set
- **[next-themes](https://github.com/pacocoursey/next-themes)** — dark/light mode
- **[date-fns](https://date-fns.org/)** — relative time formatting

### Hosting & Observability

- **[Vercel](https://vercel.com/)** — hosting, Edge CDN, function regions
- **[Vercel Analytics](https://vercel.com/analytics)** + **[Speed Insights](https://vercel.com/docs/speed-insights)**
- **[Google Analytics 4](https://analytics.google.com/)**

## Project Structure

```
src/
├── app/
│   ├── layout.tsx                      # Root layout (metadata, JSON-LD, providers, analytics)
│   ├── providers.tsx                   # next-themes ThemeProvider
│   ├── not-found.tsx                   # Global 404
│   ├── sitemap.ts                      # Dynamic sitemap fed by post slugs
│   ├── robots.ts                       # robots.txt
│   ├── opengraph-image.png             # Default OG image
│   └── (home)/
│       ├── layout.tsx                  # Header (suspense-deferred via connection()), Footer
│       ├── page.tsx                    # Landing page — recent posts/shorts
│       ├── about/
│       ├── posts/
│       │   ├── page.tsx                # Posts list
│       │   ├── [slug]/page.tsx         # Post detail (generateStaticParams + JSON-LD)
│       │   └── _components/
│       └── shorts/
│           ├── page.tsx                # Shorts list with tag filter & infinite scroll
│           ├── [slug]/page.tsx         # Shorts detail
│           ├── _actions/               # Server actions (load-more, etc.)
│           └── _components/
│
├── components/
│   ├── analytics/                      # Google Analytics wrapper
│   ├── layouts/                        # Header, Footer, RouteHistoryTracker
│   └── ui/                             # shadcn-derived primitives
│
├── lib/
│   ├── api/
│   │   ├── notion-client.ts            # Typed wrapper around Notion REST API
│   │   ├── services/posts.service.ts   # `"use cache"` post/tag service layer
│   │   └── types/                      # Notion property type helpers
│   ├── markdown/
│   │   ├── markdown-to-html.ts         # unified pipeline (cached with cacheLife("max"))
│   │   └── plugin/rehype-shiki.ts      # Custom shiki plugin with code header + copy button
│   ├── hooks/
│   ├── json-ld.ts                      # Schema.org Person/WebSite/BlogPosting builders
│   ├── metadata.ts                     # `createMetadata` + `generatePostMetadata`
│   └── utils.ts
│
└── styles/                             # Global Tailwind layers + prose overrides
```

## Caching Model

- All Notion-fetching service functions are wrapped with `"use cache"` and tagged so they can be revalidated:
  - `getPosts` — `cacheLife("minutes")`, tag `posts:${type}`
  - `getPostBySlug` — `cacheLife("hours")`, tag `post:${slug}`
  - `getPostsWithContent` — `cacheLife("minutes")`, tag `posts:${type}:with-content`
  - `getTags` — `cacheLife("hours")`, tag `tags:*`
- `markdownToHtml` is cached with `cacheLife("max")` — pure transform, keyed by markdown content
- Client router cache extended via `experimental.staleTimes` to preserve infinite-scroll state on back navigation

## Local Development

Required env vars (see `.env.example`):

```
NOTION_API_KEY=
NOTION_DATA_SOURCE_ID=
NOTION_API_VERSION=
NEXT_PUBLIC_GA_ID=                      # optional
VERCEL_PROJECT_PRODUCTION_URL=          # auto-injected on Vercel
```

```bash
pnpm install
pnpm dev          # http://localhost:3050
pnpm build        # production build with Cache Components prerender
pnpm typecheck
pnpm lint
```

## Deployment

Deployed on Vercel. The build relies on `pnpm@10.x` (pinned via `packageManager` field) and requires `ENABLE_EXPERIMENTAL_COREPACK=1` in the Vercel project's environment variables to use the corepack-resolved version.
