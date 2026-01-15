import { createClient } from "@/lib/supabase/server";

export const DEFAULT_IMAGES = {
  member: "/logo.jpeg",
  gallery: "/logo.jpeg",
  program: "/logo.jpeg",
} as const;

export async function checkAuth() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }
  return supabase;
}
