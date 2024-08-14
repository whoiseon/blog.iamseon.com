import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addSeries } from '@/src/shared/lib/api';
import { queryKeyMap } from '@/src/shared/lib/consts';

export function useMutationAddSeries(callback?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addSeries,
    onSuccess: async (data) => {
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
