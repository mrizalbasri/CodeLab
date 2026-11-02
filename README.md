# PUPCL — President University Pekanbaru Code Lab

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database%20%26%20Auth-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Deployment-Vercel-black?style=for-the-badge&logo=vercel&logoColor=white)](https://codelab-five.vercel.app)

<br />

**Student Tech & Innovation Hub — Where Passionate Coders Build Real Impact.**

[🌐 **Kunjungi Live Demo**](https://codelab-five.vercel.app) • [📖 **Arsitektur Sistem**](docs/ARCHITECTURE.md) • [🗄️ **Skema Database**](docs/DATABASE.md) • [🤝 **Panduan Kontribusi**](docs/CONTRIBUTING.md)

</div>

---

## 📌 Tentang Proyek

Platform web komunitas **President University Pekanbaru Code Lab (PUPCL)** dirancang sebagai pusat kolaborasi, inovasi, dan etalase karya teknologi mahasiswa. Aplikasi ini menyajikan profil komunitas, direktori kepengurusan, agenda kegiatan/workshop, galeri proyek, serta portal manajemen konten (CMS) berbasis admin yang terproteksi secara penuh.

Dibangun dengan performa tinggi menggunakan arsitektur hybrid **Next.js 16 App Router**, antarmuka modern responsif, serta backend terkelola via **Supabase**.

---

## ✨ Fitur Utama

- 🎨 **Modern & Interactive UI**: Desain antarmuka responsif dengan Tailwind CSS v4, didukung animasi mulus dari Motion (Framer Motion v12), Bento Grid interaktif, dan visualisasi Tech Stack Beams.
- 🌓 **Dual Theme Support**: Mode Gelap (Dark Mode) dan Mode Terang (Light Mode) yang adaptif dan disimpan otomatis di preferensi pengguna.
- 🌐 **Dukungan Dua Bahasa (Bilingual)**: Pengalihan bahasa instan antara Bahasa Indonesia (ID) dan Bahasa Inggris (EN) tanpa reload halaman.
- 👥 **Direktori Pengurus & Anggota**: Daftar profil tim lengkap dengan peran, divisi, bio, dan tautan sosial media, dilengkapi pencarian dan paginasi dinamis.
- 📅 **Agenda Kegiatan & Galeri Proyek**: Publikasi workshop, seminar, dokumentasi aktivitas, dan pencapaian mahasiswa secara dinamis.
- 🔐 **Portal Admin Terproteksi**: Dashboard manajemen konten (CRUD Programs, Members, Gallery) yang diamankan melalui Next.js Middleware dan Supabase Authentication.
- 📬 **Formulir Kontak Terintegrasi**: Pengiriman pesan langsung ke inbox pengurus menggunakan Next.js Server Actions dan Web3Forms API.
- 🛡️ **Keamanan & Resiliensi**: Implementasi Supabase SSR, Row Level Security (RLS) pada database, sanitasi input, serta static fallback data saat koneksi database offline.

---

## 🚀 Tech Stack

| Lapisan | Teknologi | Deskripsi / Penggunaan |
|---|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) | App Router, Server Components, Server Actions, & Turbopack |
| **Frontend Library** | [React 19](https://react.dev/) | Core UI rendering engine |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first CSS styling dengan arsitektur CSS modern |
| **Komponen UI** | [Radix UI](https://www.radix-ui.com/) & Lucide | Primitif UI yang aksesibel dan ikonografi modern |
| **Animasi** | [Motion](https://motion.dev/) | Animasi komponen, transisi rute, dan interaksi visual |
| **Database & Auth** | [Supabase](https://supabase.com/) | PostgreSQL database, Row Level Security (RLS), & Auth SSR |
| **File Storage** | Supabase Storage | Bucket `pupcl-uploads` untuk media foto dan dokumentasi |
| **Layanan Kontak** | [Web3Forms](https://web3forms.com/) | Gateway pengiriman form kontak ke email |
| **Bahasa** | [TypeScript 5](https://www.typescriptlang.org/) | Type safety penuh di sisi client dan server |
| **Deployment** | [Vercel](https://vercel.com/) | Hosting serverless dengan continuous deployment |

---

## 📁 Struktur Direktori

```text
web_codelab/
├── app/                      # Next.js App Router
│   ├── (admin)/              # Route group: portal admin terproteksi
│   │   └── admin/            # Halaman admin panel (/admin)
│   ├── (public)/             # Route group: halaman publik
│   │   ├── about/            # Profil PUPCL & struktur divisi
│   │   ├── contact/          # Form kontak & media sosial
│   │   ├── gallery/          # Galeri dokumentasi, event, & proyek
│   │   ├── login/            # Halaman autentikasi admin (/login)
│   │   ├── programs/         # Daftar workshop & program kerja
│   │   ├── layout.tsx        # Layout publik (Navbar, Footer, ScrollToTop)
│   │   ├── page.tsx          # Beranda utama (Hero, Bento Grid, Pillars)
│   │   └── template.tsx      # Animasi transisi halaman antar route
│   ├── actions.ts            # Entry point re-export server actions
│   ├── globals.css           # Konfigurasi Tailwind CSS v4 & theme variables
│   ├── layout.tsx            # Root layout (Theme & Language Context, Analytics)
│   └── not-found.tsx         # Halaman 404 kustom
├── components/               # Komponen antarmuka pengguna
│   ├── admin/                # Komponen manajemen data (Gallery, Members, Programs)
│   ├── ui/                   # Primitif UI, tombol, modal dialog, & efek visual
│   ├── BentoGrid.tsx         # Grid interaktif statistik & pilar kegiatan
│   ├── Footer.tsx            # Footer navigasi & informasi hak cipta
│   ├── HeroAnimations.tsx    # Efek interaktif & animasi section hero
│   ├── LanguageToggle.tsx    # Pengalih bahasa (ID / EN)
│   ├── MemberCard.tsx        # Kartu profil anggota/pengurus
│   ├── MemberSection.tsx     # Pengelompokan anggota berdasarkan divisi
│   ├── Navbar.tsx            # Bar navigasi responsif dengan blur glassmorphism
│   ├── Pagination.tsx        # Kontrol navigasi halaman data
│   ├── SearchBar.tsx         # Input filter & pencarian dinamis
│   ├── TechStackBeam.tsx     # Visualisasi interaktif teknologi komunitas
│   └── ThemeToggle.tsx       # Pengalih mode gelap/terang
├── context/                  # React Context Providers
│   └── LanguageContext.tsx   # Pengaturan bahasa (ID / EN) & persistensi localStorage
├── docs/                     # Dokumentasi teknis komprehensif
│   ├── ARCHITECTURE.md       # Arsitektur sistem, data flow, & middleware
│   ├── DATABASE.md           # Skema DDL tabel Supabase, RLS, & storage bucket
│   └── CONTRIBUTING.md       # Panduan kolaborasi, alur git, & standar kode
├── lib/                      # Utilitas & Business Logic
│   ├── actions/              # Next.js Server Actions (CRUD mutasi data aman)
│   ├── data/                 # Data statis fallback saat database offline
│   ├── hooks/                # Custom React Hooks (pencarian, paginasi)
│   ├── monitoring/           # Error tracking & logging utilities
│   ├── supabase/             # Client, Server, & Middleware Supabase instances
│   ├── translations.ts       # Kamus kamus multibahasa (ID / EN)
│   ├── types.ts              # Deklarasi antarmuka & tipe TypeScript
│   └── utils.ts              # Helper format tanggal & class merger (cn)
├── public/                   # Asset statis publik (logo, icons, images)
└── middleware.ts             # Proteksi sesi autentikasi rute /admin & /login
```

---

## 🛠️ Panduan Memulai

### 1. Prasyarat Sistem
- [Node.js](https://nodejs.org/) versi `20.x` atau lebih baru
- Package manager: [npm](https://www.npmjs.com/) (atau pnpm / yarn)
- Akun [Supabase](https://supabase.com/) (opsional untuk fitur dinamis & admin)

### 2. Kloning Repositori
```bash
git clone git@github.com:mrizalbasri/CodeLab.git
cd CodeLab
```

### 3. Instalasi Dependensi
```bash
npm install
```

### 4. Konfigurasi Environment Variables
Salin template konfigurasi `.env.local.example` ke `.env.local`:
```bash
cp .env.local.example .env.local
```

Sesuaikan nilai variabel lingkungan berikut:
```env
# Supabase Configuration (Diperlukan untuk data dinamis & portal admin)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Web3Forms API Key (Opsional - untuk pengiriman pesan form kontak)
WEB3FORMS_ACCESS_KEY=your-web3forms-access-key

# Google Analytics (Opsional - untuk pelacakan trafik website)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

> [!NOTE]
> Jika `NEXT_PUBLIC_SUPABASE_URL` tidak diisi, website akan secara otomatis menggunakan **data statis fallback** dari `lib/data/` sehingga antarmuka publik tetap dapat dijelajahi dengan normal.

### 5. Menjalankan Server Development
```bash
npm run dev
```
Buka peramban di [http://localhost:3000](http://localhost:3000) untuk melihat hasilnya.

---

## ⚙️ Variabel Lingkungan (Environment Variables)

| Variabel | Status | Keterangan |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Direkomendasikan | URL endpoint REST API project Supabase Anda |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Direkomendasikan | Public anonymous API key Supabase untuk otentikasi kueri |
| `WEB3FORMS_ACCESS_KEY` | Opsional | Akses token dari Web3Forms untuk menerima pesan dari form kontak |
| `NEXT_PUBLIC_GA_ID` | Opsional | ID Google Analytics (format: `G-XXXXXXXXXX`) untuk monitoring analitik |

---

## 📜 Skrip yang Tersedia

| Perintah | Deskripsi |
|---|---|
| `npm run dev` | Menjalankan server pengembangan lokal dengan kompilator Turbopack |
| `npm run build` | Mengompilasi dan mengoptimasi aplikasi untuk rilis siap produksi |
| `npm run start` | Menjalankan build produksi pada lingkungan lokal/server |
| `npm run lint` | Menjalankan audit kualitas kode menggunakan ESLint |
| `npx tsc --noEmit` | Memverifikasi konsistensi type safety TypeScript tanpa menghasilkan output file |

---

## 📚 Dokumentasi Lanjutan

Untuk pemahaman arsitektur dan skema database secara mendalam, silakan telaah dokumen berikut:

- 🏗️ [**Architecture & Data Flow**](docs/ARCHITECTURE.md): Alur request HTTP, interaksi Server Actions, proteksi middleware, dan strategi fallback data.
- 🗄️ [**Database & Storage Schema**](docs/DATABASE.md): Definisi skrip DDL SQL, relasi tabel `members`, `programs`, `gallery`, kebijakan Row Level Security (RLS), dan konfigurasi storage bucket.
- 🤝 [**Contributing Guide**](docs/CONTRIBUTING.md): Standar alur percabangan git, pedoman format Conventional Commits, dan prosedur pull request.

---

## 🤝 Panduan Kontribusi

1. Buat branch baru dari `main` dengan format penamaan standar:
   - Fitur baru: `feat/nama-fitur`
   - Perbaikan bug: `fix/nama-bug`
   - Dokumentasi: `docs/nama-dokumen`
2. Gunakan spesifikasi **Conventional Commits** (`feat:`, `fix:`, `refactor:`, `docs:`, `chore:`).
3. Lakukan verifikasi sebelum membuat commit:
   ```bash
   npm run lint
   npx tsc --noEmit
   npm run build
   ```
4. Ajukan Pull Request (PR) dengan deskripsi perubahan yang jelas.

---

## 📄 Lisensi

Proyek ini dikembangkan dan dipelihara oleh **President University Pekanbaru Code Lab (PUPCL)**.
Hak cipta dilindungi undang-undang & didistribusikan di bawah lisensi [MIT](LICENSE).
