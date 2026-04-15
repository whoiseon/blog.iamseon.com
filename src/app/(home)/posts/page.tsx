import { Suspense } from "react";
import Link from "next/link";

import { getPosts } from "@/lib/api/services/posts.service";

async function PostList() {
  const { error, payload } = await getPosts();

  if (error) {
    return <div>Failed to load posts</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {payload?.results.map((post) => (
        <Link key={post.id} href={`/posts/${post.slug}`}>
          {post.title}
        </Link>
      ))}
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading posts...</div>}>
      <PostList />
    </Suspense>
  );
}
