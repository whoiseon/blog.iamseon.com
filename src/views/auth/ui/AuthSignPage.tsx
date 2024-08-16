'use client';

import { useUser } from '@/src/shared/states';
import { useAuth } from '@/src/shared/lib/hooks';
import { redirect } from 'next/navigation';

function AuthSignPage() {
  const user = useUser();
  const { handleSignIn, handleSignOut } = useAuth();

  if (user) {
    redirect('/');
  }

  return (
    <div className="flex items-center justify-center py-[100px] bg-white dark:bg-black">
      <button
        onClick={handleSignIn}
        className="border-[1px] border-neutral-200 dark:border-neutral-800 py-2 px-5 rounded-md bg-transparent hover:bg-neutral-50 dark:hover:bg-neutral-900 text-sm font-semibold"
      >
        구글 계정으로 로그인
      </button>
    </div>
  );
}

export default AuthSignPage;
