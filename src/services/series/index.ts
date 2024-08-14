import { generateNextResponse } from '@/src/shared/lib/utils/api';
import { AddSeriesParams, AddSeriesPayload } from '@/src/shared/entities';
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

  public async getListSeries() {
    const select: SeriesSelect = {
      id: true,
      name: true,
    };

    const series = await db.series.findMany({
      select,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return generateNextResponse<Series[] | null>({
      error: '',
      payload: series,
    });
  }

  public async getSeriesById(id: number) {
    const series: Series | null = await db.series.findUnique({ where: { id } });

    return series;
  }
}
