'use client';

import { ReactNode } from 'react';

interface Props {
  title: string;
  children: ReactNode;
  isSticky?: boolean;
  titleSize?: 'sm' | 'md' | 'lg';
}

function ContentContainer({
  title,
  children,
  isSticky = false,
  titleSize = 'lg',
}: Props) {
  const parseTitleSize = () => {
    switch (titleSize) {
      case 'sm':
        return 'text-sm';
      case 'md':
        return 'text-md';
      case 'lg':
        return 'text-lg';
    }
  };

  return (
    <div
      className={`${isSticky ? 'sticky top-[74px]' : ''} flex flex-col gap-y-3 mt-[1.25rem] lg:mt-[3rem]`}
    >
      <h3
        className={`${parseTitleSize()} font-bold text-neutral-600 dark:text-neutral-400`}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

export default ContentContainer;
