'use client';

import PostCard from '@/src/widgets/post/ui/PostCard';

function PostList() {
  return (
    <ul className="w-full flex flex-col lg:gap-y-5">
      <PostCard />
      <PostCard />
    </ul>
  );
}

export default PostList;
