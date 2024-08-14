import { useQuery } from '@tanstack/react-query';
import { queryKeyMap } from '@/src/shared/lib/consts';
import { getPost } from '@/src/shared/lib/api';

export function useGetPost(postId: number) {
  return useQuery({
    queryKey: queryKeyMap.post.getPost(postId),
    queryFn: () => getPost({ postId }),
    enabled: !!postId,
  });
}
