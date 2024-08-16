import { NextRequest } from 'next/server';
import { updateSession } from '@/src/shared/lib/utils/supabase/server';

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}
