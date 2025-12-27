"use client";

import { Box, Container, Flex, Heading, Text, Tabs, Inset, Card, Badge } from "@radix-ui/themes";
import { Image as ImageIcon } from "lucide-react";

export default function GalleryPage() {
    // Dummy data for gallery
    const galleryItems = [
        { src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80", category: "kegiatan", title: "Workshop React JS", date: "Feb 2024" },
        { src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80", category: "kegiatan", title: "Gathering Anggota", date: "Jan 2024" },
        { src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80", category: "proyek", title: "Presentasi Proyek Akhir", date: "Mar 2024" },
        { src: "https://images.unsplash.com/photo-1504384308090-c54be3855463?auto=format&fit=crop&w=800&q=80", category: "prestasi", title: "Juara 1 Hackathon", date: "Dec 2023" },
        { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80", category: "kegiatan", title: "Mentoring Sesi 1", date: "Feb 2024" },
        { src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80", category: "proyek", title: "Diskusi Tim Dev", date: "Jan 2024" },
    ];

    return (
        <Box>
            {/* Header */}
            <Box
                py="9"
                style={{
                    background: "linear-gradient(135deg, var(--plum-3), var(--color-background))",
                    borderBottom: "1px solid var(--gray-4)"
                }}
            >
                <Container size="3">
                    <Flex direction="column" align="center" gap="4" py="6">
                        <Badge size="2" color="plum" variant="soft" radius="full">Dokumentasi</Badge>
                        <Heading size="9" align="center">Galeri Kegiatan</Heading>
                        <Text align="center" size="5" color="gray" style={{ maxWidth: 600 }}>
                            Momen-momen berharga perjalanan kami dalam berkarya dan berinovasi.
                        </Text>
                    </Flex>
                </Container>
            </Box>

            <Container size="4" py="9">
                <Tabs.Root defaultValue="all">
                    <Flex justify="center" mb="6">
                        <Tabs.List>
                            <Tabs.Trigger value="all">Semua</Tabs.Trigger>
                            <Tabs.Trigger value="kegiatan">Kegiatan</Tabs.Trigger>
                            <Tabs.Trigger value="proyek">Proyek</Tabs.Trigger>
                            <Tabs.Trigger value="prestasi">Prestasi</Tabs.Trigger>
                        </Tabs.List>
                    </Flex>

                    {/* Gallery Grid (Simple Responsive Grid for now as Masonry requires external lib or complex CSS) */}
                    <Box>
                        {["all", "kegiatan", "proyek", "prestasi"].map((tabInfo) => (
                            <Tabs.Content key={tabInfo} value={tabInfo}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {galleryItems
                                        .filter(item => tabInfo === "all" || item.category === tabInfo)
                                        .map((item, index) => (
                                            <Card key={index} style={{ padding: 0, overflow: 'hidden', cursor: 'grab' }} className="group">
                                                <Inset clip="padding-box" side="top" pb="current">
                                                    <Box style={{ position: 'relative', overflow: 'hidden' }}>
                                                        <img
                                                            src={item.src}
                                                            alt={item.title}
                                                            style={{
                                                                display: 'block',
                                                                objectFit: 'cover',
                                                                width: '100%',
                                                                height: 240,
                                                                backgroundColor: 'var(--gray-5)',
                                                                transition: 'transform 0.5s ease',
                                                            }}
                                                            className="group-hover:scale-110"
                                                        />
                                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                            <ImageIcon color="white" size={32} />
                                                        </div>
                                                    </Box>
                                                </Inset>
                                                <Box p="3">
                                                    <Flex justify="between" align="center">
                                                        <Text size="3" weight="bold">{item.title}</Text>
                                                        <Badge color="gray">{item.date}</Badge>
                                                    </Flex>
                                                </Box>
                                            </Card>
                                        ))}
                                </div>
                            </Tabs.Content>
                        ))}
                    </Box>
                </Tabs.Root>
            </Container>
        </Box>
    );
}
