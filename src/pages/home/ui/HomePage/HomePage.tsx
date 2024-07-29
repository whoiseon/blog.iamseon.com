'use client';

import ContentContainer from '@/src/shared/ui/lab/ContentContainer';
import PostList from '@/src/widgets/post/ui/PostList';
import Tag from '@/src/shared/ui/data-display/Tag';
import { useGetQuery } from '@/src/shared/lib/hooks';
import { replaceDashToSpace } from '@/src/shared/lib/utils';
import TagGroup from '@/src/widgets/tag/ui/TagGroup';

function HomePage() {
  const currentTagName = useGetQuery('tag');

  return (
    <main className="flex items-stretch">
      <section className="flex items-start flex-col flex-grow lg:items-end">
        <div className="h-full w-full min-h-[3rem] lg:w-[780px] lg:max-w-[780px] mb-[60px] px-5 lg:px-6 lg:mr-6">
          <ContentContainer
            title={replaceDashToSpace(currentTagName || '') || '포스트'}
          >
            <PostList />
          </ContentContainer>
        </div>
      </section>
      <section className="hidden items-start flex-col flex-grow border-l-[1px] border-l-neutral-200 dark:border-l-neutral-800 lg:flex">
        <div className="h-full w-[320px] px-6 mb-[60px]">
          <ContentContainer title="태그" isSticky>
            <TagGroup
              tags={['react', 'typescript', 'Machine Learning', 'UX Design']}
            />
          </ContentContainer>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
