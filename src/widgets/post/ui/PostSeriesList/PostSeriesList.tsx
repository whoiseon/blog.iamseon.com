'use client';

import PostList from '@/src/widgets/post/ui/PostList';
import ContentContainer from '@/src/shared/ui/lab/ContentContainer';
import { useGetPostList } from '@/src/widgets/post/api';

interface Props {
  seriesUrlSlug: string;
  postId?: number;
}

function PostSeriesList({ seriesUrlSlug, postId }: Props) {
  const { data, isLoading } = useGetPostList({ seriesSlug: seriesUrlSlug });

  if (isLoading) return null;

  return (
    <ContentContainer
      title={`시리즈 - ${data?.payload?.series?.name}` || '시리즈'}
    >
      <PostList posts={data?.payload?.list || []} currentPostId={postId} />
    </ContentContainer>
  );
}

export default PostSeriesList;
