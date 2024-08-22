'use client';

import Link from 'next/link';
import { escapeForUrl } from '@/src/shared/lib/utils';
import { useGetQueryString } from '@/src/shared/lib/hooks';
import { Icons } from '@/src/shared/assets';

interface TagProps {
  name: string;
  className?: string;
  isHighlight?: boolean;
  isButton?: boolean;
  onClick?: () => void;
  size?: 'md' | 'lg';
}

function Tag({
  name,
  isHighlight = true,
  className,
  isButton = false,
  onClick,
  size = 'md',
}: TagProps) {
  const currentQueryTitle = useGetQueryString('tag');
  const isCurrentTag = currentQueryTitle === escapeForUrl(name);

  if (isButton) {
    return (
      <div
        className={`cursor-pointer inline-flex font-medium items-center justify-center rounded-2xl border-[1px] border-transparent py-1 pl-[10px] pr-2 text-[13px] ${isCurrentTag && isHighlight ? 'bg-tag-green-alpha-500 hover:bg-tag-green-alpha-600 dark:bg-tag-green-alpha-400 dark:hover:bg-tag-green-alpha-300 text-green-600 dark:text-green-300' : `bg-tag-bg-white hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 ${className}`}`}
        onClick={onClick}
      >
        {name}
      </div>
    );
  }

  return (
    <Link
      className={`inline-flex font-medium items-center justify-center border-[1px] border-transparent ${size === 'md' ? 'py-1 pl-[10px] pr-2 text-[13px] rounded-2xl' : 'py-[4px] pl-[14px] pr-3 text-[15px] rounded-3xl'} ${isCurrentTag && isHighlight ? 'bg-tag-green-alpha-500 hover:bg-tag-green-alpha-600 dark:bg-tag-green-alpha-400 dark:hover:bg-tag-green-alpha-300 text-green-600 dark:text-green-300' : `bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 ${className}`}`}
      href={isCurrentTag ? '/' : `/?tag=${escapeForUrl(name)}`}
    >
      {name}
      {isCurrentTag && <Icons.Close className="ml-1" width={14} height={14} />}
    </Link>
  );
}

export default Tag;
