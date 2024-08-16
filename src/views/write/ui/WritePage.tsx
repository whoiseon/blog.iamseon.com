'use client';

import dynamic from 'next/dynamic';
import AuthProtect from '@/src/shared/ui/protect/AuthProtect';

const EditorContainer = dynamic(
  () => import('@/src/widgets/write/ui/EditorContainer'),
  {
    ssr: true,
  },
);

function WritePage() {
  return (
    <AuthProtect>
      <main className="w-full h-dvh overflow-hidden">
        <EditorContainer />
      </main>
    </AuthProtect>
  );
}

export default WritePage;
