import { createClientForServer } from '@/src/shared/lib/utils/supabase/server';
import UserStoreProvider from '@/src/shared/states/user/provider';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

async function AuthProvider({ children }: Props) {
  const supabase = await createClientForServer();
  const { data, error } = await supabase.auth.getUser();

  return <UserStoreProvider user={data.user}>{children}</UserStoreProvider>;
}

export default AuthProvider;
