'use client';

import Link from 'next/link';

interface Props {
  type: 'prev' | 'next';
  href: string;
}

const buttonMap = {
  prev: {
    subText: '이전 포스트',
    className: 'items-start justify-center',
  },
  next: {
    subText: '다음 포스트',
    className: 'items-end justify-center',
  },
};

function PostLinkButton({ type, href }: Props) {
  const { subText, className } = buttonMap[type];

  return (
    <Link
      href={href}
      className={`flex flex-col px-4 py-3 rounded-md transition bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 w-full ${className}`}
    >
      <span className="mb-1 text-[13px] text-neutral-600 dark:text-neutral-400">
        {subText}
      </span>
      <span className="font-bold text-neutral-800 dark:text-neutral-100">
        타입스크립트 using
      </span>
    </Link>
  );
}

export default PostLinkButton;
