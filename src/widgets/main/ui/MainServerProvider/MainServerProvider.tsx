'use server';

import { PropsWithChildren } from 'react';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { queryKeyMap } from '@/src/shared/lib/consts';
import { getAllTags } from '@/src/shared/lib/api/tag';

async function MainServerProvider({ children }: PropsWithChildren) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeyMap.tag.getAllTag,
    queryFn: getAllTags,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
  );
}

export default MainServerProvider;
