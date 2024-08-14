import { useQuery } from '@tanstack/react-query';
import { getListSeries } from '@/src/shared/lib/api';
import { queryKeyMap } from '@/src/shared/lib/consts';

export function useGetListSeries() {
  return useQuery({
    queryKey: queryKeyMap.series.list,
    queryFn: getListSeries,
  });
}
