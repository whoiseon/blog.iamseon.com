import { generateNextResponse } from '@/src/shared/lib/utils/api';
import { Series } from '@prisma/client';
import { SeriesService } from '@/src/services';

const seriesService = new SeriesService();

export async function GET() {
  try {
    return seriesService.getSeriesForMain(3, 'desc');
  } catch (e) {
    console.log('error', e);
    return generateNextResponse<Series[] | null>({
      error: '서버 통신 오류',
      payload: null,
    });
  }
}
