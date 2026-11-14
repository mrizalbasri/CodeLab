"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, ExternalLink, PenLine } from "lucide-react";
import { motion } from "motion/react";
import { Badge, Box, Container, Flex, Heading, Text } from "@radix-ui/themes";
import { useLanguage } from "@/context/LanguageContext";

export default function BlogPage() {
  const { language } = useLanguage();
  const isEnglish = language === "en";

  return (
    <Box>
      <Box className="pt-32 pb-16 sm:pt-40 sm:pb-20 border-b border-neutral-200/70 dark:border-neutral-800/80 bg-neutral-50/60 dark:bg-neutral-950/60">
        <Container size="3" px="6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Flex direction="column" align="center" gap="4" className="text-center">
              <Badge size="2" color="indigo" variant="soft" radius="full">
                <BookOpen size={14} />
                Blog PUPCL
              </Badge>
              <Heading size={{ initial: "7", md: "9" }} className="tracking-tight">
                {isEnglish ? "Notes from the lab." : "Catatan dari ruang belajar."}
              </Heading>
              <Text
                size={{ initial: "3", sm: "4" }}
                color="gray"
                className="max-w-2xl leading-relaxed"
              >
                {isEnglish
                  ? "A future home for practical guides, project stories, and community perspectives."
                  : "Tempat untuk panduan praktis, cerita proyek, dan perspektif dari komunitas."}
              </Text>
            </Flex>
          </motion.div>
        </Container>
      </Box>

      <Container size="3" py={{ initial: "7", md: "9" }} px="6">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl border border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-50/70 dark:bg-neutral-900/50 px-6 py-16 text-center"
        >
          <Flex direction="column" align="center" gap="3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#0047BA] shadow-sm dark:bg-neutral-800">
              <PenLine size={22} />
            </div>
            <Heading size="5">
              {isEnglish ? "The first post is on its way." : "Artikel pertama sedang disiapkan."}
            </Heading>
            <Text size="2" color="gray" className="max-w-md leading-relaxed">
              {isEnglish
                ? "This space is ready for tutorials, project notes, and stories from the PUPCL community."
                : "Halaman ini siap diisi tutorial, catatan proyek, dan cerita dari komunitas PUPCL."}
            </Text>
            <Link
              href="/programs"
              className="mt-3 inline-flex items-center gap-2 rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-semibold text-neutral-800 no-underline transition-colors hover:border-[#0047BA] hover:text-[#0047BA] dark:border-neutral-700 dark:text-neutral-200"
            >
              {isEnglish ? "Explore programs" : "Lihat program"}
              <ArrowRight size={14} />
            </Link>
          </Flex>
        </motion.div>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-neutral-400">
          <ExternalLink size={14} />
          {isEnglish ? "More stories will be published soon." : "Cerita baru akan segera diterbitkan."}
        </div>
      </Container>
    </Box>
  );
}
