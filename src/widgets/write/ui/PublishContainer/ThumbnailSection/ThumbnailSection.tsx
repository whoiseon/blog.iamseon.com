'use client';

import { Icons } from '@/src/shared/assets';

interface SectionProps {
  title: string;
  onUpload: () => void;
  description: string;
  onChangeDescription: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function ThumbnailSection({
  title,
  onUpload,
  description,
  onChangeDescription,
}: SectionProps) {
  return (
    <section className="mt-[2rem] md:mt-0">
      <h3 className="text-lg font-bold leading-[1.6] mb-2">{title}</h3>
      <div className="flex flex-col gap-y-5">
        <button
          className="flex items-center justify-center w-full h-[179px] bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-md"
          onClick={onUpload}
        >
          <div className="flex items-center gap-x-2">
            <Icons.Thumbnail
              className="text-green-500 dark:text-green-400"
              width={30}
              height={30}
            />
            <div className="flex flex-col items-start">
              <span className="font-semibold text-green-500 dark:text-green-400">
                썸네일 업로드
              </span>
              <span className="text-[13px] text-neutral-600 dark:text-neutral-400">
                5MB 이하 이미지 파일
              </span>
            </div>
          </div>
        </button>
        <textarea
          className="resize-none w-full h-[120px] outline-none bg-white dark:bg-black text-neutral-950 dark:text-neutral-50 placeholder:text-neutral-600 dark:placeholder:text-neutral-400"
          placeholder="포스트 소개글을 입력하세요..."
          value={description}
          onChange={onChangeDescription}
        ></textarea>
      </div>
    </section>
  );
}

export default ThumbnailSection;
