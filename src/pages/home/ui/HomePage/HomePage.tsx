'use client';

import ContentContainer from '@/src/shared/ui/lab/ContentContainer';

function HomePage() {
  return (
    <main className="flex items-stretch">
      <section className="flex items-end flex-col flex-grow mb-[60px]">
        <div className="h-full w-full min-h-[3rem] lg:w-[700px] lg:max-w-[700px] px-5 lg:px-6">
          <ContentContainer title="포스트">
            <p>123123</p>
            <p>123123</p>
            <p>123123</p>
            <p>123123</p>
            <p>123123</p>
            <p>123123</p>
            <p>123123</p>
            <p>123123</p>
            <p>123123</p>
            <p>123123</p>
            <p>123123</p>
            <p>123123</p>
            <p>123123</p>
            <p>123123</p>
            <p>123123</p>
            <p>123123</p>
            <p>123123</p>
            <p>123123</p>
            <p>123123</p>
            <p>123123</p>
            <p>123123</p>
            <p>123123</p>
            <p>123123</p>
            <p>123123</p>
            <p>123123</p>
            <p>123123</p>
            <p>123123</p>
            <p>123123</p>
            <p>123123</p>
            <p>123123</p>
            <p>123123</p>
            <p>123123</p>
            <p>123123</p>
            <p>123123</p>
            <p>123123</p>
            <p>123123</p>
            <p>123123</p>
            <p>123123</p>
            <p>123123</p>
            <p>123123</p>
            <p>123123</p>
            <p>123123</p>
            <p>123123</p>
            <p>123123</p>
            <p>123123</p>
          </ContentContainer>
        </div>
      </section>
      <section className="hidden items-start flex-col flex-grow border-l-[1px] border-l-neutral-200 dark:border-l-neutral-800 mb-[60px] lg:flex">
        <div className="h-full w-[350px] px-6">
          <ContentContainer title="태그" isSticky>
            tags
          </ContentContainer>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
