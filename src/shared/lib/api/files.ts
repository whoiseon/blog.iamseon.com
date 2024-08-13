import { ApiPayload, UploadImagePayload } from '@/src/shared/entities';

export async function uploadImage(
  file: File,
): Promise<ApiPayload<UploadImagePayload>> {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch('/api/v1/files/upload', {
    method: 'POST',
    body: formData,
  });

  return response.json();
}
