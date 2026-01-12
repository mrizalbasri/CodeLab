"use server";

import { revalidatePath } from "next/cache";
import { handleFileUpload } from "@/lib/supabase-helpers";
import { createClient } from "@/lib/supabase/server";
import { 
  Member, 
  GalleryItem, 
  Program, 
  MemberUpdateData, 
  GalleryUpdateData, 
  ProgramUpdateData 
} from "@/lib/types";

// Export types for use in other files
export type { Member, GalleryItem, Program };

// Default fallback images
const DEFAULT_IMAGES = {
  member: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=300&q=80",
  gallery: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
  program: "https://images.unsplash.com/photo-1542831371-d531d513ef56?auto=format&fit=crop&w=800&q=80",
} as const;

// ============ UTILITY FUNCTIONS ============

async function checkAuth() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }
  return supabase;
}

// ============ MEMBERS ============

export async function getMembers(): Promise<Member[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("members")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching members:", error);
    return [];
  }
}

export async function addMember(formData: FormData) {
  const supabase = await checkAuth();
  
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const imageFile = formData.get("image") as File | null;
  const color = (formData.get("color") as Member["color"]) || "indigo";

  const image = await handleFileUpload(
    supabase,
    imageFile,
    "pupcl-uploads",
    "members",
    DEFAULT_IMAGES.member
  );

  const { error } = await supabase
    .from("members")
    .insert([{ name, role, image, color }]);

  if (error) {
    console.error("Error adding member:", error);
    throw error;
  }

  revalidatePath("/about");
  revalidatePath("/admin");
}

export async function updateMember(formData: FormData) {
  const supabase = await checkAuth();

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const color = (formData.get("color") as Member["color"]) || "indigo";
  const imageFile = formData.get("image") as File | null;

  const updateData: MemberUpdateData = { name, role, color };

  if (imageFile && imageFile.size > 0) {
    updateData.image = await handleFileUpload(
      supabase,
      imageFile,
      "pupcl-uploads",
      "members",
      DEFAULT_IMAGES.member
    );
  }

  const { error } = await supabase
    .from("members")
    .update(updateData)
    .eq("id", id);

  if (error) {
    console.error("Error updating member:", error);
    throw error;
  }

  revalidatePath("/about");
  revalidatePath("/admin");
}

export async function deleteMember(id: string) {
  const supabase = await checkAuth();
  
  const { error } = await supabase.from("members").delete().eq("id", id);

  if (error) {
    console.error("Error deleting member:", error);
    throw error;
  }

  revalidatePath("/about");
  revalidatePath("/admin");
}

// ============ GALLERY ============

export async function getGalleryItems(): Promise<GalleryItem[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching gallery items:", error);
    return [];
  }
}

export async function addGalleryItem(formData: FormData) {
  const supabase = await checkAuth();

  const title = formData.get("title") as string;
  const category = formData.get("category") as GalleryItem["category"];
  const date = formData.get("date") as string;
  const imageFile = formData.get("src") as File | null;

  const src = await handleFileUpload(
    supabase,
    imageFile,
    "pupcl-uploads",
    "gallery",
    DEFAULT_IMAGES.gallery
  );

  const { error } = await supabase
    .from("gallery")
    .insert([{ title, category, date, src }]);

  if (error) {
    console.error("Error adding gallery item:", error);
    throw error;
  }

  revalidatePath("/gallery");
  revalidatePath("/admin");
}

export async function updateGalleryItem(formData: FormData) {
  const supabase = await checkAuth();

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const category = formData.get("category") as GalleryItem["category"];
  const date = formData.get("date") as string;
  const imageFile = formData.get("src") as File | null;

  const updateData: GalleryUpdateData = { title, category, date };

  if (imageFile && imageFile.size > 0) {
    updateData.src = await handleFileUpload(
      supabase,
      imageFile,
      "pupcl-uploads",
      "gallery",
      DEFAULT_IMAGES.gallery
    );
  }

  const { error } = await supabase
    .from("gallery")
    .update(updateData)
    .eq("id", id);

  if (error) {
    console.error("Error updating gallery item:", error);
    throw error;
  }

  revalidatePath("/gallery");
  revalidatePath("/admin");
}

export async function deleteGalleryItem(id: string) {
  const supabase = await checkAuth();

  const { error } = await supabase.from("gallery").delete().eq("id", id);

  if (error) {
    console.error("Error deleting gallery item:", error);
    throw error;
  }

  revalidatePath("/gallery");
  revalidatePath("/admin");
}

// ============ PROGRAMS ============

export async function getPrograms(): Promise<Program[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("programs")
      .select("*")
      .order("date", { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching programs:", error);
    return [];
  }
}

export async function addProgram(formData: FormData) {
  const supabase = await checkAuth();

  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const description = formData.get("description") as string;
  const date = formData.get("date") as string;
  const time = formData.get("time") as string;
  const location = formData.get("location") as string;
  const speaker = formData.get("speaker") as string;
  const imageFile = formData.get("image_url") as File | null;
  const status = (formData.get("status") as string) || "Upcoming";

  const image_url = await handleFileUpload(
    supabase,
    imageFile,
    "pupcl-uploads",
    "programs",
    DEFAULT_IMAGES.program
  );

  const { error } = await supabase.from("programs").insert([
    {
      title,
      category,
      description,
      date,
      time,
      location,
      speaker,
      image_url,
      status,
    },
  ]);

  if (error) {
    console.error("Error adding program:", error);
    throw error;
  }

  revalidatePath("/programs");
  revalidatePath("/admin");
}

export async function updateProgram(formData: FormData) {
  const supabase = await checkAuth();

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const description = formData.get("description") as string;
  const date = formData.get("date") as string;
  const time = formData.get("time") as string;
  const location = formData.get("location") as string;
  const speaker = formData.get("speaker") as string;
  const imageFile = formData.get("image_url") as File | null;
  const status = (formData.get("status") as string) || "Upcoming";

  const updateData: ProgramUpdateData = {
    title,
    category,
    description,
    date,
    time,
    location,
    speaker,
    status,
  };

  if (imageFile && imageFile.size > 0) {
    updateData.image_url = await handleFileUpload(
      supabase,
      imageFile,
      "pupcl-uploads",
      "programs",
      DEFAULT_IMAGES.program
    );
  }

  const { error } = await supabase
    .from("programs")
    .update(updateData)
    .eq("id", id);

  if (error) {
    console.error("Error updating program:", error);
    throw error;
  }

  revalidatePath("/programs");
  revalidatePath("/admin");
}

export async function deleteProgram(id: string) {
  const supabase = await checkAuth();

  const { error } = await supabase.from("programs").delete().eq("id", id);

  if (error) {
    console.error("Error deleting program:", error);
    throw error;
  }

  revalidatePath("/programs");
  revalidatePath("/admin");
}
