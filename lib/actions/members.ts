"use server";

import { revalidatePath } from "next/cache";
import { handleFileUpload } from "@/lib/supabase-helpers";
import { createClient } from "@/lib/supabase/server";
import { Member, MemberUpdateData } from "@/lib/types";
import { checkAuth, DEFAULT_IMAGES } from "./utils";

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
