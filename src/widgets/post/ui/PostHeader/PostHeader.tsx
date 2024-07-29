'use client';

import Image from 'next/image';
import TagGroup from '@/src/widgets/tag/ui/TagGroup';

function PostHeader() {
  return (
    <header>
      <div className="relative flex justify-center items-center rounded-md overflow-hidden mt-5 lg:mt-[3rem] w-[100%]">
        <Image
          className="w-full h-auto"
          src="/image/temp-image-1.png"
          alt="temp image"
          width={800}
          height={385}
          priority
        />
      </div>
      <h1 className="mt-5 text-[2rem] md:text-[2.75rem] font-semibold text-neutral-900 dark:text-neutral-100 break-keep leading-[1.25]">
        고성능 GPU 클러스터 도입기 #1: 요리하라고 해서 왔는데 프라이팬이 없어요
      </h1>
      <TagGroup
        className="mt-5"
        tags={['react', 'typescript']}
        isHighlight={false}
      />
      <section className="mt-8">
        <span className="text-neutral-600 dark:text-neutral-400 text-[14px]">
          2024년 7월 29일
        </span>
      </section>
    </header>
  );
}

export default PostHeader;
