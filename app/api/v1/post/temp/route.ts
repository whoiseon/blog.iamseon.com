import { NextRequest, NextResponse } from 'next/server';
import { generateNextResponse } from '@/src/shared/lib/utils/api';
import { PublishPostPayload } from '@/src/shared/entities';
import { PostService } from '@/src/services';

const postService = new PostService();

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    return postService.getPostList({
      isPublic: false,
    });
  } catch (e) {
    console.error(e);
    return generateNextResponse<PublishPostPayload | null>({
      error: '서버 통신 오류',
      payload: null,
    });
  }
}
