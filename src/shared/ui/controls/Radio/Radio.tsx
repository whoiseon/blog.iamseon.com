'use client';

interface Props {
  title: string;
  selected: boolean;
  onClick: () => void;
}

function Radio({ title, selected, onClick }: Props) {
  return (
    <button className="flex items-center justify-between" onClick={onClick}>
      <span className="text-neutral-800 dark:text-neutral-100 text-sm">
        {title}
      </span>
      {selected ? (
        <div className="flex items-center justify-center rounded-full bg-green-500 dark:bg-green-400 w-[20px] h-[20px]">
          <div className="w-[8px] h-[8px] bg-white rounded-full" />
        </div>
      ) : (
        <div className="w-[20px] h-[20px] rounded-full border-[2px] border-neutral-200 dark:border-neutral-800"></div>
      )}
    </button>
  );
}

export default Radio;
