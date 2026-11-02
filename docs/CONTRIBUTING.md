# 🤝 Panduan Kontribusi (Contributing Guide)

Terima kasih atas ketertarikan Anda untuk berkontribusi pada pengembangan website **President University Pekanbaru Code Lab (PUPCL)**!

---

## 🌿 Git Branching Strategy

Jangan mengembangkan fitur atau perbaikan langsung di branch default (`main`). Selalu buat branch baru dengan pola:

```text
<type>/<deskripsi-singkat-kebab-case>
```

### Tipe Branch:
- `feat/` : Penambahan fitur baru (misal: `feat/event-filtering`, `feat/export-csv`)
- `fix/` : Perbaikan bug (misal: `fix/navbar-mobile-toggle`, `fix/gallery-pagination`)
- `refactor/` : Perombakan kode tanpa mengubah fitur (misal: `refactor/supabase-storage`)
- `docs/` : Perubahan dokumentasi saja (misal: `docs/api-guide`)
- `style/` : Perubahan kosmetik/formatting (misal: `style/hero-spacing`)

---

## 📝 Konvensi Commit (Conventional Commits)

Format pesan commit mengikuti standar [Conventional Commits](https://www.conventionalcommits.org/):

```text
<type>(<scope opsional>): <deskripsi singkat>
```

### Prefix yang Diizinkan:
- `feat`: Fitur baru
- `fix`: Perbaikan bug
- `refactor`: Refactoring kode
- `docs`: Perubahan dokumentasi
- `style`: Penyesuaian formatting/gaya kode
- `perf`: Peningkatan performa
- `test`: Penambahan atau perbaikan unit test
- `chore`: Pemeliharaan dependensi / build tools
- `ci`: Konfigurasi CI/CD

### Aturan Penulisan:
- Gunakan huruf kecil untuk deskripsi dan nada imperatif (contoh: `feat: add search filter to programs`, bukan `feat: Added search filter`).
- Maksimal 72 karakter pada baris pertama.

---

## 💻 Standar & Panduan Kode

1. **TypeScript & Strict Typing**:
   - Selalu berikan tipe data yang jelas. Hindari penggunaan tipe `any`.
   - Gunakan tipe terpusat yang didefinisikan di [`lib/types.ts`](file:///d:/Coding/web_codelab/lib/types.ts).
2. **Komponen & Desain**:
   - Gunakan kombinasi **Radix UI Themes** dan utilitas **Tailwind CSS 4**.
   - Untuk efek visual dan transisi, gunakan import dari `motion/react` (bukan paket lama `framer-motion`).
3. **Pembersihan Log**:
   - Hapus semua `console.log` sementara atau baris debug sebelum membuat commit.
4. **Keamanan Kredensial**:
   - Jangan pernah menyertakan file `.env` atau kunci API asli ke git. Pastikan `.gitignore` selalu aktif.

---

## ✅ Checklist Sebelum Membuat Pull Request

Sebelum membuat PR, pastikan langkah verifikasi lokal berikut lulus tanpa kesalahan:

```bash
# 1. Verifikasi Type TypeScript
npx tsc --noEmit

# 2. Verifikasi Build Produksi
npm run build
```

Setelah keduanya lulus:
1. Push branch Anda ke remote: `git push -u origin <nama-branch>`
2. Buka Pull Request ke branch `main` dengan deskripsi perubahan yang jelas.
3. Pastikan semua pemeriksaan GitHub Actions CI lulus (status hijau).
