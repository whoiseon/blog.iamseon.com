'use client';

import { useGetSeriesListForMain } from '@/src/widgets/series/api';
import MainSeriesItem from '@/src/widgets/series/ui/MainSeriesList/MainSeriesItem';

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
    </div>
  );
}

export default MainSeriesList;
