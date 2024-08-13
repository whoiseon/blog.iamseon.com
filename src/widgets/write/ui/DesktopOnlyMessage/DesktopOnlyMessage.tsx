'use client';

import { Button } from '@/src/shared/ui';
import { useGoBack } from '@/src/shared/lib/hooks';

function DesktopOnlyMessage() {
  const goBack = useGoBack('/');

  return (
    <div className="flex flex-col flex-1 gap-y-4 items-center md:hidden pt-[4rem]">
      <div>
        <p className="text-center">
          데스크탑 환경에서만 <br />{' '}
          <b className="text-green-500 dark:text-green-400">포스팅</b>을 할 수
          있습니다.
        </p>
      </div>
      <Button onClick={goBack} variant="primary" size="lg" weight="bold">
        홈으로
      </Button>
    </div>
  );
}

export default DesktopOnlyMessage;
