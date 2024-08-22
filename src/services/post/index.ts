import {
  GetPostListParams,
  GetPostPayload,
  PostListPayload,
  PostPayloadForPostList,
  PublishPostParams,
  PublishPostPayload,
} from '@/src/shared/entities/api/post';
import { Prisma, Series } from '@prisma/client';
import { generateNextResponse } from '@/src/shared/lib/utils/api';
import db from '@/src/shared/lib/api/db';
import { SeriesService } from '@/src/services';
import PostUncheckedCreateInput = Prisma.PostUncheckedCreateInput;
import PostUncheckedUpdateInput = Prisma.PostUncheckedUpdateInput;
import PostSelect = Prisma.PostSelect;
import PostWhereInput = Prisma.PostWhereInput;
import PostInclude = Prisma.PostInclude;

const seriesService = new SeriesService();

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

    if (tags.length > 0) {
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
      include: {
        tags: true,
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
      updatedAt: new Date(),
    };

    if (post.seriesId !== seriesId) {
      // 다른 시리즈로 변경하는 경우
      if (!seriesId) {
        data.seriesId = null;
      } else {
        data.seriesId = seriesId;
      }
    } else {
      // 시리즈는 그대로 업데이트 하는 경우
      const isUpdated = await seriesService.refreshUpdatedAt(seriesId);
      if (!isUpdated) {
        return generateNextResponse<PublishPostPayload | null>({
          error: '시리즈를 찾을 수 없습니다.',
          payload: null,
        });
      }
    }

    const prevTags = post.tags.map((tag) => tag.name);
    const newTags = tags;

    const tagsToAdd = newTags.filter(
      (tag) => !prevTags.includes(tag.toLowerCase()),
    );

    if (tagsToAdd.length > 0) {
      data.tags = {
        connectOrCreate: tagsToAdd.map((tag) => {
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

    const tagsToRemove = prevTags.filter(
      (tag) => !newTags.includes(tag.toLowerCase()),
    );

    if (tagsToRemove.length > 0) {
      data.tags = {
        disconnect: tagsToRemove.map((tag) => {
          const lowerCaseTag = tag.toLowerCase();
          return {
            name: lowerCaseTag,
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
        series: true,
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
        series: post.series,
        tags: post.tags.map((tag) => tag.name),
      },
    });
  }

  public async getPostBySlug(slug: string) {
    const post = await db.post.findUnique({
      where: {
        urlSlug: slug,
      },
      include: {
        tags: {
          select: {
            name: true,
          },
        },
        series: {
          include: {
            posts: true,
          },
        },
      },
    });

    if (!post) {
      return generateNextResponse<GetPostPayload | null>({
        error: '포스트를 찾을 수 없습니다.',
        payload: null,
      });
    }

    const nextOrPrevPostSelect: PostSelect = {
      id: true,
      title: true,
      urlSlug: true,
    };

    const [nextPost, prevPost] = await Promise.all([
      await db.post.findUnique({
        where: {
          id: post.id + 1,
        },
        select: nextOrPrevPostSelect,
      }),
      await db.post.findUnique({
        where: {
          id: post.id - 1,
        },
        select: nextOrPrevPostSelect,
      }),
    ]);

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
        series: post.series
          ? {
              id: post.series.id,
              name: post.series.name,
              list: post.series.posts.map(
                ({
                  id,
                  createdAt,
                  title,
                  urlSlug,
                  description,
                  thumbnail,
                  updatedAt,
                }) => ({
                  id,
                  createdAt,
                  updatedAt,
                  title,
                  urlSlug,
                  description,
                  thumbnail,
                }),
              ),
            }
          : null,
        tags: post.tags.map((tag) => tag.name),
        nextPost,
        prevPost,
      },
    });
  }

  public async getPostList({
    tag,
    isPublic,
    seriesSlug,
    orderBy,
  }: GetPostListParams) {
    const select: PostSelect = {
      id: true,
      createdAt: true,
      updatedAt: true,
      title: true,
      urlSlug: true,
      description: true,
      thumbnail: true,
    };

    if (!isPublic) {
      select.thumbnail = false;
    }

    const where: PostWhereInput = {
      isPublic: isPublic,
      deletedAt: null,
    };

    if (tag) {
      where.tags = {
        some: {
          name: tag,
        },
      };
    }

    let series: Series | null = null;

    if (seriesSlug) {
      const findSeries = await seriesService.getSeriesBySlug(seriesSlug);
      if (!findSeries) {
        return generateNextResponse<PostListPayload | null>({
          error: '시리즈를 찾을 수 없습니다.',
          payload: null,
        });
      }

      series = findSeries;
      where.seriesId = series.id;
    }

    const posts = await db.post.findMany({
      where,
      orderBy: {
        createdAt: orderBy,
      },
      select,
    });

    return generateNextResponse<PostListPayload | null>({
      error: '',
      payload: {
        list: posts,
        series,
      },
    });
  }

  public async deletePost(postId: number) {
    const post = await db.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return generateNextResponse<boolean>({
        error: '포스트를 찾을 수 없습니다.',
        payload: false,
      });
    }

    await db.post.update({
      where: {
        id: postId,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return generateNextResponse<boolean>({
      error: '',
      payload: true,
    });
  }
}
