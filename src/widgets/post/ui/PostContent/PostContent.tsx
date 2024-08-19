'use client';

import MarkdownRender from '@/src/features/post/ui/MarkdownRender';
import { formatDate } from 'date-fns';

interface Props {
  markdown: string;
  updatedAt: Date;
}

function PostContent({ markdown, updatedAt }: Props) {
  return (
    <div className="mt-[4rem]">
      <div className="post-content">
        <MarkdownRender markdown={markdown} />
      </div>
      <div className="mt-[10rem]">
        <div className="flex flex-col items-end justify-center text-sm">
          <span className="text-neutral-600 dark:text-neutral-400">
            마지막 업데이트
          </span>
          <span className="text-green-500 dark:text-green-400 font-bold">
            {formatDate(new Date(updatedAt), 'yyyy년 MM월 dd일')}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PostContent;
