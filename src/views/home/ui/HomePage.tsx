'use client';

import ContentContainer from '@/src/shared/ui/lab/ContentContainer';
import PostList from '@/src/widgets/post/ui/PostList';
import { useGetQueryString } from '@/src/shared/lib/hooks';
import { replaceDashToSpace } from '@/src/shared/lib/utils';
import MainContainer from '@/src/shared/ui/lab/MainContainer';
import MainSideSection from '@/src/widgets/main/ui/MainSideSection';
import { useGetPostList } from '@/src/widgets/post/api';

function HomePage() {
  const tag = useGetQueryString('tag') || '';
  const { data } = useGetPostList({ tag });

  return (
    <MainContainer
      left={
        <ContentContainer
          title={replaceDashToSpace(tag || '') || '포스트'}
          hasMobileMenu={!tag}
        >
          <PostList
            posts={data?.payload?.list || []}
            emptyText="아직 포스트가 없어요!"
          />
        </ContentContainer>
      }
      right={<MainSideSection />}
    />
  );
}

export default HomePage;
