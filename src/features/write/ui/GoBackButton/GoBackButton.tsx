'use client';

import { Button } from '@/src/shared/ui';
import { useGoBack } from '@/src/shared/lib/hooks';
import { Icons } from '@/src/shared/assets';

interface Props {
  backUrl?: string;
}

function GoBackButton({ backUrl }: Props) {
  const goBack = useGoBack(backUrl);
  return (
    <Button variant="ghost" size="md" onClick={goBack}>
      <div className="flex items-center gap-x-2">
        <Icons.BackArrow width={14} height={14} />
        <span>나가기</span>
      </div>
    </Button>
  );
}

export default GoBackButton;
