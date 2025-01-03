import { ReactNode } from 'react';
import { Icons } from '@/src/shared/assets';
import { useToggle } from '@/src/shared/lib/hooks';

interface Props {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  border?: boolean;
}

function ConfigToggleWrapper({ icon, title, border, children }: Props) {
  const [isOpen, onToggle] = useToggle(true);
  return (
    <div
      className={`flex flex-col ${border ? 'border-b-[1px] border-b-neutral-200 dark:border-b-neutral-800' : ''}`}
    >
      <div
        className={`flex items-center justify-between cursor-pointer py-4 md:py-3 px-5 md:px-2`}
        onClick={onToggle}
      >
        <div className="flex items-center">
          {icon}
          <span className="ml-2 text-sm font-semibold">{title}</span>
        </div>
        <div className="flex items-center">
          <Icons.ConfigArrow
            width={20}
            height={20}
            className={`text-neutral-600 dark:text-neutral-400 transition ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          />
        </div>
      </div>
      {isOpen && children}
    </div>
  );
}

export default ConfigToggleWrapper;
