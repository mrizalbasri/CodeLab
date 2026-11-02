# PUPCL — President University Pekanbaru Code Lab

> **Student Tech & Innovation Hub** — Where Passionate Coders Build Real Impact.

Website resmi komunitas teknologi **President University Pekanbaru Code Lab (PUPCL)**. Platform interaktif untuk menampilkan profil komunitas, program workshop, galeri kegiatan, struktur kepengurusan, dan dashboard admin terintegrasi.

---

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **UI & Styling**: [React 19](https://react.dev/), [Tailwind CSS 4](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/)
- **Animasi & Interaktivitas**: [Motion](https://motion.dev/) (Framer Motion v12)
- **Database, Auth & Storage**: [Supabase](https://supabase.com/) (`@supabase/ssr`)
- **Contact Service**: [Web3Forms](https://web3forms.com/)
- **Bahasa**: [TypeScript 5](https://www.typescriptlang.org/)

---

## 📁 Struktur Direktori

```text
web_codelab/
├── app/                      # Next.js App Router
│   ├── (admin)/              # Route group: dashboard admin terproteksi
│   │   └── admin/            # Halaman admin (/admin)
│   ├── (public)/             # Route group: halaman publik
│   │   ├── about/            # Halaman tentang PUPCL & kepengurusan
│   │   ├── contact/          # Form kontak & informasi komunikasi
│   │   ├── gallery/          # Galeri kegiatan, proyek, & prestasi
│   │   ├── login/            # Halaman login admin
│   │   ├── programs/         # Daftar workshop & program kerja
│   │   ├── layout.tsx        # Layout publik (Navbar, Footer, ScrollToTop)
│   │   ├── page.tsx          # Beranda / landing page
│   │   └── template.tsx      # Animasi transisi halaman
│   ├── actions.ts            # Entry point re-export server actions
│   ├── globals.css           # Konfigurasi Tailwind CSS & global styles
│   ├── layout.tsx            # Root layout (Provider Tema & Bahasa, Analytics)
│   └── not-found.tsx         # Halaman 404 custom
├── components/               # Komponen antarmuka (UI Components)
│   ├── admin/                # Komponen tab manajemen admin (Gallery, Members, Programs)
│   ├── ui/                   # Komponen primitif & efek visual (Aceternity, MagicUI, Radix)
│   ├── BentoGrid.tsx         # Grid interaktif pilar & statistik
│   ├── Footer.tsx            # Footer navigasi & informasi copyright
│   ├── HeroAnimations.tsx    # Efek animasi bagian hero beranda
│   ├── LanguageToggle.tsx    # Pengganti bahasa (ID / EN)
│   ├── MemberCard.tsx        # Kartu profil anggota/pengurus
│   ├── MemberSection.tsx     # Seksi pengurus terkelompok
│   ├── Navbar.tsx            # Bilah navigasi responsif
│   ├── Pagination.tsx        # Kontrol paginasi data
│   ├── ScrollToTop.tsx       # Tombol kembali ke atas halaman
│   ├── SearchBar.tsx         # Kolom pencarian dinamis
│   ├── TechStackBeam.tsx     # Visualisasi teknologi komunitas
│   └── ThemeToggle.tsx       # Pengalih mode gelap/terang
├── context/                  # React Context Providers
│   └── LanguageContext.tsx   # Pengaturan bahasa (ID / EN) & persistensi
├── docs/                     # Dokumentasi komprehensif proyek
│   ├── ARCHITECTURE.md       # Rancangan arsitektur, data flow, & routing
│   ├── DATABASE.md           # Skema tabel Supabase, RLS policies, & storage
│   └── CONTRIBUTING.md       # Panduan alur kerja git & standar kode
├── lib/                      # Utilitas & Business Logic
│   ├── actions/              # Next.js Server Actions (CRUD & mutasi data)
│   │   ├── contact.ts        # Action submit pesan kontak
│   │   ├── gallery.ts        # Action CRUD galeri kegiatan
│   │   ├── members.ts        # Action CRUD data pengurus/anggota
│   │   ├── programs.ts       # Action CRUD agenda & workshop
│   │   └── utils.ts          # Auth guard & konstanta default images
│   ├── data/                 # Data statis & default fallback
│   │   ├── members.ts        # Data awal pengurus
│   │   ├── programs.ts       # Data awal program kegiatan
│   │   └── site-config.ts    # Metadata, profil, statistik, dan tautan sosial
│   ├── hooks/                # Custom React Hooks
│   │   └── useSearchAndPagination.ts # Logika pencarian & paginasi
│   ├── monitoring/           # Error tracking & logger
│   │   ├── error-tracker.ts
│   │   └── logger.ts
│   ├── supabase/             # Integrasi Supabase
│   │   ├── client.ts         # Supabase client untuk Browser/Client Components
│   │   ├── middleware.ts     # Proteksi sesi auth untuk middleware Next.js
│   │   ├── server.ts         # Supabase client untuk Server Components & Actions
│   │   └── storage.ts        # Upload & manajemen file storage bucket
│   ├── analytics.ts          # Integrasi Google Analytics
│   ├── translations.ts       # Kamus terjemahan Bahasa Indonesia & Inggris
│   ├── types.ts              # Deklarasi TypeScript types & interfaces
│   └── utils.ts              # Helper format tanggal, waktu, & class merge (cn)
├── public/                   # Asset statis (logo, favicon)
├── middleware.ts             # Middleware autentikasi route /admin
└── components.json           # Konfigurasi shadcn/ui
```

---

## 📚 Dokumentasi Lanjutan

Dokumentasi teknis terperinci dapat dilihat pada folder [`docs/`](file:///d:/Coding/web_codelab/docs):

- 🏗️ [**Architecture & Data Flow**](docs/ARCHITECTURE.md): Penjelasan alur request, middleware auth, Server Actions, dan state management.
- 🗄️ [**Database & Storage Schema**](docs/DATABASE.md): Skrip SQL DDL tabel `members`, `gallery`, `programs`, konfigurasi storage bucket, dan Row Level Security (RLS) policies.
- 🤝 [**Contributing Guide**](docs/CONTRIBUTING.md): Panduan alur kerja git, konvensi commit, dan standar kode.

---

## 🛠️ Panduan Memulai

### 1. Prasyarat
- [Node.js](https://nodejs.org/) v20 atau lebih baru
- [npm](https://www.npmjs.com/) atau pnpm

### 2. Instalasi Dependensi
```bash
git clone <repository-url>
cd web_codelab
npm install
```

### 3. Konfigurasi Environment Variables
Salin file template `.env.local.example` menjadi `.env.local`:
```bash
cp .env.local.example .env.local
```

Isi variabel berikut:
```env
# Supabase (Wajib jika menggunakan fitur dinamis & Admin)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Web3Forms (Opsional - untuk menerima pesan form kontak)
WEB3FORMS_ACCESS_KEY=your-web3forms-access-key

# Google Analytics (Opsional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 4. Menjalankan Server Development
```bash
npm run dev
```
Buka browser di `http://localhost:3000`.

---

## 📜 Skrip Tersedia

| Perintah | Deskripsi |
|---|---|
| `npm run dev` | Menjalankan server development dengan Turbopack |
| `npm run build` | Melakukan kompilasi & build optimasi produksi |
| `npm run start` | Menjalankan server aplikasi hasil build produksi |
| `npm run lint` | Menjalankan pemeriksaan kode menggunakan ESLint |
| `npx tsc --noEmit` | Memverifikasi kepatuhan type TypeScript tanpa membuat output file |

---

## 🤝 Panduan Kontribusi Singkat

1. Buat branch baru dari `main` dengan format: `<type>/<deskripsi-singkat>` (contoh: `feat/event-filter`, `fix/navbar-mobile`).
2. Gunakan konvensi **Conventional Commits** (`feat:`, `fix:`, `refactor:`, `docs:`, `chore:`).
3. Pastikan `npx tsc --noEmit` dan `npm run build` lulus tanpa error sebelum membuat Pull Request.
4. Baca panduan lengkap di [CONTRIBUTING.md](docs/CONTRIBUTING.md).
