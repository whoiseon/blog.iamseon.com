import AuthSignPage from '@/src/views/auth';
import { isAllowedUser } from '@/src/shared/lib/utils/server';
import { redirect } from 'next/navigation';

function SignPage() {
  const isAllowed = isAllowedUser();

  if (!isAllowed) return redirect('/');

  return <AuthSignPage />;
}

export default SignPage;
