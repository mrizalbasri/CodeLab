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
  Globe,
  Smartphone,
  Sparkles,
  Terminal,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { WobbleCard } from "@/components/ui/wobble-card";
import { HeroCodeWindow } from "@/components/HeroCodeWindow";
import { siteConfig } from "@/lib/data/site-config";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const tracks = [
    {
      icon: Globe,
      color: "text-blue-500 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-900/60",
      badge: t.home.trackWebBadge,
      title: t.home.trackWebTitle,
      desc: t.home.trackWebDesc,
    },
    {
      icon: Smartphone,
      color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-900/60",
      badge: t.home.trackMobileBadge,
      title: t.home.trackMobileTitle,
      desc: t.home.trackMobileDesc,
    },
    {
      icon: Sparkles,
      color: "text-purple-500 bg-purple-50 dark:bg-purple-950/60 border-purple-200 dark:border-purple-900/60",
      badge: t.home.trackAiBadge,
      title: t.home.trackAiTitle,
      desc: t.home.trackAiDesc,
    },
    {
      icon: Terminal,
      color: "text-amber-500 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-900/60",
      badge: t.home.trackDevOpsBadge,
      title: t.home.trackDevOpsTitle,
      desc: t.home.trackDevOpsDesc,
    },
  ];

  return (
    <Box className="overflow-hidden">
      {/* =========================================================================
          HERO SECTION (2-Column Split: Headline & CTA on left, Code Terminal on right)
          ========================================================================= */}
      <Box className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24 border-b border-neutral-200/70 dark:border-neutral-800/80 bg-white dark:bg-[#0a0a0a]">
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(0,71,186,0.1),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(96,165,250,0.08),rgba(10,10,10,0))]" />

        {/* Subtle Static Dot Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-15 [background-image:radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px]" />

        <Container size="4" className="relative z-10 px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Headline, Description & CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-7 flex flex-col items-start text-left space-y-6"
            >
              {/* Community Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-900/60 text-[#0047BA] dark:text-[#60a5fa] text-xs sm:text-sm font-semibold shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#0047BA] dark:bg-[#60a5fa] animate-pulse" />
                <span>{t.home.heroBadge}</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-1">
                <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-black tracking-tight text-neutral-900 dark:text-white leading-[1.1]">
                  <span className="text-[#0047BA] dark:text-[#60a5fa]">PU PEKANBARU </span>
                  <span className="text-[#E31B23] dark:text-[#ff5c5c]">CODE LAB</span>
                </h1>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-neutral-400 dark:text-neutral-500">
                  (
                  <span className="text-[#0047BA] dark:text-[#60a5fa]">PU</span>
                  <span className="text-[#E31B23] dark:text-[#ff5c5c]">PCL</span>
                  )
                </h2>
              </div>

              {/* Subheadline Description */}
              <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed max-w-xl">
                {t.home.subtitle}
              </p>

              {/* Action Buttons */}
              <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3 pt-1">
                <Link href="/programs" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold bg-[#0047BA] text-white hover:bg-[#003894] shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer text-sm sm:text-base inline-flex items-center justify-center gap-2">
                    <span>{t.home.explorePrograms}</span>
                    <ArrowRight size={18} />
                  </button>
                </Link>
                <Link href="/contact" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold bg-transparent border-2 border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:border-[#0047BA] hover:text-[#0047BA] dark:hover:border-[#60a5fa] dark:hover:text-[#60a5fa] shadow-xs hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer text-sm sm:text-base inline-flex items-center justify-center gap-2">
                    <MessageCircle size={18} />
                    <span>{t.home.recruitmentContact}</span>
                  </button>
                </Link>
              </div>

              {/* Tech Stack Pills Strip */}
              <div className="w-full pt-4 border-t border-neutral-200/70 dark:border-neutral-800/80">
                <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2.5">
                  {t.home.techExplore}
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Next.js 16", "TypeScript", "React", "Python", "Flutter", "Tailwind CSS", "Git & GitHub", "Supabase"].map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-neutral-100 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-700/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column: Code Editor Terminal Window */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="lg:col-span-5 w-full flex justify-center"
            >
              <HeroCodeWindow />
            </motion.div>
          </div>
        </Container>
      </Box>

      {/* =========================================================================
          CORE FOCUS TRACKS (4 Pilar Pembelajaran & Eksplorasi)
          ========================================================================= */}
      <Section size="2" className="bg-neutral-50/60 dark:bg-neutral-950/60 border-b border-neutral-200/70 dark:border-neutral-800/70">
        <Container size="4" px="4">
          <Flex direction="column" align="center" mb="6" gap="2" className="text-center">
            <Badge size="2" color="indigo" radius="full" variant="soft" className="px-3 py-1 font-bold">
              {t.home.tracksBadge}
            </Badge>
            <Heading
              size={{ initial: "6", sm: "7", md: "8" }}
              weight="bold"
              className="text-neutral-900 dark:text-white"
            >
              {t.home.tracksTitle}
            </Heading>
            <Text size={{ initial: "2", sm: "3" }} color="gray" className="max-w-xl">
              {t.home.tracksSubtitle}
            </Text>
          </Flex>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto w-full">
            {tracks.map((track, i) => {
              const IconComp = track.icon;
              return (
                <div
                  key={i}
                  className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs hover:border-[#0047BA] dark:hover:border-[#60a5fa] hover:-translate-y-1 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-11 h-11 rounded-xl border flex items-center justify-center ${track.color}`}>
                        <IconComp size={22} />
                      </div>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                        {track.badge}
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-neutral-900 dark:text-white mb-2">
                      {track.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {track.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

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
