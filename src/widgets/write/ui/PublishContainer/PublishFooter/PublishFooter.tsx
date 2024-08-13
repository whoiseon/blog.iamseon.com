'use client';

import { Button } from '@/src/shared/ui';

interface Props {
  onCancel: () => void;
  onPublish: () => void;
}

function PublishFooter({ onCancel, onPublish }: Props) {
  return (
    <div className="bg-white dark:bg-black z-50 flex w-full fixed bottom-0 left-0 justify-end gap-x-2 px-5 py-3 border-t-[1px] border-t-neutral-200 dark:border-t-neutral-800 md:static md:p-0 md:border-0">
      <Button onClick={onCancel} variant="primaryGhost">
        취소
      </Button>
      <Button onClick={onPublish} variant="primary" weight="bold">
        출간하기
      </Button>
    </div>
  );
}

export default PublishFooter;
