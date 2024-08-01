'use client';

import TempSaveButton from '@/src/features/write/ui/TempSaveButton';
import PublishButton from '@/src/features/write/ui/PublishButton';

function WriteActionsBox() {
  return (
    <div className="flex items-center justify-center gap-x-2.5">
      <TempSaveButton />
      <PublishButton />
    </div>
  );
}

export default WriteActionsBox;
