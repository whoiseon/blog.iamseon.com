import {
  GetPostParams,
  GetPostPayload,
  PublishPostParams,
  PublishPostPayload,
} from '@/src/shared/entities/api/post';
import { ApiPayload } from '@/src/shared/entities';

export async function publishPost(
  params: PublishPostParams,
): Promise<ApiPayload<PublishPostPayload>> {
  const response = await fetch('/api/v1/post', {
    method: 'POST',
    cache: 'no-store',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
}

export async function getPost(
  params: GetPostParams,
): Promise<ApiPayload<GetPostPayload | null>> {
  const { postId } = params;
  const response = await fetch(`/api/v1/post/${postId}`, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
}
