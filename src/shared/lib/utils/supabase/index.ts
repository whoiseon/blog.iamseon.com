import { createBrowserClient } from '@supabase/ssr';
import { SUPABASE_KEY, SUPABASE_URL } from '@/src/shared/lib/consts/supabase';

const supabase = createBrowserClient(SUPABASE_URL, SUPABASE_KEY);

export { supabase };
