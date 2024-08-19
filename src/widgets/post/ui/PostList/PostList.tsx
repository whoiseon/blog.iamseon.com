'use client';

import PostCard from '@/src/widgets/post/ui/PostCard';
import { useGetPostList } from '@/src/widgets/post/api';
import { useGetQueryString } from '@/src/shared/lib/hooks';
import { Post } from '@prisma/client';

interface Props {
  posts: Post[];
}

function PostList({ posts }: Props) {
  return (
    <ul className="w-full flex flex-col lg:gap-y-5">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          urlSlug={post.urlSlug}
          title={post.title}
          description={post.description}
          thumbnail={post.thumbnail}
          createdAt={post.createdAt}
        />
      ))}
    </ul>
  );
}

export default PostList;
