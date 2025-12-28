"use client";

import { Box, Container, Flex, Heading, Text, Tabs, Inset, Card, Badge } from "@radix-ui/themes";
import { Image as ImageIcon } from "lucide-react";
import { getGalleryItems, GalleryItem } from "../actions";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function GalleryPage() {
    const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);

    useEffect(() => {
        async function fetchData() {
            const data = await getGalleryItems();
            setGalleryItems(data);
        }
        fetchData();
    }, [])

    // Simple Fade In Animation
    const containerVariants = {
        hidden: { opacity: 0, scale: 0.98 },
        visible: { opacity: 1, scale: 1 }
    };

    return (
        <Box>
            {/* Header */}
            <Box
                style={{
                    background: "radial-gradient(circle at top center, var(--indigo-4), var(--color-background) 80%)",
                    borderBottom: "1px solid var(--gray-4)",
                    paddingTop: "140px",
                    paddingBottom: "var(--space-9)",
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <Box className="bg-grid" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }} />
                <Container size="3" style={{ position: 'relative', zIndex: 1 }}>
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <Flex direction="column" align="center" gap="4" py="6">
                            <Badge size="2" color="indigo" variant="soft" radius="full">Dokumentasi</Badge>
                            <Heading size="9" align="center">Galeri Kegiatan</Heading>
                            <Text align="center" size="5" color="gray" style={{ maxWidth: 600 }}>
                                Momen-momen berharga perjalanan kami dalam berkarya dan berinovasi.
                            </Text>
                        </Flex>
                    </motion.div>
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

                    {/* Gallery Grid */}
                    <Box>
                        {["all", "kegiatan", "proyek", "prestasi"].map((tabInfo) => (
                            <Tabs.Content key={tabInfo} value={tabInfo}>
                                <motion.div
                                    style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ duration: 0.4 }}
                                >
                                    {galleryItems
                                        .filter(item => tabInfo === "all" || item.category === tabInfo)
                                        .map((item) => (
                                            <motion.div key={item.id} whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 300 }}>
                                                <Card style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }} className="group">
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
                                                                }}
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
                                            </motion.div>
                                        ))}
                                </motion.div>
                            </Tabs.Content>
                        ))}
                    </Box>
                </Tabs.Root>
            </Container>
        </Box>
    );
}
