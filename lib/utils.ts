import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format tanggal dari string ISO (YYYY-MM-DD) ke format Indonesia.
 * Contoh: "2024-01-15" → "15 Januari 2024"
 */
export function formatDate(dateStr?: string | null): string {
  if (!dateStr) return "-";
  try {
    // Tambahkan T00:00:00 agar tidak kena masalah timezone shift
    const date = new Date(dateStr + "T00:00:00");
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  } catch {
    return dateStr;
  }
}

/**
 * Format waktu dari string HH:MM ke format 12-jam dengan AM/PM.
 * Contoh: "14:30" → "14.30 WIB"
 */
export function formatTime(timeStr?: string | null): string {
  if (!timeStr) return "-";
  try {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0);
    return new Intl.DateTimeFormat("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    }).format(date);
  } catch {
    return timeStr;
  }
}
