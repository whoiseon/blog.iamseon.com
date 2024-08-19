import { ReactNode } from 'react';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { queryKeyMap } from '@/src/shared/lib/consts';
import { getListSeries, getPost } from '@/src/shared/lib/api';

interface Props {
  children: ReactNode;
  postId: number;
}

async function EditorServerProvider({ children, postId }: Props) {
  const queryClient = new QueryClient();

  // prefetch for post
  if (postId) {
    await queryClient.prefetchQuery({
      queryKey: queryKeyMap.post.getPost(postId),
      queryFn: () => getPost({ postId }),
    });
  }

  // prefetch for series list in publish screen config section
  await queryClient.prefetchQuery({
    queryKey: queryKeyMap.series.list,
    queryFn: getListSeries,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
  );
}

export default EditorServerProvider;
