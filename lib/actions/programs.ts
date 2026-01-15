"use server";

import { revalidatePath } from "next/cache";
import { handleFileUpload } from "@/lib/supabase-helpers";
import { createClient } from "@/lib/supabase/server";
import { Program, ProgramUpdateData } from "@/lib/types";
import { checkAuth, DEFAULT_IMAGES } from "./utils";

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
