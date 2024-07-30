import Paragraph from '@yoopta/paragraph';
import Blockquote from '@yoopta/blockquote';
import { HeadingOne, HeadingTwo, HeadingThree } from '@yoopta/headings';
import { NumberedList, BulletedList, TodoList } from '@yoopta/lists';
import Code from '@yoopta/code';
import Link from '@yoopta/link';

const Heading1 = HeadingOne.extend({
  options: {
    display: {
      title: '제목1',
      description: '섹션 제목(대)',
    },
  },
});

const Heading2 = HeadingTwo.extend({
  options: {
    display: {
      title: '제목2',
      description: '섹션 제목(중)',
    },
  },
});

const Heading3 = HeadingThree.extend({
  options: {
    display: {
      title: '제목3',
      description: '섹션 제목(소)',
    },
  },
});

const Text = Paragraph.extend({
  options: {
    display: {
      title: '텍스트',
      description: '일반 텍스트',
    },
  },
});

const BlockQuote = Blockquote.extend({
  options: {
    display: {
      title: '인용',
      description: '인용문을 작성하세요',
    },
  },
});

const NumberList = NumberedList.extend({
  options: {
    display: {
      title: '번호 목록',
      description: '번호가 매겨진 목록을 생성하세요',
    },
  },
});

const BulletList = BulletedList.extend({
  options: {
    display: {
      title: '글머리 목록',
      description: '글머리 기호 목록을 생성하세요',
    },
  },
});

const TodoListPlugin = TodoList.extend({
  options: {
    display: {
      title: '할 일 목록',
      description: '할 일 목록을 생성하세요',
    },
  },
});

const CodeSnippet = Code.extend({
  options: {
    display: {
      title: '코드',
      description: '코드 스니펫을 작성하세요',
    },
  },
});

export const plugins = [
  Text,
  Heading1,
  Heading2,
  Heading3,
  BlockQuote,
  NumberList,
  BulletList,
  TodoListPlugin,
  CodeSnippet,
  Link,
];
