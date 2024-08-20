'use client';

import PostHeader from '@/src/widgets/post/ui/PostHeader';
import PostFooter from '@/src/widgets/post/ui/PostFooter';
import PostContent from '@/src/widgets/post/ui/PostContent';
import { GetPostPayload } from '@/src/shared/entities';
import { parseHeadings } from '@/src/widgets/post/lib/utils';

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
        seriesUrlSlug={post.series?.urlSlug}
        prevPost={post.prevPost || null}
        nextPost={post.nextPost || null}
      />
    </article>
  );
}

export default PostView;
