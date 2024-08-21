import SeriesListView from '@/src/views/seriesList';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { queryKeyMap } from '@/src/shared/lib/consts';
import { getListSeries } from '@/src/shared/lib/api';

async function SeriesListPage() {
  const queryClient = new QueryClient();

  // prefetch for series list
  await queryClient.prefetchQuery({
    queryKey: queryKeyMap.series.list,
    queryFn: getListSeries,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <SeriesListView />
    </HydrationBoundary>
  );
}

export default SeriesListPage;
