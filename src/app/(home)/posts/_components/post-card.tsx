import { Suspense } from "react";
import Link from "next/link";

import { Post } from "@/lib/api/services/posts.service";
import { cn } from "@/lib/utils";
import { PostTime } from "@/app/(home)/posts/_components/post-time";

interface PostCardProps {
  post: Post;
  className?: string;
}

export function PostCard({ post, className }: PostCardProps) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className={cn(
        "group text-muted-foreground hover:text-foreground lg:hover:bg-muted flex flex-col gap-4 rounded-sm px-0 py-4 transition-colors md:p-6",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-initial flex-row items-center justify-start gap-2">
          <span className="text-[13px]">{post.category.name}</span>
        </div>
        <Suspense fallback={<time className="text-[13px]" dateTime={post.publishedAt!} />}>
          <PostTime time={post.publishedAt!} />
        </Suspense>
      </div>
      <h2 className="text-foreground line-clamp-2 text-xl font-semibold tracking-tight break-keep">
        {post.title}
      </h2>
      <p className="line-clamp-3 text-sm">{post.description}</p>
    </Link>
  );
}
