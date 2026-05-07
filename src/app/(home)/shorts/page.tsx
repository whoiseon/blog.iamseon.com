import { Suspense } from "react";
import type { Metadata } from "next";

import { getPostsWithContent, getTags } from "@/lib/api/services/posts.service";
import { createMetadata } from "@/lib/metadata";
import { ShortPostArticle } from "@/app/(home)/shorts/_components/short-post-article";
import { ShortsInfiniteList } from "@/app/(home)/shorts/_components/shorts-infinite-list";
import { TagFilter } from "@/app/(home)/shorts/_components/tag-filter";

export const metadata: Metadata = createMetadata({
  title: "Shorts | 황인선 개발 블로그",
  description: "황인선 개발 블로그의 짧은 글 모음",
  alternates: { canonical: "/shorts" },
  openGraph: {
    title: "Shorts | 황인선 개발 블로그",
    description: "황인선 개발 블로그의 짧은 글 모음",
    url: "/shorts",
  },
});

interface PageProps {
  searchParams: Promise<{ tags?: string }>;
}

export default function Page({ searchParams }: PageProps) {
  return (
    <main className="flex flex-col-reverse items-stretch md:flex-row">
      <section className="flex w-full grow flex-col items-start lg:w-auto lg:items-end">
        <div className="h-full min-h-12 w-full lg:w-200 lg:max-w-200 lg:px-6">
          <Suspense fallback={<ShortsListSkeleton />}>
            <FilteredShortsList searchParams={searchParams} />
          </Suspense>
        </div>
      </section>
      <section className="border-border flex grow flex-col items-start border-b py-6 md:border-none md:py-0">
        <div className="h-full w-xs px-6 md:mb-15">
          <div className="static md:sticky md:top-24">
            <Suspense fallback={<TagFilterSkeleton />}>
              <TagFilterSection />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  );
}

function ShortsListSkeleton() {
  return (
    <div className="flex flex-col">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="border-border flex flex-col gap-6 border-b px-6 pt-8 pb-10 last:border-b-0 md:px-10 md:pt-10 lg:border-x"
        >
          <div className="flex flex-col gap-4">
            <div className="bg-muted h-8 w-3/4 animate-pulse rounded" />
            <div className="flex items-center justify-between">
              <div className="flex gap-1.5">
                <div className="bg-muted h-6 w-12 animate-pulse rounded-md" />
                <div className="bg-muted h-6 w-16 animate-pulse rounded-md" />
              </div>
              <div className="bg-muted h-4 w-16 animate-pulse rounded" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="bg-muted h-4 w-full animate-pulse rounded" />
            <div className="bg-muted h-4 w-full animate-pulse rounded" />
            <div className="bg-muted h-4 w-2/3 animate-pulse rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

function TagFilterSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex min-h-7.5 items-center justify-between">
        <div className="bg-muted h-3 w-12 animate-pulse rounded" />
      </div>
      <div className="flex flex-wrap gap-1.5">
        {[14, 18, 12, 20, 16, 14].map((w, i) => (
          <div
            key={i}
            className="bg-muted h-6 animate-pulse rounded-md"
            style={{ width: `${w * 4}px` }}
          />
        ))}
      </div>
    </div>
  );
}

async function TagFilterSection() {
  const { payload: tags } = await getTags({ type: "short" });
  if (!tags) return null;
  return <TagFilter tags={tags} />;
}

async function FilteredShortsList({ searchParams }: PageProps) {
  const params = await searchParams;
  const activeTags = (params.tags ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const { error, payload } = await getPostsWithContent({
    type: "short",
    ...(activeTags.length > 0 && { tags: activeTags }),
  });

  if (error) {
    return <div className="py-10 text-center text-sm">Failed to load shorts</div>;
  }

  const results = payload?.results ?? [];

  if (results.length === 0) {
    return (
      <div className="text-muted-foreground py-20 text-center text-sm">
        {activeTags.length > 0
          ? "선택한 태그에 해당하는 글이 없습니다."
          : "아직 작성된 글이 없습니다."}
      </div>
    );
  }

  const initialItems = results.map((post) => <ShortPostArticle key={post.id} post={post} />);
  const initialCursor = payload?.has_more ? payload.next_cursor : null;

  return (
    <ShortsInfiniteList
      key={activeTags.join(",")}
      initialItems={initialItems}
      initialCursor={initialCursor}
      activeTags={activeTags}
    />
  );
}
