import { useQuery } from '@tanstack/react-query';
import { queryKeyMap } from '@/src/shared/lib/consts';
import { getPostList } from '@/src/shared/lib/api';
import { GetPostListParams } from '@/src/shared/entities';

export function useGetPostList(params: GetPostListParams) {
  return useQuery({
    queryKey: queryKeyMap.post.getPostList(params),
    queryFn: () => getPostList(params),
  });
}
