import { generateNextResponse } from '@/src/shared/lib/utils/api';
import {
  AddSeriesParams,
  AddSeriesPayload,
  SeriesListPayload,
} from '@/src/shared/entities';
import db from '@/src/shared/lib/api/db';
import { Prisma, Series } from '@prisma/client';

import SeriesSelect = Prisma.SeriesSelect;
import SeriesInclude = Prisma.SeriesInclude;

export class SeriesService {
  constructor() {}

  public async addSeries(params: AddSeriesParams) {
    const { name, urlSlug } = params;

    if (!name) {
      return generateNextResponse<AddSeriesPayload | null>({
        error: '시리즈 이름을 입력해주세요',
        payload: null,
      });
    }

    const exist = await db.series.findFirst({
      where: {
        urlSlug,
      },
    });

    if (exist) {
      return generateNextResponse<AddSeriesPayload | null>({
        error: '존재하는 URL 입니다.',
        payload: null,
      });
    }

    const series = await db.series.create({
      data: {
        name,
        urlSlug,
      },
    });

    return generateNextResponse<AddSeriesPayload | null>({
      error: '',
      payload: {
        id: series.id,
        name: series.name,
      },
    });
  }

  public async getSeriesForMain(count?: number, orderBy?: 'asc' | 'desc') {
    // 카운트가 있을 경우 최소한의 데이터만 필요한 경우이다.
    const select: SeriesSelect = {
      id: true,
      name: true,
      urlSlug: true,
      createdAt: true,
    };

    const series = await db.series.findMany({
      where: {
        posts: {
          some: {
            isPublic: true,
            deletedAt: null,
          },
        },
      },
      select,
      orderBy: {
        createdAt: orderBy ? orderBy : 'asc',
      },
      take: count ? count : undefined,
    });

    return generateNextResponse<Series[] | null>({
      error: '',
      payload: series,
    });
  }

  public async getAllSeriesList() {
    const include: SeriesInclude = {
      posts: true,
    };

    const seriesList = await db.series.findMany({
      include,
      orderBy: {
        createdAt: 'desc',
      },
    });

    console.log(
      seriesList.filter(({ name }) => name === '새로운 시리즈')[0].posts,
    );

    return generateNextResponse<SeriesListPayload[] | null>({
      error: '',
      payload: seriesList.map((series) => ({
        id: series.id,
        name: series.name,
        urlSlug: series.urlSlug,
        updatedAt: series.updatedAt,
        thumbnail: series.posts[0]?.thumbnail || '',
        totalCount: series.posts.filter(
          (post) => post.isPublic && !post.deletedAt,
        ).length,
      })),
    });
  }

  public async getSeriesBySlug(slug: string) {
    const series: Series | null = await db.series.findUnique({
      where: { urlSlug: slug },
    });

    return series;
  }

  public async refreshUpdatedAt(seriesId: number) {
    const findSeries = await db.series.findUnique({
      where: {
        id: seriesId,
      },
    });

    if (!findSeries) {
      return false;
    }

    await db.series.update({
      where: {
        id: seriesId,
      },
      data: {
        updatedAt: new Date(),
      },
    });

    return true;
  }
}
