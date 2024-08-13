import { ApiPayload, UploadImagePayload } from '@/src/shared/entities';

export interface UploadImageInfo {
  type: 'post' | 'thumbnail';
}

export async function uploadImage(
  file: File,
  info: UploadImageInfo,
): Promise<ApiPayload<UploadImagePayload>> {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('type', info.type);

  const response = await fetch('/api/v1/files/upload', {
    method: 'POST',
    body: formData,
  });

  return response.json();
}
