# 📋 Daftar Task Perbaikan Project

> Dibuat otomatis hasil review project pada **2 November 2026**.
> Centang (`[x]`) setiap task yang sudah selesai.

---

## 🔴 Prioritas Tinggi — Perbaikan Cepat

### 1. Hapus folder kosong "hantu" di root
- [x] Hapus folder `componentsadmin/`
- [x] Hapus folder `libactions/`
- [x] Hapus folder `libsupabase/`

> **Konteks:** Ketiga folder ini kosong dan berasal dari typo import path lama di Windows.
> Sudah diverifikasi: **tidak ada file yang meng-import ke path tersebut**, jadi aman dihapus.
>
> ```bash
> rmdir componentsadmin libactions libsupabase
> ```

### 2. Satukan library animasi (redundan)
- [x] Ganti semua import `framer-motion` → `motion/react` (ada di **13 file**)
- [x] Hapus `framer-motion` dari `package.json`
- [x] Jalankan `npm install` dan pastikan `npm run build` masih sukses

> **Konteks:** `motion` adalah nama baru dari `framer-motion` — keduanya library yang sama
> tapi keduanya terpasang sekaligus. `framer-motion` sebelumnya dipakai di 13 file, `motion` di 6 file.
> Sekarang seluruh import animasi telah disatukan ke `motion/react`.

---

## 🟡 Prioritas Menengah

### 3. Tulis ulang README
- [x] Ganti README default create-next-app dengan deskripsi project asli
- [x] Jelaskan: apa website-nya, untuk siapa, dan fitur utamanya
- [x] Cantumkan stack: Next.js 16, React 19, Tailwind CSS 4, Supabase, Radix UI, motion
- [x] Tulis langkah setup lokal (`npm install`, setup `.env`, `npm run dev`)
- [x] Daftarkan semua environment variables yang dibutuhkan:
  - [x] Supabase (URL + anon key)
  - [x] Web3Forms (access key untuk contact form)
- [ ] Tambahkan screenshot/gif halaman utama (opsional tapi bagus untuk portofolio)

### 4. Tambah CI minimal (GitHub Actions)
- [x] Buat file `.github/workflows/ci.yml`
- [x] Jalankan `npx tsc --noEmit` dan `npm run build` setiap push/PR
- [ ] (Opsional) Tambahkan badge status CI di README

---

## 🟢 Prioritas Rendah — Polesan

### 5. Bersihkan console.log tersisa
- [x] `components/ui/direction-aware-hover.tsx`
- [ ] `lib/monitoring/logger.ts` *(file ini memang fungsinya structured logging)*

### 6. Testing (bisa ditunda sampai fitur stabil)
- [ ] Pasang Vitest + React Testing Library
- [ ] Buat minimal 1 smoke test per halaman publik (render sukses)
- [ ] (Opsional) Tambahkan step test ke CI di task #4

### 7. Kualitas developer experience (opsional)
- [ ] Pasang Prettier + config agar format kode konsisten
- [ ] Pasang husky + lint-staged agar lint otomatis sebelum commit

---

## ✅ Yang Sudah Baik — Tidak Perlu Diubah

| Area | Status |
|---|---|
| Type-check (`tsc --noEmit`) | ✅ Lulus tanpa error |
| `.gitignore` (`.env*`, `*.tsbuildinfo`) | ✅ Sudah benar |
| Struktur route group `(public)` / `(admin)` | ✅ Rapi |
| Riwayat commit (conventional commits) | ✅ Konsisten |
| Refactor komponen (`MemberCard`, `MemberSection`) | ✅ Terstruktur |
