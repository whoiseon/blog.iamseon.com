import { useCallback, useState } from 'react';
import { uploadImage } from '@/src/shared/lib/api';

export function useServerUpload() {
  const [image, setImage] = useState<string | null>(null);

  const upload = useCallback(async (file: File, isThumbnail?: boolean) => {
    const response = await uploadImage(file);
    if (response.error) {
      alert('이미지 업로드 실패');
      return;
    }

    setImage(response.payload.path);
  }, []);

  return { upload, image } as const;
}
