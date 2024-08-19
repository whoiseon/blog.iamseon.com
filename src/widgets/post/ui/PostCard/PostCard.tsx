'use client';

import Link from 'next/link';
import Image from 'next/image';
import { escapeForUrl } from '@/src/shared/lib/utils';
import { formatDate } from 'date-fns';

interface Props {
  urlSlug: string | null;
  title: string;
  description: string | null;
  thumbnail: string | null;
  createdAt: Date;
}

function PostCard({
  urlSlug,
  title,
  description,
  thumbnail,
  createdAt,
}: Props) {
  return (
    <li>
      <Link
        href={`/post/${urlSlug}`}
        className="flex flex-col-reverse md:flex-row md:items-center py-6 gap-x-[2.5rem] w-full cursor-pointer text-neutral-900 dark:text-neutral-50 hover:text-green-500 dark:hover:text-green-400"
      >
        <div className="flex flex-col md:w-[70%]">
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
        <div className="relative flex justify-center items-center rounded-md overflow-hidden mb-4 md:mb-auto w-[100%] md:w-[30%]">
          <Image
            className="w-full h-auto"
            src={thumbnail || ''}
            alt="temp image"
            width={185}
            height={100}
            priority
          />
        </div>
      </Link>
    </li>
  );
}

export default PostCard;
