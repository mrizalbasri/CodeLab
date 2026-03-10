"use client";

import {
  Box,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Section,
  Text,
  Badge,
} from "@radix-ui/themes";

import { TechStackBeam } from "@/components/TechStackBeam";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { LinkPreview } from "@/components/ui/link-preview";
import { BackgroundLines } from "@/components/ui/background-lines";
import { MemberSection } from "@/components/MemberSection";

import { getMembers, Member } from "@/app/actions";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AboutPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getMembers();
        setMembers(data);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <Box>
      {/* Header Section */}
      <Box
        style={{
          background:
            "radial-gradient(circle at top center, var(--indigo-4), var(--color-background) 80%)",
          borderBottom: "1px solid var(--gray-4)",
          paddingTop: "140px",
          paddingBottom: "var(--space-6)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box className="bg-grid absolute inset-0 z-0 pointer-events-none" />
        <Container size="4" px="4" style={{ position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Flex direction="column" align="center" gap="4" py="6">
              <Heading size={{ initial: "7", md: "9" }} align="center">
                Tentang Kami
              </Heading>
              <Text
                align="center"
                size="5"
                color="gray"
                style={{ maxWidth: 700 }}
              >
                Membangun ekosistem teknologi kolaboratif di{" "}
                <LinkPreview
                  url="https://pekanbaru.president.ac.id/"
                  className="font-bold text-indigo-500 hover:underline"
                >
                  President University Pekanbaru
                </LinkPreview>
                .
              </Text>
            </Flex>
          </motion.div>
        </Container>
      </Box>

      {/* Content Section */}
      <Container size="4" py="6" px="4">
        <Flex direction="column" gap="9">
          {/* About Section with Logo */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Grid columns={{ initial: "1", md: "2" }} gap="9" align="center">
              <Box>
                <Heading size={{ initial: "6", md: "8" }} mb="4" color="indigo">
                  About PUPCL
                </Heading>
                <Text
                  as="p"
                  size="4"
                  color="gray"
                  style={{ lineHeight: 1.8, marginBottom: "1.5rem" }}
                >
                  Di era digital yang berkembang pesat, keterampilan pemrograman
                  (coding) menjadi salah satu kompetensi utama yang sangat
                  dibutuhkan. Sebagai mahasiswa President University Pekanbaru,
                  pemahaman dan kemampuan dalam coding merupakan bekal penting
                  untuk menghadapi tantangan industri masa depan.
                </Text>
                <Text
                  as="p"
                  size="4"
                  color="gray"
                  style={{ lineHeight: 1.8, marginBottom: "1.5rem" }}
                >
                  <strong>PU PEKANBARU CODE LAB (PUPCL)</strong> hadir sebagai
                  inisiatif mahasiswa untuk menciptakan lingkungan belajar yang
                  kolaboratif, kreatif, dan inovatif di bidang teknologi. Kami
                  menyediakan wadah bagi mahasiswa untuk belajar coding,
                  membangun proyek nyata, dan terhubung dengan mentor industri.
                </Text>
              </Box>

              {/* Logo Section */}
              <Flex justify="center" align="center">
                <Box
                  style={{
                    width: "100%",
                    maxWidth: "350px",
                    aspectRatio: "1/1",
                    borderRadius: "12px",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid var(--gray-alpha-4)",
                    background: "var(--color-panel-solid)",
                    boxShadow: "0 8px 24px -6px rgba(0,0,0,0.15)",
                  }}
                >
                  <img
                    src="/logo.jpeg"
                    alt="PUPCL Logo"
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              </Flex>
            </Grid>
          </motion.div>

          {/* Visi & Misi */}
          <Box mt="9">
            <Grid columns={{ initial: "1", md: "2" }} gap="6">
              {/* Visi Card */}
              <div className="relative rounded-[1.25rem] border-[0.75px] border-border p-2 md:p-3 bg-gray-100 dark:bg-gray-900/40">
                <GlowingEffect
                  blur={0}
                  borderWidth={3}
                  spread={80}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                />
                <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6 bg-white dark:bg-black/80">
                  <div className="relative flex flex-1 flex-col justify-between gap-3">
                    <div className="w-fit rounded-lg border border-gray-600/10 p-2">
                      <Heading size="6" color="indigo">
                        Visi
                      </Heading>
                    </div>
                    <div className="space-y-3">
                      <Heading
                        size="3"
                        className="font-bold text-gray-800 dark:text-gray-100"
                      >
                        Menjadi Pusat Keunggulan Teknologi
                      </Heading>
                      <Text
                        as="p"
                        size="3"
                        color="gray"
                        style={{ lineHeight: 1.6 }}
                      >
                        Menjadi komunitas belajar pemrograman di President
                        University Pekanbaru yang menginspirasi dan mendukung
                        mahasiswa untuk tumbuh bersama, mengasah kemampuan
                        coding, dan berinovasi di bidang teknologi.
                      </Text>
                    </div>
                  </div>
                </div>
              </div>

              {/* Misi Card */}
              <div className="relative rounded-[1.25rem] border-[0.75px] border-border p-2 md:p-3 bg-gray-100 dark:bg-gray-900/40">
                <GlowingEffect
                  blur={0}
                  borderWidth={3}
                  spread={80}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                />
                <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6 bg-white dark:bg-black/80">
                  <div className="relative flex flex-1 flex-col justify-between gap-3">
                    <div className="w-fit rounded-lg border border-gray-600/10 p-2">
                      <Heading size="6" color="plum">
                        Misi
                      </Heading>
                    </div>
                    <Flex direction="column" gap="2">
                      {[
                        "Menyelenggarakan pelatihan coding rutin untuk meningkatkan keterampilan anggota.",
                        "Membangun pemecah masalah tangguh dengan keterampilan teknis.",
                        "Mendorong anggota aktif membangun portofolio.",
                        "Menumbuhkan semangat kolaborasi dan inovasi tim.",
                        "Mendorong partisipasi dalam perlombaan teknologi.",
                      ].map((item, i) => (
                        <Text
                          key={i}
                          as="p"
                          size="2"
                          color="gray"
                          style={{
                            lineHeight: 1.5,
                            display: "flex",
                            gap: "8px",
                          }}
                        >
                          <span
                            style={{
                              fontWeight: "bold",
                              color: "var(--plum-9)",
                            }}
                          >
                            {i + 1}.
                          </span>{" "}
                          {item}
                        </Text>
                      ))}
                    </Flex>
                  </div>
                </div>
              </div>
            </Grid>
          </Box>

          {/* Tujuan & Sasaran */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Box mt="4">
              <Heading size="7" mb="4">
                Tujuan & Sasaran
              </Heading>
              <Grid columns={{ initial: "1", md: "2" }} gap="6">
                <Box>
                  <Heading size="4" color="teal" mb="2">
                    Tujuan Kegiatan
                  </Heading>
                  <ul
                    style={{
                      listStyleType: "disc",
                      paddingLeft: "20px",
                      color: "var(--gray-11)",
                      lineHeight: "1.6",
                    }}
                  >
                    <li>
                      Wadah pengembangan kemampuan pemrograman & software
                      development.
                    </li>
                    <li>
                      Meningkatkan keterampilan praktis & minat teknologi.
                    </li>
                    <li>
                      Mendorong kolaborasi lintas jurusan, dosen, dan komunitas.
                    </li>
                  </ul>
                </Box>
                <Box>
                  <Heading size="4" color="orange" mb="2">
                    Sasaran Kegiatan
                  </Heading>
                  <Text as="p" color="gray" style={{ lineHeight: 1.6 }}>
                    Seluruh mahasiswa President University Pekanbaru yang
                    tertarik mempelajari pemrograman, terbuka bagi berbagai
                    jurusan untuk menjangkau lebih banyak peserta antusias.
                  </Text>
                </Box>
              </Grid>
            </Box>
          </motion.div>

          {/* Tech Stack Section */}
          <Box mt="9">
            <Grid columns={{ initial: "1", md: "2" }} gap="9" align="center">
              <Box>
                <Badge
                  color="cyan"
                  size="2"
                  radius="full"
                  variant="soft"
                  mb="2"
                >
                  Teknologi & Tools
                </Badge>
                <Heading
                  size={{ initial: "6", md: "8" }}
                  mb="4"
                  color="gray"
                  highContrast
                >
                  Kami Bereksplorasi dengan Modern Tech Stack
                </Heading>
                <Text
                  as="p"
                  size="4"
                  color="gray"
                  style={{ lineHeight: 1.8, marginBottom: "1.5rem" }}
                >
                  Di CodeLab, kami tidak membatasi diri pada satu teknologi.
                  Kami mendorong anggota untuk mengeksplorasi berbagai bahasa,
                  framework, dan tools industri terkini untuk membangun solusi
                  yang tangguh dan relevan.
                </Text>

                <Grid columns="2" gap="4">
                  <Box>
                    <Heading size="3" mb="2" color="indigo">
                      Core
                    </Heading>
                    <Text size="2" color="gray">
                      HTML, CSS, JavaScript, TypeScript, Java, Python
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="3" mb="2" color="blue">
                      Frameworks
                    </Heading>
                    <Text size="2" color="gray">
                      React, Next.js, Laravel, Flutter, Tailwind
                    </Text>
                  </Box>
                </Grid>
              </Box>

              <Box style={{ position: "relative" }}>
                <Card
                  size="3"
                  style={{
                    background: "var(--gray-2)",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    aspectRatio: "1/1",
                    position: "relative",
                    padding: 0,
                  }}
                >
                  <Box
                    style={{
                      inset: 0,
                      position: "absolute",
                      opacity: 0.5,
                      pointerEvents: "none",
                      background:
                        "radial-gradient(circle at center, var(--indigo-3), transparent 70%)",
                    }}
                  />
                  <TechStackBeam />
                </Card>
              </Box>
            </Grid>
          </Box>

          {/* ─── Team Section ─────────────────────────────────────────────────────── */}
          <Section>
            <Flex direction="column" align="center" gap="3" mb="8">
              <Badge color="orange" size="2" radius="full" variant="soft">
                Our Team
              </Badge>
              <Heading size={{ initial: "6", md: "8" }} align="center">
                Club Structure
              </Heading>
              <Text
                align="center"
                color="gray"
                size="3"
                style={{ maxWidth: 600 }}
              >
                Meet the dedicated individuals who lead and drive our community
                forward
              </Text>
            </Flex>

            <Flex
              direction="column"
              gap="9"
              align="center"
              style={{ marginTop: "2rem" }}
            >
              {/* Helper filters — didefinisikan sekali, dipakai ulang untuk catch-all */}
              {(() => {
                const isLeadership = (m: Member) => {
                  const r = m.role.toLowerCase();
                  return (
                    r.includes("ketua") ||
                    r.includes("president") ||
                    r.includes("leader") ||
                    r.includes("chairman") ||
                    r.includes("chief") ||
                    r.includes("head of club") ||
                    r === "head"
                  );
                };
                const isCoreTeam = (m: Member) => {
                  const r = m.role.toLowerCase();
                  return (
                    r.includes("bendahara") ||
                    r.includes("sekretaris") ||
                    r.includes("treasurer") ||
                    r.includes("secretary")
                  );
                };
                const isMedia = (m: Member) =>
                  m.role.toLowerCase().includes("media");
                const isOutreach = (m: Member) => {
                  const r = m.role.toLowerCase();
                  return (
                    r.includes("outreach") || r.includes("public relation")
                  );
                };
                const isResearch = (m: Member) =>
                  m.role.toLowerCase().includes("research");

                // Anggota yang tidak masuk section manapun
                const unmatched = members.filter(
                  (m) =>
                    !isLeadership(m) &&
                    !isCoreTeam(m) &&
                    !isMedia(m) &&
                    !isOutreach(m) &&
                    !isResearch(m),
                );

                return (
                  <>
                    {/* Ketua / Leadership */}
                    <MemberSection
                      label="Leadership"
                      color="indigo"
                      isLoading={isLoading}
                      members={members.filter(isLeadership)}
                      variant="large"
                      animateOnView={false}
                      centered
                    />

                    {/* Bendahara & Sekretaris */}
                    <MemberSection
                      label="Core Team"
                      color="teal"
                      isLoading={isLoading}
                      members={members.filter(isCoreTeam)}
                    />

                    {/* Divisi Media & Creative */}
                    <MemberSection
                      label="Media & Creative"
                      color="pink"
                      isLoading={isLoading}
                      description="Responsible for visual branding, creative content production, and social media management to strengthen community identity."
                      members={members.filter(isMedia)}
                    />

                    {/* Divisi Outreach & Influence */}
                    <MemberSection
                      label="Outreach & Influence"
                      color="orange"
                      isLoading={isLoading}
                      description="Building external relationships, forging strategic partnerships, and expanding community reach both on and off campus."
                      members={members.filter(isOutreach)}
                      minCardWidth="300px"
                    />

                    {/* Divisi Research & Development */}
                    <MemberSection
                      label="Research & Development"
                      color="blue"
                      isLoading={isLoading}
                      description="Focused on curriculum development, latest technology research, and organizing relevant technical education programs."
                      members={members.filter(isResearch)}
                      minCardWidth="300px"
                    />

                    {/* Catch-all: anggota yang role-nya belum masuk divisi manapun */}
                    {!isLoading && unmatched.length > 0 && (
                      <MemberSection
                        label="Anggota"
                        color="gray"
                        isLoading={false}
                        members={unmatched}
                      />
                    )}
                  </>
                );
              })()}
            </Flex>
          </Section>
        </Flex>
      </Container>

      {/* Full Width CTA Section with Background Lines */}
      <BackgroundLines className="w-full py-20">
        <Container size="3">
          <Flex direction="column" align="center" gap="6">
            <Heading
              size="9"
              align="center"
              highContrast
              className="bg-clip-text text-transparent bg-gradient-to-b from-indigo-600 via-purple-600 to-indigo-700 dark:from-indigo-200 dark:via-purple-200 dark:to-indigo-100 text-center"
            >
              Siap untuk Berinovasi Bersama Kami?
            </Heading>
            <Text
              align="center"
              size="5"
              className="max-w-2xl text-neutral-700 dark:text-neutral-300"
            >
              Jangan lewatkan kesempatan untuk belajar, berkarya, dan berkembang
              bersama komunitas pemuda visioner di President University
              Pekanbaru.
            </Text>
            {/* ✅ FIX: CTA button now navigates to /contact */}
            <InteractiveHoverButton
              className="mt-4 bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-600 dark:text-white dark:hover:bg-indigo-700 border-none px-8 py-3"
              onClick={() => router.push("/contact")}
            >
              Gabung CodeLab Sekarang
            </InteractiveHoverButton>
          </Flex>
        </Container>
      </BackgroundLines>
    </Box>
  );
}
