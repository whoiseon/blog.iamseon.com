import { PostService } from '@/src/services';
import { generateNextResponse } from '@/src/shared/lib/utils/api';
import { Post } from '@prisma/client';

const postService = new PostService();

export async function GET(
  req: Request,
  { params }: { params: { postId: string } },
) {
  try {
    const postId = parseInt(params.postId);
    return postService.getPost(postId);
  } catch (e) {
    try {
    } catch (e) {
      console.error(e);
      return generateNextResponse<Post | null>({
        error: '서버 통신 오류',
        payload: null,
      });
    }
  }
}
