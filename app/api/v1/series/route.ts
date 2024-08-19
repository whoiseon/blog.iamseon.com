import { NextRequest, NextResponse } from 'next/server';
import { generateNextResponse } from '@/src/shared/lib/utils/api';
import { SeriesService } from '@/src/services';
import { AddSeriesParams, AddSeriesPayload } from '@/src/shared/entities';
import { Series } from '@prisma/client';

const seriesService = new SeriesService();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = (await req.json()) as AddSeriesParams;
    return seriesService.addSeries(body);
  } catch (e) {
    console.log('error', e);
    return generateNextResponse<AddSeriesPayload | null>({
      error: '서버 통신 오류 ',
      payload: null,
    });
  }
}

export async function GET() {
  try {
    return seriesService.getSeriesList();
  } catch (e) {
    console.log('error', e);
    return generateNextResponse<Series[] | null>({
      error: '서버 통신 오류',
      payload: null,
    });
  }
}
