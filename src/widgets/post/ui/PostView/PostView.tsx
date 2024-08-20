'use client';

import PostHeader from '@/src/widgets/post/ui/PostHeader';
import PostFooter from '@/src/widgets/post/ui/PostFooter';
import PostContent from '@/src/widgets/post/ui/PostContent';
import { GetPostPayload } from '@/src/shared/entities';

interface Props {
  post: GetPostPayload;
}

function PostView({ post }: Props) {
  return (
    <article>
      <PostHeader
        thumbnail={post.thumbnail || ''}
        title={post.title || ''}
        tags={post.tags}
        createdAt={post.createdAt}
      />
      <PostContent markdown={post.body || ''} updatedAt={post.updatedAt} />
      <PostFooter
        postId={post.id}
        seriesPosts={post.series?.list}
        seriesName={post.series?.name}
        prevPost={post.prevPost || null}
        nextPost={post.nextPost || null}
      />
    </article>
  );
}

export default PostView;
