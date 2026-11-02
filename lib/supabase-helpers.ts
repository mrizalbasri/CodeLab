import { SupabaseClient } from "@supabase/supabase-js";

// Re-export storage helpers from organized location
export { uploadFile, handleFileUpload } from "./supabase/storage";

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
