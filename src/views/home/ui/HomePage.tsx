'use client';

import ContentContainer from '@/src/shared/ui/lab/ContentContainer';
import PostList from '@/src/widgets/post/ui/PostList';
import { useGetQueryString } from '@/src/shared/lib/hooks';
import { replaceDashToSpace } from '@/src/shared/lib/utils';
import MainContainer from '@/src/shared/ui/lab/MainContainer';
import MainSideSection from '@/src/widgets/main/ui/MainSideSection';

function HomePage() {
  const currentTagName = useGetQueryString('tag');

  return (
    <MainContainer
      left={
        <ContentContainer
          title={replaceDashToSpace(currentTagName || '') || '포스트'}
        >
          <PostList />
        </ContentContainer>
      }
      right={<MainSideSection />}
    />
  );
}

export default HomePage;
