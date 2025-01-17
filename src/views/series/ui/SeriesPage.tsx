'use client';

import PostList from '@/src/widgets/post/ui/PostList';
import ContentContainer from '@/src/shared/ui/lab/ContentContainer';
import { useGetQueryString } from '@/src/shared/lib/hooks';
import { useGetPostList } from '@/src/widgets/post/api';

interface Props {
  seriesSlug: string;
}

function SeriesPage({ seriesSlug }: Props) {
  const tag = useGetQueryString('tag') || '';
  const { data } = useGetPostList({ tag, seriesSlug, orderBy: 'asc' });

  return (
    <main className="bg-white dark:bg-black">
      <section className="w-full h-full lg:w-[800px] lg:max-w-[800px] mb-[60px] px-5 lg:px-6 lg:mx-auto">
        <ContentContainer
          title={data?.payload?.series?.name || ''}
          titleSize="xl"
        >
          <PostList
            posts={data?.payload?.list || []}
            isNumbering
            emptyText="아직 시리즈가 없어요!"
          />
        </ContentContainer>
      </section>
    </main>
  );
}

export default SeriesPage;
