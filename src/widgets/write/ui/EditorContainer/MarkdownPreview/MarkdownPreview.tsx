'use client';

import MarkdownRender from '@/src/features/post/ui/MarkdownRender';

interface Props {
  markdown: string;
}

function MarkdownPreview({ markdown }: Props) {
  return (
    <div
      id="preview"
      className="pt-[2.5rem] pb-[4rem] px-[5.75rem] flex-1 overflow-y-auto custom-scroll-bar animate-fadeIn"
    >
      <MarkdownRender markdown={markdown} />
    </div>
  );
}

export default MarkdownPreview;
