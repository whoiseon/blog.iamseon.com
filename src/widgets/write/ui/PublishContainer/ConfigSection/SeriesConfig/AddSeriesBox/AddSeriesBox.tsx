'use client';

import { Button } from '@/src/shared/ui';
import { useState } from 'react';
import { useInput } from '@/src/shared/lib/hooks';
import { useMutationAddSeries } from '@/src/widgets/write/api';
import { escapeForUrl } from '@/src/shared/lib/utils';

function AddSeriesBox() {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [newSeries, handleChangeNewSeries, setNewSeries] = useInput('');
  const [urlSlug, handleChangeUrlSlug, setUrlSlug] = useInput('');

  const { mutate } = useMutationAddSeries(() => {
    setIsFocus(false);
    setNewSeries('');
  });

  const onAdd = () => {
    if (!newSeries) return;

    mutate({
      name: newSeries,
      urlSlug: urlSlug ? escapeForUrl(urlSlug) : escapeForUrl(newSeries),
    });
  };

  return (
    <div className="flex flex-col p-2">
      <input
        type="text"
        className="rounded-sm h-[34px] text-sm px-2 outline-none bg-neutral-100 dark:bg-neutral-900 placeholder:text-neutral-600 placeholder:dark:text-neutral-400"
        placeholder="새로운 시리즈 이름을 입력하세요"
        value={newSeries}
        onChange={handleChangeNewSeries}
        onFocus={() => setIsFocus(true)}
      />
      {isFocus && (
        <div className="flex flex-col mt-1">
          <div className="flex items-center h-[34px] bg-neutral-100 dark:bg-neutral-900 px-2">
            <span className="text-neutral-600 dark:text-neutral-400 text-sm">
              /series/
            </span>
            <input
              type="text"
              className="bg-neutral-100 dark:bg-neutral-900 w-full outline-none text-sm text-neutral-800 dark:text-neutral-200 pl-[1px]"
              value={urlSlug}
              onChange={handleChangeUrlSlug}
            />
          </div>
          <div className="mt-2 flex items-center justify-end gap-x-1">
            <Button variant="ghost" size="xs" onClick={() => setIsFocus(false)}>
              취소
            </Button>
            <Button onClick={onAdd} variant="reverse" size="xs" weight="bold">
              시리즈 추가
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddSeriesBox;
