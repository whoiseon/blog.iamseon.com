import { useState } from 'react';

export function useToggle(initialState: boolean = false) {
  const [toggle, setToggle] = useState<boolean>(initialState);

  const onToggle = () => {
    setToggle((prev) => !prev);
  };

  return [toggle, onToggle] as const;
}
