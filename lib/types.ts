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

export type ProfileRole = "admin" | "member";

export type Profile = {
  id: string;
  full_name: string;
  role: ProfileRole;
  member_id?: string | null;
  division?: string | null;
  batch?: string | null;
  avatar_url?: string | null;
  skills: string[];
  created_at?: string;
};

export type ProjectStatus = "draft" | "pending" | "published" | "rejected";

export type Project = {
  id: string;
  owner_id: string;
  title: string;
  summary: string;
  description?: string | null;
  cover_url?: string | null;
  demo_url?: string | null;
  repository_url?: string | null;
  tech_stack: string[];
  status: ProjectStatus;
  rejection_reason?: string | null;
  reviewed_at?: string | null;
  created_at?: string;
  updated_at?: string;
  owner?: Pick<Profile, "id" | "full_name" | "member_id" | "avatar_url">;
};

export type ProjectListResult =
  | { projects: Project[]; error: null }
  | { projects: []; error: "PROJECTS_UNAVAILABLE" };

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
export type ProjectFormData = Omit<
  Project,
  "id" | "owner_id" | "status" | "reviewed_at" | "created_at" | "updated_at" | "owner"
>;

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
