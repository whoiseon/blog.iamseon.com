'use client';

import Link from 'next/link';
import Image from 'next/image';
import { escapeForUrl } from '@/src/shared/lib/utils';
import { formatDate } from 'date-fns';

interface Props {
  postId: number;
  urlSlug: string | null;
  title: string;
  description: string | null;
  thumbnail: string | null;
  createdAt: Date;
  isCurrentPost?: boolean;
  isNumbering?: boolean;
  postNumber?: number;
  isTempPost?: boolean;
}

function PostCard({
  postId,
  urlSlug,
  title,
  description,
  thumbnail,
  createdAt,
  isCurrentPost = false,
  isNumbering = false,
  postNumber,
  isTempPost = false,
}: Props) {
  return (
    <li
      className={`${
        isTempPost
          ? 'border-b-[1px] border-b-neutral-400 dark:border-b-neutral-600 last:border-0'
          : ''
      } ${isTempPost ? 'py-[3rem]' : 'py-6'}`}
    >
      <Link
        href={isTempPost ? `/write?id=${postId}` : `/post/${urlSlug}`}
        className={`flex flex-col-reverse md:flex-row md:items-center gap-x-[2.5rem] w-full cursor-pointer ${isCurrentPost ? 'text-green-500 dark:text-green-400' : 'text-neutral-900 dark:text-neutral-50'} hover:text-green-500 dark:hover:text-green-400`}
      >
        <div
          className={`flex flex-col ${isTempPost ? 'w-full' : 'md:w-[70%]'}`}
        >
          <h2 className="text-inherit text-lg md:text-xl font-bold line-clamp-2 leading-[1.6] mb-2">
            {title}
          </h2>
          <p className="mb-4 text-neutral-600 dark:text-neutral-400 text-sm leading-[1.6] line-clamp-2 md:line-clamp-3">
            {description}
          </p>
          <span className="text-neutral-600 dark:text-neutral-400 text-[13px]">
            {formatDate(new Date(createdAt), 'yyyy년 M월 dd일')}
          </span>
        </div>
        {thumbnail && (
          <div className="relative flex justify-center items-center mb-4 md:mb-auto w-[100%] md:w-[30%]">
            <Image
              className="w-full h-auto rounded-md"
              src={thumbnail || ''}
              alt="temp image"
              width={1280}
              height={720}
              priority
            />
            {isNumbering && postNumber && (
              <div className="flex items-center w-[32px] md:w-[24px] h-[40px] md:h-[32px] font-bold text-lg md:text-sm justify-center absolute top-0 right-[8px] bg-green-500 dark:bg-green-400 rounded-bl-lg rounded-br-lg shadow-lg text-neutral-50 dark:text-neutral-950">
                <span>{postNumber}</span>
              </div>
            )}
          </div>
        )}
      </Link>
    </li>
  );
}

export default PostCard;
