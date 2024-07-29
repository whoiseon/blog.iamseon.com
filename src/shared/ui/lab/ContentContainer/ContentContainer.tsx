'use client';

import { ReactNode } from 'react';

interface Props {
  title: string;
  children: ReactNode;
  isSticky?: boolean;
}

function ContentContainer({ title, children, isSticky = false }: Props) {
  return (
    <div
      className={`${isSticky ? 'sticky top-[74px]' : ''} flex flex-col gap-y-3 mt-[1.25rem] lg:mt-[3rem]`}
    >
      <h3 className="text-lg font-bold text-neutral-600 dark:text-neutral-400">
        {title}
      </h3>
      {children}
    </div>
  );
}

export default ContentContainer;
