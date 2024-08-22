'use client';

import ContentContainer from '@/src/shared/ui/lab/ContentContainer';
import { useGetAllTags } from '@/src/widgets/main/api';
import TagGroup from '@/src/widgets/tag/ui/TagGroup';

function TagListPage() {
  const { data } = useGetAllTags();

  return (
    <main className="bg-white dark:bg-black">
      <section className="w-full h-full lg:w-[800px] lg:max-w-[800px] mb-[60px] px-5 lg:px-6 lg:mx-auto">
        <ContentContainer
          className="h-full"
          title="태그"
          titleSize="xl"
          hasMobileMenu
        >
          <div className="mt-4 min-h-[380px]">
            <TagGroup tags={data?.payload.tags || []} tagSize="lg" />
          </div>
        </ContentContainer>
      </section>
    </main>
  );
}

export default TagListPage;
