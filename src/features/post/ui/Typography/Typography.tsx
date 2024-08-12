'use client';

import '../../lib/styles/typography.css';

import { PropsWithChildren } from 'react';

function Typography({ children }: PropsWithChildren) {
  return <div className="typography-block">{children}</div>;
}

export default Typography;
