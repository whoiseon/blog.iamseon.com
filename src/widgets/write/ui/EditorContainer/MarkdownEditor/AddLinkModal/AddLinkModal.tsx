'use client';

import OutsideClickHandler from 'react-outside-click-handler';
import { useCallback, useRef, useState } from 'react';
import { Button } from '@/src/shared/ui';

interface Props {
  left: number;
  top: number | null;
  bottom: number | null;
  stickToRight?: boolean;
  onConfirm: (link: string) => void;
  onClose: () => void;
  onDelete?: () => void;
}

function AddLinkModal({
  left,
  top,
  bottom,
  stickToRight,
  onClose,
  onConfirm,
  onDelete,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onConfirm(value);
    },
    [value, onConfirm],
  );

  return (
    <OutsideClickHandler onOutsideClick={onClose}>
      <div
        className="z-50 absolute mb-4"
        style={{
          left: stickToRight ? 'initial' : left,
          top: top || 'initial',
          bottom: bottom || 'initial',
          right: stickToRight ? '2.5rem' : 'initial',
        }}
      >
        <div className="mt-4 w-[20rem] bg-white dark:bg-black rounded-md border-[1px] border-neutral-200 dark:border-neutral-800 shadow-md px-4 pt-4 pb-[1.825rem]">
          <div className="mb-3">
            <div className="text-neutral-600 dark:text-neutral-400">
              링크 등록
            </div>
          </div>
          <form onSubmit={onSubmit} className="flex gap-2">
            <input
              type="text"
              className="bg-white dark:bg-black flex-1 outline-none border-b-[1px] border-b-neutral-200 dark:border-b-neutral-800 transition focus:border-b-green-500 dark:focus:border-b-green-400"
              onChange={handleChange}
              ref={inputRef}
              placeholder="URL을 입력하세요"
            />
            <Button type="submit" variant="primary" weight="bold" size="sm">
              등록
            </Button>
          </form>
        </div>
      </div>
    </OutsideClickHandler>
  );
}

export default AddLinkModal;
