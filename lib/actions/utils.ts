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

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    console.error("Error checking admin role:", error);
    throw new Error("Unable to verify permissions.");
  }

  if (profile?.role !== "admin") {
    throw new Error("Forbidden");
  }

  return supabase;
}
