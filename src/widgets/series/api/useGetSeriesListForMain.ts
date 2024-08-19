import { useQuery } from '@tanstack/react-query';
import { queryKeyMap } from '@/src/shared/lib/consts';
import { getListSeriesForMain } from '@/src/shared/lib/api';

export function useGetSeriesListForMain() {
  return useQuery({
    queryKey: queryKeyMap.series.listForMain,
    queryFn: getListSeriesForMain,
  });
}
