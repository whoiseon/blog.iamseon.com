'use client';

import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from 'date-fns';

interface Props {
  urlSlug: string;
  name: string;
  thumbnail: string | null;
  updatedAt: Date;
  postCount: number;
}

function SeriesCard({ urlSlug, name, thumbnail, updatedAt, postCount }: Props) {
  return (
    <li>
      <Link
        href={`/series/${urlSlug}`}
        className="flex flex-col cursor-pointer"
      >
        {thumbnail && (
          <div className="relative flex justify-center items-center overflow-hidden mb-4 md:mb-auto w-[100%] min-h-[206px]">
            <Image
              className="w-full h-auto rounded-md"
              src={thumbnail || ''}
              alt="series thumbnail"
              width={185}
              height={100}
              priority
            />
          </div>
        )}
        <h4 className="text-lg font-semibold mt-4">{name}</h4>
        <div className="flex flex-col gap-y-1 mt-2 text-[13px]">
          <span>
            <b className="text-green-500 dark:text-green-400">{postCount}</b>
            개의 포스트
          </span>
          <div className="text-neutral-600 dark:text-neutral-400">
            <span>마지막 업데이트</span>
            <span className="mx-1">·</span>
            <span>{formatDate(new Date(updatedAt), 'yyyy년 MM월 dd일')}</span>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default SeriesCard;
