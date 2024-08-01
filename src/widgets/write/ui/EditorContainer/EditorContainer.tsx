'use client';

import TagInput from '@/src/features/write/ui/TagInput';
import { useEffect, useMemo, useState } from 'react';
import Editor from '@/src/features/editor/ui/Editor';
import { createYooptaEditor, YooptaContentValue } from '@yoopta/editor';
import { usePublishStore, usePublishStoreActions } from '@/src/shared/states';

function EditorContainer() {
  const editor = useMemo(() => createYooptaEditor(), []);
  const { tags } = usePublishStore();
  const { setEditor, setTags } = usePublishStoreActions();

  useEffect(() => {
    if (!editor) return;
    setEditor(editor);
  }, [editor]);

  return (
    <div className="flex flex-col h-dvh cursor-text">
      <div className="relative">
        <TagInput tags={tags || []} onChange={setTags} />
        <Editor editor={editor} />
      </div>
    </div>
  );
}

export default EditorContainer;
