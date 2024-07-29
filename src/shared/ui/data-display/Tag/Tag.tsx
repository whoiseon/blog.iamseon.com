'use client';

import Link from 'next/link';
import { escapeForUrl } from '@/src/shared/lib/utils';
import { useGetQuery } from '@/src/shared/lib/hooks';
import { Icons } from '@/src/shared/assets';

interface TagProps {
  name: string;
  isHighlight?: boolean;
}

function Tag({ name, isHighlight = true }: TagProps) {
  const currentQueryTitle = useGetQuery('tag');
  const isCurrentTag = currentQueryTitle === escapeForUrl(name);

  return (
    <Link
      className={`inline-flex items-center justify-center rounded-2xl border-[1px] border-transparent py-1 pl-[10px] pr-2 text-[13px] font-normal ${isCurrentTag && isHighlight ? 'bg-tag-green-alpha-500 hover:bg-tag-green-alpha-600 dark:bg-tag-green-alpha-400 dark:hover:bg-tag-green-alpha-300 text-green-600 dark:text-green-300' : 'bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200'}`}
      href={isCurrentTag ? '/' : `/?tag=${escapeForUrl(name)}`}
    >
      {name}
      {isCurrentTag && <Icons.Close className="ml-1" width={14} height={14} />}
    </Link>
  );
}

export default Tag;
