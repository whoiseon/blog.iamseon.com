import { useCallback, useState } from 'react';

export function useUpload() {
  const [file, setFile] = useState<File | null>(null);
  const upload = useCallback(() => {
    return new Promise<File | null>((resolve, reject) => {
      const input = document.createElement('input');
      input.accept = 'image/*';
      input.type = 'file';

      const timeout = setTimeout(reject, 1000 * 60 * 3);

      input.onchange = () => {
        clearTimeout(timeout);
        if (!input.files) return reject();
        const file = input.files[0];
        setFile(file);
        resolve(file);
      };

      input.click();
    });
  }, []);

  return [upload, file] as [typeof upload, typeof file];
}
