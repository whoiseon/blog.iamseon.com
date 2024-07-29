'use client';

import MainContainer from '@/src/shared/ui/lab/MainContainer';
import TableOfContents from '@/src/widgets/post/ui/TableOfContents';
import PostView from '@/src/widgets/post/ui/PostView';

function PostPage() {
  return <MainContainer left={<PostView />} right={<TableOfContents />} />;
}

export default PostPage;
