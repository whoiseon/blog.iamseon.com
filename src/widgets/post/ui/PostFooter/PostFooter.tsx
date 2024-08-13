'use client';

import PostLinkButton from '@/src/widgets/post/ui/PostFooter/PostLinkButton';
import ContentContainer from '@/src/shared/ui/lab/ContentContainer';
import PostList from '@/src/widgets/post/ui/PostList';

function PostFooter() {
  return (
    <div className="flex flex-col mt-[4rem]">
      <div className="flex flex-col">
        <div>
          <span className="inline-flex text-sm font-bold px-2 py-[2px] rounded-md bg-green-500 dark:bg-green-400 text-white dark:text-neutral-900">
            Inseon Hwang
          </span>
        </div>
        <p className="mt-3 leading-[1.6]">
          느리더라도 꾸준히 성장하는 웹 엔지니어 입니다. 기술의 변화가 빠른
          시대에, 한 걸음씩 나아가며 배움을 즐기고 있습니다.
        </p>
      </div>
      <div className="mt-[3rem] mb-3 flex flex-col gap-y-4 md:flex-row md:gap-x-6 items-center justify-between">
        <PostLinkButton type="prev" href="/" />
        <PostLinkButton type="next" href="/" />
      </div>
      <ContentContainer title="시리즈">
        <PostList />
      </ContentContainer>
    </div>
  );
}

export default PostFooter;