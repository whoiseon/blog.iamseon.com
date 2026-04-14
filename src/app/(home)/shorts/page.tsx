import { Suspense } from "react";

import { getPosts } from "@/app/api/_lib/services/posts.service";

async function ShortList() {
  const { error, payload } = await getPosts("short");

  if (error) {
    return <div>Failed to load shorts</div>;
  }

  return (
    <div>
      {payload?.results.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading shorts...</div>}>
      <ShortList />
    </Suspense>
  );
}
