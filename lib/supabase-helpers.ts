import { SupabaseClient } from "@supabase/supabase-js";

// File upload helper with better error handling
export async function uploadFile(
  supabase: SupabaseClient,
  file: File,
  bucket: string,
  folder: string
): Promise<string> {
  const timestamp = Date.now();
  const sanitizedFileName = file.name.replace(/\s+/g, "-");
  const fileName = `${folder}/${timestamp}-${sanitizedFileName}`;

  const { error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Error uploading file:", error);
    throw new Error(`Upload failed: ${error.message}`);
  }

  // Get public URL
  const { data: publicUrlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(fileName);

  return publicUrlData.publicUrl;
}

// Helper to safely handle file upload with optional file
export async function handleFileUpload(
  supabase: SupabaseClient,
  file: File | null,
  bucket: string,
  folder: string,
  fallbackUrl: string
): Promise<string> {
  if (!file || file.size === 0) {
    return fallbackUrl;
  }

  try {
    return await uploadFile(supabase, file, bucket, folder);
  } catch (error) {
    console.error("Error handling file upload:", error);
    return fallbackUrl;
  }
}

// Generic function to handle database operations with consistent error handling
export async function handleDatabaseOperation<T>(
  operation: () => Promise<{ data: T | null; error: Error | null }>,
  errorMessage: string
): Promise<T | null> {
  try {
    const { data, error } = await operation();
    if (error) {
      console.error(errorMessage, error);
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error(errorMessage, error);
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
