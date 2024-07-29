'use client';

function PostContent() {
  return (
    <div className="flex flex-col mt-[4rem]">
      <div className="post-content">
        <p>
          오늘은 토스에서 Employer Branding Manager로 근무하고 있는 차지현님의
          인터뷰를 공유드려요. 지현님은 토스 테크 직군의 채용 브랜딩을 위해
          SLASH 개발자 컨퍼런스, 지금 읽고 있는 토스 테크 블로그와 같은 다양한
          업무를 담당하고 있어요. 개발자로써 “토스에 지원해보고 싶다”라고
          생각해봤다면, 보이지 않는 곳에서 지현님이 기울이시는 노력이 영향을
          미쳤을 가능성이 높아요
        </p>
      </div>
      <div className="mt-[10rem]">
        <div className="flex flex-col items-end justify-center text-sm">
          <span className="text-neutral-600 dark:text-neutral-400">
            마지막 업데이트
          </span>
          <span className="text-green-500 dark:text-green-400 font-bold">
            2024년 7월 29일
          </span>
        </div>
      </div>
    </div>
  );
}

export default PostContent;
