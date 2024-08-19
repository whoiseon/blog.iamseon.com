'use client';

import Link from 'next/link';
import { formatDate } from 'date-fns';

interface Props {
  url: string;
  title: string;
  createdAt: Date;
}

function MainSeriesItem({ url, title, createdAt }: Props) {
  return (
    <Link
      href={`/series/${url}`}
      className="py-2 text-neutral-950 dark:text-neutral-50 hover:text-green-500 dark:hover:text-green-400"
    >
      <div className="flex flex-col">
        <span className="text-inherit text-[15px] font-medium">{title}</span>
        <span className="text-xs mt-1 text-neutral-600 dark:text-neutral-400">
          {formatDate(new Date(createdAt), 'MM월 dd일')}
        </span>
      </div>
    </Link>
  );
}

export default MainSeriesItem;
