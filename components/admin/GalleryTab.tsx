"use client";

import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Text,
  TextField,
  Select,
  Badge,
  Table,
  IconButton,
} from "@radix-ui/themes";
import Image from "next/image";
import { Image as ImageIcon, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  GalleryItem,
  addGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from "@/app/actions";

interface GalleryTabProps {
  galleryItems: GalleryItem[];
  onRefresh: () => Promise<void>;
  startTransition: (callback: () => void) => void;
}

export function GalleryTab({
  galleryItems,
  onRefresh,
  startTransition,
}: GalleryTabProps) {
  const [editingGallery, setEditingGallery] = useState<GalleryItem | null>(null);
  const [galleryCategory, setGalleryCategory] =
    useState<GalleryItem["category"]>("kegiatan");

  return (
    <Grid columns={{ initial: "1", md: "1fr 2fr" }} gap="6">
      {/* Form Tambah/Update Galeri */}
      <Card>
        <Heading size="4" mb="4">
          {editingGallery ? "Edit Gallery Item" : "Add Gallery Item"}
        </Heading>
        <form
          key={editingGallery?.id ?? "gallery-new"}
          action={async (formData) => {
            startTransition(async () => {
              try {
                if (editingGallery) {
                  formData.append("id", editingGallery.id);
                  await updateGalleryItem(formData);
                  setEditingGallery(null);
                  setGalleryCategory("kegiatan");
                  toast.success("Foto berhasil diperbarui!");
                } else {
                  await addGalleryItem(formData);
                  setGalleryCategory("kegiatan");
                  toast.success("Foto berhasil ditambahkan!");
                }
                await onRefresh();
              } catch (e) {
                toast.error("Gagal menyimpan galeri.");
              }
            });
          }}
        >
          <Flex direction="column" gap="4">
            <Box>
              <Text size="2" weight="bold">
                Activity Title
              </Text>
              <TextField.Root
                name="title"
                placeholder="e.g. Workshop React JS"
                defaultValue={editingGallery?.title || ""}
                required
              />
            </Box>

            <Box>
              <Text size="2" weight="bold">
                Date
              </Text>
              <TextField.Root
                name="date"
                type="date"
                defaultValue={editingGallery?.date || ""}
                required
              />
            </Box>

            <Box>
              <Text size="2" weight="bold">
                Image
              </Text>
              <input
                name="src"
                type="file"
                accept="image/*"
                style={{
                  padding: "6px 8px",
                  borderRadius: "4px",
                  border: "1px solid var(--gray-7)",
                  backgroundColor: "var(--gray-3)",
                  fontSize: "12px",
                  cursor: "pointer",
                  width: "100%",
                  maxWidth: "100%",
                  boxSizing: "border-box",
                  display: "block",
                }}
              />
              <Text size="1" color="gray">
                {editingGallery
                  ? "Upload new image (optional)"
                  : "Upload JPG, PNG, HEIC, WebP"}
              </Text>
            </Box>

            <Box>
              <Text size="2" weight="bold" mb="1" as="div">
                Category
              </Text>
              <Select.Root
                key={editingGallery?.id ?? "gallery-select"}
                name="category"
                value={galleryCategory}
                onValueChange={(val) =>
                  setGalleryCategory(val as GalleryItem["category"])
                }
              >
                <Select.Trigger />
                <Select.Content>
                  <Select.Item value="kegiatan">Kegiatan</Select.Item>
                  <Select.Item value="proyek">Proyek</Select.Item>
                  <Select.Item value="prestasi">Prestasi</Select.Item>
                </Select.Content>
              </Select.Root>
            </Box>

            <Flex gap="2">
              <Button
                type="submit"
                size="3"
                variant="solid"
                color="plum"
                style={{ cursor: "pointer" }}
              >
                <ImageIcon size={16} />
                {editingGallery ? "Update Photo" : "Add Photo"}
              </Button>
              {editingGallery && (
                <Button
                  type="button"
                  size="3"
                  variant="soft"
                  color="gray"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setEditingGallery(null);
                    setGalleryCategory("kegiatan");
                  }}
                >
                  Cancel
                </Button>
              )}
            </Flex>
          </Flex>
        </form>
      </Card>

      {/* List Galeri */}
      <Card>
        <Heading size="4" mb="4">
          Gallery Items ({galleryItems.length})
        </Heading>
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Image</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Title & Date</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Category</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {galleryItems.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>
                  <Box
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 8,
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={item.src}
                      alt={item.title}
                      width={48}
                      height={48}
                      loader={({ src }) => src}
                      unoptimized
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                </Table.Cell>
                <Table.Cell>
                  <Flex direction="column">
                    <Text weight="bold" size="2">
                      {item.title}
                    </Text>
                    <Text size="1" color="gray">
                      {item.date}
                    </Text>
                  </Flex>
                </Table.Cell>
                <Table.Cell>
                  <Badge color="plum" variant="soft">
                    {item.category}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <Flex gap="2" align="center" justify="center">
                    <IconButton
                      color="blue"
                      variant="solid"
                      size="2"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setEditingGallery(item);
                        setGalleryCategory(item.category);
                      }}
                    >
                      <Pencil size={16} />
                    </IconButton>
                    <IconButton
                      color="red"
                      variant="solid"
                      size="2"
                      style={{ cursor: "pointer" }}
                      onClick={async () => {
                        if (confirm("Delete this photo?")) {
                          startTransition(async () => {
                            try {
                              await deleteGalleryItem(item.id);
                              await onRefresh();
                              toast.success("Foto dihapus");
                            } catch (e) {
                              toast.error("Gagal menghapus foto");
                            }
                          });
                        }
                      }}
                    >
                      <Trash size={16} />
                    </IconButton>
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Card>
    </Grid>
  );
}
