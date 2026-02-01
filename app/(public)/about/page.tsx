"use client";

import {
  Box,
  Card,
  Container,
  Flex,
  Heading,
  Section,
  Text,
  Avatar,
  Badge,
  Grid,
} from "@radix-ui/themes";

import { Meteors } from "@/components/ui/meteors";
import { TechStackBeam } from "@/components/TechStackBeam";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { LinkPreview } from "@/components/ui/link-preview";
import { BackgroundLines } from "@/components/ui/background-lines";

import { getMembers, Member } from "@/app/actions";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function getRoleColor(color: Member["color"]) {
  switch (color) {
    case "indigo":
      return "var(--indigo-9)";
    case "pink":
      return "var(--pink-9)";
    case "teal":
      return "var(--teal-9)";
    case "orange":
      return "var(--orange-9)";
    case "blue":
      return "var(--blue-9)";
    default:
      return "var(--gray-9)";
  }
}

function getRoleLightColor(color: Member["color"]) {
  switch (color) {
    case "indigo":
      return "var(--indigo-3)";
    case "pink":
      return "var(--pink-3)";
    case "teal":
      return "var(--teal-3)";
    case "orange":
      return "var(--orange-3)";
    case "blue":
      return "var(--blue-3)";
    default:
      return "var(--gray-3)";
  }
}

