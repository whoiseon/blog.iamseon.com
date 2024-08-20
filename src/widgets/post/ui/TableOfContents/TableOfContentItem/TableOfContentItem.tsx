'use client';

import { TOCItem } from '@/src/widgets/post/lib/utils';
import { useHeadingViewEffect } from '@/src/shared/lib/hooks';
import { useHeadingView } from '@/src/widgets/post/ui/TableOfContents/HeadingViewProvider/HeadingViewProvider';

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  isActive: boolean;
  item: TOCItem;
}

function TableOfContentItem({ item, isActive }: Props) {
  return (
    <div
      className={`${item.level === '1' ? 'pl-0' : item.level === '2' ? 'pl-3' : 'pl-6'} transition ${isActive ? 'scale-105' : 'scale-100'}`}
    >
      <a
        href={item.link}
        className={`text-[0.875rem] ${isActive ? 'scale-105 text-green-500 dark:text-green-400 hover:text-green-500 dark:hover:text-green-400' : 'scale-100 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-50'} font-normal transition`}
      >
        {item.text}
      </a>
    </div>
  );
}

export default TableOfContentItem;
