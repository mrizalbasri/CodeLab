"use server";

import { revalidatePath } from "next/cache";
import { uploadFile } from "@/lib/supabase-helpers";
import { createClient } from "@/lib/supabase/server";

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
  category: string;
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

// ============ PROTECTED ACTIONS ============

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

export async function addMember(formData: FormData) {
  const supabase = await checkAuth();
  
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const imageFile = formData.get("image") as File | null;
  const color = (formData.get("color") as Member["color"]) || "indigo";

  let image =
    "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=300&q=80";

  // Handle image upload if file provided
  if (imageFile && imageFile.size > 0) {
    try {
      image = await uploadFile(supabase, imageFile, "pupcl-uploads", "members");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }

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

export async function updateMember(formData: FormData) {
  const supabase = await checkAuth();

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const color = (formData.get("color") as Member["color"]) || "indigo";
  const imageFile = formData.get("image") as File | null;

  const updateData: any = { name, role, color };

  if (imageFile && imageFile.size > 0) {
    try {
      updateData.image = await uploadFile(
        supabase,
        imageFile,
        "pupcl-uploads",
        "members"
      );
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }

  try {
    const { error } = await supabase
      .from("members")
      .update(updateData)
      .eq("id", id);

    if (error) throw error;

    revalidatePath("/about");
    revalidatePath("/admin");
  } catch (error) {
    console.error("Error updating member:", error);
    throw error;
  }
}

export async function addGalleryItem(formData: FormData) {
  const supabase = await checkAuth();

  const title = formData.get("title") as string;
  const category = formData.get("category") as GalleryItem["category"];
  const date = formData.get("date") as string;
  const imageFile = formData.get("src") as File | null;

  let src =
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80";

  if (imageFile && imageFile.size > 0) {
    try {
      src = await uploadFile(supabase, imageFile, "pupcl-uploads", "gallery");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }

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

export async function updateGalleryItem(formData: FormData) {
  const supabase = await checkAuth();

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const category = formData.get("category") as GalleryItem["category"];
  const date = formData.get("date") as string;
  const imageFile = formData.get("src") as File | null;

  const updateData: Partial<GalleryItem> = {
    title,
    category,
    date,
  };

  if (imageFile && imageFile.size > 0) {
    try {
      updateData.src = await uploadFile(supabase, imageFile, "pupcl-uploads", "gallery");
    } catch (error) {
      console.error("Error uploading gallery image:", error);
    }
  }

  try {
    const { error } = await supabase
      .from("gallery")
      .update(updateData)
      .eq("id", id);

    if (error) throw error;

    revalidatePath("/gallery");
    revalidatePath("/admin");
  } catch (error) {
    console.error("Error updating gallery item:", error);
    throw error;
  }
}

export async function deleteMember(id: string) {
  const supabase = await checkAuth();
  
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
  const supabase = await checkAuth();

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

  let image_url =
    "https://images.unsplash.com/photo-1542831371-d531d513ef56?auto=format&fit=crop&w=800&q=80";

  if (imageFile && imageFile.size > 0) {
    try {
      image_url = await uploadFile(supabase, imageFile, "pupcl-uploads", "programs");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }

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

  const updateData: Partial<Program> = {
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
    try {
      updateData.image_url = await uploadFile(
        supabase,
        imageFile,
        "pupcl-uploads",
        "programs"
      );
    } catch (error) {
      console.error("Error uploading program image:", error);
    }
  }

  try {
    const { error } = await supabase
      .from("programs")
      .update(updateData)
      .eq("id", id);

    if (error) throw error;

    revalidatePath("/programs");
    revalidatePath("/admin");
  } catch (error) {
    console.error("Error updating program:", error);
    throw error;
  }
}

export async function deleteProgram(id: string) {
  const supabase = await checkAuth();

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
