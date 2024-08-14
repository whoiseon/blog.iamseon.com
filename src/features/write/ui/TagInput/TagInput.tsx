'use client';

import OutsideClickHandler from 'react-outside-click-handler';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Tag from '@/src/shared/ui/data-display/Tag';

export interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
}

function TagInput({ onChange, tags: initialTags }: TagInputProps) {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [value, setValue] = useState<string>('');
  const ignore = useRef<boolean>(false);

  useEffect(() => {
    if (tags.length === 0) return;
    onChange(tags);
  }, [tags, onChange]);

  useEffect(() => {
    setTags(initialTags);
  }, [initialTags]);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onOutsideClick = () => {
    if (value === '') return;
    insertTag(value);
  };

  const insertTag = useCallback(
    (tag: string) => {
      ignore.current = true;
      setValue('');

      if (tag === '' || tags.includes(tag)) return;

      let processed = tag;
      processed = tag.trim();

      if (processed.indexOf(' #') > 0) {
        const tempTags: string[] = [];
        const regex = /#(\S+)/g;
        let execArray: RegExpExecArray | null = null;

        while ((execArray = regex.exec(processed))) {
          if (execArray !== null) {
            tempTags.push(execArray[1]);
          }
        }

        setTags([...tags, ...tempTags]);
        return;
      }

      if (processed.charAt(0) === '#') {
        processed = processed.slice(1, processed.length);
      }

      setTags([...tags, processed]);
    },
    [tags],
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace' && value === '') {
        setTags(tags.slice(0, tags.length - 1));
        return;
      }

      const keys = [',', 'Enter'];
      if (keys.includes(e.key)) {
        e.preventDefault();
        insertTag(value);
      }
    },
    [insertTag, tags, value],
  );

  const onRemove = (tag: string) => {
    const nextTags = tags.filter((t) => t !== tag);
    setTags(nextTags);
  };

  console.log(tags);

  return (
    <OutsideClickHandler onOutsideClick={onOutsideClick}>
      <div className="w-full mx-auto">
        <div className="h-full flex items-center flex-wrap gap-2">
          {tags.map((tag, i) => (
            <Tag key={tag} onClick={() => onRemove(tag)} name={tag} isButton />
          ))}
          <input
            className="h-[34px] text-md bg-transparent dark:bg-transparent outline-none placeholder:text-neutral-600 dark:placeholder:text-neutral-500 mb-2"
            onChange={onChangeInput}
            value={value}
            onKeyDown={onKeyDown}
            placeholder="태그를 입력하세요"
          />
        </div>
      </div>
    </OutsideClickHandler>
  );
}

export default TagInput;
