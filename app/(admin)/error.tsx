"use client";

import { RouteError } from "@/components/RouteError";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <RouteError
      error={error}
      reset={reset}
      title="Panel admin gagal dimuat."
      description="Data manajemen tidak dapat diambil saat ini. Coba lagi setelah beberapa saat."
    />
  );
}
