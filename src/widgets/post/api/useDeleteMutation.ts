import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost } from '@/src/shared/lib/api';
import { useToastMessage } from '@/src/shared/lib/hooks';
import { useRouter } from 'next-nprogress-bar';
import { queryKeyMap } from '@/src/shared/lib/consts';

export function useDeleteMutation() {
  const router = useRouter();
  const { errorToast } = useToastMessage();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: async (data) => {
      if (data.error) {
        errorToast(data.error);
        return;
      }

      await queryClient.invalidateQueries({
        queryKey: queryKeyMap.post.key,
      });

      router.push('/');
    },
    onError: (error) => {},
  });
}
