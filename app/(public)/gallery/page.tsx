import { getPublicGalleryItems } from "@/lib/data/public-content";
import { GallerySection } from "@/components/gallery/GallerySection";

export const revalidate = 300;

export default async function GalleryPage() {
  const items = await getPublicGalleryItems();

  return <GallerySection initialItems={items} />;
}
