'use client';

import GoBackButton from '@/src/features/write/ui/GoBackButton';
import { Button } from '@/src/shared/ui';

interface Props {
  edit: boolean;
  onPublish: () => void;
  onTempSave: () => void;
}

function WriteFooter({ edit, onPublish, onTempSave }: Props) {
  return (
    <div className="flex justify-between items-center bg-white dark:bg-black w-full h-[4rem] px-5 border-t-[1px] border-t-neutral-200 dark:border-t-neutral-900">
      <GoBackButton />
      <div className="flex items-center gap-x-2">
        <Button onClick={onTempSave} variant="primaryGhost" size="sm">
          임시저장
        </Button>
        <Button onClick={onPublish} variant="primary" size="sm" weight="bold">
          {edit ? '수정하기' : '출간하기'}
        </Button>
      </div>
    </div>
  );
}

export default WriteFooter;
