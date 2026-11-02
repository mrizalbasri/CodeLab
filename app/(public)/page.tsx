"use client";

import {
  Box,
  Container,
  Flex,
  Heading,
  Section,
  Text,
  Badge,
} from "@radix-ui/themes";
import {
  Users,
  Calendar,
  ArrowRight,
  ExternalLink,
  Trophy,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { WobbleCard } from "@/components/ui/wobble-card";
import { siteConfig } from "@/lib/data/site-config";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <Box className="overflow-hidden">
      {/* =========================================================================
          HERO SECTION (Clean, Minimalist, No Heavy Animation, Direct Content)
          ========================================================================= */}
      <Box className="relative overflow-hidden pt-28 pb-20 sm:pt-40 sm:pb-28 border-b border-neutral-200/70 dark:border-neutral-800/80 bg-white dark:bg-[#0a0a0a]">
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(0,71,186,0.1),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(96,165,250,0.08),rgba(10,10,10,0))]" />

        {/* Subtle Static Dot Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-15 [background-image:radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px]" />

        <Container size="3" className="relative z-10 px-4 sm:px-6">
          <Flex direction="column" align="center" gap="5" className="text-center max-w-3xl mx-auto">
            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-1"
            >
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-neutral-900 dark:text-white leading-tight">
                <span className="text-[#0047BA] dark:text-[#60a5fa]">PU PEKANBARU </span>
                <span className="text-[#E31B23] dark:text-[#ff5c5c]">CODE LAB</span>
              </h1>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-neutral-400 dark:text-neutral-600">
                (
                <span className="text-[#0047BA] dark:text-[#60a5fa]">PU</span>
                <span className="text-[#E31B23] dark:text-[#ff5c5c]">PCL</span>
                )
              </h2>
            </motion.div>

            {/* Subheadline Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-300 font-medium leading-relaxed max-w-2xl px-2"
            >
              {t.home.subtitle}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="w-full flex justify-center pt-2"
            >
              <Flex
                gap="3"
                direction={{ initial: "column", sm: "row" }}
                align="center"
                className="w-full sm:w-auto"
              >
                <Link href="/programs" className="w-full sm:w-auto">
                  <button className="w-full sm:w-48 py-3.5 px-6 rounded-xl font-bold bg-[#0047BA] text-white hover:bg-[#003894] shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer text-sm sm:text-base inline-flex items-center justify-center gap-2">
                    <span>{t.home.explorePrograms}</span>
                    <ArrowRight size={18} />
                  </button>
                </Link>
                <Link href="/about" className="w-full sm:w-auto">
                  <button className="w-full sm:w-48 py-3.5 px-6 rounded-xl font-bold bg-transparent border-2 border-[#E31B23] dark:border-[#ff5c5c] text-[#E31B23] dark:text-[#ff5c5c] hover:bg-[#E31B23] hover:text-white dark:hover:bg-[#ff5c5c] dark:hover:text-black shadow-xs hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer text-sm sm:text-base">
                    <span>{t.nav.about} PUPCL</span>
                  </button>
                </Link>
              </Flex>
            </motion.div>
          </Flex>
        </Container>
      </Box>

      {/* =========================================================================
          WHY JOIN PUPCL SECTION
          ========================================================================= */}
      <Section size="3">
        <Container size="4" px="4">
          <Flex direction="column" align="center" mb="8" gap="3">
            <Heading
              size={{ initial: "6", sm: "7", md: "8" }}
              align="center"
              weight="bold"
              className="text-[#111827] dark:text-white"
            >
              {t.home.whyTitle}
            </Heading>
            <Text
              size={{ initial: "3", md: "4" }}
              align="center"
              className="max-w-content text-neutral-600 dark:text-neutral-400 font-medium"
              style={{ lineHeight: 1.6 }}
            >
              {t.home.whySubtitle}
            </Text>
          </Flex>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 max-w-7xl mx-auto w-full">
            {/* Card 1: Networking & Mentorship */}
            <WobbleCard
              containerClassName="col-span-1 lg:col-span-2 h-full min-h-[260px] sm:min-h-[300px] lg:min-h-[320px] bg-[#0047BA] border border-blue-600 shadow-lg"
              className="relative p-6 sm:p-8"
            >
              <div className="max-w-md relative z-10">
                <span className="inline-block px-3 py-1 mb-3 rounded-full text-xs font-bold bg-white text-[#0047BA]">
                  {t.home.card1Badge}
                </span>
                <h2 className="text-left text-balance text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white">
                  {t.home.card1Title}
                </h2>
                <p className="mt-3 text-left text-sm sm:text-base leading-relaxed text-blue-100 font-medium">
                  {t.home.card1Desc}
                </p>
              </div>
              <Box className="absolute -right-4 sm:-right-6 lg:-right-[5%] -bottom-6 sm:-bottom-8 pointer-events-none object-contain">
                <Users size={160} className="sm:hidden text-white/10" />
                <Users size={220} className="hidden sm:block text-white/15" />
              </Box>
            </WobbleCard>

            {/* Card 2: Weekly Workshops */}
            <WobbleCard
              containerClassName="col-span-1 min-h-[260px] sm:min-h-[300px] lg:min-h-[320px] bg-[#E31B23] border border-red-600 shadow-lg"
              className="relative p-6 sm:p-8"
            >
              <div className="max-w-xs relative z-10">
                <span className="inline-block px-3 py-1 mb-3 rounded-full text-xs font-bold bg-white text-[#E31B23]">
                  {t.home.card2Badge}
                </span>
                <h2 className="text-left text-balance text-xl sm:text-2xl font-black tracking-tight text-white">
                  {t.home.card2Title}
                </h2>
                <p className="mt-3 text-left text-sm sm:text-base leading-relaxed text-red-100 font-medium">
                  {t.home.card2Desc}
                </p>
              </div>
              <Box className="absolute -right-4 -bottom-4 pointer-events-none">
                <Calendar size={100} className="sm:hidden text-white/10" />
                <Calendar size={130} className="hidden sm:block text-white/15" />
              </Box>
            </WobbleCard>

            {/* Card 3: Build Real-World Projects */}
            <WobbleCard
              containerClassName="col-span-1 lg:col-span-3 min-h-[260px] sm:min-h-[300px] lg:min-h-[320px] bg-[#0f172a] border border-slate-800 shadow-lg"
              className="relative p-6 sm:p-8"
            >
              <div className="max-w-lg relative z-10">
                <span className="inline-block px-3 py-1 mb-3 rounded-full text-xs font-bold bg-[#0047BA] text-white">
                  {t.home.card3Badge}
                </span>
                <h2 className="text-left text-balance text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white">
                  {t.home.card3Title}
                </h2>
                <p className="mt-3 text-left text-sm sm:text-base leading-relaxed text-slate-300 font-medium">
                  {t.home.card3Desc}
                </p>
              </div>
              <Box className="absolute -right-6 sm:-right-8 md:-right-[5%] lg:-right-[2%] -bottom-6 sm:-bottom-10 pointer-events-none object-contain">
                <Trophy size={180} className="sm:hidden text-white/10" />
                <Trophy size={280} className="hidden sm:block text-white/10" />
              </Box>
            </WobbleCard>
          </div>
        </Container>
      </Section>

      {/* =========================================================================
          FAQ ACCORDION SECTION (Informasi Seputar Bergabung)
          ========================================================================= */}
      {t.home.faqs && t.home.faqs.length > 0 && (
        <Section
          size="3"
          className="border-t border-neutral-200/70 dark:border-neutral-800/70 bg-neutral-50/40 dark:bg-neutral-950/40"
        >
          <Container size="3" px="4">
            <Flex direction="column" align="center" mb="8" gap="2" className="text-center">
              <Badge size="2" color="gray" radius="full" className="px-3 py-1 font-bold">
                FAQ
              </Badge>
              <Heading
                size={{ initial: "6", sm: "7", md: "8" }}
                weight="bold"
                className="text-neutral-900 dark:text-white"
              >
                {t.home.faqTitle}
              </Heading>
              <Text size={{ initial: "2", sm: "3" }} color="gray" className="max-w-lg">
                {t.home.faqSubtitle}
              </Text>
            </Flex>

            <div className="space-y-3 max-w-2xl mx-auto w-full">
              {t.home.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden transition-all shadow-xs"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full px-5 py-4 flex items-center justify-between text-left font-bold text-sm sm:text-base text-neutral-900 dark:text-white cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        size={18}
                        className={`text-neutral-400 transition-transform duration-200 shrink-0 ml-3 ${
                          isOpen ? "rotate-180 text-[#0047BA] dark:text-[#60a5fa]" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 pb-4 pt-1 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed border-t border-neutral-100 dark:border-neutral-800/60">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </Container>
        </Section>
      )}

      {/* =========================================================================
          OPEN RECRUITMENT CALL TO ACTION
          ========================================================================= */}
      <Box py="6" pb="9" px="4" className="relative">
        <Container size="4">
          <Box className="rounded-3xl p-6 sm:p-12 relative overflow-hidden text-center bg-[#0047BA] border-2 border-blue-600 shadow-xl">
            <Flex direction="column" align="center" gap="4" className="relative z-10 max-w-2xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#0047BA] text-xs sm:text-sm font-extrabold tracking-wider shadow-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E31B23] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E31B23]"></span>
                </span>
                <span>{t.home.recruitmentBadge.toUpperCase()}</span>
              </div>

              <Heading
                size={{ initial: "6", sm: "8", md: "9" }}
                weight="bold"
                style={{ color: "white" }}
                className="tracking-tight font-black"
              >
                {t.home.recruitmentTitle}
              </Heading>

              <Text
                size={{ initial: "3", sm: "4" }}
                style={{ color: "rgba(255, 255, 255, 0.95)", lineHeight: 1.6 }}
                className="font-medium"
              >
                {t.home.recruitmentDesc}
              </Text>

              <Flex
                gap="3"
                mt="2"
                direction={{ initial: "column", sm: "row" }}
                className="w-full sm:w-auto"
              >
                <Link
                  href={`${siteConfig.links.whatsapp}?text=${encodeURIComponent(
                    "Halo Admin PUPCL, saya tertarik dengan Open Recruitment Member PUPCL dan ingin bertanya lebih lanjut."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex justify-center"
                >
                  <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold bg-[#E31B23] text-white hover:bg-[#c7171e] shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer text-sm sm:text-base">
                    {t.home.recruitmentContact}
                    <ArrowRight size={18} />
                  </button>
                </Link>
                <Link
                  href={siteConfig.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex justify-center"
                >
                  <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold bg-white text-[#0047BA] hover:bg-neutral-100 shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer text-sm sm:text-base">
                    {t.home.recruitmentInsta}
                    <ExternalLink size={16} />
                  </button>
                </Link>
              </Flex>
            </Flex>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
