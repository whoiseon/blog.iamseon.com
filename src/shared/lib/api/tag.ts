import { ApiPayload, GetAllTagsPayload } from '@/src/shared/entities';
import { API_ENDPOINT } from '@/src/shared/consts';

export async function getAllTags(): Promise<ApiPayload<GetAllTagsPayload>> {
  const response = await fetch(`${API_ENDPOINT}/api/v1/tag/all`, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
}
