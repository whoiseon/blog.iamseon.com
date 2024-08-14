import React, { useCallback, useState } from 'react';

export type ChangeEventType = React.ChangeEvent<HTMLInputElement> &
  React.ChangeEvent<HTMLTextAreaElement> &
  React.ChangeEvent<HTMLSelectElement>;

export function useInput(initialValue: string) {
  const [state, setState] = useState(initialValue);

  const onChange = useCallback((e: ChangeEventType) => {
    setState(e.target.value);
  }, []);

  return [state, onChange, setState] as const;
}
