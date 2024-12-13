import { NextRequest } from 'next/server';
import { generateNextResponse } from '@/src/shared/lib/utils/api';
import { Post } from '@prisma/client';
import { PostService } from '@/src/services';

const postService = new PostService();

export async function GET(req: NextRequest, props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  try {
    const slug = params.slug;
    return postService.getPostBySlug(slug);
  } catch (e) {
    console.error(e);
    return generateNextResponse<Post | null>({
      error: '서버 통신 오류',
      payload: null,
    });
  }
}
