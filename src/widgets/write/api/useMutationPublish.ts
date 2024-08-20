import { useMutation } from '@tanstack/react-query';
import { publishPost } from '@/src/shared/lib/api';
import { ApiPayload, PublishPostPayload } from '@/src/shared/entities';

export function useMutationPublish(
  callback?: (data: ApiPayload<PublishPostPayload>) => void,
) {
  return useMutation({
    mutationFn: publishPost,
    onSuccess: async (data) => {
      callback && callback(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
