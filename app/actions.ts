"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";

export type Member = {
  id: string;
  name: string;
  role: string;
  image: string;
  color: "indigo" | "pink" | "teal" | "orange" | "blue" | "red";
};

export type GalleryItem = {
  id: string;
  src: string;
  category: "kegiatan" | "proyek" | "prestasi";
  title: string;
  date: string;
};

export type Program = {
  id: string;
  title: string;
  category: "Webinar" | "Workshop" | "Meetup" | "Hackathon";
  description?: string;
  date?: string;
  time?: string;
  location?: string;
  speaker?: string;
  image_url?: string;
  status?: string;
};

// ============ MEMBERS ============

export async function getMembers(): Promise<Member[]> {
  try {
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

// ============ GALLERY ============

export async function getGalleryItems(): Promise<GalleryItem[]> {
  try {
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

// ============ PROGRAMS ============

export async function getPrograms(): Promise<Program[]> {
  try {
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

export async function addMember(formData: FormData) {
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const image =
    (formData.get("image") as string) ||
    "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=300&q=80";
  const color = (formData.get("color") as Member["color"]) || "indigo";

  try {
    const { error } = await supabase
      .from("members")
      .insert([{ name, role, image, color }]);

    if (error) throw error;

    revalidatePath("/about");
    revalidatePath("/admin");
  } catch (error) {
    console.error("Error adding member:", error);
    throw error;
  }
}

export async function addGalleryItem(formData: FormData) {
  const title = formData.get("title") as string;
  const category = formData.get("category") as GalleryItem["category"];
  const date = formData.get("date") as string;
  const src =
    (formData.get("src") as string) ||
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80";

  try {
    const { error } = await supabase
      .from("gallery")
      .insert([{ title, category, date, src }]);

    if (error) throw error;

    revalidatePath("/gallery");
    revalidatePath("/admin");
  } catch (error) {
    console.error("Error adding gallery item:", error);
    throw error;
  }
}

export async function deleteMember(id: string) {
  try {
    const { error } = await supabase.from("members").delete().eq("id", id);

    if (error) throw error;

    revalidatePath("/about");
    revalidatePath("/admin");
  } catch (error) {
    console.error("Error deleting member:", error);
    throw error;
  }
}

export async function deleteGalleryItem(id: string) {
  try {
    const { error } = await supabase.from("gallery").delete().eq("id", id);

    if (error) throw error;

    revalidatePath("/gallery");
    revalidatePath("/admin");
  } catch (error) {
    console.error("Error deleting gallery item:", error);
    throw error;
  }
}

// ============ PROGRAMS CRUD ============

export async function addProgram(formData: FormData) {
  const title = formData.get("title") as string;
  const category = formData.get("category") as Program["category"];
  const description = formData.get("description") as string;
  const date = formData.get("date") as string;
  const time = formData.get("time") as string;
  const location = formData.get("location") as string;
  const speaker = formData.get("speaker") as string;
  const image_url = formData.get("image_url") as string;
  const status = (formData.get("status") as string) || "Upcoming";

  try {
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

    if (error) throw error;

    revalidatePath("/programs");
    revalidatePath("/admin");
  } catch (error) {
    console.error("Error adding program:", error);
    throw error;
  }
}

export async function deleteProgram(id: string) {
  try {
    const { error } = await supabase.from("programs").delete().eq("id", id);

    if (error) throw error;

    revalidatePath("/programs");
    revalidatePath("/admin");
  } catch (error) {
    console.error("Error deleting program:", error);
    throw error;
  }
}
