import { useMutation, useQueryClient } from '@tanstack/react-query';
import { publishPost } from '@/src/shared/lib/api';
import { ApiPayload, PublishPostPayload } from '@/src/shared/entities';
import { queryKeyMap } from '@/src/shared/lib/consts';
import { useToastMessage } from '@/src/shared/lib/hooks';

export function useMutationPublish(
  callback?: (data: ApiPayload<PublishPostPayload>) => void,
) {
  const { errorToast } = useToastMessage();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: publishPost,
    onSuccess: async (data) => {
      if (data.error) {
        errorToast(data.error);
        return;
      }

      callback && callback(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
