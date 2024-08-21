import { PropsWithChildren, ReactNode } from 'react';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { queryKeyMap } from '@/src/shared/lib/consts';
import {
  getAllTags,
  getListSeriesForMain,
  getPostList,
} from '@/src/shared/lib/api';
import { replaceDashToSpace } from '@/src/shared/lib/utils';

interface Props {
  children: ReactNode;
  tag?: string;
  seriesSlug?: string;
  isPublic?: boolean;
  orderBy?: 'asc' | 'desc';
}

async function MainServerProvider({
  children,
  seriesSlug,
  tag,
  orderBy = 'desc',
}: Props) {
  const queryClient = new QueryClient();

  // prefetch for tag list
  await queryClient.prefetchQuery({
    queryKey: queryKeyMap.tag.getAllTag,
    queryFn: getAllTags,
  });

  // prefetch for series list
  await queryClient.prefetchQuery({
    queryKey: queryKeyMap.series.listForMain,
    queryFn: getListSeriesForMain,
  });

  // prefetch for post list
  await queryClient.prefetchQuery({
    queryKey: queryKeyMap.post.getPostList({ tag, seriesSlug, orderBy }),
    queryFn: () =>
      getPostList({
        seriesSlug: seriesSlug || '',
        tag: replaceDashToSpace(tag || ''),
        orderBy,
      }),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
  );
}

export default MainServerProvider;
