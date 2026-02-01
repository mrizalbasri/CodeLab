"use client";

import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Grid,
  Card,
  Badge,
  Button,
} from "@radix-ui/themes";
import {
  Calendar,
  Users,
  Zap,
  MapPin,
  MonitorPlay,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getPrograms, Program } from "@/app/actions";
import { SearchBar } from "@/components/SearchBar";
import { Pagination } from "@/components/Pagination";
import { useSearchAndPagination } from "@/lib/hooks/useSearchAndPagination";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");

  useEffect(() => {
    async function loadPrograms() {
      const data = await getPrograms();
      setPrograms(data);
    }
    loadPrograms();
  }, []);

  // Filter programs by category
  const filteredByCategory =
    selectedCategory === "Semua"
      ? programs
      : programs.filter((p) => p.category === selectedCategory);

  // Setup search dan pagination
  const {
    paginatedData: filteredPrograms,
    totalItems,
    searchQuery,
    handleSearch,
    handleClearSearch,
    currentPage,
    totalPages,
    handlePageChange,
    itemsPerPage,
  } = useSearchAndPagination({
    data: filteredByCategory,
    itemsPerPage: 6,
    searchFields: ["title", "description", "category", "speaker", "location"],
    analyticsSection: "Programs",
  });

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 50 },
    },
  };

  // Category color mapping
  const categoryColors: Record<string, "purple" | "blue" | "crimson" | "orange"> = {
    Webinar: "purple",
    Workshop: "blue",
    Meetup: "crimson",
    Hackathon: "orange",
  };

  return (
    <Box>
      {/* Hero Header */}
      <Box
        style={{
          background:
            "radial-gradient(circle at top center, var(--indigo-4), var(--color-background) 80%)",
          borderBottom: "1px solid var(--gray-4)",
          paddingTop: "140px",
          paddingBottom: "var(--space-9)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          className="bg-grid"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
          }}
        />
        <Container size="3" px="4" style={{ position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Flex direction="column" align="center" gap="5" py="6">
              <Badge size="2" color="indigo" variant="soft" radius="full">
                Program Unggulan
              </Badge>
              <Heading size={{ initial: "7", md: "9" }} align="center" style={{ lineHeight: 1.1 }}>
                Tingkatkan Skill, <br />
                <span style={{ color: "var(--accent-9)" }}>
                  Bangun Masa Depan.
                </span>
              </Heading>
              <Text
                align="center"
                size="5"
                color="gray"
                style={{ maxWidth: 700 }}
              >
                Beragam kegiatan edukatif mulai dari workshop teknis, webinar
                industri, hingga kompetisi coding menantimu.
              </Text>
            </Flex>
          </motion.div>
        </Container>
      </Box>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Box
          py="6"
          style={{
            borderBottom: "1px solid var(--gray-4)",
            backgroundColor: "var(--gray-2)",
          }}
        >
          <Container size="4" px="4">
            <Flex justify="center" gap={{ initial: "2", md: "4" }} wrap="wrap">
              {["Semua", "Webinar", "Workshop", "Meetup", "Hackathon"].map(
                (cat) => (
                  <motion.div
                    key={cat}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      variant={selectedCategory === cat ? "soft" : "outline"}
                      radius="full"
                      color={selectedCategory === cat ? undefined : "gray"}
                      highContrast={selectedCategory === cat}
                      style={{ cursor: "pointer" }}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </Button>
                  </motion.div>
                )
              )}
            </Flex>
          </Container>
        </Box>
      </motion.div>

      {/* Search Bar */}
      <Box py="6" style={{ backgroundColor: "var(--gray-1)" }}>
        <Container size="4" px="4">
          <SearchBar
            placeholder="Cari program berdasarkan judul, deskripsi, kategori, atau pembicara..."
            onSearch={handleSearch}
            onClear={handleClearSearch}
          />
          {searchQuery && (
            <Box mt="3">
              <Text size="2" color="gray">
                Menampilkan {totalItems} hasil untuk &quot;{searchQuery}&quot;
              </Text>
            </Box>
          )}
        </Container>
      </Box>

      {/* Events Grid */}
      <Container size="4" py={{ initial: "6", md: "9" }} px="4">
        {filteredPrograms.length === 0 ? (
          <Flex
            justify="center"
            align="center"
            direction="column"
            gap="4"
            py="9"
          >
            <Text size="5" color="gray">
              {searchQuery 
                ? "Tidak ada program yang ditemukan" 
                : `Belum ada program ${selectedCategory !== "Semua" ? selectedCategory : ""} tersedia`
              }
            </Text>
            <Text size="2" color="gray">
              {searchQuery 
                ? "Coba kata kunci yang berbeda"
                : "Tambahkan program melalui Admin Dashboard"
              }
            </Text>
          </Flex>
        ) : (
          <>
            <motion.div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "24px",
              }}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredPrograms.map((program) => (
                <motion.div
                  key={program.id}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card size="3">
                    <div style={{ padding: 0, overflow: "hidden" }}>
                      <Box
                        height="200px"
                        style={{
                          backgroundImage: `url('${
                            program.image_url ||
                            "/logo.jpeg"
                          }')`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                    <Box p="4">
                      <Flex gap="2" mb="3">
                        <Badge color={categoryColors[program.category]}>
                          {program.category}
                        </Badge>
                        {program.status && (
                          <Badge color="cyan" variant="soft">
                            {program.status}
                          </Badge>
                        )}
                      </Flex>
                      <Heading size="5" mb="2">
                        {program.title}
                      </Heading>
                      <Text
                        as="p"
                        size="2"
                        color="gray"
                        mb="4"
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {program.description || "Deskripsi akan segera hadir"}
                      </Text>

                      <Flex direction="column" gap="2" mb="4">
                        {program.date && (
                          <Flex gap="2" align="center">
                            <Calendar size={16} color="var(--gray-9)" />
                            <Text size="2" color="gray">
                              {program.date}
                            </Text>
                          </Flex>
                        )}
                        {program.time && (
                          <Flex gap="2" align="center">
                            <Clock size={16} color="var(--gray-9)" />
                            <Text size="2" color="gray">
                              {program.time}
                            </Text>
                          </Flex>
                        )}
                        {program.location && (
                          <Flex gap="2" align="center">
                            <MapPin size={16} color="var(--gray-9)" />
                            <Text size="2" color="gray">
                              {program.location}
                            </Text>
                          </Flex>
                        )}
                        {program.speaker && (
                          <Flex gap="2" align="center">
                            <Users size={16} color="var(--gray-9)" />
                            <Text size="2" color="gray">
                              {program.speaker}
                            </Text>
                          </Flex>
                        )}
                      </Flex>

                      <InteractiveHoverButton
                        className="w-full"
                        onClick={() => { /* Add logic/link if needed later */ }}
                      >
                        Daftar Sekarang
                      </InteractiveHoverButton>
                    </Box>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Pagination */}
            <Box mt="8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                itemsPerPage={itemsPerPage}
                totalItems={totalItems}
              />
            </Box>
          </>
        )}
      </Container>

      {/* Community Activities Section */}
      <Box py="9" style={{ backgroundColor: "var(--gray-2)" }}>
        <Container size="3" px="4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Flex direction="column" align="center" gap="6">
              <Box
                p="3"
                style={{
                  borderRadius: "50%",
                  backgroundColor: "var(--indigo-3)",
                }}
              >
                <Users size={40} color="var(--indigo-11)" />
              </Box>
              <Heading size="7" align="center">
                Aktivitas Komunitas
              </Heading>
              <Text align="center" color="gray" style={{ maxWidth: 600 }}>
                Selain acara formal, kami juga rutin mengadakan kegiatan
                komunitas untuk mempererat tali persaudaraan.
              </Text>

              <Grid columns={{ initial: "1", sm: "2" }} gap="5" width="100%">
                <motion.div whileHover={{ translateX: 10 }}>
                  <Card>
                    <Flex gap="4" align="center">
                      <Box
                        p="2"
                        style={{
                          backgroundColor: "var(--green-3)",
                          borderRadius: 8,
                        }}
                      >
                        <MonitorPlay color="var(--green-11)" />
                      </Box>
                      <Box>
                        <Heading size="4">Weekly Code Review</Heading>
                        <Text size="2" color="gray">
                          Bedah kode bersama setiap Kamis malam.
                        </Text>
                      </Box>
                    </Flex>
                  </Card>
                </motion.div>
                <motion.div whileHover={{ translateX: 10 }}>
                  <Card>
                    <Flex gap="4" align="center">
                      <Box
                        p="2"
                        style={{
                          backgroundColor: "var(--orange-3)",
                          borderRadius: 8,
                        }}
                      >
                        <Zap color="var(--orange-11)" />
                      </Box>
                      <Box>
                        <Heading size="4">Lightning Talks</Heading>
                        <Text size="2" color="gray">
                          Sesi berbagi ilmu singkat 5 menit.
                        </Text>
                      </Box>
                    </Flex>
                  </Card>
                </motion.div>
              </Grid>
            </Flex>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
}
