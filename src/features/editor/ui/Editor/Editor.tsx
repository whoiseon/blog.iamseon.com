'use client';

import '@/src/app/styles/post.css';
import '../../styles/index.css';

import YooptaEditor, { YooEditor } from '@yoopta/editor';
import Toolbar, { DefaultToolbarRender } from '@yoopta/toolbar';
import ActionMenuList, {
  DefaultActionMenuRender,
} from '@yoopta/action-menu-list';
import LinkTool, { DefaultLinkToolRender } from '@yoopta/link-tool';
import { marks, plugins } from '@/src/features/editor/lib';

interface EditorProps {
  editor: YooEditor;
  isPost?: boolean;
}

const tools = {
  Toolbar: {
    tool: Toolbar,
    render: DefaultToolbarRender,
  },
  ActionMenu: {
    tool: ActionMenuList,
    render: DefaultActionMenuRender,
  },
  LinkTool: {
    tool: LinkTool,
    render: DefaultLinkToolRender,
  },
};

function Editor({ editor, isPost = false }: EditorProps) {
  return (
    <div className="w-full px-5 pr-5 md:mx-auto md:w-[850px]">
      <YooptaEditor
        readOnly={isPost}
        className="post-content-style"
        editor={editor}
        plugins={plugins}
        placeholder="글을 작성하거나, 명령어를 사용하려면 '/'키를 누르세요"
        tools={tools}
        marks={marks}
      />
    </div>
  );
}

export default Editor;
