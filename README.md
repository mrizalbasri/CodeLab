# PUPCL — President University Pekanbaru Code Lab

Platform web komunitas President University Pekanbaru Code Lab (PUPCL) yang berfungsi sebagai pusat informasi, kolaborasi, dan publikasi kegiatan teknologi mahasiswa. Proyek ini dibangun menggunakan arsitektur modern Next.js App Router, antarmuka responsif Tailwind CSS, serta integrasi backend Supabase.

[Live Demo](https://codelab-five.vercel.app) | [Dokumentasi Arsitektur](docs/ARCHITECTURE.md) | [Skema Database](docs/DATABASE.md) | [Panduan Kontribusi](docs/CONTRIBUTING.md)

---

## Ringkasan Proyek

PUPCL Web Platform dirancang untuk memfasilitasi kebutuhan publikasi dan operasional komunitas teknologi di President University Pekanbaru. Platform ini mencakup profil kelembagaan, direktori pengurus dan anggota, publikasi agenda kegiatan dan workshop, dokumentasi galeri proyek, serta sistem Content Management System (CMS) internal yang terproteksi.

Arsitektur aplikasi mengimplementasikan prinsip server-first rendering dengan Server Components, optimasi performa melalui Turbopack, serta mekanisme autentikasi dan otorisasi terintegrasi.

---

## Fitur Utama

- **Antarmuka Modern dan Responsif**: Dibangun menggunakan Tailwind CSS v4 dan Motion, mendukung transisi interaktif serta kompatibilitas lintas perangkat.
- **Dukungan Tema Adaptif**: Fitur Dark Mode dan Light Mode dengan sinkronisasi preferensi sistem dan penyimpanan lokal pengguna.
- **Multibahasa (Bilingual)**: Dukungan penuh dua bahasa (Bahasa Indonesia dan Bahasa Inggris) dengan pemuatan dinamis berbasis React Context.
- **Direktori Pengurus dan Anggota**: Sistem pencarian dan paginasi data profil kepengurusan, divisi, dan riwayat peran anggota.
- **Manajemen Program dan Galeri**: Publikasi jadwal kegiatan, materi workshop, dan dokumentasi portofolio proyek secara terstruktur.
- **Panel Administrasi Terproteksi**: Modul CRUD (Create, Read, Update, Delete) data kegiatan dan anggota yang diamankan melalui Next.js Middleware dan Supabase Authentication.
- **Formulir Kontak**: Integrasi pengiriman pesan via Server Actions yang terhubung dengan layanan Web3Forms.
- **Keamanan dan Resiliensi Data**: Pengamanan level basis data menggunakan Row Level Security (RLS) Supabase serta ketersediaan data fallback saat koneksi offline.

---

## Arsitektur dan Teknologi

| Kategori | Teknologi | Kegunaan |
|---|---|---|
| Framework | Next.js 16 (App Router) | Core framework, Server Components, Server Actions |
| Runtime / UI Library | React 19 | Komponen antarmuka pengguna |
| Bahasa Pemrograman | TypeScript 5 | Static typing dan standarisasi kontrak data |
| Desain Sistem | Tailwind CSS 4, Radix UI | Utilitas styling dan komponen primitif yang aksesibel |
| Animasi | Motion (Framer Motion) | Interaktivitas visual dan transisi halaman |
| Basis Data & Autentikasi | Supabase (PostgreSQL) | Persistence layer, Supabase Auth SSR, RLS policies |
| Media Storage | Supabase Storage | Penyimpanan berkas dan aset gambar (`pupcl-uploads`) |
| Integrasi Kontak | Web3Forms | Gateway pengiriman notifikasi formulir kontak |
| Platform Deployment | Vercel | Hosting serverless dan continuous deployment |

---

## Struktur Direktori

```text
web_codelab/
├── app/                      # Konfigurasi rute Next.js App Router
│   ├── (admin)/              # Rute terproteksi untuk administrasi
│   │   └── admin/            # Dashboard panel admin (/admin)
│   ├── (public)/             # Rute publik yang dapat diakses umum
│   │   ├── about/            # Halaman profil organisasi dan struktur kepengurusan
│   │   ├── contact/          # Halaman formulir kontak dan narahubung
│   │   ├── gallery/          # Galeri dokumentasi kegiatan dan proyek
│   │   ├── login/            # Halaman autentikasi administrator (/login)
│   │   ├── programs/         # Halaman agenda dan program kerja
│   │   ├── layout.tsx        # Layout publik (Navbar, Footer, ScrollToTop)
│   │   ├── page.tsx          # Beranda utama
│   │   └── template.tsx      # Animasi transisi halaman
│   ├── actions.ts            # Entry point Server Actions
│   ├── globals.css           # Konfigurasi stylesheet global dan variabel tema
│   ├── layout.tsx            # Root layout aplikasi (Provider tema dan bahasa)
│   └── not-found.tsx         # Penanganan tampilan rute 404 kustom
├── components/               # Komponen antarmuka modular
│   ├── admin/                # Komponen manajemen data admin
│   ├── ui/                   # Komponen primitif antarmuka
│   ├── BentoGrid.tsx         # Grid interaktif pilar dan statistik komunitas
│   ├── Footer.tsx            # Komponen navigasi bawah dan hak cipta
│   ├── HeroAnimations.tsx    # Animasi visual dan interaktivitas beranda
│   ├── LanguageToggle.tsx    # Komponen pengalih bahasa (ID / EN)
│   ├── MemberCard.tsx        # Kartu informasi profil anggota
│   ├── MemberSection.tsx     # Pengelompokan anggota per divisi
│   ├── Navbar.tsx            # Navigasi utama responsif
│   ├── Pagination.tsx        # Navigasi paginasi data
│   ├── SearchBar.tsx         # Kolom pencarian dinamis
│   ├── TechStackBeam.tsx     # Visualisasi stack teknologi
│   └── ThemeToggle.tsx       # Pengalih mode tampilan gelap / terang
├── context/                  # State management berbasis React Context
│   └── LanguageContext.tsx   # Pengaturan bahasa dan persistensi penyimpanan lokal
├── docs/                     # Dokumentasi teknis sistem
│   ├── ARCHITECTURE.md       # Arsitektur sistem dan data flow
│   ├── DATABASE.md           # Skema basis data, DDL, dan RLS
│   └── CONTRIBUTING.md       # Standar kontribusi dan konvensi kode
├── lib/                      # Modul utilitas dan logika bisnis
│   ├── actions/              # Definisi mutasi data (Server Actions)
│   ├── data/                 # Data statis fallback saat offline
│   ├── hooks/                # Custom React Hooks (pencarian, paginasi)
│   ├── monitoring/           # Utilitas error tracking dan logging
│   ├── supabase/             # Client konfigurasi Supabase (Client, Server, Middleware)
│   ├── translations.ts       # Kamus lokalisasi multibahasa (ID / EN)
│   ├── types.ts              # Definisi interface dan tipe TypeScript
│   └── utils.ts              # Fungsi pembantu (format tanggal, class merger)
├── public/                   # Berkas aset statis publik
└── middleware.ts             # Middleware proteksi autentikasi rute
```

---

## Panduan Instalasi dan Penggunaan

### 1. Prasyarat Sistem
- Node.js versi 20.x atau lebih baru
- Manajer paket: npm, pnpm, atau yarn
- Proyek Supabase aktif (opsional untuk pengembangan dengan data dinamis)

### 2. Kloning Repositori
```bash
git clone git@github.com:mrizalbasri/CodeLab.git
cd CodeLab
```

### 3. Instalasi Dependensi
```bash
npm install
```

### 4. Konfigurasi Variabel Lingkungan
Salin berkas template lingkungan:
```bash
cp .env.local.example .env.local
```

Lengkapi konfigurasi pada `.env.local`:
```env
# Konfigurasi Supabase (Diperlukan untuk data dinamis & portal admin)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Kunci API Web3Forms (Opsional - untuk penerimaan pesan kontak)
WEB3FORMS_ACCESS_KEY=your-web3forms-access-key

# Pelacakan Google Analytics (Opsional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

> **Catatan:** Apabila variabel Supabase tidak dikonfigurasi, sistem secara otomatis beralih ke data fallback statis (`lib/data/`), sehingga antarmuka publik tetap dapat diuji coba tanpa ketergantungan koneksi basis data eksternal.

### 5. Menjalankan Server Pengembangan
```bash
npm run dev
```
Akses aplikasi melalui peramban pada alamat `http://localhost:3000`.

---

## Konfigurasi Variabel Lingkungan

| Variabel | Status | Keterangan |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Direkomendasikan | URL endpoint REST API proyek Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Direkomendasikan | Kunci anon publik untuk autentikasi komunikasi ke Supabase |
| `WEB3FORMS_ACCESS_KEY` | Opsional | Kunci akses layanan Web3Forms untuk penerimaan formulir kontak |
| `NEXT_PUBLIC_GA_ID` | Opsional | Measurement ID Google Analytics untuk monitoring trafik |

---

## Perintah Kerja (Scripts)

| Perintah | Deskripsi |
|---|---|
| `npm run dev` | Menjalankan server pengembangan lokal dengan kompilasi Turbopack |
| `npm run build` | Menjalankan proses kompilasi dan optimasi berkas produksi |
| `npm run start` | Menjalankan server produksi lokal setelah tahap build |
| `npm run lint` | Melakukan audit statis kualitas kode dengan ESLint |
| `npx tsc --noEmit` | Memverifikasi konsistensi type safety TypeScript pada seluruh berkas |

---

## Dokumentasi Terkait

Informasi arsitektur dan teknis lebih mendalam tersedia pada folder `docs/`:

- [Dokumentasi Arsitektur](docs/ARCHITECTURE.md): Alur otentikasi middleware, alur data Server Actions, dan strategi rendering.
- [Skema Basis Data](docs/DATABASE.md): Spesifikasi tabel PostgreSQL, DDL migration, kebijakan RLS, dan storage bucket.
- [Panduan Kontribusi](docs/CONTRIBUTING.md): Tata cara kolaborasi, alur percabangan git, dan konvensi commit.

---

## Standar Kontribusi

1. Buat branch baru dari `main` dengan konvensi penamaan standar:
   - Fitur baru: `feat/nama-fitur`
   - Perbaikan bug: `fix/nama-bug`
   - Dokumentasi: `docs/nama-dokumen`
2. Terapkan konvensi format **Conventional Commits** (`feat:`, `fix:`, `refactor:`, `docs:`, `chore:`).
3. Jalankan pengujian dan validasi sebelum mengajukan Pull Request:
   ```bash
   npx tsc --noEmit
   npm run build
   ```

---

## Lisensi

Proyek ini dikembangkan untuk **President University Pekanbaru Code Lab (PUPCL)**. Hak cipta dilindungi undang-undang dan didistribusikan di bawah lisensi [MIT](LICENSE).
