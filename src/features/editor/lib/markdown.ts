import { Bold, CodeMark, Italic, Strike, Underline } from '@yoopta/marks';
import { createYooptaMark, YooptaMarkProps } from '@yoopta/editor';

type CustomCodeMarkProps = YooptaMarkProps<'code', boolean>;

const CustomCodeMark = createYooptaMark<CustomCodeMarkProps>({
  type: 'code',
  render: CodeMark.render,
  hotkey: '`',
});

export const marks = [Bold, Italic, CustomCodeMark, Underline, Strike];
