import { createClientForServer } from '@/src/shared/lib/utils/supabase/server';

interface Props {
  children: JSX.Element;
}

async function AuthProvider({ children }: Props) {
  const supabase = await createClientForServer();
  const { data, error } = await supabase.auth.getUser();
  console.log(data.user);

  return children;
}

export default AuthProvider;
