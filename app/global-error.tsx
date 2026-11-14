"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="id">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          backgroundColor: "#09090b",
          color: "#fafafa",
          fontFamily:
            'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        }}
      >
        <main
          style={{
            maxWidth: "480px",
            width: "100%",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(239, 68, 68, 0.15)",
              color: "#f87171",
              fontSize: "26px",
              fontWeight: 700,
            }}
          >
            !
          </div>
          <h1 style={{ fontSize: "24px", margin: 0, letterSpacing: "-0.5px" }}>
            Aplikasi gagal dimuat.
          </h1>
          <p style={{ fontSize: "15px", lineHeight: 1.6, color: "#a1a1aa", margin: 0 }}>
            Terjadi kesalahan tak terduga. Muat ulang halaman untuk melanjutkan.
          </p>
          {error.digest ? (
            <p style={{ fontSize: "12px", color: "#71717a", margin: 0 }}>
              Kode kesalahan: {error.digest}
            </p>
          ) : null}
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "8px",
              padding: "10px 20px",
              borderRadius: "9999px",
              border: "none",
              backgroundColor: "#0047BA",
              color: "#ffffff",
              fontSize: "15px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Coba lagi
          </button>
        </main>
      </body>
    </html>
  );
}
