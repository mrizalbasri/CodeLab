"use client";

import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Section,
  Text,
  Badge,
} from "@radix-ui/themes";
import {
  ArrowRight,
  Code,
  Terminal,
  Cpu,
  Globe,
  Zap,
  Users,
  Trophy,
  HandHeart,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Komponen simulasi mengetik kode (Looping)
const CodeBlock = () => {
  const lines = [
    { text: "function PUPCL_Welcome() {", indent: 0, color: "pink" },
    { text: "  return (", indent: 2, color: "gray" },
    { text: '    <div className="future-leaders">', indent: 4, color: "plum" },
    { text: "      <h1>Hello, World!</h1>", indent: 6, color: "indigo" },
    { text: "      <p>Join the Revolution 🚀</p>", indent: 6, color: "indigo" },
    { text: "    </div>", indent: 4, color: "plum" },
    { text: "  );", indent: 2, color: "gray" },
    { text: "}", indent: 0, color: "pink" },
  ];

  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (visibleLines < lines.length) {
      timeout = setTimeout(() => {
        setVisibleLines((prev) => prev + 1);
      }, 400); // Kecepatan ngetik
    } else {
      // Tunggu 3 detik setelah selesai, lalu restart
      timeout = setTimeout(() => {
        setVisibleLines(0);
      }, 3000);
    }

    return () => clearTimeout(timeout);
  }, [visibleLines, lines.length]);

  return (
    <Box
      p="4"
      style={{ fontFamily: "monospace", fontSize: "14px", lineHeight: "1.6" }}
    >
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{
            opacity: i < visibleLines ? 1 : 0,
            x: i < visibleLines ? 0 : -10,
          }}
          transition={{ duration: 0.2 }}
        >
          <div style={{ paddingLeft: line.indent * 8 }}>
            <Text color={line.color as any} style={{ fontFamily: "monospace" }}>
              {line.text}
            </Text>
          </div>
        </motion.div>
      ))}
      {visibleLines >= lines.length && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ paddingLeft: 16, marginTop: 4 }}
        >
          <Text color="green" style={{ fontFamily: "monospace" }}>
            // Code your future...
          </Text>
          <span className="inline-block w-2 h-4 bg-green-500 ml-2 animate-pulse align-middle" />
        </motion.div>
      )}
    </Box>
  );
};

