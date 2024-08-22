'use client';

import ContentContainer from '@/src/shared/ui/lab/ContentContainer';
import { useGetSeriesList } from '@/src/widgets/series/api';
import SeriesCard from '@/src/widgets/series/ui/SeriesCard';
import EmptyBox from '@/src/shared/ui/data-display/EmptyBox/EmptyBox';

function SeriesListPage() {
  const { data } = useGetSeriesList();
  return (
    <main className="bg-white dark:bg-black">
      <section className="w-full h-full lg:w-[800px] lg:max-w-[800px] mb-[60px] px-5 lg:px-6 lg:mx-auto">
        <ContentContainer title="시리즈" titleSize="xl" hasMobileMenu>
          {data?.payload?.length! > 0 ? (
            <ul className="w-full flex flex-col md:grid md:grid-cols-2 md:gap-6">
              {data?.payload?.map((series) => (
                <SeriesCard
                  key={series.id}
                  urlSlug={series.urlSlug}
                  name={series.name}
                  thumbnail={series.thumbnail}
                  updatedAt={series.updatedAt}
                  postCount={series.totalCount}
                />
              ))}
            </ul>
          ) : (
            <EmptyBox text="아직 시리즈가 없어요!" />
          )}
        </ContentContainer>
      </section>
    </main>
  );
}

export default SeriesListPage;
