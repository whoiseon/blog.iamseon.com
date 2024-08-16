import { useCallback } from 'react';
import { supabase } from '@/src/shared/lib/utils/supabase';

export function useAuth() {
  const signInWithGoogle = useCallback(async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
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

  return { signInWithGoogle };
}
