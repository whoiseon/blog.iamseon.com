import { NextRequest, NextResponse } from 'next/server';
import { PublishPostPayload } from '@/src/shared/entities/api/post';
import { generateNextResponse } from '@/src/shared/lib/utils/api';
import { TagService } from '@/src/services';

const tagService = new TagService();

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    return tagService.getTagAll();
  } catch (e) {
    console.error(e);
    return generateNextResponse<PublishPostPayload | null>({
      error: '서버 통신 오류',
      payload: null,
    });
  }
}
