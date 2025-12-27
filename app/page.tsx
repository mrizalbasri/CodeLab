"use client";

import { Box, Button, Container, Flex, Grid, Heading, Section, Text, Card, Avatar } from "@radix-ui/themes";
import { ArrowRight, Code, Users, Trophy, HandHeart, Calendar } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar"; // Ensure Navbar is used if not in layout, but it IS in layout. remove import if unused or keeping it clean.
// Actually, Navbar is in Layout, so we don't need it here.

export default function Home() {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        style={{
          background: "radial-gradient(ellipse at top, var(--indigo-4), var(--color-background))",
          borderBottom: "1px solid var(--gray-4)",
        }}
        py={{ initial: "8", md: "9" }}
      >
        <Container size="3">
          <Flex direction="column" align="center" gap="5" py="9">
            <Box
              px="3" py="1"
              style={{ backgroundColor: "var(--accent-3)", borderRadius: "9999px", color: "var(--accent-11)" }}
            >
              <Text size="2" weight="medium">Selamat Datang di TechClub 🚀</Text>
            </Box>

            <Heading size="9" align="center" style={{ maxWidth: 800 }}>
              Bangun Masa Depan Digital Bersama Komunitas
            </Heading>

            <Text size="5" align="center" color="gray" style={{ maxWidth: 600 }}>
              Bergabunglah dengan ribuan pengembang, desainer, dan antusias teknologi untuk belajar, berbagi, dan berinovasi.
            </Text>

            <Flex gap="4" mt="4">
              <Button size="4" variant="solid" highContrast style={{ cursor: "pointer" }}>
                Gabung Member <ArrowRight size={18} />
              </Button>
              <Button size="4" variant="surface" color="gray" style={{ cursor: "pointer" }}>
                Lihat Program
              </Button>
            </Flex>
          </Flex>
        </Container>
      </Box>

      {/* Stats / Trust Section */}
      <Box style={{ borderBottom: "1px solid var(--gray-4)", backgroundColor: "var(--gray-2)" }} py="6">
        <Container size="4">
          <Flex justify="center" gap={{ initial: "5", md: "9" }} wrap="wrap">
            <Flex align="center" gap="2">
              <Code color="var(--accent-9)" /> <Text weight="bold" size="3">Coding Bootcamp</Text>
            </Flex>
            <Flex align="center" gap="2">
              <Users color="var(--accent-9)" /> <Text weight="bold" size="3">500+ Anggota</Text>
            </Flex>
            <Flex align="center" gap="2">
              <Trophy color="var(--accent-9)" /> <Text weight="bold" size="3">Juara Hackathon</Text>
            </Flex>
          </Flex>
        </Container>
      </Box>

      {/* Vision & Mission Grid */}
      <Section size="3">
        <Container size="4">
          <Heading size="8" mb="6" align="center">Kenapa Bergabung?</Heading>

          <Grid columns={{ initial: "1", md: "3" }} gap="5">
            <Card size="3" style={{ transition: "transform 0.2s" }} className="hover:scale-[1.02]">
              <Flex gap="4" direction="column">
                <Box p="2" width="max-content" style={{ borderRadius: 8, backgroundColor: "var(--indigo-3)" }}>
                  <Users size={32} color="var(--indigo-11)" />
                </Box>
                <Box>
                  <Heading size="4" mb="2">Networking Luas</Heading>
                  <Text as="p" color="gray" size="3">
                    Bertemu dengan mentor dan teman sefrekuensi untuk kolaborasi proyek impianmu.
                  </Text>
                </Box>
              </Flex>
            </Card>

            <Card size="3" style={{ transition: "transform 0.2s" }} className="hover:scale-[1.02]">
              <Flex gap="4" direction="column">
                <Box p="2" width="max-content" style={{ borderRadius: 8, backgroundColor: "var(--pink-3)" }}>
                  <HandHeart size={32} color="var(--pink-11)" />
                </Box>
                <Box>
                  <Heading size="4" mb="2">Visi & Misi</Heading>
                  <Text as="p" color="gray" size="3">
                    Menciptakan ekosistem teknologi yang inklusif dan memberdayakan talenta lokal menuju global.
                  </Text>
                </Box>
              </Flex>
            </Card>

            <Card size="3" style={{ transition: "transform 0.2s" }} className="hover:scale-[1.02]">
              <Flex gap="4" direction="column">
                <Box p="2" width="max-content" style={{ borderRadius: 8, backgroundColor: "var(--orange-3)" }}>
                  <Calendar size={32} color="var(--orange-11)" />
                </Box>
                <Box>
                  <Heading size="4" mb="2">Edukasi Berkelanjutan</Heading>
                  <Text as="p" color="gray" size="3">
                    Workshop rutin, webinar, dan kelas intensif untuk meningkatkan skill teknis dan soft skill.
                  </Text>
                </Box>
              </Flex>
            </Card>
          </Grid>
        </Container>
      </Section>

      {/* Upcoming Activities Teaser */}
      <Box py="9" style={{ backgroundColor: "var(--gray-2)" }}>
        <Container size="3">
          <Flex direction="column" align="center" gap="5">
            <Heading size="7">Siap untuk Memulai?</Heading>
            <Text align="center" size="4" color="gray">
              Jangan lewatkan kesempatan untuk berkembang bersama kami. <br />
              Daftar sekarang untuk mendapatkan akses ke semua materi dan event eksklusif.
            </Text>
            <Button size="4" variant="soft" highContrast style={{ cursor: "pointer" }}>Lihat Jadwal Kegiatan</Button>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}
