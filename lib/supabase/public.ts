import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Cookie-less Supabase client untuk konten publik.
 *
 * Berbeda dari `lib/supabase/server.ts`, client ini tidak membaca cookies
 * sehingga aman dipakai di Server Component yang di-prerender/di-ISR.
 * Hanya untuk operasi baca yang memang diizinkan RLS untuk role `anon`.
 */
export function createPublicClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}
