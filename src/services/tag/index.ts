import db from '@/src/shared/lib/api/db';
import { generateNextResponse } from '@/src/shared/lib/utils/api';
import { GetAllTagsPayload } from '@/src/shared/entities';

export class TagService {
  constructor() {}

  public async getTagAll() {
    const tags = await db.tag.findMany({
      where: {
        posts: {
          some: {},
        },
      },
    });

    return generateNextResponse<GetAllTagsPayload>({
      error: '',
      payload: {
        tags: tags.map((tag) => tag.name),
      },
    });
  }
}
