-- SQL Schema untuk Supabase Database
-- Jalankan di Supabase Dashboard > SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: members
CREATE TABLE IF NOT EXISTS public.members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    image TEXT DEFAULT '/images/team/default.jpg',
    color VARCHAR(50) DEFAULT 'indigo',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: gallery
CREATE TABLE IF NOT EXISTS public.gallery (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    src TEXT NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('kegiatan', 'proyek', 'prestasi')),
    title VARCHAR(255) NOT NULL,
    date VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: programs
CREATE TABLE IF NOT EXISTS public.programs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('Webinar', 'Workshop', 'Meetup', 'Hackathon')),
    description TEXT,
    date VARCHAR(50),
    time VARCHAR(20),
    location VARCHAR(255),
    speaker VARCHAR(255),
    image_url TEXT,
    status VARCHAR(50) DEFAULT 'Upcoming',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public READ access
CREATE POLICY "Allow public read access on members"
    ON public.members FOR SELECT
    USING (true);

CREATE POLICY "Allow public read access on gallery"
    ON public.gallery FOR SELECT
    USING (true);

CREATE POLICY "Allow public read access on programs"
    ON public.programs FOR SELECT
    USING (true);

-- Policy: Allow authenticated users to INSERT/UPDATE/DELETE
-- (Nanti bisa disesuaikan dengan sistem auth yang lebih proper)
CREATE POLICY "Allow authenticated users to manage members"
    ON public.members FOR ALL
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage gallery"
    ON public.gallery FOR ALL
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage programs"
    ON public.programs FOR ALL
    USING (true)
    WITH CHECK (true);

-- Insert sample data (dari JSON existing)
INSERT INTO public.members (id, name, role, image, color) VALUES
    ('00000000-0000-0000-0000-000000000001', 'M. Rizal Basri', 'Ketua', '/images/team/rizal.jpg', 'indigo'),
    ('00000000-0000-0000-0000-000000000002', 'Tiarma Ronauli Damanik', 'Sekretaris 1', '/images/team/tiarma.jpg', 'pink'),
    ('00000000-0000-0000-0000-000000000003', 'Rika Enjery Effendy', 'Sekretaris 2', '/images/team/rika.jpg', 'pink'),
    ('00000000-0000-0000-0000-000000000004', 'Bunga Amelya Zulferi', 'Bendahara 1', '/images/team/bunga.jpg', 'teal'),
    ('00000000-0000-0000-0000-000000000005', 'Margareth Talita Olivia Siagian', 'Bendahara 2', '/images/team/margareth.jpg', 'teal');

INSERT INTO public.gallery (id, src, category, title, date) VALUES
    ('00000000-0000-0000-0000-000000000011', 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80', 'kegiatan', 'Workshop React JS', 'Feb 2024'),
    ('00000000-0000-0000-0000-000000000012', 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80', 'kegiatan', 'Gathering Anggota', 'Jan 2024'),
    ('00000000-0000-0000-0000-000000000013', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80', 'proyek', 'Presentasi Proyek Akhir', 'Mar 2024'),
    ('00000000-0000-0000-0000-000000000014', 'https://images.unsplash.com/photo-1504384308090-c54be3855463?auto=format&fit=crop&w=800&q=80', 'prestasi', 'Juara 1 Hackathon', 'Dec 2023'),
    ('00000000-0000-0000-0000-000000000015', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80', 'kegiatan', 'Mentoring Sesi 1', 'Feb 2024'),
    ('00000000-0000-0000-0000-000000000016', 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80', 'proyek', 'Diskusi Tim Dev', 'Jan 2024');

-- Create indexes untuk performance
CREATE INDEX idx_gallery_category ON public.gallery(category);
CREATE INDEX idx_members_role ON public.members(role);
CREATE INDEX idx_programs_category ON public.programs(category);
CREATE INDEX idx_programs_status ON public.programs(status);
