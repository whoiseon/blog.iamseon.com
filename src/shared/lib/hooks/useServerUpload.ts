import { useCallback, useState } from 'react';
import { uploadImage, UploadImageInfo } from '@/src/shared/lib/api';
import { useToastMessage } from '@/src/shared/lib/hooks/useToastMessage';

export function useServerUpload(initialImage?: string) {
  const { errorToast } = useToastMessage();
  const [image, setImage] = useState<string | null>(initialImage || null);

  const upload = useCallback(async (file: File, info: UploadImageInfo) => {
    const response = await uploadImage(file, info);
    if (response.error) {
      errorToast('이미지 업로드 실패');
      return;
    }

    setImage(response.payload.path);
  }, []);

  return { upload, image, setImage } as const;
}
