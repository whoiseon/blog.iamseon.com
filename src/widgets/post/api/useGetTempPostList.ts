import { useQuery } from '@tanstack/react-query';
import { queryKeyMap } from '@/src/shared/lib/consts';
import { getTempPostList } from '@/src/shared/lib/api';

export function useGetTempPostList() {
  return useQuery({
    queryKey: queryKeyMap.post.getTempPostList,
    queryFn: getTempPostList,
  });
}
