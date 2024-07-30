'use client';

import { Button } from '@/src/shared/ui';
import { useGoBack } from '@/src/shared/lib/hooks';
import { Icons } from '@/src/shared/assets';

function GoBackButton() {
  const goBack = useGoBack();
  return (
    <Button variant="ghost" size="sm" onClick={goBack} className="-ml-3">
      <div className="flex items-center gap-x-2">
        <Icons.BackArrow width={14} height={14} />
        <span>나가기</span>
      </div>
    </Button>
  );
}

export default GoBackButton;
