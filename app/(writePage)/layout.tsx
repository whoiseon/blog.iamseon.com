import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

function WriteLayout({ children }: Props) {
  return children;
}

export default WriteLayout;
