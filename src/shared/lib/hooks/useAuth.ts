import { useCallback, useEffect } from 'react';
import { supabase } from '@/src/shared/lib/utils/supabase';
import { redirect, useRouter } from 'next/navigation';
import { useClearUser, useSetUser } from '@/src/shared/states';
import { SupabaseUserMeta } from '@/src/shared/entities/user';
import { ADMIN_LIST } from '@/src/shared/consts';

export function useAuth() {
  const router = useRouter();
  const setUser = useSetUser();
  const clearUser = useClearUser();

  const handleSignIn = useCallback(async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) {
      console.error(error);
      return;
    }
  }, []);

  const handleSignOut = useCallback(async () => {
    await supabase.auth.signOut();

    clearUser();
    router.push('/');
  }, [router, clearUser]);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        const adminList = ADMIN_LIST.split(';');
        if (adminList.includes(session.user.email || '')) {
          handleSignOut();
          return;
        }

        setUser(session.user);
      } else {
        clearUser();
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, [setUser, clearUser, handleSignOut]);

  return { handleSignIn, handleSignOut };
}
