"use client";

import Link from "next/link";
import { CalendarDays, ExternalLink, MapPin, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { Badge, Box, Container, Flex, Heading, Text } from "@radix-ui/themes";
import { useLanguage } from "@/context/LanguageContext";

export default function EventsPage() {
  const { language } = useLanguage();
  const isEnglish = language === "en";

  const sources = [
    {
      label: isEnglish ? "PUPCL" : "PUPCL",
      description: isEnglish
        ? "Workshops, study circles, and community sessions."
        : "Workshop, study circle, dan sesi komunitas.",
      color: "#0047BA",
    },
    {
      label: isEnglish ? "Campus" : "Kampus",
      description: isEnglish
        ? "Technology events and collaborations across campus."
        : "Event teknologi dan kolaborasi di lingkungan kampus.",
      color: "#7b1200",
    },
    {
      label: isEnglish ? "External" : "Eksternal",
      description: isEnglish
        ? "Curated hackathons, meetups, and opportunities outside campus."
        : "Hackathon, meetup, dan peluang teknologi dari luar kampus.",
      color: "#0284c7",
    },
  ];

  return (
    <Box>
      <Box className="pt-32 pb-16 sm:pt-40 sm:pb-20 border-b border-neutral-200/70 dark:border-neutral-800/80 bg-neutral-50/60 dark:bg-neutral-950/60">
        <Container size="3" px="6" className="relative">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Flex direction="column" align="center" gap="4" className="text-center">
              <Badge size="2" color="indigo" variant="soft" radius="full">
                <CalendarDays size={14} />
                {isEnglish ? "Community calendar" : "Agenda komunitas"}
              </Badge>
              <Heading size={{ initial: "7", md: "9" }} className="tracking-tight">
                {isEnglish ? "Events worth showing up for." : "Event yang layak kamu ikuti."}
              </Heading>
              <Text
                size={{ initial: "3", sm: "4" }}
                color="gray"
                className="max-w-2xl leading-relaxed"
              >
                {isEnglish
                  ? "A clean home for PUPCL, campus, and external technology events."
                  : "Satu tempat yang rapi untuk event teknologi PUPCL, kampus, dan eksternal."}
              </Text>
            </Flex>
          </motion.div>
        </Container>
      </Box>

      <Container size="4" py={{ initial: "7", md: "9" }} px="6">
        <div className="grid gap-5 md:grid-cols-3">
          {sources.map((source, index) => (
            <motion.div
              key={source.label}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: index * 0.05 }}
              className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm"
            >
              <div
                className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl text-white"
                style={{ backgroundColor: source.color }}
              >
                <Sparkles size={19} />
              </div>
              <Text size="4" weight="bold">
                {source.label}
              </Text>
              <Text as="p" size="2" color="gray" className="mt-2 leading-relaxed">
                {source.description}
              </Text>
            </motion.div>
          ))}
        </div>

        <Box className="mt-6 rounded-3xl border border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-50/70 dark:bg-neutral-900/50 px-6 py-16 text-center">
          <Flex direction="column" align="center" gap="3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#0047BA] shadow-sm dark:bg-neutral-800">
              <CalendarDays size={22} />
            </div>
            <Heading size="5">
              {isEnglish ? "The next agenda is being prepared." : "Agenda berikutnya sedang disiapkan."}
            </Heading>
            <Text size="2" color="gray" className="max-w-md leading-relaxed">
              {isEnglish
                ? "Events will appear here with their source, schedule, location, and registration link."
                : "Event akan tampil di sini lengkap dengan sumber, jadwal, lokasi, dan link pendaftaran."}
            </Text>
            <Link
              href="https://www.instagram.com/codlab.presunivpku"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#0047BA] px-5 py-2.5 text-sm font-semibold text-white no-underline transition-opacity hover:opacity-85"
            >
              {isEnglish ? "Follow updates" : "Ikuti update"}
              <ExternalLink size={14} />
            </Link>
          </Flex>
        </Box>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-neutral-400">
          <MapPin size={14} />
          {isEnglish ? "Pekanbaru and online" : "Pekanbaru dan online"}
        </div>
      </Container>
    </Box>
  );
}
