import WritePage from '@/src/views/write';
import EditorServerProvider from '@/src/widgets/write/ui/EditorServerProvider';

type SearchParams = {
  id: string;
};

interface Props {
  searchParams: SearchParams;
}

function PostWritePage({ searchParams }: Props) {
  const postId = Number(searchParams.id);

  return (
    <EditorServerProvider postId={postId}>
      <WritePage />
    </EditorServerProvider>
  );
}

export default PostWritePage;
