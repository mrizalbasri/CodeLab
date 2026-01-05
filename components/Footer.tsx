"use client";

import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Text,
  IconButton,
  Link as RadixLink,
  Separator,
} from "@radix-ui/themes";
import Link from "next/link";
import { Github, Instagram, Linkedin, Twitter, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();

  // Hide footer on admin pages
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <Box
      py="8"
      style={{
        backgroundColor: "var(--gray-2)", // Lebih terang untuk visibility di dark mode
        borderTop: "1px solid var(--gray-6)",
        marginTop: "auto",
        width: "100%",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Container size="4">
          <Flex
            justify="between"
            align="start"
            direction={{ initial: "column", md: "row" }}
            gap="8"
            mb="8"
          >
            {/* Brand Section - Ujung Kiri */}
            <Box style={{ maxWidth: 450 }}>
              <Flex direction="column" gap="4">
                <Flex align="center" gap="3">
                  <Box
                    style={{
                      borderRadius: "50%",
                      overflow: "hidden",
                      height: 32,
                      width: 32,
                      border: "1px solid var(--gray-6)",
                    }}
                  >
                    <img
                      src="/logo.jpeg"
                      alt="PUPCL Logo"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                  <Text size="3" weight="bold">
                    PUPCL
                  </Text>
                </Flex>
                <Text
                  as="p"
                  size="2"
                  color="gray"
                  style={{ lineHeight: "1.6" }}
                >
                  PU Pekanbaru Code Lab is a student-led community dedicated to
                  fostering tech innovation and collaboration.
                </Text>
              </Flex>
            </Box>

            {/* Links Section - Ujung Kanan */}
            <Flex gap={{ initial: "8", md: "9" }} wrap="wrap">
              {/* Explore */}
              <Box>
                <Heading size="2" mb="3" weight="bold">
                  Explore
                </Heading>
                <Flex direction="column" gap="2">
                  <RadixLink asChild size="2" color="gray">
                    <Link href="/">Home</Link>
                  </RadixLink>
                  <RadixLink asChild size="2" color="gray">
                    <Link href="/about">About Us</Link>
                  </RadixLink>
                  <RadixLink asChild size="2" color="gray">
                    <Link href="/programs">Programs</Link>
                  </RadixLink>
                  <RadixLink asChild size="2" color="gray">
                    <Link href="/gallery">Gallery</Link>
                  </RadixLink>
                </Flex>
              </Box>

              {/* Resources */}
              <Box>
                <Heading size="2" mb="3" weight="bold">
                  Resources
                </Heading>
                <Flex direction="column" gap="2">
                  <RadixLink asChild size="2" color="gray">
                    <Link href="/contact">Contact Support</Link>
                  </RadixLink>
                  <RadixLink size="2" color="gray" href="#">
                    Privacy Policy
                  </RadixLink>
                  <RadixLink size="2" color="gray" href="#">
                    Terms of Service
                  </RadixLink>
                  <RadixLink asChild size="2" color="gray">
                    <Link href="/admin">Admin Login</Link>
                  </RadixLink>
                </Flex>
              </Box>

              {/* Connect */}
              <Box>
                <Heading size="2" mb="3" weight="bold">
                  Connect
                </Heading>
                <Flex direction="column" gap="3">
                  <Flex gap="3">
                    <IconButton variant="soft" color="gray" radius="full">
                      <Instagram size={18} />
                    </IconButton>
                    <IconButton variant="soft" color="gray" radius="full">
                      <Github size={18} />
                    </IconButton>
                    <IconButton variant="soft" color="gray" radius="full">
                      <Linkedin size={18} />
                    </IconButton>
                    <IconButton variant="soft" color="gray" radius="full">
                      <Mail size={18} />
                    </IconButton>
                  </Flex>
                  <Text
                    size="2"
                    color="gray"
                    style={{ lineHeight: "1.5", maxWidth: 200 }}
                  >
                    Jl. Jend. Ahmad Yani No.42a,
                    <br />
                    Pekanbaru, Riau 28155
                  </Text>
                </Flex>
              </Box>
            </Flex>
          </Flex>

          <Separator size="4" mb="4" />

          <Flex
            justify="between"
            align="center"
            direction={{ initial: "column", sm: "row" }}
            gap="2"
          >
            <Text size="2" color="gray">
              © {new Date().getFullYear()} PU Pekanbaru Code Lab. All rights
              reserved.
            </Text>
            <Text size="2" color="gray">
              Built with ❤️ by PUPCL Team
            </Text>
          </Flex>
        </Container>
      </motion.div>
    </Box>
  );
}
