import { PostService } from '@/src/services';
import {
  PublishPostParams,
  PublishPostPayload,
} from '@/src/shared/entities/api/post';
import { generateNextResponse } from '@/src/shared/lib/utils/api';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

const postService = new PostService();

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PublishPostParams;
    return postService.publishPost(body);
  } catch (e) {
    console.error(e);
    return generateNextResponse<PublishPostPayload | null>({
      error: '서버 통신 오류',
      payload: null,
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const tag = url.searchParams.get('tag');
    const seriesSlug = url.searchParams.get('seriesSlug');
    const orderBy = url.searchParams.get('orderBy') as 'asc' | 'desc';

    return postService.getPostList({
      tag: tag || '',
      seriesSlug: seriesSlug || '',
      isPublic: true,
      orderBy,
    });
  } catch (e) {
    console.error(e);
    return generateNextResponse<PublishPostPayload | null>({
      error: '서버 통신 오류',
      payload: null,
    });
  }
}