export default function Home() {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        style={{
          background:
            "radial-gradient(circle at top center, var(--indigo-4), var(--color-background) 80%)",
          position: "relative",
          overflow: "hidden",
          paddingTop: "140px",
          paddingBottom: "var(--space-9)",
        }}
      >
        {/* Background Grid Pattern */}
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

        <Container size="3" style={{ position: "relative", zIndex: 1 }}>
          <Flex direction="column" align="center" gap="6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge
                size="3"
                variant="surface"
                color="indigo"
                radius="full"
                style={{
                  backdropFilter: "blur(10px)",
                  border: "1px solid var(--indigo-a5)",
                  marginBottom: "1rem",
                }}
              >
                🚀 The Future of Tech in Riau starts here.
              </Badge>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ textAlign: "center" }}
            >
              <Heading
                size="9"
                align="center"
                style={{
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                <Text
                  style={{
                    background:
                      "linear-gradient(to right, var(--indigo-9), var(--plum-9))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  PU PEKANBARU CODE LAB
                </Text>
              </Heading>
              <Heading
                size="9"
                align="center"
                style={{
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  marginTop: "-10px",
                }}
              >
                (PUPCL)
              </Heading>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <Text
                size="5"
                align="center"
                color="gray"
                style={{ maxWidth: 600, lineHeight: 1.6, marginTop: "20px" }}
              >
                Join the most active student tech community. Build real-world
                projects, connect with industry mentors, and accelerate your
                career.
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Flex gap="4" mt="6" mb="8">
                <Link href="/about">
                  <Button
                    size="4"
                    variant="solid"
                    highContrast
                    style={{ cursor: "pointer", borderRadius: "12px" }}
                  >
                    Explore Events <ArrowRight size={18} />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="4"
                    variant="outline"
                    highContrast
                    style={{
                      cursor: "pointer",
                      borderRadius: "12px",
                      background: "white",
                      color: "#111827",
                      borderColor: "rgba(17, 24, 39, 0.18)",
                    }}
                  >
                    Learn More
                  </Button>
                </Link>
              </Flex>
            </motion.div>

            {/* Visual Content (Code Mockup) */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: [0, -15, 0], opacity: 1 }}
              transition={{
                y: { repeat: Infinity, duration: 6, ease: "easeInOut" },
                opacity: { duration: 1, delay: 0.5 },
              }}
              style={{ width: "100%", maxWidth: "800px" }}
            >
              <Box
                mt="8"
                mb="9"
                style={{
                  width: "100%",
                  height: "320px", // Fixed height to prevent layout shift
                  background: "var(--gray-2)",
                  border: "1px solid var(--gray-6)",
                  borderRadius: "12px",
                  boxShadow: "0 20px 50px -10px var(--indigo-a4)",
                  overflow: "hidden",
                }}
              >
                {/* Window Controls */}
                <Flex
                  gap="2"
                  p="3"
                  style={{
                    borderBottom: "1px solid var(--gray-4)",
                    background: "var(--gray-3)",
                  }}
                >
                  <Box
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      background: "#FF5F56",
                    }}
                  />
                  <Box
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      background: "#FFBD2E",
                    }}
                  />
                  <Box
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      background: "#27C93F",
                    }}
                  />
                </Flex>

                {/* Animated Code Content */}
                <CodeBlock />
              </Box>
            </motion.div>
          </Flex>
        </Container>
      </Box>

      {/* Modern Stats Grid - Added Margin Top to separate from Mockup */}
      <Box style={{ backgroundColor: "var(--gray-1)" }} py="9">
        <Container size="4">
          <Grid columns={{ initial: "1", md: "3" }} gap="6">
            <motion.div whileHover={{ translateY: -5 }}>
              <Card
                style={{ backgroundColor: "var(--gray-2)", border: "none" }}
              >
                <Flex align="center" gap="4" p="2">
                  <Box
                    p="3"
                    style={{
                      backgroundColor: "var(--indigo-3)",
                      borderRadius: "12px",
                    }}
                  >
                    <Users size={24} color="var(--indigo-11)" />
                  </Box>
                  <Box>
                    <Heading size="6" weight="bold">
                      500+
                    </Heading>
                    <Text size="2" color="gray">
                      Active Members
                    </Text>
                  </Box>
                </Flex>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ translateY: -5 }}
              transition={{ delay: 0.1 }}
            >
              <Card
                style={{ backgroundColor: "var(--gray-2)", border: "none" }}
              >
                <Flex align="center" gap="4" p="2">
                  <Box
                    p="3"
                    style={{
                      backgroundColor: "var(--plum-3)",
                      borderRadius: "12px",
                    }}
                  >
                    <Code size={24} color="var(--plum-11)" />
                  </Box>
                  <Box>
                    <Heading size="6" weight="bold">
                      50+
                    </Heading>
                    <Text size="2" color="gray">
                      Shipped Projects
                    </Text>
                  </Box>
                </Flex>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ translateY: -5 }}
              transition={{ delay: 0.2 }}
            >
              <Card
                style={{ backgroundColor: "var(--gray-2)", border: "none" }}
              >
                <Flex align="center" gap="4" p="2">
                  <Box
                    p="3"
                    style={{
                      backgroundColor: "var(--teal-3)",
                      borderRadius: "12px",
                    }}
                  >
                    <Trophy size={24} color="var(--teal-11)" />
                  </Box>
                  <Box>
                    <Heading size="6" weight="bold">
                      12
                    </Heading>
                    <Text size="2" color="gray">
                      National Awards
                    </Text>
                  </Box>
                </Flex>
              </Card>
            </motion.div>
          </Grid>
        </Container>
      </Box>

      {/* Feature Section with Glass Cards */}
      <Section size="3">
        <Container size="4">
          <Flex direction="column" align="center" mb="9" gap="4">
            <Heading size="8" align="center" weight="bold">
              Why Join PUPCL?
            </Heading>
            <Text
              color="gray"
              size="4"
              align="center"
              style={{ maxWidth: 600 }}
            >
              We provide the ecosystem you need to go from zero to hero in the
              tech industry.
            </Text>
          </Flex>

          <Grid columns={{ initial: "1", sm: "2", md: "3" }} gap="6">
            {[
              {
                icon: Users,
                color: "indigo",
                title: "Networking",
                desc: "Connect with mentors, alumni, and peers.",
              },
              {
                icon: HandHeart,
                color: "pink",
                title: "Mentorship",
                desc: "Get guidance from experienced seniors.",
              },
              {
                icon: Calendar,
                color: "orange",
                title: "Events",
                desc: "Weekly workshops and tech talks.",
              },
              {
                icon: Zap,
                color: "yellow",
                title: "Job Connect",
                desc: "Exclusive internship opportunities.",
              },
              {
                icon: Globe,
                color: "blue",
                title: "Real Projects",
                desc: "Build apps for real clients.",
              },
              {
                icon: Terminal,
                color: "green",
                title: "Hackathons",
                desc: "Compete and win cash prizes.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card
                  size="3"
                  style={{
                    background: "var(--gray-2)",
                    cursor: "pointer",
                    height: "100%",
                  }}
                >
                  <Flex gap="4" direction="column">
                    <Box
                      p="3"
                      width="max-content"
                      style={{
                        borderRadius: 12,
                        backgroundColor: `var(--${feature.color}-3)`,
                      }}
                    >
                      <feature.icon
                        size={28}
                        color={`var(--${feature.color}-11)`}
                      />
                    </Box>
                    <Box>
                      <Heading size="4" mb="2">
                        {feature.title}
                      </Heading>
                      <Text
                        as="p"
                        color="gray"
                        size="2"
                        style={{ lineHeight: 1.6 }}
                      >
                        {feature.desc}
                      </Text>
                    </Box>
                  </Flex>
                </Card>
              </motion.div>
            ))}
          </Grid>
        </Container>
      </Section>
    </Box>
  );
}
