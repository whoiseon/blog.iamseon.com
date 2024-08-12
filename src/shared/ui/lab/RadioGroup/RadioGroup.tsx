'use client';

import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

function RadioGroup({ children }: Props) {
  return <div className="flex flex-col gap-y-3">{children}</div>;
}

export default RadioGroup;
