'use client';

import MainContainer from '@/src/shared/ui/lab/MainContainer';
import TableOfContents from '@/src/widgets/post/ui/TableOfContents';
import PostView from '@/src/widgets/post/ui/PostView';
import { GetPostPayload } from '@/src/shared/entities';

interface Props {
  post: GetPostPayload;
}

function PostPage({ post }: Props) {
  return (
    <MainContainer
      left={<PostView post={post} />}
      right={<TableOfContents />}
    />
  );
}

export default PostPage;
