'use client';

import Image from 'next/image';
import TagGroup from '@/src/widgets/tag/ui/TagGroup';
import { formatDate } from 'date-fns';

interface Props {
  thumbnail: string;
  title: string;
  tags: string[];
  createdAt: Date;
}

function PostHeader({ thumbnail, title, tags, createdAt }: Props) {
  return (
    <header>
      <div className="relative flex justify-center items-center rounded-md overflow-hidden mt-5 lg:mt-[3rem] w-[100%]">
        <Image
          className="w-full h-auto"
          src={thumbnail}
          alt="temp image"
          width={800}
          height={385}
          priority
        />
      </div>
      <h1 className="mt-5 text-[2rem] md:text-[2.75rem] font-semibold text-neutral-900 dark:text-neutral-100 break-keep leading-[1.25]">
        {title}
      </h1>
      <TagGroup className="mt-5" tags={tags} isHighlight={false} />
      <section className="mt-8">
        <span className="text-neutral-600 dark:text-neutral-400 text-[14px]">
          {formatDate(new Date(createdAt), 'yyyy년 MM월 dd일')}
        </span>
      </section>
    </header>
  );
}

export default PostHeader;
