import { useQuery } from '@tanstack/react-query';
import { queryKeyMap } from '@/src/shared/lib/consts';
import { getListSeries } from '@/src/shared/lib/api';

export function useGetSeriesList() {
  return useQuery({
    queryKey: queryKeyMap.series.list,
    queryFn: getListSeries,
  });
}
