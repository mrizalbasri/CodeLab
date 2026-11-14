import type { GalleryItem, Program } from "@/lib/types";
import { initialPrograms } from "@/lib/data/programs";
import { createPublicClient } from "@/lib/supabase/public";

const QUERY_TIMEOUT_MS = 3000;

function withTimeout<T>(promise: PromiseLike<T>): Promise<T> {
  return Promise.race([
    Promise.resolve(promise),
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error("Supabase request timeout")), QUERY_TIMEOUT_MS),
    ),
  ]);
}

/**
 * Membaca program untuk halaman publik.
 *
 * Memakai client tanpa cookies agar halaman tetap bisa di-prerender,
 * dengan fallback data statis saat environment Supabase belum dikonfigurasi.
 */
export async function getPublicPrograms(): Promise<Program[]> {
  const supabase = createPublicClient();
  if (!supabase) {
    return initialPrograms;
  }

  try {
    const { data, error } = await withTimeout(
      supabase.from("programs").select("*").order("date", { ascending: true }),
    );

    if (error) throw error;
    return data ?? [];
  } catch (error) {
    console.error("Error fetching public programs:", error);
    return [];
  }
}

/**
 * Membaca item galeri untuk halaman publik.
 * Fallback ke array kosong karena galeri tidak punya data statis.
 */
export async function getPublicGalleryItems(): Promise<GalleryItem[]> {
  const supabase = createPublicClient();
  if (!supabase) {
    return [];
  }

  try {
    const { data, error } = await withTimeout(
      supabase.from("gallery").select("*").order("created_at", { ascending: false }),
    );

    if (error) throw error;
    return data ?? [];
  } catch (error) {
    console.error("Error fetching public gallery items:", error);
    return [];
  }
}
