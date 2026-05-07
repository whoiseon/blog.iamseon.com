import type { Metadata } from "next";

import { getPosts } from "@/lib/api/services/posts.service";
import { createMetadata } from "@/lib/metadata";
import { PostCard } from "@/app/(home)/posts/_components/post-card";

export const metadata: Metadata = createMetadata({
  title: "Posts | 황인선 개발 블로그",
  description: "황인선 개발 블로그의 모든 포스트",
  alternates: { canonical: "/posts" },
  openGraph: {
    title: "Posts | 황인선 개발 블로그",
    description: "황인선 개발 블로그의 모든 포스트",
    url: "/posts",
  },
});

export default async function Page() {
  const { payload } = await getPosts();

  return (
    <main className="w-full pt-12 pb-22.5">
      <div className="relative mx-auto flex w-full flex-col gap-4 px-4 xl:w-(--app-layout-width) xl:max-w-(--app-layout-width)">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {payload?.results.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </main>
  );
}
