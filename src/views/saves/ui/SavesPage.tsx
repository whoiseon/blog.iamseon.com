'use client';

import ContentContainer from '@/src/shared/ui/lab/ContentContainer';
import PostList from '@/src/widgets/post/ui/PostList';
import { useGetTempPostList } from '@/src/widgets/post/api/useGetTempPostList';

function SavesPage() {
  const { data } = useGetTempPostList();
  return (
    <main className="bg-white dark:bg-black">
      <section className="w-full h-full lg:w-[800px] lg:max-w-[800px] mb-[60px] px-5 lg:px-6 lg:mx-auto">
        <ContentContainer title="임시 글" titleSize="xl">
          <PostList posts={data?.payload?.list || []} isTempPost />
        </ContentContainer>
      </section>
    </main>
  );
}

export default SavesPage;
