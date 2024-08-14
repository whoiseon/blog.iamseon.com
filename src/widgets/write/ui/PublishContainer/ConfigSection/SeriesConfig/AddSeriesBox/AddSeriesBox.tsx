'use client';

import { Button } from '@/src/shared/ui';
import { useState } from 'react';
import { useInput } from '@/src/shared/lib/hooks';
import { useMutationAddSeries } from '@/src/widgets/write/api';
import { escapeForUrl } from '@/src/shared/lib/utils';

function AddSeriesBox() {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [newSeries, handleChangeNewSeries, setNewSeries] = useInput('');

  const { mutate } = useMutationAddSeries(() => {
    setIsFocus(false);
    setNewSeries('');
  });

  const onAdd = () => {
    if (!newSeries) return;

    mutate({
      name: newSeries,
      urlSlug: escapeForUrl(newSeries),
    });
  };

  return (
    <div className="flex flex-col p-2">
      <input
        type="text"
        className="rounded-sm h-[34px] text-sm px-2 outline-none"
        placeholder="새로운 시리즈 이름을 입력하세요"
        value={newSeries}
        onChange={handleChangeNewSeries}
        onFocus={() => setIsFocus(true)}
      />
      {isFocus && (
        <div className="mt-2 flex items-center justify-end gap-x-1">
          <Button variant="ghost" size="xs" onClick={() => setIsFocus(false)}>
            취소
          </Button>
          <Button onClick={onAdd} variant="reverse" size="xs" weight="bold">
            시리즈 추가
          </Button>
        </div>
      )}
    </div>
  );
}

export default AddSeriesBox;
