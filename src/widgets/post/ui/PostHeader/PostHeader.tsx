'use client';

import Image from 'next/image';
import TagGroup from '@/src/widgets/tag/ui/TagGroup';
import { formatDate } from 'date-fns';
import { useUser } from '@/src/shared/states';
import { Button, LinkButton } from '@/src/shared/ui';
import { useDeleteMutation } from '@/src/widgets/post/api/useDeleteMutation';

interface Props {
  postId: number;
  thumbnail: string;
  title: string;
  tags: string[];
  createdAt: Date;
}

function PostHeader({ postId, thumbnail, title, tags, createdAt }: Props) {
  const user = useUser();
  const { mutate } = useDeleteMutation();

  const onDelete = () => {
    if (confirm('포스트를 정말 삭제하시겠습니까?')) {
      mutate(postId);
    }
  };

  return (
    <header>
      {user && (
        <div className="flex items-center gap-x-2 mt-[3rem]">
          <LinkButton
            href={`/write?id=${postId}`}
            weight="medium"
            className="underline"
          >
            수정
          </LinkButton>
          <Button
            className="text-red-500 dark:text-red-400 underline"
            weight="medium"
            onClick={onDelete}
          >
            삭제
          </Button>
        </div>
      )}
      {thumbnail && (
        <div className="relative flex justify-center items-center rounded-md overflow-hidden mt-5 lg:mt-[3rem] w-[100%]">
          <Image
            className="w-full h-auto"
            src={thumbnail}
            alt="temp image"
            width={1280}
            height={720}
            priority
          />
        </div>
      )}
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
