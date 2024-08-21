'use client';

import Image from 'next/image';
import { LinkButton } from '@/src/shared/ui';

function RootNotFound() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-dvh">
      <div className="relative flex items-center justify-center">
        <Image
          src="/image/not-found-image.png"
          alt="404 image"
          width={270}
          height={122}
        />
      </div>
      <h1 className="text-neutral-950 dark:text-neutral-50 mt-8 text-[1.5rem] md:text-[2rem]">
        페이지를 찾을 수 없습니다!
      </h1>
      <LinkButton
        href="/"
        variant="primary"
        weight="bold"
        size="lg"
        className="mt-8"
      >
        홈으로
      </LinkButton>
    </div>
  );
}

export default RootNotFound;
