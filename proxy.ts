import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Hanya jalankan proxy pada route yang memerlukan auth:
     * - /admin dan semua sub-route-nya
     * - /dashboard dan semua sub-route-nya
     * - /login
     *
     * Halaman publik (/, /about, /programs, /gallery, /contact)
     * TIDAK melewati proxy ini, sehingga tidak ada panggilan
     * Supabase yang tidak perlu dan tidak menyebabkan delay.
     */
    "/admin/:path*",
    "/dashboard/:path*",
    "/login",
  ],
};
