import { useCallback, useState } from 'react';
import { uploadImage, UploadImageInfo } from '@/src/shared/lib/api';

export function useServerUpload(initialImage?: string) {
  const [image, setImage] = useState<string | null>(initialImage || null);

  const upload = useCallback(async (file: File, info: UploadImageInfo) => {
    const response = await uploadImage(file, info);
    if (response.error) {
      alert('이미지 업로드 실패');
      return;
    }

    setImage(response.payload.path);
  }, []);

  return { upload, image, setImage } as const;
}
