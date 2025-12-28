'use server'

import { promises as fs } from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';

const dataFilePath = path.join(process.cwd(), 'data', 'members.json');
const galleryFilePath = path.join(process.cwd(), 'data', 'gallery.json');

export type Member = {
    id: string;
    name: string;
    role: string;
    image: string; // Renamed from src to image
    color: 'indigo' | 'pink' | 'teal' | 'orange' | 'blue' | 'red';
};

export type GalleryItem = {
    id: string;
    src: string;
    category: 'kegiatan' | 'proyek' | 'prestasi';
    title: string;
    date: string;
}

export async function getMembers(): Promise<Member[]> {
    try {
        const data = await fs.readFile(dataFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
    try {
        const data = await fs.readFile(galleryFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

export async function addMember(formData: FormData) {
    const name = formData.get('name') as string;
    const role = formData.get('role') as string;
    const image = formData.get('image') as string || 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=300&q=80'; // Default avatar
    const color = formData.get('color') as Member['color'] || 'indigo';

    const newMember: Member = {
        id: Date.now().toString(),
        name,
        role,
        image,
        color,
    };

    const members = await getMembers();
    members.push(newMember);

    await fs.writeFile(dataFilePath, JSON.stringify(members, null, 2));
    revalidatePath('/about');
    revalidatePath('/admin');
}

export async function addGalleryItem(formData: FormData) {
    const title = formData.get('title') as string;
    const category = formData.get('category') as GalleryItem['category'];
    const date = formData.get('date') as string;
    const src = formData.get('src') as string || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80';

    const newItem: GalleryItem = {
        id: Date.now().toString(),
        title,
        category,
        date,
        src
    };

    const items = await getGalleryItems();
    items.push(newItem);

    await fs.writeFile(galleryFilePath, JSON.stringify(items, null, 2));
    revalidatePath('/gallery');
    revalidatePath('/admin');
}

export async function deleteMember(id: string) {
    const members = await getMembers();
    const updatedMembers = members.filter((member) => member.id !== id);

    await fs.writeFile(dataFilePath, JSON.stringify(updatedMembers, null, 2));
    revalidatePath('/about');
    revalidatePath('/admin');
}

export async function deleteGalleryItem(id: string) {
    const items = await getGalleryItems();
    const updatedItems = items.filter((item) => item.id !== id);

    await fs.writeFile(galleryFilePath, JSON.stringify(updatedItems, null, 2));
    revalidatePath('/gallery');
    revalidatePath('/admin');
}
