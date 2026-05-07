import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getPosts } from "@/lib/api/services/posts.service";
import { PostCard } from "@/app/(home)/posts/_components/post-card";
import { RelativeTime } from "@/app/(home)/shorts/_components/relative-time";

const LATEST_POSTS_COUNT = 6;
const LATEST_SHORTS_COUNT = 10;

export default async function Home() {
  const [{ payload: postsPayload }, { payload: shortsPayload }] = await Promise.all([
    getPosts({ page_size: LATEST_POSTS_COUNT }),
    getPosts({ type: "short", page_size: LATEST_SHORTS_COUNT }),
  ]);

  const posts = postsPayload?.results ?? [];
  const shorts = shortsPayload?.results ?? [];

  return (
    <main className="w-full flex-1 pt-5 pb-22.5 md:pt-8">
      <div className="relative mx-auto flex w-full flex-col gap-8 px-5 xl:w-(--app-layout-width) xl:max-w-(--app-layout-width)">
        <Hero />

        <section className="flex flex-col-reverse gap-8 md:flex-row md:gap-16">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-muted-foreground font-mono text-sm">- RECENT WRITING</h2>
              <Link
                href="/posts"
                className="text-muted-foreground hover:text-primary text-sm font-normal hover:underline"
              >
                <ArrowRight className="ml-1 inline-block h-3.5 w-3.5" />
              </Link>
            </div>
            {posts.length > 0 && (
              <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:col-span-2">
                {posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    className="p-0 md:p-0 lg:hover:bg-transparent"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-muted-foreground font-mono text-sm">- RECENT SHORTS</h2>
              <Link
                href="/shorts"
                className="text-muted-foreground hover:text-primary text-sm font-normal hover:underline"
              >
                <ArrowRight className="ml-1 inline-block h-3.5 w-3.5" />
              </Link>
            </div>
            {shorts.length > 0 && (
              <aside className="w-full md:min-w-sm lg:col-span-1 lg:self-start">
                <ul className="border-border divide-border flex flex-col divide-y overflow-hidden rounded-lg border">
                  {shorts.map((post) => (
                    <li key={post.id}>
                      <Link
                        href={`/shorts/${post.slug}`}
                        className="group hover:bg-secondary/40 flex items-center justify-between gap-3 px-4 py-3.5 transition-colors"
                      >
                        <div className="flex items-center gap-x-2">
                          <span className="text-muted-foreground text-xs">{post.tags[0].name}</span>
                          <h3 className="group-hover:text-primary line-clamp-1 text-sm font-medium tracking-tight transition-colors">
                            {post.title}
                          </h3>
                        </div>
                        {post.publishedAt && (
                          <RelativeTime
                            date={post.publishedAt}
                            className="text-muted-foreground shrink-0 text-xs"
                          />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function Hero() {
  return (
    <section className="flex flex-col gap-3 pt-4 md:pt-8">
      <h1 className="text-3xl font-bold tracking-tight break-keep md:text-4xl">
        <b className="text-primary">황인선</b> 개발 블로그
      </h1>
      <p className="text-muted-foreground text-base break-keep md:text-lg">
        프론트엔드 엔지니어 황인선의 개발 기록 공간입니다.
      </p>
    </section>
  );
}
