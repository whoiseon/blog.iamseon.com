import {
  GetPostListParams,
  GetPostParams,
  GetPostPayload,
  PostListPayload,
  PublishPostParams,
  PublishPostPayload,
} from '@/src/shared/entities/api/post';
import { ApiPayload } from '@/src/shared/entities';
import { API_ENDPOINT } from '@/src/shared/consts';
import { replaceDashToSpace } from '@/src/shared/lib/utils';

export async function publishPost(
  params: PublishPostParams,
): Promise<ApiPayload<PublishPostPayload>> {
  const response = await fetch(`${API_ENDPOINT}/api/v1/post`, {
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
  const response = await fetch(`${API_ENDPOINT}/api/v1/post/${postId}`, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
}

export async function getPostList({
  tag,
  seriesSlug,
}: GetPostListParams): Promise<ApiPayload<PostListPayload | null>> {
  const params = new URLSearchParams({
    tag: replaceDashToSpace(tag || ''),
    seriesSlug: seriesSlug || '',
  });

  const response = await fetch(`${API_ENDPOINT}/api/v1/post?${params}`, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
}
