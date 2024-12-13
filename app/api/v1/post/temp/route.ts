import { PostService } from '@/src/services';
import { PublishPostPayload } from '@/src/shared/entities';
import { generateNextResponse } from '@/src/shared/lib/utils/api';

export const dynamic = 'force-dynamic';

const postService = new PostService();

export async function GET() {
  try {
    return postService.getPostList({
      isPublic: false,
      orderBy: 'desc',
    });
  } catch (e) {
    console.error(e);
    return generateNextResponse<PublishPostPayload | null>({
      error: '서버 통신 오류',
      payload: null,
    });
  }
}
