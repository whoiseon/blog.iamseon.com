import { TagService } from '@/src/services';
import { PublishPostPayload } from '@/src/shared/entities/api/post';
import { generateNextResponse } from '@/src/shared/lib/utils/api';

export const dynamic = 'force-dynamic';

const tagService = new TagService();

export async function GET() {
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
