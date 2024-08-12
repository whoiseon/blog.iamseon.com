'use client';

import dynamic from 'next/dynamic';

const EditorContainer = dynamic(
  () => import('@/src/widgets/write/ui/EditorContainer'),
  {
    ssr: true,
  },
);

function WritePage() {
  return (
    <main className="w-full h-full overflow-hidden">
      <EditorContainer />
    </main>
  );
}

export default WritePage;
