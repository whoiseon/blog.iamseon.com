'use client';

import PostCard from '@/src/widgets/post/ui/PostCard';
import { PostPayloadForPostList } from '@/src/shared/entities';

interface Props {
  posts: PostPayloadForPostList[];
  currentPostId?: number;
  isNumbering?: boolean;
  isTempPost?: boolean;
}

function PostList({
  posts,
  currentPostId,
  isNumbering = false,
  isTempPost = false,
}: Props) {
  if (posts.length === 0) return null;

  return (
    <ul className="w-full flex flex-col lg:gap-y-5">
      {posts.map((post, index) => (
        <PostCard
          key={post.id}
          postId={post.id}
          urlSlug={post.urlSlug}
          title={post.title}
          description={post.description}
          thumbnail={post.thumbnail}
          createdAt={post.createdAt}
          isCurrentPost={post.id === currentPostId}
          isNumbering={isNumbering}
          postNumber={index + 1}
          isTempPost={isTempPost}
        />
      ))}
    </ul>
  );
}

export default PostList;
