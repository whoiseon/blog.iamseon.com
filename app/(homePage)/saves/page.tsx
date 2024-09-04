import SavesPage from '@/src/views/saves';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { queryKeyMap } from '@/src/shared/lib/consts';
import { getTempPostList } from '@/src/shared/lib/api';
import AuthProtect from '@/src/shared/ui/protect/AuthProtect';

async function SavePostPage() {
  const queryClient = new QueryClient();

  // prefetch for temp post list
  await queryClient.prefetchQuery({
    queryKey: queryKeyMap.post.getTempPostList,
    queryFn: getTempPostList,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <AuthProtect>
        <SavesPage />
      </AuthProtect>
    </HydrationBoundary>
  );
}

export default SavePostPage;
