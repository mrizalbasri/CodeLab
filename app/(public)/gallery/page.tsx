"use client";

import { Box, Container, Flex, Heading, Text, Tabs, Inset, Card, Badge } from "@radix-ui/themes";
import { Image as ImageIcon } from "lucide-react";
import NextImage from "next/image";
import { getGalleryItems, GalleryItem } from "@/app/actions";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SearchBar } from "@/components/SearchBar";
import { Pagination } from "@/components/Pagination";
import { useSearchAndPagination } from "@/lib/hooks/useSearchAndPagination";

export default function GalleryPage() {
    const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
    const [activeTab, setActiveTab] = useState("all");

    useEffect(() => {
        async function fetchData() {
            const data = await getGalleryItems();
            setGalleryItems(data);
        }
        fetchData();
    }, [])

    // Filter data berdasarkan tab yang aktif
    const filteredByTab = galleryItems.filter(item => 
        activeTab === "all" || item.category === activeTab
    );

    // Setup search dan pagination
    const {
        paginatedData,
        totalItems,
        searchQuery,
        handleSearch,
        handleClearSearch,
        currentPage,
        totalPages,
        handlePageChange,
        itemsPerPage,
    } = useSearchAndPagination({
        data: filteredByTab,
        itemsPerPage: 9,
        searchFields: ["title", "category"],
        analyticsSection: "Gallery",
    });

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
                <Container size="3" px="4" style={{ position: 'relative', zIndex: 1 }}>
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <Flex direction="column" align="center" gap="4" py="6">
                            <Badge size="2" color="indigo" variant="soft" radius="full">Dokumentasi</Badge>
                            <Heading size={{ initial: "7", md: "9" }} align="center">Galeri Kegiatan</Heading>
                            <Text align="center" size="5" color="gray" style={{ maxWidth: 600 }}>
                                Momen-momen berharga perjalanan kami dalam berkarya dan berinovasi.
                            </Text>
                        </Flex>
                    </motion.div>
                </Container>
            </Box>

            <Container size="4" py="9" px="4">
                <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
                    <Flex justify="center" mb="6">
                        <Tabs.List>
                            <Tabs.Trigger value="all">Semua</Tabs.Trigger>
                            <Tabs.Trigger value="kegiatan">Kegiatan</Tabs.Trigger>
                            <Tabs.Trigger value="proyek">Proyek</Tabs.Trigger>
                            <Tabs.Trigger value="prestasi">Prestasi</Tabs.Trigger>
                        </Tabs.List>
                    </Flex>

                    {/* Search Bar */}
                    <Box mb="6">
                        <SearchBar
                            placeholder="Cari berdasarkan judul atau kategori..."
                            onSearch={handleSearch}
                            onClear={handleClearSearch}
                        />
                    </Box>

                    {/* Results Info */}
                    {searchQuery && (
                        <Box mb="4">
                            <Text size="2" color="gray">
                                Menampilkan {totalItems} hasil untuk &quot;{searchQuery}&quot;
                            </Text>
                        </Box>
                    )}

                    {/* Gallery Grid */}
                    <Box mb="6">
                        <motion.div
                            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.4 }}
                        >
                            {paginatedData.length > 0 ? (
                                paginatedData.map((item) => (
                                    <motion.div key={item.id} whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 300 }}>
                                        <Card style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }} className="group">
                                            <Inset clip="padding-box" side="top" pb="current">
                                                <Box style={{ position: 'relative', overflow: 'hidden', height: 240 }}>
                                                    <NextImage
                                                        src={item.src}
                                                        alt={item.title}
                                                        fill
                                                        style={{
                                                            objectFit: 'cover',
                                                            backgroundColor: 'var(--gray-5)',
                                                        }}
                                                    />
                                                    <div className="card-overlay">
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
                                ))
                            ) : (
                                <Box style={{ gridColumn: "1 / -1" }}>
                                    <Flex direction="column" align="center" gap="3" py="9">
                                        <ImageIcon size={48} color="var(--gray-8)" />
                                        <Text size="4" color="gray">
                                            {searchQuery ? "Tidak ada hasil yang ditemukan" : "Belum ada item galeri"}
                                        </Text>
                                        {searchQuery && (
                                            <Text size="2" color="gray">
                                                Coba kata kunci yang berbeda
                                            </Text>
                                        )}
                                    </Flex>
                                </Box>
                            )}
                        </motion.div>
                    </Box>

                    {/* Pagination */}
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        itemsPerPage={itemsPerPage}
                        totalItems={totalItems}
                    />
                </Tabs.Root>
            </Container>
        </Box>
    );
}
