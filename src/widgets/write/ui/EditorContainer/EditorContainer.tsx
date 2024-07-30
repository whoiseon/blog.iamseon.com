'use client';

import TagInput from '@/src/features/write/ui/TagInput';
import { useEffect, useMemo, useState } from 'react';
import Editor from '@/src/features/editor/ui/Editor';
import { createYooptaEditor, YooptaContentValue } from '@yoopta/editor';
import { usePublishStoreActions } from '@/src/shared/states';

function EditorContainer() {
  const { setContent } = usePublishStoreActions();

  const editor = useMemo(() => createYooptaEditor(), []);
  const [tags, setTags] = useState<string[]>([]);

  const handleChange = (value: YooptaContentValue) => {
    setContent(value);
  };

  useEffect(() => {
    editor.on('change', handleChange);
    return () => {
      editor.off('change', handleChange);
    };
  }, [editor]);

  return (
    <div className="flex flex-col h-dvh cursor-text">
      <div className="relative">
        <TagInput tags={tags} onChange={setTags} />
        <Editor editor={editor} />
      </div>
    </div>
  );
}

export default EditorContainer;
