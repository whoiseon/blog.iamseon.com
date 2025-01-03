'use client';

import { TOCItem } from '@/src/widgets/post/lib/utils';

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  isActive: boolean;
  item: TOCItem;
}

function TableOfContentItem({ item, isActive }: Props) {
  return (
    <div
      className={`${item.level === '1' ? 'pl-0' : item.level === '2' ? 'pl-3' : 'pl-6'} transition`}
    >
      <a
        href={item.link}
        className={`text-[0.875rem] ${isActive ? 'text-green-500 dark:text-neutral-50 hover:text-green-500 dark:hover:text-green-400' : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-50'} font-normal transition`}
      >
        {item.text}
      </a>
    </div>
  );
}

export default TableOfContentItem;
