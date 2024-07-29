'use client';

import ContentContainer from '@/src/shared/ui/lab/ContentContainer';
import PostList from '@/src/widgets/post/ui/PostList';
import Tag from '@/src/shared/ui/data-display/Tag';
import { useGetQueryString } from '@/src/shared/lib/hooks';
import { replaceDashToSpace } from '@/src/shared/lib/utils';
import TagGroup from '@/src/widgets/tag/ui/TagGroup';
import MainContainer from '@/src/shared/ui/lab/MainContainer';

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
      right={
        <ContentContainer title="태그" isSticky>
          <TagGroup
            tags={['react', 'typescript', 'Machine Learning', 'UX Design']}
          />
        </ContentContainer>
      }
    />
  );
}

export default HomePage;
