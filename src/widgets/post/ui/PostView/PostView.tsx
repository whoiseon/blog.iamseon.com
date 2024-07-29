'use client';

import PostHeader from '@/src/widgets/post/ui/PostHeader';
import PostFooter from '@/src/widgets/post/ui/PostFooter';
import PostContent from '@/src/widgets/post/ui/PostContent';

function PostView() {
  return (
    <article>
      <PostHeader />
      <PostContent />
      <PostFooter />
    </article>
  );
}

export default PostView;
