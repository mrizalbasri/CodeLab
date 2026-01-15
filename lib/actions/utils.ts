import { createClient } from "@/lib/supabase/server";

export const DEFAULT_IMAGES = {
  member: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=300&q=80",
  gallery: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
  program: "https://images.unsplash.com/photo-1542831371-d531d513ef56?auto=format&fit=crop&w=800&q=80",
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
