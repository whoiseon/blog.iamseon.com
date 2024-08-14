'use client';

import { useEffect, useRef, useState } from 'react';

import CodeMirror, { EditorFromTextArea } from 'codemirror';
import { detectJSDOM } from '@/src/shared/lib/utils';

import '../../../lib/styles/editor.css';

import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/display/placeholder';

import 'codemirror/lib/codemirror.css';
import '../../../lib/styles/atom-one-light.css';
import '../../../lib/styles/atom-one-dark.css';
import Toolbar from '@/src/widgets/write/ui/EditorContainer/MarkdownEditor/Toolbar';
import AddLinkModal from '@/src/widgets/write/ui/EditorContainer/MarkdownEditor/AddLinkModal/AddLinkModal';

const removeHeading = (text: string) => {
  return text.replace(/#{1,6} /, '');
};

type AddLinkModalState = {
  top: number | null;
  bottom: number | null;
  left: number;
  visible: boolean;
  stickToRight: boolean;
};

interface Props {
  onChangeMarkdown: (markdown: string) => void;
  onUpload: () => void;
  markdown: string;
  tagInput: React.ReactNode;
  footer: React.ReactNode;
  theme?: string;
  initialBody?: string;
  tempBlobImage?: string | null;
  lastUploadedImage?: string | null;
}

function MarkdownEditor({
  onChangeMarkdown,
  onUpload,
  markdown,
  theme,
  tagInput,
  footer,
  initialBody,
  tempBlobImage,
  lastUploadedImage,
}: Props) {
  const blockElement = useRef<HTMLDivElement>(null);
  const toolbarElement = useRef<HTMLDivElement>(null);
  const editorElement = useRef<HTMLTextAreaElement>(null);

  const [codemirror, setCodemirror] = useState<EditorFromTextArea | null>(null);
  const [addLinkModal, setAddLinkModal] = useState<AddLinkModalState>({
    top: null,
    bottom: null,
    left: 0,
    visible: false,
    stickToRight: false,
  });

  const initialize = () => {
    if (codemirror) return;
    if (!editorElement.current) return;

    const cm = CodeMirror.fromTextArea(editorElement.current, {
      mode: 'markdown',
      theme: `one-${theme}`,
      placeholder: '',
      lineWrapping: true,
    });

    if (detectJSDOM()) return;
    cm.setValue(initialBody || '');
    cm.on('change', (cm) => {
      onChangeMarkdown(cm.getValue());
      const doc = cm.getDoc();

      // scroll to bottom when editing last 5
      const { line } = doc.getCursor();
      const last = doc.lastLine();
      if (last - line < 5) {
        const preview = document.getElementById('preview');
        if (!preview) return;
        preview.scrollTop = preview.scrollHeight;
      }
    });

    setCodemirror(cm);
  };

  const handleOpenAddLinkModal = () => {
    if (!codemirror) return;
    const doc = codemirror.getDoc();
    const cursor = doc.getCursor();
    const cursorPosition = codemirror.cursorCoords(cursor);

    if (!blockElement.current) return;
    const stickToRight =
      cursorPosition.left > blockElement.current.clientWidth - 341;
    const calculatedTop =
      blockElement.current.scrollTop +
      cursorPosition.top +
      codemirror.defaultTextHeight() / 2 +
      1;

    const isAtTheBottom =
      calculatedTop + 173 > blockElement.current?.clientHeight;
    const position = isAtTheBottom
      ? { top: null, bottom: 64 }
      : { top: calculatedTop, bottom: null };

    setAddLinkModal({
      ...position,
      left: cursorPosition.left,
      stickToRight,
      visible: true,
    });
  };

  const handleCancelAddLinkModal = () => {
    setAddLinkModal({
      ...addLinkModal,
      visible: false,
    });
  };

  const handleConfirmAddLink = (link: string) => {
    // insert link function
    setAddLinkModal({
      ...addLinkModal,
      visible: false,
    });

    if (!codemirror) return;

    const doc = codemirror.getDoc();
    const selection = doc.getSelection();
    const cursor = doc.getCursor('end');
    codemirror.focus();

    if (selection.length === 0) {
      doc.replaceSelection(`[링크텍스트](${link})`);
      doc.setSelection(
        { line: cursor.line, ch: cursor.ch + 1 },
        { line: cursor.line, ch: cursor.ch + 6 },
      );
      return;
    }

    doc.replaceSelection(`[${selection}](${link})`);
    doc.setCursor({
      line: cursor.line,
      ch: cursor.ch + link.length + 4,
    });
  };

  const handleToolbarClick = (mode: string) => {
    if (!codemirror) return;
    const doc = codemirror.getDoc();
    const cursor = doc.getCursor();
    const selection = {
      start: doc.getCursor('start'),
      end: doc.getCursor('end'),
    };
    const line = doc.getLine(cursor.line);
    const selectWholeLine = () => {
      doc.setSelection(
        { line: cursor.line, ch: 0 },
        { line: cursor.line, ch: line.length },
      );
    };

    const toolbarHandlers: { [key: string]: Function } = {
      ...[1, 2, 3, 4]
        .map((number) => () => {
          const characters = '#'.repeat(number);
          const plain = removeHeading(line);
          console.log('plain', plain);
          selectWholeLine();
          doc.replaceSelection(`${characters} ${plain}`);
        })
        .reduce((headingHandlers, handler, index) => {
          return Object.assign(headingHandlers, {
            [`heading${index + 1}`]: handler,
          });
        }, {}),
      bold: () => {
        const selected = doc.getSelection();

        if (selected === '텍스트') {
          const isBold = /\*\*(.*)\*\*/.test(
            doc.getRange(
              { line: selection.start.line, ch: selection.start.ch - 2 },
              { line: selection.start.line, ch: selection.end.ch + 2 },
            ),
          );

          if (isBold) {
            doc.setSelection(
              { line: selection.start.line, ch: selection.start.ch - 2 },
              { line: selection.start.line, ch: selection.end.ch + 2 },
            );
            doc.replaceSelection('텍스트');
            doc.setSelection(
              { line: selection.start.line, ch: selection.start.ch - 2 },
              { line: selection.start.line, ch: selection.end.ch - 2 },
            );
            return;
          }
        }

        if (/\*\*(.*)\*\*/.test(selected)) {
          doc.replaceSelection(selected.replace(/\*\*/g, ''));
          doc.setSelection(
            { line: selection.start.line, ch: selection.start.ch },
            { line: selection.end.line, ch: selection.end.ch - 2 },
          );
          return;
        }

        if (selected.length > 0) {
          doc.replaceSelection(`**${selected}**`);
          doc.setSelection(
            {
              line: selection.start.line,
              ch: selection.start.ch,
            },
            { line: selection.end.line, ch: selection.end.ch + 4 },
          );
          return;
        }

        doc.replaceSelection('**텍스트**');
        doc.setSelection(
          {
            line: cursor.line,
            ch: cursor.ch + 2,
          },
          {
            line: cursor.line,
            ch: cursor.ch + 5,
          },
        );
      },
      italic: () => {
        let selected = doc.getSelection();

        if (selected.length === 0) {
          doc.replaceSelection('_텍스트_');
          doc.setSelection(
            {
              line: cursor.line,
              ch: cursor.ch + 1,
            },
            {
              line: cursor.line,
              ch: cursor.ch + 4,
            },
          );
          return;
        }

        if (selected === '텍스트') {
          const selectLeftAndRight = doc.getRange(
            { line: selection.start.line, ch: selection.start.ch - 1 },
            { line: selection.start.line, ch: selection.end.ch + 1 },
          );

          if (/_(.*)_/.test(selectLeftAndRight)) {
            selected = selectLeftAndRight;
            doc.setSelection(
              { line: selection.start.line, ch: selection.start.ch - 1 },
              { line: selection.start.line, ch: selection.end.ch + 1 },
            );
            selection.start = {
              line: selection.start.line,
              ch: selection.start.ch - 1,
            };
            selection.end = {
              line: selection.end.line,
              ch: selection.end.ch + 1,
            };
          }
        }

        if (/_(.*)_/.test(selected)) {
          const plain = selected.replace(/^_/, '').replace(/_$/, '');
          doc.replaceSelection(plain);
          doc.setSelection(
            { line: selection.start.line, ch: selection.start.ch },
            { line: selection.end.line, ch: selection.end.ch - 2 },
          );
          return;
        }

        if (selected.length > 0) {
          doc.replaceSelection(`_${selected}_`);
          doc.setSelection(
            { line: selection.start.line, ch: selection.start.ch },
            { line: selection.end.line, ch: selection.end.ch + 2 },
          );
          return;
        }
      },
      strike: () => {
        let selected = doc.getSelection();

        if (selected.length === 0) {
          doc.replaceSelection('~~텍스트~~');
          doc.setSelection(
            {
              line: cursor.line,
              ch: cursor.ch + 2,
            },
            {
              line: cursor.line,
              ch: cursor.ch + 5,
            },
          );
          return;
        }

        if (selected === '텍스트') {
          const selectLeftAndRight = doc.getRange(
            { line: selection.start.line, ch: selection.start.ch - 2 },
            { line: selection.start.line, ch: selection.end.ch + 2 },
          );

          if (/~~(.*)~~/.test(selectLeftAndRight)) {
            selected = selectLeftAndRight;
            doc.setSelection(
              { line: selection.start.line, ch: selection.start.ch - 2 },
              { line: selection.start.line, ch: selection.end.ch + 2 },
            );
            selection.start = {
              line: selection.start.line,
              ch: selection.start.ch - 2,
            };
            selection.end = {
              line: selection.end.line,
              ch: selection.end.ch + 2,
            };
          }
        }

        if (/~~(.*)~~/.test(selected)) {
          const plain = selected.replace(/^~~/, '').replace(/~~$/, '');
          doc.replaceSelection(plain);
          doc.setSelection(
            { line: selection.start.line, ch: selection.start.ch },
            { line: selection.end.line, ch: selection.end.ch - 4 },
          );
          return;
        }

        if (selected.length > 0) {
          doc.replaceSelection(`~~${selected}~~`);
          doc.setSelection(
            { line: selection.start.line, ch: selection.start.ch },
            { line: selection.end.line, ch: selection.end.ch + 4 },
          );
          return;
        }
      },
      blockquote: () => {
        const matches = /^> /.test(line);

        // select all current cursor line
        doc.setSelection(
          { line: cursor.line, ch: 0 },
          { line: cursor.line, ch: line.length },
        );

        if (matches) {
          doc.replaceSelection(line.replace(/^> /, ''));
          doc.setCursor({ line: cursor.line, ch: cursor.ch - 2 });
          return;
        } else {
          doc.replaceSelection(`> ${line}`);
          doc.setCursor({ line: cursor.line, ch: cursor.ch + 2 });
        }
      },
      codeBlock: () => {
        const selected = doc.getSelection();
        if (selected.length === 0) {
          doc.replaceSelection('```\n코드를 입력하세요\n```');
          doc.setSelection(
            { line: cursor.line + 1, ch: 0 },
            { line: cursor.line + 1, ch: 9 },
          );
          return;
        }
        doc.replaceSelection(`\`\`\`\n${selected}\n\`\`\``);
      },
      link: () => {
        handleOpenAddLinkModal();
      },
      image: () => {
        onUpload();
      },
    };

    const handler = toolbarHandlers[mode];
    if (!handler) return;
    handler();

    codemirror.focus();
  };

  const addTempImageBlobToEditor = (blobUrl: string) => {
    const imageMarkdown = `![업로드중..](${blobUrl})`;

    if (!codemirror) return;
    codemirror.getDoc().replaceSelection(imageMarkdown);
  };

  const addImageToEditor = (image: string) => {
    if (!codemirror) return;
    const lines = codemirror.getValue().split('\n');
    const lineIndex = lines.findIndex((line) => line.includes('![업로드중..]'));
    if (lineIndex === -1) return;

    const startCh = lines[lineIndex].indexOf('![업로드중..');
    codemirror
      .getDoc()
      .replaceRange(
        `![](${encodeURI(image)})`,
        { line: lineIndex, ch: startCh },
        { line: lineIndex, ch: lines[lineIndex].length },
      );
  };

  useEffect(() => {
    if (!tempBlobImage) return;
    addTempImageBlobToEditor(tempBlobImage);
  }, [tempBlobImage]);

  useEffect(() => {
    if (!lastUploadedImage) return;
    addImageToEditor(lastUploadedImage);
  }, [lastUploadedImage]);

  useEffect(() => {
    initialize();
  }, []);

  return (
    <div className="markdown-editor-block animate-fadeIn" ref={blockElement}>
      <div className="min-h-0 flex-1 flex flex-col">
        <div className="px-[3rem] pt-[2rem]">
          {tagInput}
          <Toolbar onClick={handleToolbarClick} innerRef={toolbarElement} />
        </div>
        <div className="flex flex-col flex-1 min-h-0">
          {addLinkModal.visible && (
            <AddLinkModal
              left={addLinkModal.left}
              top={addLinkModal.top}
              bottom={addLinkModal.bottom}
              stickToRight={addLinkModal.stickToRight}
              onConfirm={handleConfirmAddLink}
              onClose={handleCancelAddLinkModal}
            />
          )}
          <textarea ref={editorElement} style={{ display: 'none' }} />
        </div>
      </div>
      {footer}
    </div>
  );
}

export default MarkdownEditor;
