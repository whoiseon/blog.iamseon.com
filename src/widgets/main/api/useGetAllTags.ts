import { useQuery } from '@tanstack/react-query';
import { queryKeyMap } from '@/src/shared/lib/consts';
import { getAllTags } from '@/src/shared/lib/api/tag';

export function useGetAllTags() {
  return useQuery({
    queryKey: queryKeyMap.tag.getAllTag,
    queryFn: getAllTags,
  });
}
