import { createClientForServer } from '@/src/shared/lib/utils/supabase/server';
import UserStoreProvider from '@/src/shared/states/user/provider';

interface Props {
  children: JSX.Element;
}

async function AuthProvider({ children }: Props) {
  const supabase = await createClientForServer();
  const { data, error } = await supabase.auth.getUser();

  return <UserStoreProvider user={data.user}>{children}</UserStoreProvider>;
}

export default AuthProvider;
