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
          <Suspense fallback={null}>
            <FilteredShortsList searchParams={searchParams} />
          </Suspense>
        </div>
      </section>
      <section className="border-border flex grow flex-col items-start border-b py-6 md:border-none md:py-0">
        <div className="h-full w-xs px-6 md:mb-15">
          <div className="static md:sticky md:top-24">
            <Suspense fallback={null}>
              <TagFilterSection />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
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
