'use client';

import { useEffect, useRef } from 'react';
import MarkdownRender from '@/src/features/post/ui/MarkdownRender';

interface Props {
  markdown: string;
}

function MarkdownPreview({ markdown }: Props) {
  const Wrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      Wrapper.current &&
      Wrapper.current.scrollHeight > Wrapper.current.clientHeight
    ) {
      const scrollHeight = Wrapper.current.scrollHeight;
      const clientHeight = Wrapper.current.clientHeight;
      Wrapper.current.scrollTop = scrollHeight - clientHeight;
    }
  }, [markdown]);

  return (
    <div
      id="preview"
      className="p-[2.5rem] flex-1 overflow-y-auto"
      ref={Wrapper}
    >
      <MarkdownRender markdown={markdown} />
    </div>
  );
}

export default MarkdownPreview;
