import { PostService } from '@/src/services';
import { generateNextResponse } from '@/src/shared/lib/utils/api';
import { Post } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { PublishPostPayload } from '@/src/shared/entities';

const postService = new PostService();

export async function GET(
  req: Request,
  { params }: { params: { postId: string } },
) {
  try {
    const postId = parseInt(params.postId);
    return postService.getPost(postId);
  } catch (e) {
    console.error(e);
    return generateNextResponse<Post | null>({
      error: '서버 통신 오류',
      payload: null,
    });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { postId: string } },
) {
  try {
    const postId = parseInt(params.postId);

    return postService.deletePost(postId);
  } catch (e) {
    console.error(e);
    return generateNextResponse<PublishPostPayload | null>({
      error: '서버 통신 오류',
      payload: null,
    });
  }
}
