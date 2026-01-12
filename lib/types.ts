import { SupabaseClient } from "@supabase/supabase-js";

// Database types
export type Member = {
  id: string;
  name: string;
  role: string;
  image: string;
  color: "indigo" | "pink" | "teal" | "orange" | "blue" | "red";
  created_at?: string;
};

export type GalleryItem = {
  id: string;
  src: string;
  category: "kegiatan" | "proyek" | "prestasi";
  title: string;
  date: string;
  created_at?: string;
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
  created_at?: string;
};

// Radix UI valid color types
export type RadixColor = 
  | "gray" 
  | "gold" 
  | "bronze" 
  | "brown" 
  | "yellow" 
  | "amber" 
  | "orange" 
  | "tomato" 
  | "red" 
  | "ruby" 
  | "crimson" 
  | "pink" 
  | "plum" 
  | "purple" 
  | "violet" 
  | "iris" 
  | "indigo" 
  | "blue" 
  | "cyan" 
  | "teal" 
  | "jade" 
  | "green" 
  | "grass" 
  | "lime" 
  | "mint" 
  | "sky";

// Form data types for CRUD operations
export type MemberFormData = Omit<Member, "id" | "created_at">;
export type GalleryFormData = Omit<GalleryItem, "id" | "created_at">;
export type ProgramFormData = Omit<Program, "id" | "created_at">;

// Update data types (all fields optional)
export type MemberUpdateData = Partial<MemberFormData>;
export type GalleryUpdateData = Partial<GalleryFormData>;
export type ProgramUpdateData = Partial<ProgramFormData>;

// Helper function types
export type UploadFileResult = {
  url: string;
  error?: never;
} | {
  url?: never;
  error: string;
};

export type ActionResult<T = void> = {
  success: true;
  data?: T;
  error?: never;
} | {
  success: false;
  data?: never;
  error: string;
};
