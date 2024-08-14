import { useMutation } from '@tanstack/react-query';
import { publishPost } from '@/src/shared/lib/api';

export function useMutationPublish(callback?: () => void) {
  return useMutation({
    mutationFn: publishPost,
    onSuccess: async (data) => {
      console.log(data);
      callback && callback();
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
