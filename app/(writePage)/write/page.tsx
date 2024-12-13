import WritePage from '@/src/views/write';
import EditorServerProvider from '@/src/widgets/write/ui/EditorServerProvider';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

type SearchParams = {
  id: string;
};

interface Props {
  searchParams: Promise<SearchParams>;
}

async function PostWritePage(props: Props) {
  const searchParams = await props.searchParams;
  const postId = Number(searchParams.id);

  return (
    <EditorServerProvider postId={postId}>
      <WritePage />
      <ToastContainer />
    </EditorServerProvider>
  );
}

export default PostWritePage;
