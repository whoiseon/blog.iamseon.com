'use client';

import { ReactNode } from 'react';

interface Props {
  title: string;
  children: ReactNode;
  isSticky?: boolean;
  titleSize?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

function ContentContainer({
  title,
  children,
  isSticky = false,
  titleSize = 'lg',
  className,
}: Props) {
  const parseTitleSize = () => {
    switch (titleSize) {
      case 'sm':
        return 'text-sm';
      case 'md':
        return 'text-md';
      case 'lg':
        return 'text-lg';
      case 'xl':
        return 'text-xl';
    }
  };

  return (
    <div
      className={`${className ? className : ''} ${isSticky ? 'sticky top-[74px]' : ''} flex flex-col gap-y-3 mt-[1.25rem] lg:mt-[3rem]`}
    >
      <div className="flex items-center justify-between">
        <h3
          className={`${parseTitleSize()} font-bold text-neutral-600 dark:text-neutral-400`}
        >
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}

export default ContentContainer;
