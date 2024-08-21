import {
  AddSeriesParams,
  AddSeriesPayload,
  ApiPayload,
  SeriesListPayload,
} from '@/src/shared/entities';
import { Series } from '@prisma/client';
import { API_ENDPOINT } from '@/src/shared/consts';

export async function addSeries(
  params: AddSeriesParams,
): Promise<ApiPayload<AddSeriesPayload>> {
  const response = await fetch(`${API_ENDPOINT}/api/v1/series`, {
    method: 'POST',
    cache: 'no-store',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
}

export async function getListSeries(): Promise<
  ApiPayload<SeriesListPayload[] | null>
> {
  const response = await fetch(`${API_ENDPOINT}/api/v1/series`, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
}

export async function getListSeriesForMain(): Promise<
  ApiPayload<Series[] | null>
> {
  const response = await fetch(`${API_ENDPOINT}/api/v1/series/main`, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
}
