'use client';

import MainContainer from '@/src/shared/ui/lab/MainContainer';
import TableOfContents from '@/src/widgets/post/ui/TableOfContents';
import PostView from '@/src/widgets/post/ui/PostView';
import { GetPostPayload } from '@/src/shared/entities';
import { parseHeadings } from '@/src/widgets/post/lib/utils';

interface Props {
  post: GetPostPayload;
}

function PostPage({ post }: Props) {
  const toc = parseHeadings(post?.body || '');

  return (
    <MainContainer
      left={<PostView post={post} />}
      right={<TableOfContents toc={toc} />}
    />
  );
}

export default PostPage;
