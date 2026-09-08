"use client";

import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  IconButton,
  Link as RadixLink,
  Separator,
} from "@radix-ui/themes";
import Link from "next/link";
import NextImage from "next/image";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const pathname = usePathname();
  const { t } = useLanguage();

  // Hide footer on admin pages
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <Box py="8" className="section-bg-alt full-width" style={{ marginTop: "auto" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Container size="4" px="4">
          <Flex
            justify="between"
            align="start"
            direction={{ initial: "column", md: "row" }}
            gap="8"
            mb="8"
          >
            {/* Brand Section */}
            <Box className="max-w-content">
              <Flex direction="column" gap="4">
                <Flex align="center" gap="3">
                  <Box className="logo-circle-sm">
                    <NextImage
                      src="/logo.jpeg"
                      alt="PUPCL Logo"
                      width={32}
                      height={32}
                      className="logo-img"
                    />
                  </Box>
                  <Text size="3" weight="bold">
                    PUPCL
                  </Text>
                </Flex>
                <Text as="p" size="2" color="gray" className="text-body">
                  PU Pekanbaru Code Lab is a student-led community dedicated to
                  fostering tech innovation and collaboration.
                </Text>
              </Flex>
            </Box>

            {/* Links Section */}
            <Flex gap={{ initial: "6", sm: "8", md: "9" }} wrap="wrap">
              {/* Explore */}
              <Box style={{ minWidth: "120px" }}>
                <Heading size="2" mb="3" weight="bold">
                  Explore
                </Heading>
                <Flex direction="column" gap="2.5">
                  <RadixLink asChild size="2" color="gray" className="py-1 inline-block">
                    <Link href="/">Home</Link>
                  </RadixLink>
                  <RadixLink asChild size="2" color="gray" className="py-1 inline-block">
                    <Link href="/about">About Us</Link>
                  </RadixLink>
                  <RadixLink asChild size="2" color="gray" className="py-1 inline-block">
                    <Link href="/programs">Programs</Link>
                  </RadixLink>
                  <RadixLink asChild size="2" color="gray" className="py-1 inline-block">
                    <Link href="/gallery">Gallery</Link>
                  </RadixLink>
                </Flex>
              </Box>

              {/* Resources */}
              <Box style={{ minWidth: "120px" }}>
                <Heading size="2" mb="3" weight="bold">
                  Resources
                </Heading>
                <Flex direction="column" gap="2.5">
                  <RadixLink asChild size="2" color="gray" className="py-1 inline-block">
                    <Link href="/contact">Contact Support</Link>
                  </RadixLink>
                  <RadixLink size="2" color="gray" href="#" className="py-1 inline-block">
                    Privacy Policy
                  </RadixLink>
                  <RadixLink size="2" color="gray" href="#" className="py-1 inline-block">
                    Terms of Service
                  </RadixLink>
                  <RadixLink asChild size="2" color="gray" className="py-1 inline-block">
                    <Link href="/admin">Admin Login</Link>
                  </RadixLink>
                </Flex>
              </Box>

              {/* Connect */}
              <Box style={{ minWidth: "180px" }}>
                <Heading size="2" mb="3" weight="bold">
                  Connect
                </Heading>
                <Flex direction="column" gap="3">
                  <Flex gap="3" align="center">
                    <Link href="https://www.instagram.com/codlab.presunivpku" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                      <IconButton variant="soft" color="gray" radius="full" size="3" style={{ width: 42, height: 42, cursor: "pointer" }}>
                        <Instagram size={18} />
                      </IconButton>
                    </Link>
                    <Link href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                      <IconButton variant="soft" color="gray" radius="full" size="3" style={{ width: 42, height: 42, cursor: "pointer" }}>
                        <Github size={18} />
                      </IconButton>
                    </Link>
                    <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <IconButton variant="soft" color="gray" radius="full" size="3" style={{ width: 42, height: 42, cursor: "pointer" }}>
                        <Linkedin size={18} />
                      </IconButton>
                    </Link>
                    <Link href="mailto:contact@pupcl.org" aria-label="Email">
                      <IconButton variant="soft" color="gray" radius="full" size="3" style={{ width: 42, height: 42, cursor: "pointer" }}>
                        <Mail size={18} />
                      </IconButton>
                    </Link>
                  </Flex>
                  <Text size="2" color="gray" className="text-body" style={{ maxWidth: 220 }}>
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
            className="text-center sm:text-left"
          >
            <Text size="2" color="gray">
              © {new Date().getFullYear()} PU Pekanbaru Code Lab. {t.footer.rights}
            </Text>
            <Text size="2" color="gray">
              {t.footer.builtBy}
            </Text>
          </Flex>
        </Container>
      </motion.div>
    </Box>
  );
}
