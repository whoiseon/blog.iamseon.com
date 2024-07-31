'use client';

import Link from 'next/link';
import Image from 'next/image';
import { escapeForUrl } from '@/src/shared/lib/utils';

function PostCard() {
  return (
    <li>
      <Link
        href={`/post/${escapeForUrl(
          '고성능 GPU 클러스터 도입기 #1: 요리하라고 해서 왔는데 프라이팬이 없어요',
        )}`}
        className="flex flex-col-reverse md:flex-row md:items-center py-6 gap-x-[2.5rem] w-full cursor-pointer text-neutral-900 dark:text-neutral-50 hover:text-green-500 dark:hover:text-green-400 transition"
      >
        <div className="flex flex-col md:w-[70%]">
          <h2 className="text-inherit text-lg md:text-xl font-bold line-clamp-2 leading-[1.6] mb-2">
            고성능 GPU 클러스터 도입기 #1: 요리하라고 해서 왔는데 프라이팬이
            없어요
          </h2>
          <p className="mb-4 text-neutral-600 dark:text-neutral-400 text-sm leading-[1.6] line-clamp-2 md:line-clamp-3">
            토스의 데이터 직군이 매일 쓰는 서비스의 만족도를 1점 끌어올리기 위해
            10개월간 집요하게 파고든 과정을 소개할게요. 토스의 데이터 직군이
            매일 쓰는 서비스의 만족도를 1점 끌어올리기 위해 10개월간 집요하게
            파고든 과정을 소개할게요. 파고든 과정을 소개할게요.
          </p>
          <span className="text-neutral-600 dark:text-neutral-400 text-[13px]">
            2024년 7월 29일
          </span>
        </div>
        <div className="relative flex justify-center items-center rounded-md overflow-hidden mb-4 md:mb-auto w-[100%] md:w-[30%]">
          <Image
            className="w-full h-auto"
            src="/image/temp-image-1.png"
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
