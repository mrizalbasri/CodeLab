import { SupabaseClient } from "@supabase/supabase-js";

// File upload helper
export async function uploadFile(
  supabase: SupabaseClient,
  file: File,
  bucket: string,
  folder: string
): Promise<string> {
  try {
    const timestamp = Date.now();
    const fileName = `${folder}/${timestamp}-${file.name.replace(/\s+/g, "-")}`;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) throw error;

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}

// Types for database tables
export interface Database {
  public: {
    Tables: {
      members: {
        Row: {
          id: string;
          name: string;
          role: string;
          image: string;
          color: "indigo" | "pink" | "teal" | "orange" | "blue" | "red";
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          role: string;
          image: string;
          color: "indigo" | "pink" | "teal" | "orange" | "blue" | "red";
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          role?: string;
          image?: string;
          color?: "indigo" | "pink" | "teal" | "orange" | "blue" | "red";
          created_at?: string;
        };
      };
      gallery: {
        Row: {
          id: string;
          src: string;
          category: "kegiatan" | "proyek" | "prestasi";
          title: string;
          date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          src: string;
          category: "kegiatan" | "proyek" | "prestasi";
          title: string;
          date: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          src?: string;
          category?: "kegiatan" | "proyek" | "prestasi";
          title?: string;
          date?: string;
          created_at?: string;
        };
      };
      programs: {
        Row: {
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
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          category: string;
          description?: string;
          date?: string;
          time?: string;
          location?: string;
          speaker?: string;
          image_url?: string;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          category?: string;
          description?: string;
          date?: string;
          time?: string;
          location?: string;
          speaker?: string;
          image_url?: string;
          status?: string;
          created_at?: string;
        };
      };
    };
  };
}
