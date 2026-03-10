import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Hanya jalankan middleware pada route yang memerlukan auth:
     * - /admin dan semua sub-route-nya
     * - /login
     *
     * Halaman publik (/, /about, /programs, /gallery, /contact)
     * TIDAK melewati middleware ini, sehingga tidak ada panggilan
     * Supabase yang tidak perlu dan tidak menyebabkan delay.
     */
    "/admin/:path*",
    "/login",
  ],
};
