import {
  GetPostPayload,
  PublishPostParams,
  PublishPostPayload,
} from '@/src/shared/entities/api/post';
import { Prisma } from '@prisma/client';
import PostUncheckedCreateInput = Prisma.PostUncheckedCreateInput;
import { generateNextResponse } from '@/src/shared/lib/utils/api';
import db from '@/src/shared/lib/api/db';
import PostUncheckedUpdateInput = Prisma.PostUncheckedUpdateInput;

export class PostService {
  constructor() {}

  public async publishPost(params: PublishPostParams) {
    const {
      id,
      title,
      body,
      description,
      thumbnail,
      tags,
      urlSlug,
      seriesId,
      isPublic,
    } = params;

    if (id) return this.updatePost(params);

    const data: PostUncheckedCreateInput = {
      title,
      body,
      description,
      thumbnail,
      urlSlug,
      isPublic,
    };

    if (seriesId) {
      data.seriesId = seriesId;
    }

    if (tags) {
      data.tags = {
        connectOrCreate: tags.map((tag) => {
          const lowerCaseTag = tag.toLowerCase();
          return {
            where: {
              name: lowerCaseTag,
            },
            create: {
              name: lowerCaseTag,
            },
          };
        }),
      };
    }

    const post = await db.post.create({
      data,
    });

    return generateNextResponse<PublishPostPayload>({
      error: '',
      payload: {
        slug: post.urlSlug as string,
      },
    });
  }
  public async updatePost(params: PublishPostParams) {
    const {
      id,
      title,
      body,
      description,
      thumbnail,
      tags,
      urlSlug,
      seriesId,
      isPublic,
    } = params;

    if (!id) {
      return generateNextResponse<PublishPostPayload | null>({
        error: '포스트를 찾을 수 없습니다.',
        payload: null,
      });
    }

    const post = await db.post.findUnique({
      where: {
        id,
      },
    });

    if (!post) {
      return generateNextResponse<PublishPostPayload | null>({
        error: '포스트를 찾을 수 없습니다.',
        payload: null,
      });
    }

    const data: PostUncheckedUpdateInput = {
      title,
      body,
      description,
      thumbnail,
      urlSlug,
      isPublic,
    };

    if (post.seriesId !== seriesId) {
      if (!seriesId) {
        data.seriesId = null;
      } else {
        data.seriesId = seriesId;
      }
    }

    if (tags) {
      data.tags = {
        connectOrCreate: tags.map((tag) => {
          const lowerCaseTag = tag.toLowerCase();
          return {
            where: {
              name: lowerCaseTag,
            },
            create: {
              name: lowerCaseTag,
            },
          };
        }),
      };
    }

    const updatedPost = await db.post.update({
      where: {
        id,
      },
      data,
    });

    return generateNextResponse<PublishPostPayload | null>({
      error: '',
      payload: {
        slug: updatedPost.urlSlug as string,
      },
    });
  }

  public async getPost(postId: number) {
    const post = await db.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        tags: true,
      },
    });

    if (!post) {
      return generateNextResponse<GetPostPayload | null>({
        error: '포스트를 찾을 수 없습니다.',
        payload: null,
      });
    }

    return generateNextResponse<GetPostPayload | null>({
      error: '',
      payload: {
        id: post.id,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        deletedAt: post.deletedAt,
        title: post.title,
        urlSlug: post.urlSlug,
        body: post.body,
        thumbnail: post.thumbnail,
        description: post.description,
        isPublic: post.isPublic,
        seriesId: post.seriesId,
        tags: post.tags.map((tag) => tag.name),
      },
    });
  }
}
