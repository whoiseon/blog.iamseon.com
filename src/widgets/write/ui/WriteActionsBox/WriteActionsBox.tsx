'use client';

import TempSaveButton from '@/src/features/write/ui/TempSaveButton';
import PublishButton from '@/src/features/write/ui/PublishButton';

function WriteActionsBox() {
  return (
    <div className="hidden items-center justify-center gap-x-2.5 md:flex">
      <TempSaveButton />
      <PublishButton />
    </div>
  );
}

export default WriteActionsBox;
