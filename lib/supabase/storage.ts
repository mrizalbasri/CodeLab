import { SupabaseClient } from "@supabase/supabase-js";

/**
 * Uploads a file to a specified Supabase storage bucket and returns its public URL.
 */
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

  const { data: publicUrlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(fileName);

  return publicUrlData.publicUrl;
}

/**
 * Safely handles optional file upload, returning fallbackUrl if no file provided.
 */
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
