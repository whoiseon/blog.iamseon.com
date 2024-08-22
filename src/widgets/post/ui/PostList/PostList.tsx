'use client';

import PostCard from '@/src/widgets/post/ui/PostCard';
import { PostPayloadForPostList } from '@/src/shared/entities';
import { ReactNode } from 'react';
import EmptyBox from '@/src/shared/ui/data-display/EmptyBox/EmptyBox';

interface Props {
  posts: PostPayloadForPostList[];
  currentPostId?: number;
  isNumbering?: boolean;
  isTempPost?: boolean;
  emptyText?: string;
}

function PostList({
  posts,
  currentPostId,
  isNumbering = false,
  isTempPost = false,
  emptyText = '아직 빈 공간이에요!',
}: Props) {
  if (posts.length === 0) return <EmptyBox text={emptyText} />;

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