export default function AboutPage() {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getMembers();

      setMembers(data);
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
          paddingBottom: "var(--space-6)", // Reduced from space-9
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
        {" "}
        {/* Reduced from py="9" */}
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
                    borderRadius: "12px", // Sedikit rounded biar modern
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid var(--gray-alpha-4)", // Border tipis
                    background: "var(--color-panel-solid)", // Background panel halus
                    boxShadow: "0 8px 24px -6px rgba(0,0,0,0.15)", // Shadow lembut
                  }}
                >
                  {/* Replace src with your actual logo file path */}
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

          {/* Visi & Misi - Enhanced with Glowing Effect */}
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
                    <div className="w-fit rounded-lg border border-gray-600/10 p-2 ">
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
                    <div className="w-fit rounded-lg border border-gray-600/10 p-2 ">
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
                <Heading size={{ initial: "6", md: "8" }} mb="4" color="gray" highContrast>
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

          {/* Team Section - Modern Layout */}
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
              {/* Ketua - Top Level */}
              <Box
                style={{
                  width: "100%",
                  maxWidth: "1200px",
                  marginBottom: "3rem",
                }}
              >
                <Flex justify="center" mb="6">
                  <Badge color="indigo" size="3" radius="full" variant="soft">
                    Leadership
                  </Badge>
                </Flex>
                <Flex justify="center" style={{ width: "100%" }}>
                  {members
                    .filter((m) => {
                      const role = m.role.toLowerCase();
                      return (
                        role.includes("ketua") ||
                        role.includes("president") ||
                        role.includes("leader") ||
                        role.includes("chairman") ||
                        role.includes("chief") ||
                        role.includes("head of club") ||
                        role === "head"
                      );
                    })
                    .map((member) => (
                      <motion.div
                        key={member.id}
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.2,
                          duration: 0.6,
                          type: "spring",
                          stiffness: 100,
                        }}
                        style={{ maxWidth: "360px", width: "100%" }}
                      >
                        <Card
                          style={{
                            padding: 0,
                            overflow: "hidden",
                            cursor: "pointer",
                            transition:
                              "transform 0.3s ease, box-shadow 0.3s ease",
                            width: "100%",
                            maxWidth: "360px",
                          }}
                          className="member-card"
                        >
                          <Box
                            style={{
                              height: 120,
                              background: `linear-gradient(135deg, ${getRoleLightColor(
                                member.color,
                              )} 0%, ${getRoleColor(member.color)} 100%)`,
                              position: "relative",
                              overflow: "hidden",
                            }}
                          >
                            <Meteors number={20} />
                            <Box
                              style={{
                                position: "absolute",
                                bottom: -55,
                                left: "50%",
                                transform: "translateX(-50%)",
                                zIndex: 10,
                              }}
                            >
                              <Avatar
                                size="9"
                                src={member.image || ""}
                                fallback={member.name[0]}
                                radius="full"
                                style={{
                                  border:
                                    "5px solid var(--color-card-background)",
                                  backgroundColor: "var(--gray-4)",
                                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                }}
                              />
                            </Box>
                          </Box>
                          <Box p="5" pt="8" pb="6">
                            <Flex
                              direction="column"
                              align="center"
                              gap="3"
                              style={{ marginTop: 20 }}
                            >
                              <Heading size="5" align="center">
                                {member.name}
                              </Heading>
                              <Badge
                                color={member.color}
                                size="2"
                                variant="soft"
                                radius="full"
                              >
                                {member.role}
                              </Badge>
                            </Flex>
                          </Box>
                        </Card>
                      </motion.div>
                    ))}
                </Flex>
              </Box>

              {/* Bendahara & Sekretaris - Second Level */}
              <Box
                style={{
                  width: "100%",
                  maxWidth: "1200px",
                  marginBottom: "3rem",
                }}
              >
                <Flex justify="center" mb="6">
                  <Badge color="teal" size="3" radius="full" variant="soft">
                    Core Team
                  </Badge>
                </Flex>
                <Box
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "32px",
                  }}
                >
                  {members
                    .filter(
                      (m) =>
                        m.role.toLowerCase().includes("bendahara") ||
                        m.role.toLowerCase().includes("sekretaris") ||
                        m.role.toLowerCase().includes("treasurer") ||
                        m.role.toLowerCase().includes("secretary"),
                    )
                    .map((member, index) => (
                      <motion.div
                        key={member.id}
                        initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.5 + index * 0.15,
                          duration: 0.6,
                          type: "spring",
                          stiffness: 80,
                        }}
                      >
                        <Card
                          style={{
                            padding: 0,
                            overflow: "hidden",
                            cursor: "pointer",
                            transition:
                              "transform 0.3s ease, box-shadow 0.3s ease",
                            height: "100%",
                          }}
                          className="member-card"
                        >
                          <Box
                            style={{
                              height: 110,
                              background: `linear-gradient(135deg, ${getRoleLightColor(
                                member.color,
                              )} 0%, ${getRoleColor(member.color)} 100%)`,
                              position: "relative",
                              overflow: "hidden",
                            }}
                          >
                            <Meteors number={20} />
                            <Box
                              style={{
                                position: "absolute",
                                bottom: -50,
                                left: "50%",
                                transform: "translateX(-50%)",
                                zIndex: 10,
                              }}
                            >
                              <Avatar
                                size="8"
                                src={member.image || ""}
                                fallback={member.name[0]}
                                radius="full"
                                style={{
                                  border:
                                    "5px solid var(--color-card-background)",
                                  backgroundColor: "var(--gray-4)",
                                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                }}
                              />
                            </Box>
                          </Box>
                          <Box p="5" pt="8" pb="6">
                            <Flex
                              direction="column"
                              align="center"
                              gap="3"
                              style={{ marginTop: 16 }}
                            >
                              <Heading size="5" align="center">
                                {member.name}
                              </Heading>
                              <Badge
                                color={member.color}
                                size="2"
                                variant="soft"
                                radius="full"
                              >
                                {member.role}
                              </Badge>
                            </Flex>
                          </Box>
                        </Card>
                      </motion.div>
                    ))}
                </Box>
              </Box>

              {/* Divisi Media & Creative */}
              <Box
                style={{
                  width: "100%",
                  maxWidth: "1200px",
                  marginBottom: "3rem",
                }}
              >
                <Flex direction="column" align="center" mb="8" gap="3">
                  <Badge color="pink" size="3" radius="full" variant="soft">
                    Media & Creative
                  </Badge>
                  <Text align="center" color="gray" style={{ maxWidth: 600 }}>
                    Responsible for visual branding, creative content
                    production, and social media management to strengthen
                    community identity.
                  </Text>
                </Flex>
                <Box
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "32px",
                  }}
                >
                  {members
                    .filter((m) => m.role.toLowerCase().includes("media"))
                    .sort((a, b) => {
                      const aIsHead = a.role.toLowerCase().includes("head");
                      const bIsHead = b.role.toLowerCase().includes("head");
                      return aIsHead === bIsHead ? 0 : aIsHead ? -1 : 1;
                    })
                    .map((member, index) => (
                      <motion.div
                        key={member.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.2 + index * 0.1,
                          duration: 0.5,
                          type: "spring",
                          stiffness: 100,
                        }}
                      >
                        <Card
                          style={{
                            padding: 0,
                            overflow: "hidden",
                            cursor: "pointer",
                            transition:
                              "transform 0.3s ease, box-shadow 0.3s ease",
                            height: "100%",
                          }}
                          className="member-card"
                        >
                          <Box
                            style={{
                              height: 110,
                              background: `linear-gradient(135deg, ${getRoleLightColor(
                                member.color,
                              )} 0%, ${getRoleColor(member.color)} 100%)`,
                              position: "relative",
                              overflow: "hidden",
                            }}
                          >
                            <Meteors number={15} />
                            <Box
                              style={{
                                position: "absolute",
                                bottom: -50,
                                left: "50%",
                                transform: "translateX(-50%)",
                                zIndex: 10,
                              }}
                            >
                              <Avatar
                                size="8"
                                src={member.image || ""}
                                fallback={member.name[0]}
                                radius="full"
                                style={{
                                  border:
                                    "5px solid var(--color-card-background)",
                                  backgroundColor: "var(--gray-4)",
                                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                }}
                              />
                            </Box>
                          </Box>
                          <Box p="5" pt="8" pb="6">
                            <Flex
                              direction="column"
                              align="center"
                              gap="3"
                              style={{ marginTop: 16 }}
                            >
                              <Heading size="5" align="center">
                                {member.name}
                              </Heading>
                              <Badge
                                color={member.color}
                                size="2"
                                variant="soft"
                                radius="full"
                              >
                                {member.role}
                              </Badge>
                            </Flex>
                          </Box>
                        </Card>
                      </motion.div>
                    ))}
                </Box>
              </Box>

              {/* Divisi Outreach & Influence */}
              <Box
                style={{
                  width: "100%",
                  maxWidth: "1200px",
                  marginBottom: "3rem",
                }}
              >
                <Flex direction="column" align="center" mb="8" gap="3">
                  <Badge color="orange" size="3" radius="full" variant="soft">
                    Outreach & Influence
                  </Badge>
                  <Text align="center" color="gray" style={{ maxWidth: 600 }}>
                    Building external relationships, forging strategic
                    partnerships, and expanding community reach both on and off
                    campus.
                  </Text>
                </Flex>
                <Box
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "32px",
                  }}
                >
                  {members
                    .filter(
                      (m) =>
                        m.role.toLowerCase().includes("outreach") ||
                        m.role.toLowerCase().includes("public relation"),
                    )
                    .sort((a, b) => {
                      const aIsHead = a.role.toLowerCase().includes("head");
                      const bIsHead = b.role.toLowerCase().includes("head");
                      return aIsHead === bIsHead ? 0 : aIsHead ? -1 : 1;
                    })
                    .map((member, index) => (
                      <motion.div
                        key={member.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.2 + index * 0.1,
                          duration: 0.5,
                          type: "spring",
                          stiffness: 100,
                        }}
                      >
                        <Card
                          style={{
                            padding: 0,
                            overflow: "hidden",
                            cursor: "pointer",
                            transition:
                              "transform 0.3s ease, box-shadow 0.3s ease",
                            height: "100%",
                          }}
                          className="member-card"
                        >
                          <Box
                            style={{
                              height: 110,
                              background: `linear-gradient(135deg, ${getRoleLightColor(
                                member.color,
                              )} 0%, ${getRoleColor(member.color)} 100%)`,
                              position: "relative",
                              overflow: "hidden",
                            }}
                          >
                            <Meteors number={15} />
                            <Box
                              style={{
                                position: "absolute",
                                bottom: -50,
                                left: "50%",
                                transform: "translateX(-50%)",
                                zIndex: 10,
                              }}
                            >
                              <Avatar
                                size="8"
                                src={member.image || ""}
                                fallback={member.name[0]}
                                radius="full"
                                style={{
                                  border:
                                    "5px solid var(--color-card-background)",
                                  backgroundColor: "var(--gray-4)",
                                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                }}
                              />
                            </Box>
                          </Box>
                          <Box p="5" pt="8" pb="6">
                            <Flex
                              direction="column"
                              align="center"
                              gap="3"
                              style={{ marginTop: 16 }}
                            >
                              <Heading size="5" align="center">
                                {member.name}
                              </Heading>
                              <Badge
                                color={member.color}
                                size="2"
                                variant="soft"
                                radius="full"
                              >
                                {member.role}
                              </Badge>
                            </Flex>
                          </Box>
                        </Card>
                      </motion.div>
                    ))}
                </Box>
              </Box>

              {/* Divisi Research */}
              <Box style={{ width: "100%", maxWidth: "1200px" }}>
                <Flex direction="column" align="center" mb="8" gap="3">
                  <Badge color="blue" size="3" radius="full" variant="soft">
                    Research & Development
                  </Badge>
                  <Text align="center" color="gray" style={{ maxWidth: 600 }}>
                    Focused on curriculum development, latest technology
                    research, and organizing relevant technical education
                    programs.
                  </Text>
                </Flex>
                <Box
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "32px",
                  }}
                >
                  {members
                    .filter((m) => m.role.toLowerCase().includes("research"))
                    .sort((a, b) => {
                      const aIsHead = a.role.toLowerCase().includes("head");
                      const bIsHead = b.role.toLowerCase().includes("head");
                      return aIsHead === bIsHead ? 0 : aIsHead ? -1 : 1;
                    })
                    .map((member, index) => (
                      <motion.div
                        key={member.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.2 + index * 0.1,
                          duration: 0.5,
                          type: "spring",
                          stiffness: 100,
                        }}
                      >
                        <Card
                          style={{
                            padding: 0,
                            overflow: "hidden",
                            cursor: "pointer",
                            transition:
                              "transform 0.3s ease, box-shadow 0.3s ease",
                            height: "100%",
                          }}
                          className="member-card"
                        >
                          <Box
                            style={{
                              height: 110,
                              background: `linear-gradient(135deg, ${getRoleLightColor(
                                member.color,
                              )} 0%, ${getRoleColor(member.color)} 100%)`,
                              position: "relative",
                              overflow: "hidden",
                            }}
                          >
                            <Meteors number={15} />
                            <Box
                              style={{
                                position: "absolute",
                                bottom: -50,
                                left: "50%",
                                transform: "translateX(-50%)",
                                zIndex: 10,
                              }}
                            >
                              <Avatar
                                size="8"
                                src={member.image || ""}
                                fallback={member.name[0]}
                                radius="full"
                                style={{
                                  border:
                                    "5px solid var(--color-card-background)",
                                  backgroundColor: "var(--gray-4)",
                                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                }}
                              />
                            </Box>
                          </Box>
                          <Box p="5" pt="8" pb="6">
                            <Flex
                              direction="column"
                              align="center"
                              gap="3"
                              style={{ marginTop: 16 }}
                            >
                              <Heading size="5" align="center">
                                {member.name}
                              </Heading>
                              <Badge
                                color={member.color}
                                size="2"
                                variant="soft"
                                radius="full"
                              >
                                {member.role}
                              </Badge>
                            </Flex>
                          </Box>
                        </Card>
                      </motion.div>
                    ))}
                </Box>
              </Box>
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
            <InteractiveHoverButton className="mt-4 bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-600 dark:text-white dark:hover:bg-indigo-700 border-none px-8 py-3">
              Gabung CodeLab Sekarang
            </InteractiveHoverButton>
          </Flex>
        </Container>
      </BackgroundLines>
    </Box>
  );
}
