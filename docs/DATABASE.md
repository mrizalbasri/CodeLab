# 🗄️ Database & Storage Documentation

Dokumen ini berisi spesifikasi skema basis data PostgreSQL (Supabase), konfigurasi Storage Bucket, dan kebijakan keamanan Row Level Security (RLS) untuk proyek **PUPCL**.

---

## 1. Skema Tabel (SQL DDL)

Jalankan perintah SQL berikut di **Supabase SQL Editor** untuk menginisialisasi database:

```sql
-- 1. Tabel Members (Pengurus & Anggota)
CREATE TABLE IF NOT EXISTS public.members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    image TEXT NOT NULL DEFAULT '/logo.jpeg',
    color TEXT NOT NULL DEFAULT 'indigo' CHECK (color IN ('indigo', 'pink', 'teal', 'orange', 'blue', 'red')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Tabel Gallery (Dokumentasi Kegiatan & Prestasi)
CREATE TABLE IF NOT EXISTS public.gallery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    src TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('kegiatan', 'proyek', 'prestasi')),
    title TEXT NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Tabel Programs (Workshop & Program Kerja)
CREATE TABLE IF NOT EXISTS public.programs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    date TEXT,
    time TEXT,
    location TEXT,
    speaker TEXT,
    image_url TEXT DEFAULT '/logo.jpeg',
    status TEXT DEFAULT 'Upcoming' CHECK (status IN ('Upcoming', 'Ongoing', 'Completed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);
```

---

## 2. Row Level Security (RLS) Policies

Aktifkan RLS untuk memastikan data aman. Aturannya:
- **Publik**: Hanya dapat membaca data (`SELECT`).
- **Pengguna Terautentikasi (Admin)**: Memiliki hak akses penuh (`INSERT`, `UPDATE`, `DELETE`).

```sql
-- Aktifkan RLS di setiap tabel
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;

-- Policy Members
CREATE POLICY "Public can view members"
    ON public.members FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Authenticated users can manage members"
    ON public.members FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Policy Gallery
CREATE POLICY "Public can view gallery"
    ON public.gallery FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Authenticated users can manage gallery"
    ON public.gallery FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Policy Programs
CREATE POLICY "Public can view programs"
    ON public.programs FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Authenticated users can manage programs"
    ON public.programs FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);
```

---

## 3. Konfigurasi Supabase Storage Bucket

Aplikasi menggunakan bucket penyimpanan file untuk foto profil anggota, thumbnail workshop, dan foto galeri.

### Setup Bucket:
1. Buka menu **Storage** di dashboard Supabase.
2. Buat bucket baru bernama: `pupcl-uploads`.
3. Set status bucket menjadi **Public Bucket** agar gambar dapat diakses oleh publik melalui URL CDN.

### Struktur Folder di Dalam Bucket:
```text
pupcl-uploads/
├── members/      # Foto profil anggota & pengurus
├── programs/     # Banner & poster kegiatan/workshop
└── gallery/      # Foto dokumentasi kegiatan & proyek
```

### Storage RLS Policies:
```sql
-- Izinkan publik membaca asset storage
CREATE POLICY "Public Access"
    ON storage.objects FOR SELECT
    TO public
    USING (bucket_id = 'pupcl-uploads');

-- Izinkan admin mengupload asset
CREATE POLICY "Authenticated upload"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'pupcl-uploads');

-- Izinkan admin memperbarui/menghapus asset
CREATE POLICY "Authenticated update and delete"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (bucket_id = 'pupcl-uploads');

CREATE POLICY "Authenticated delete"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id = 'pupcl-uploads');
```
