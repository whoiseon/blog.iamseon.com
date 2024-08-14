import {
  AddSeriesParams,
  AddSeriesPayload,
  ApiPayload,
} from '@/src/shared/entities';
import { Series } from '@prisma/client';

export async function addSeries(
  params: AddSeriesParams,
): Promise<ApiPayload<AddSeriesPayload>> {
  const response = await fetch('/api/v1/series', {
    method: 'POST',
    cache: 'no-store',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
}

export async function getListSeries(): Promise<ApiPayload<Series[] | null>> {
  const response = await fetch('/api/v1/series', {
    method: 'GET',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
}
