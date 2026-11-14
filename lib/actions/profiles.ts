"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { handleFileUpload } from "@/lib/supabase/storage";
import { Profile, Project } from "@/lib/types";
import { getCurrentProfile } from "./auth";

const AVATAR_FALLBACK = "";

function parseSkills(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 8);
}

export async function updateProfile(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile) {
    throw new Error("You must be signed in to update your profile.");
  }

  const supabase = await createClient();
  const avatarFile = formData.get("avatar") as File | null;
  const avatarUrl = await handleFileUpload(
    supabase,
    avatarFile,
    "pupcl-uploads",
    "avatars",
    AVATAR_FALLBACK,
  );

  const updateData: Record<string, unknown> = {
    full_name: String(formData.get("fullName") ?? "").trim(),
    skills: parseSkills(formData.get("skills")),
  };

  if (avatarUrl) updateData.avatar_url = avatarUrl;

  const { error } = await supabase
    .from("profiles")
    .update(updateData)
    .eq("id", profile.id);

  if (error) {
    console.error("Error updating profile:", error);
    throw new Error("Unable to update profile.");
  }

  revalidatePath("/dashboard");
  revalidatePath(`/members/${profile.id}`);
}

export async function getPublicMemberProfile(
  id: string,
): Promise<{ profile: Profile | null; projects: Project[] }> {
  const supabase = await createClient();

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (profileError) {
    console.error("Error fetching member profile:", profileError);
    throw new Error("Unable to load member profile.");
  }

  if (!profile) {
    return { profile: null, projects: [] };
  }

  const { data: projects, error: projectsError } = await supabase
    .from("projects")
    .select("*")
    .eq("owner_id", id)
    .eq("status", "published")
    .order("updated_at", { ascending: false });

  if (projectsError) {
    console.error("Error fetching member projects:", projectsError);
    throw new Error("Unable to load member projects.");
  }

  return { profile: profile as Profile, projects: (projects ?? []) as Project[] };
}
