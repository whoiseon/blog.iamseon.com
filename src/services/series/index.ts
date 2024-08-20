import { generateNextResponse } from '@/src/shared/lib/utils/api';
import {
  AddSeriesParams,
  AddSeriesPayload,
  PostListPayload,
} from '@/src/shared/entities';
import db from '@/src/shared/lib/api/db';
import { Prisma, Series } from '@prisma/client';

import SeriesSelect = Prisma.SeriesSelect;
import SeriesWhereUniqueInput = Prisma.SeriesWhereUniqueInput;

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

  public async getSeriesList(count?: number, orderBy?: 'asc' | 'desc') {
    const select: SeriesSelect = {
      id: true,
      name: true,
      urlSlug: true,
      createdAt: true,
    };

    const series = await db.series.findMany({
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

  public async getSeriesBySlug(slug: string) {
    const series: Series | null = await db.series.findUnique({
      where: { urlSlug: slug },
    });

    return series;
  }
}
