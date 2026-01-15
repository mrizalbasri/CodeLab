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
import { Github, Linkedin, Mail } from "lucide-react";
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
      console.log("Members loaded:", data);
      setMembers(data);
    }
    fetchData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

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
        <Container size="4" style={{ position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Flex direction="column" align="center" gap="4" py="6">
              <Heading size="9" align="center">
                Tentang Kami
              </Heading>
              <Text
                align="center"
                size="5"
                color="gray"
                style={{ maxWidth: 700 }}
              >
                Membangun ekosistem teknologi kolaboratif di President
                University Pekanbaru.
              </Text>
            </Flex>
          </motion.div>
        </Container>
      </Box>

      {/* Content Section */}
      <Container size="4" py="6">
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
                <Heading size="8" mb="4" color="indigo">
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
                    onError={(e) => {
                      // Fallback if image not found
                      e.currentTarget.style.display = "none";
                      e.currentTarget.parentElement!.innerText = "Logo PUPCL";
                      e.currentTarget.parentElement!.style.color =
                        "var(--gray-8)";
                      e.currentTarget.parentElement!.style.fontWeight = "bold";
                      e.currentTarget.parentElement!.style.fontSize = "24px";
                    }}
                  />
                </Box>
              </Flex>
            </Grid>
          </motion.div>

          {/* Visi & Misi - Animation Removed for Stability */}
          <Box mt="9">
            <Box
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "32px",
              }}
            >
              <Card size="3" style={{ background: "var(--gray-2)" }}>
                <Heading size="6" mb="3" color="indigo">
                  Visi
                </Heading>
                <Text as="p" size="3" color="gray" style={{ lineHeight: 1.6 }}>
                  Menjadi komunitas belajar pemrograman di President University
                  Pekanbaru yang menginspirasi dan mendukung mahasiswa untuk
                  tumbuh bersama, mengasah kemampuan coding, dan berinovasi di
                  bidang teknologi.
                </Text>
              </Card>
              <Card size="3" style={{ background: "var(--gray-2)" }}>
                <Heading size="6" mb="3" color="plum">
                  Misi
                </Heading>
                <Flex direction="column" gap="2">
                  <Text
                    as="p"
                    size="3"
                    color="gray"
                    style={{ lineHeight: 1.6 }}
                  >
                    1. Menyelenggarakan pelatihan coding rutin untuk
                    meningkatkan keterampilan anggota.
                  </Text>
                  <Text
                    as="p"
                    size="3"
                    color="gray"
                    style={{ lineHeight: 1.6 }}
                  >
                    2. Membangun pemecah masalah tangguh dengan keterampilan
                    teknis.
                  </Text>
                  <Text
                    as="p"
                    size="3"
                    color="gray"
                    style={{ lineHeight: 1.6 }}
                  >
                    3. Mendorong anggota aktif membangun portofolio.
                  </Text>
                  <Text
                    as="p"
                    size="3"
                    color="gray"
                    style={{ lineHeight: 1.6 }}
                  >
                    4. Menumbuhkan semangat kolaborasi dan inovasi tim.
                  </Text>
                  <Text
                    as="p"
                    size="3"
                    color="gray"
                    style={{ lineHeight: 1.6 }}
                  >
                    5. Mendorong partisipasi dalam perlombaan teknologi.
                  </Text>
                </Flex>
              </Card>
            </Box>
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

          {/* Team Section - Modern Layout */}
          <Section>
            <Heading size="8" align="center" mb="2">
              Struktur Club
            </Heading>

            <Flex direction="column" gap="10" align="center">
              {/* Ketua - Top Level */}
              <Box style={{ width: "100%", maxWidth: "1200px" }}>
                <Flex justify="center" mb="6">
                  <Badge color="indigo" size="3" radius="full" variant="soft">
                    Pimpinan
                  </Badge>
                </Flex>
                <Flex justify="center" style={{ width: "100%" }}>
                  {members
                    .filter((m) => m.role.toLowerCase().includes("ketua"))
                    .map((member, index) => (
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
                                member.color
                              )} 0%, ${getRoleColor(member.color)} 100%)`,
                              position: "relative",
                            }}
                          >
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
              <Box style={{ width: "100%", maxWidth: "1200px" }}>
                <Flex justify="center" mb="6">
                  <Badge color="teal" size="3" radius="full" variant="soft">
                    Pengurus Inti
                  </Badge>
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
                        m.role.toLowerCase().includes("bendahara") ||
                        m.role.toLowerCase().includes("sekretaris")
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
                                member.color
                              )} 0%, ${getRoleColor(member.color)} 100%)`,
                              position: "relative",
                            }}
                          >
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

              {/* Other Members - Bottom Level */}
              <Box style={{ width: "100%", maxWidth: "1200px" }}>
                <Flex justify="center" mb="6">
                  <Badge color="plum" size="3" radius="full" variant="soft">
                    Anggota
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
                        !m.role.toLowerCase().includes("ketua") &&
                        !m.role.toLowerCase().includes("bendahara") &&
                        !m.role.toLowerCase().includes("sekretaris")
                    )
                    .map((member, index) => (
                      <motion.div
                        key={member.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.8 + index * 0.1,
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
                                member.color
                              )} 0%, ${getRoleColor(member.color)} 100%)`,
                              position: "relative",
                            }}
                          >
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
    </Box>
  );
}
