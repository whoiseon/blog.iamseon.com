'use client';

import { Icons } from '@/src/shared/assets';

interface Props {
  onClick?: Function;
  innerRef?: React.RefObject<HTMLDivElement>;
}

const TOOLBAR_ITEM_CLASSNAME =
  'w-[2.5rem] h-[2.5rem] flex items-center justify-center text-[1.5rem] text-neutral-600 dark:text-neutral-400 cursor-pointer shrink-0 rounded-md bg-transparent dark:bg-transparent hover:bg-neutral-100 hover:dark:bg-neutral-900 transition';

const SEPARATOR_CLASSNAME =
  'w-[1px] h-[1.25rem] bg-neutral-200 dark:bg-neutral-800 mx-2';

function Toolbar({ onClick = () => {}, innerRef }: Props) {
  return (
    <div
      id="toolbar"
      className="w-full top-0 flex items-center mb-[1rem] bg-neutral-50 dark:bg-neutral-950 z-10 flex-wrap gap-x-1 -ml-2"
      ref={innerRef}
    >
      {[1, 2, 3, 4].map((number) => (
        <button
          key={number}
          className={TOOLBAR_ITEM_CLASSNAME}
          value={number}
          onClick={() => onClick(`heading${number}`)}
        >
          <div className="flex items-start text-[1.25rem] font-semibold font-serif">
            <Icons.Heading width={22} height={22} />
            <span className="text-[0.75rem] -ml-[2px] -mt-[4px]">{number}</span>
          </div>
        </button>
      ))}
      <div className={SEPARATOR_CLASSNAME} />
      <button
        className={`${TOOLBAR_ITEM_CLASSNAME}`}
        onClick={() => onClick('bold')}
      >
        <Icons.Bold width={16} height={16} />
      </button>
      <button
        className={`${TOOLBAR_ITEM_CLASSNAME}`}
        onClick={() => onClick('italic')}
      >
        <Icons.Italic width={20} height={20} />
      </button>
      <button
        className={`${TOOLBAR_ITEM_CLASSNAME}`}
        onClick={() => onClick('strike')}
      >
        <Icons.Strike />
      </button>
      <div className={SEPARATOR_CLASSNAME} />
      <button
        className={`${TOOLBAR_ITEM_CLASSNAME}`}
        onClick={() => onClick('blockquote')}
        value="blockquote"
      >
        <Icons.Blockquote width={20} height={20} />
      </button>
      <button
        className={`${TOOLBAR_ITEM_CLASSNAME}`}
        onClick={() => onClick('codeBlock')}
      >
        <Icons.CodeBlock width={28} height={28} />
      </button>
      <button
        className={`${TOOLBAR_ITEM_CLASSNAME}`}
        onClick={() => onClick('link')}
      >
        <Icons.Link />
      </button>
      <button
        className={`${TOOLBAR_ITEM_CLASSNAME}`}
        onClick={() => onClick('image')}
      >
        <Icons.Image />
      </button>
    </div>
  );
}

export default Toolbar;
