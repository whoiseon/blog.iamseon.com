import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addSeries } from '@/src/shared/lib/api';
import { queryKeyMap } from '@/src/shared/lib/consts';
import { useToastMessage } from '@/src/shared/lib/hooks';

export function useMutationAddSeries(callback?: () => void) {
  const { errorToast } = useToastMessage();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addSeries,
    onSuccess: async (data) => {
      if (data.error) {
        errorToast(data.error);
        return;
      }

      await queryClient.invalidateQueries({
        queryKey: queryKeyMap.series.list,
      });
      callback && callback();
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
