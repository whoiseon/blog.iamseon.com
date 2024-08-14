'use client';

import { ReactNode } from 'react';

interface MainProps {
  left: ReactNode;
  right: ReactNode;
  leftWidth?: number;
  rightWidth?: number;
}

function MainContainer({ left, right }: MainProps) {
  return (
    <main className="flex items-stretch bg-white dark:bg-black">
      <section className="flex items-start flex-col flex-grow lg:items-end">
        <div className="h-full w-full min-h-[3rem] lg:w-[800px] lg:max-w-[800px] mb-[60px] px-5 lg:px-6 lg:mr-6">
          {left}
        </div>
      </section>
      <section className="hidden items-start flex-col flex-grow border-l-[1px] border-l-neutral-200 dark:border-l-neutral-800 lg:flex">
        <div className="h-full w-[300px] px-6 mb-[60px]">{right}</div>
      </section>
    </main>
  );
}

export default MainContainer;
