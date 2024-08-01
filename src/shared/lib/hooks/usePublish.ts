import { usePublishStore } from '@/src/shared/states';
import { useCallback, useState } from 'react';
import { YooptaContentValue } from '@yoopta/editor';
import { SlateElement } from '@yoopta/editor/dist/editor/types';

type TextBlock = {
  text: string;
};

export function usePublish() {
  const { editor, tags } = usePublishStore();

  const getTitle = useCallback(() => {
    if (!editor) return;
    let title = '';

    const value: YooptaContentValue = editor.getEditorValue();
    Object.entries(value).forEach(([key, blockData]) => {
      if (blockData.type === 'HeadingOne') {
        const children = (blockData.value[0] as SlateElement)
          .children[0] as TextBlock;
        title = children.text;
      }
    });

    return title;
  }, [editor]);

  const getContent = useCallback((): YooptaContentValue | string | null => {
    if (!editor) return null;
    return editor.getEditorValue();
  }, [editor]);

  const getContentString = useCallback(() => {
    if (!editor) return '';
    return JSON.stringify(editor.getEditorValue());
  }, [editor]);

  const isEmptyContent = useCallback(() => {
    if (!editor) return;

    let isEmpty = true;

    const value: YooptaContentValue = editor.getEditorValue();

    Object.entries(value).forEach(([key, blockData], index) => {
      if (blockData.type !== 'HeadingOne') {
        const children = (blockData.value[0] as SlateElement)
          .children[0] as TextBlock;
        if (children.text !== '') {
          isEmpty = false;
          return;
        }
      }
    });

    return isEmpty;
  }, [editor]);

  return {
    editor,
    getTitle,
    getContent,
    getContentString,
    isEmptyContent,
    tags,
  } as const;
}
