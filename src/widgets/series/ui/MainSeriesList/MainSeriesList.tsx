'use client';

import { useGetSeriesListForMain } from '@/src/widgets/series/api';
import MainSeriesItem from '@/src/widgets/series/ui/MainSeriesList/MainSeriesItem';
import Link from 'next/link';

function MainSeriesList() {
  const { data } = useGetSeriesListForMain();
  return (
    <div className="flex flex-col">
      {data?.payload?.map((series) => (
        <MainSeriesItem
          key={series.name}
          url={series.urlSlug}
          title={series.name}
          createdAt={series.createdAt}
        />
      ))}
      {data?.payload?.length === 3 && (
        <Link
          href="/series"
          className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 py-2 bg-transparent hover:text-green-500 dark:hover:text-green-400"
        >
          모든 시리즈 보기
        </Link>
      )}
    </div>
  );
}

export default MainSeriesList;
