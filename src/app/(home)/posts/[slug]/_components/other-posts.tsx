"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { Post } from "@/app/api/_lib/services/posts.service";

interface OtherPostsProps {
  posts: Map<string, Post[]>;
  slug: string;
}

export function OtherPosts({ posts, slug }: OtherPostsProps) {
  return (
    <aside className="scrollbar-hide sticky top-14 hidden h-[calc(100vh-56px)] w-69 gap-4 overflow-y-auto pt-10 pb-30 md:flex md:shrink-0 md:flex-col">
      {Array.from(posts.entries()).map(([category, posts]) => (
        <div key={category} className="flex flex-col text-sm">
          <span className="py-1 font-semibold">{category}</span>
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/posts/${post.slug}`}
              className={cn(
                "text-muted-foreground hover:text-foreground py-1 font-normal transition-colors",
                slug === post.slug && "text-primary hover:text-primary"
              )}
            >
              {post.title}
            </Link>
          ))}
        </div>
      ))}
    </aside>
  );
}
