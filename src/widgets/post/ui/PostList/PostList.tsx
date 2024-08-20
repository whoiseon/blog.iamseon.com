'use client';

import PostCard from '@/src/widgets/post/ui/PostCard';
import { Post } from '@prisma/client';
import { PostPayloadForPostList } from '@/src/shared/entities';

interface Props {
  posts: PostPayloadForPostList[];
  currentPostId?: number;
}

function PostList({ posts, currentPostId }: Props) {
  if (posts.length === 0) return null;

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
          isCurrentPost={post.id === currentPostId}
        />
      ))}
    </ul>
  );
}

export default PostList;
