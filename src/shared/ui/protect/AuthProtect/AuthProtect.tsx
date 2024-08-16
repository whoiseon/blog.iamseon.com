'use client';

import { PropsWithChildren } from 'react';
import { useUser } from '@/src/shared/states';
import { redirect } from 'next/navigation';

function AuthProtect({ children }: PropsWithChildren) {
  const user = useUser();

  if (!user) {
    return redirect('/');
  }

  return children;
}

export default AuthProtect;
