"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { handleFileUpload } from "@/lib/supabase/storage";
import { Project, ProjectListResult, ProjectStatus } from "@/lib/types";
import { getCurrentProfile } from "./auth";

const PROJECT_COVER_FALLBACK = "/logo.jpeg";

function parseTechStack(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 12);
}

export async function getMyProjects(): Promise<Project[]> {
  const profile = await getCurrentProfile();
  if (!profile) return [];

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("owner_id", profile.id)
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Error fetching member projects:", error);
    throw new Error("Unable to load your projects.");
  }

  return (data ?? []) as Project[];
}

export async function getPublishedProjects(): Promise<ProjectListResult> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select(
      "*, owner:profiles!projects_owner_id_fkey(id, full_name, member_id, avatar_url)",
    )
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching published projects:", {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });
    return { projects: [], error: "PROJECTS_UNAVAILABLE" };
  }

  return { projects: (data ?? []) as Project[], error: null };
}

export async function createProject(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile || profile.role !== "member") {
    throw new Error("Only members can submit projects.");
  }

  const supabase = await createClient();
  const coverFile = formData.get("cover") as File | null;
  const coverUrl = await handleFileUpload(
    supabase,
    coverFile,
    "pupcl-uploads",
    "projects",
    PROJECT_COVER_FALLBACK,
  );

  const { error } = await supabase.from("projects").insert({
    owner_id: profile.id,
    title: String(formData.get("title") ?? "").trim(),
    summary: String(formData.get("summary") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim() || null,
    cover_url: coverUrl,
    demo_url: String(formData.get("demoUrl") ?? "").trim() || null,
    repository_url: String(formData.get("repositoryUrl") ?? "").trim() || null,
    tech_stack: parseTechStack(formData.get("techStack")),
    status: "pending",
  });

  if (error) {
    console.error("Error creating project:", error);
    throw new Error("Unable to submit project.");
  }

  revalidatePath("/dashboard");
  revalidatePath("/projects");
}

export async function updateProject(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile || profile.role !== "member") {
    throw new Error("Only members can edit projects.");
  }

  const projectId = String(formData.get("id") ?? "");
  const supabase = await createClient();
  const coverFile = formData.get("cover") as File | null;
  const coverUrl = coverFile?.size
    ? await handleFileUpload(
        supabase,
        coverFile,
        "pupcl-uploads",
        "projects",
        PROJECT_COVER_FALLBACK,
      )
    : undefined;

  const updateData: Record<string, unknown> = {
    title: String(formData.get("title") ?? "").trim(),
    summary: String(formData.get("summary") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim() || null,
    demo_url: String(formData.get("demoUrl") ?? "").trim() || null,
    repository_url: String(formData.get("repositoryUrl") ?? "").trim() || null,
    tech_stack: parseTechStack(formData.get("techStack")),
    status: "pending" satisfies ProjectStatus,
    rejection_reason: null,
  };

  if (coverUrl) updateData.cover_url = coverUrl;

  const { error } = await supabase
    .from("projects")
    .update(updateData)
    .eq("id", projectId)
    .eq("owner_id", profile.id);

  if (error) {
    console.error("Error updating project:", error);
    throw new Error("Unable to update project.");
  }

  revalidatePath("/dashboard");
  revalidatePath("/projects");
}

export async function reviewProject(
  projectId: string,
  status: Extract<ProjectStatus, "published" | "rejected">,
  rejectionReason?: string,
) {
  const profile = await getCurrentProfile();
  if (!profile || profile.role !== "admin") {
    throw new Error("Only admins can review projects.");
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("projects")
    .update({
      status,
      rejection_reason: status === "rejected" ? rejectionReason?.trim() || null : null,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", projectId);

  if (error) {
    console.error("Error reviewing project:", error);
    throw new Error("Unable to update project review status.");
  }

  revalidatePath("/admin");
  revalidatePath("/projects");
}

export async function getProjectsForAdmin(): Promise<Project[]> {
  const profile = await getCurrentProfile();
  if (!profile || profile.role !== "admin") {
    throw new Error("Only admins can view project submissions.");
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select(
      "*, owner:profiles!projects_owner_id_fkey(id, full_name, member_id, avatar_url)",
    )
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Error fetching project submissions:", error);
    throw new Error("Unable to load project submissions.");
  }

  return (data ?? []) as Project[];
}
