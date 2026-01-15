"use server";

import { revalidatePath } from "next/cache";
import { handleFileUpload } from "@/lib/supabase-helpers";
import { createClient } from "@/lib/supabase/server";
import { GalleryItem, GalleryUpdateData } from "@/lib/types";
import { checkAuth, DEFAULT_IMAGES } from "./utils";

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
