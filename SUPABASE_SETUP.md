# 🚀 Setup Supabase untuk PUPCL

Semua file sudah disiapkan! Ikuti langkah berikut:

## 1️⃣ Install Dependencies

```bash
npm install @supabase/supabase-js
```

## 2️⃣ Setup Supabase Project

1. Buat akun di [supabase.com](https://supabase.com)
2. Create New Project
3. Tunggu project selesai setup (~2 menit)

## 3️⃣ Dapatkan Credentials

1. Buka Dashboard > Settings > API
2. Copy **Project URL** dan **anon/public key**

## 4️⃣ Setup Environment Variables

1. Buat file `.env.local` di root folder
2. Isi dengan credentials dari Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## 5️⃣ Create Database Tables

1. Buka Dashboard > SQL Editor
2. Copy paste isi file `supabase/schema.sql`
3. Klik Run
4. Tables & data akan otomatis ter-create!

## 6️⃣ Test

```bash
npm run dev
```

Cek halaman About dan Gallery - data sekarang dari Supabase! 🎉

## ✅ Yang Sudah Dikerjakan:

### Files Created:

- ✅ `lib/supabase.ts` - Supabase client & types
- ✅ `supabase/schema.sql` - Database schema dengan sample data
- ✅ `.env.local.example` - Template environment variables

### Files Updated:

- ✅ `app/actions.ts` - Semua CRUD operations menggunakan Supabase

### Features:

- ✅ Read data dari Supabase (members & gallery)
- ✅ Create data baru via admin panel
- ✅ Delete data via admin panel
- ✅ Row Level Security (RLS) enabled
- ✅ Public read access
- ✅ Sample data sudah included

## 🔐 Security Notes:

- RLS sudah enabled untuk security
- Public bisa READ data
- Untuk production, tambahkan proper authentication
- Bisa integrate dengan NextAuth.js atau Supabase Auth

## 🎯 Next Steps (Optional):

- [ ] Add Supabase Authentication
- [ ] Add image upload to Supabase Storage
- [ ] Add update/edit functionality
- [ ] Add search & filter features
- [ ] Add pagination for large datasets
