import { ApiPayload, GetAllTagsPayload } from '@/src/shared/entities';

export async function getAllTags(): Promise<ApiPayload<GetAllTagsPayload>> {
  const response = await fetch('/api/v1/tag/all', {
    method: 'GET',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
}
