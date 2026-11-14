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
import { Calendar, Users, Zap, MapPin, MonitorPlay, Clock } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { getPrograms, Program } from "@/app/actions";
import { SearchBar } from "@/components/SearchBar";
import { Pagination } from "@/components/Pagination";
import { useSearchAndPagination } from "@/lib/hooks/useSearchAndPagination";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { formatDate, formatTime } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { siteConfig } from "@/lib/data/site-config";

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const router = useRouter();
  const { language } = useLanguage();

  useEffect(() => {
    async function loadPrograms() {
      const data = await getPrograms();
      setPrograms(data);
    }
    loadPrograms();
  }, []);

  // Kategori dinamis — diambil langsung dari data, bukan hardcoded
  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(programs.map((p) => p.category).filter(Boolean)),
    ).sort();
    return ["Semua", ...unique];
  }, [programs]);

  // Derived category fallback — no effect or cascading render
  const effectiveCategory = categories.includes(selectedCategory) ? selectedCategory : "Semua";

  // Filter programs by category
  const filteredByCategory =
    effectiveCategory === "Semua"
      ? programs
      : programs.filter((p) => p.category === effectiveCategory);

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

  // Category color mapping — "gray" sebagai fallback untuk kategori yang tidak dikenal
  type CategoryBadgeColor = "purple" | "blue" | "crimson" | "orange" | "gray";
  const categoryColors: Record<string, CategoryBadgeColor> = {
    Webinar: "purple",
    Workshop: "blue",
    Meetup: "crimson",
    Hackathon: "orange",
  };
  const getCategoryColor = (category: string): CategoryBadgeColor =>
    categoryColors[category] ?? "gray";

  // Warna tombol filter dinamis (sama logic dengan badge)
  const getFilterColor = (cat: string) =>
    cat === "Semua" ? undefined : getCategoryColor(cat);

  const allLabel = language === "en" ? "All" : "Semua";

  return (
    <Box>
      {/* Hero Header */}
      <Box className="pt-28 pb-12 sm:pt-36 sm:pb-16 border-b border-neutral-200/70 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-950/50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-15 [background-image:radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px]" />
        <Container size="3" px="4" className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Flex direction="column" align="center" gap="5" py="6">
              <Badge size="2" color="indigo" variant="soft" radius="full">
                {language === "en" ? "Featured Programs" : "Program Unggulan"}
              </Badge>
              <Heading
                size={{ initial: "7", md: "9" }}
                align="center"
                style={{ lineHeight: 1.1 }}
              >
                {language === "en" ? "Level Up Your Skills," : "Tingkatkan Skill,"} <br />
                <span className="text-[#0047BA] dark:text-blue-400">
                  {language === "en" ? "Build the Future." : "Bangun Masa Depan."}
                </span>
              </Heading>
              <Text
                align="center"
                size={{ initial: "3", sm: "4", md: "5" }}
                color="gray"
                style={{ maxWidth: 700, lineHeight: 1.6 }}
              >
                {language === "en"
                  ? "Diverse educational events from technical workshops and industry webinars to hands-on hackathons await you."
                  : "Beragam kegiatan edukatif mulai dari workshop teknis, webinar industri, hingga kompetisi coding menantimu."}
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
          py="4"
          style={{
            borderBottom: "1px solid var(--gray-4)",
            backgroundColor: "var(--gray-2)",
          }}
        >
          <Container size="4" px="4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 sm:flex-wrap sm:justify-center no-scrollbar">
              {categories.map((cat) => (
                <motion.div
                  key={cat}
                  whileTap={{ scale: 0.95 }}
                  className="shrink-0"
                >
                  <Button
                    variant={effectiveCategory === cat ? "soft" : "outline"}
                    radius="full"
                    color={
                      effectiveCategory === cat ? getFilterColor(cat) : "gray"
                    }
                    highContrast={effectiveCategory === cat}
                    style={{ cursor: "pointer", minHeight: "36px" }}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat === "Semua" ? allLabel : cat}
                  </Button>
                </motion.div>
              ))}
            </div>
          </Container>
        </Box>
      </motion.div>

      {/* Search Bar */}
      <Box py="6" style={{ backgroundColor: "var(--gray-1)" }}>
        <Container size="4" px="4">
          <SearchBar
            placeholder={
              language === "en"
                ? "Search programs by title, description, or speaker..."
                : "Cari program berdasarkan judul, deskripsi, kategori, atau pembicara..."
            }
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
                : `Belum ada program ${effectiveCategory !== "Semua" ? selectedCategory : ""} tersedia`}
            </Text>
            <Text size="2" color="gray" className="leading-relaxed">
              {searchQuery
                ? (language === "en" ? "Try adjusting your search terms or filter." : "Coba gunakan kata kunci pencarian yang lain.")
                : (language === "en"
                  ? "We are preparing exciting workshops and sessions. Have a topic suggestion? Contact our team!"
                  : "Kami sedang menyiapkan agenda workshop dan sesi belajar berikutnya. Punya ide topik atau ingin kolaborasi? Hubungi kami!")}
            </Text>
            <div className="pt-2">
              <button
                onClick={() => router.push("/contact")}
                className="px-5 py-2.5 rounded-xl font-bold bg-[#0047BA] text-white hover:bg-[#003894] text-xs sm:text-sm cursor-pointer transition-all shadow-xs"
              >
                {language === "en" ? "Propose a Topic / Contact" : "Usulkan Topik / Hubungi Kami"}
              </button>
            </div>
          </Flex>
        ) : (
          <>
            <motion.div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
                gap: "24px",
              }}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
            >
              {filteredPrograms.map((program) => (
                <motion.div
                  key={program.id}
                  variants={itemVariants}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card size="3">
                    <div style={{ padding: 0, overflow: "hidden" }}>
                      <Box
                        height="200px"
                        style={{
                          backgroundImage: `url('${
                            program.image_url || "/logo.webp"
                          }')`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                      <Box p="4">
                        <Flex gap="2" mb="3">
                          <Badge color={getCategoryColor(program.category)}>
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
                                {formatDate(program.date)}
                              </Text>
                            </Flex>
                          )}
                          {program.time && (
                            <Flex gap="2" align="center">
                              <Clock size={16} color="var(--gray-9)" />
                              <Text size="2" color="gray">
                                {formatTime(program.time)}
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

                        {/* ✅ FIX: Navigasi ke /contact untuk pendaftaran */}
                        <InteractiveHoverButton
                          className="w-full"
                          onClick={() => {
                            const waMsg = `Halo Admin PUPCL, saya ingin mendaftar program: "${program.title}". Mohon info pendaftarannya.`;
                            window.open(`${siteConfig.links.whatsapp}?text=${encodeURIComponent(waMsg)}`, "_blank");
                          }}
                        >
                          Daftar via WhatsApp
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
                          Sesi belajar dan eksplorasi kode bersama rekan sesama mahasiswa.
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
                          Presentasi mini dan diskusi wawasan seputar teknologi terbaru.
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
