"use client";

import { RouteError } from "@/components/RouteError";

export default function PublicError({
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
      title="Halaman gagal dimuat."
      description="Konten sedang tidak dapat diambil. Coba muat ulang halaman ini, atau kembali ke beranda."
    />
  );
}
