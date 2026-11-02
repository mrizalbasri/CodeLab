"use client";

import {
  Box,
  Container,
  Flex,
  Heading,
  Section,
  Text,
  Badge,
  Card,
} from "@radix-ui/themes";
import {
  Users,
  Calendar,
  ArrowRight,
  ExternalLink,
  Trophy,
  Sparkles,
  Code2,
  Layers,
  MapPin,
  MessageCircle,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import NextImage from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { WobbleCard } from "@/components/ui/wobble-card";
import { siteConfig } from "@/lib/data/site-config";
import { initialPrograms } from "@/lib/data/programs";
import { getPrograms, Program } from "@/app/actions";
import { formatDate } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [programs, setPrograms] = useState<Program[]>(initialPrograms);

  useEffect(() => {
    async function fetchLatestPrograms() {
      try {
        const data = await getPrograms();
        if (data && data.length > 0) {
          setPrograms(data);
        }
      } catch (err) {
        console.warn("Using initialPrograms for home preview:", err);
      }
    }
    fetchLatestPrograms();
  }, []);

  // Filter 3 upcoming programs for featured preview
  const upcomingPrograms = programs
    .filter((p) => p.status === "Upcoming" || !p.status)
    .slice(0, 3);

  const statsData = [
    {
      value: "500+",
      label: t.home.statMembers,
      desc: t.home.statMembersDesc,
      icon: Users,
      color: "text-[#0047BA] dark:text-[#60a5fa]",
      bg: "bg-blue-50/80 dark:bg-blue-950/30 border-blue-200/80 dark:border-blue-900/50",
    },
    {
      value: "50+",
      label: t.home.statProjects,
      desc: t.home.statProjectsDesc,
      icon: Layers,
      color: "text-[#E31B23] dark:text-[#ff5c5c]",
      bg: "bg-red-50/80 dark:bg-red-950/30 border-red-200/80 dark:border-red-900/50",
    },
    {
      value: "35+",
      label: t.home.statWorkshops,
      desc: t.home.statWorkshopsDesc,
      icon: Code2,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-200/80 dark:border-emerald-900/50",
    },
    {
      value: "14+",
      label: t.home.statAwards,
      desc: t.home.statAwardsDesc,
      icon: Trophy,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50/80 dark:bg-amber-950/30 border-amber-200/80 dark:border-amber-900/50",
    },
  ];

  return (
    <Box className="overflow-hidden">
      {/* =========================================================================
          HERO SECTION (Clean, Minimalist, No Excessive Looping Animations)
          ========================================================================= */}
      <Box className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20 border-b border-neutral-200/70 dark:border-neutral-800/80 bg-white dark:bg-[#0a0a0a]">
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(0,71,186,0.12),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(96,165,250,0.1),rgba(10,10,10,0))]" />

        {/* Subtle Static Dot Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20 [background-image:radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px]" />

        <Container size="3" className="relative z-10 px-4 sm:px-6">
          <Flex direction="column" align="center" gap="5" className="text-center">
            {/* Clean Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-200 dark:border-blue-900/60 bg-blue-50/90 dark:bg-blue-950/50 text-[#0047BA] dark:text-[#60a5fa] text-xs sm:text-sm font-semibold shadow-xs"
            >
              <Sparkles size={14} className="text-[#0047BA] dark:text-[#60a5fa]" />
              <span>{t.home.badge}</span>
              <span className="text-neutral-400 dark:text-neutral-600">•</span>
              <span className="text-neutral-600 dark:text-neutral-300 font-normal">President University</span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="space-y-2"
            >
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-neutral-900 dark:text-white leading-tight">
                <span className="text-[#0047BA] dark:text-[#60a5fa]">PU PEKANBARU </span>
                <span className="text-[#E31B23] dark:text-[#ff5c5c]">CODE LAB</span>
              </h1>
              <p className="text-base sm:text-xl md:text-2xl font-bold text-neutral-800 dark:text-neutral-200 tracking-tight">
                {t.home.headline}
              </p>
            </motion.div>

            {/* Subheadline Description */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="max-w-2xl text-sm sm:text-base md:text-lg text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed"
            >
              {t.home.subtitle}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="w-full flex justify-center"
            >
              <Flex gap="3" mt="2" direction={{ initial: "column", sm: "row" }} align="center" className="w-full sm:w-auto">
                <Link href="/programs" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-7 rounded-xl font-bold bg-[#0047BA] text-white hover:bg-[#003894] shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer text-sm sm:text-base">
                    <span>{t.home.explorePrograms}</span>
                    <ArrowRight size={18} />
                  </button>
                </Link>
                <Link href="/about" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-7 rounded-xl font-bold bg-white dark:bg-neutral-900 border-2 border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-white hover:border-[#E31B23] dark:hover:border-[#ff5c5c] hover:text-[#E31B23] dark:hover:text-[#ff5c5c] shadow-xs hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer text-sm sm:text-base">
                    <span>{t.nav.about} PUPCL</span>
                  </button>
                </Link>
              </Flex>
            </motion.div>

            {/* Key Metrics Strip (Real Social Proof, Clean Layout) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="w-full mt-8 pt-8 border-t border-neutral-200/80 dark:border-neutral-800/80"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full">
                {statsData.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={idx}
                      className={`p-4 sm:p-5 rounded-2xl border text-left transition-all hover:shadow-xs ${stat.bg}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-2xl sm:text-3xl font-black tracking-tight ${stat.color}`}>
                          {stat.value}
                        </span>
                        <div className="p-2 rounded-xl bg-white/80 dark:bg-black/40">
                          <Icon size={18} className={stat.color} />
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white">
                        {stat.label}
                      </p>
                      <p className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 line-clamp-1">
                        {stat.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </Flex>
        </Container>
      </Box>

      {/* =========================================================================
          UPCOMING WORKSHOPS & EVENTS SECTION (Actionable & High Value)
          ========================================================================= */}
      {upcomingPrograms.length > 0 && (
        <Section size="3" className="bg-neutral-50/70 dark:bg-neutral-950/60 border-b border-neutral-200/70 dark:border-neutral-800/70">
          <Container size="4" px="4">
            <Flex direction="column" align="center" mb="7" gap="2" className="text-center">
              <Badge size="2" color="indigo" radius="full" className="px-3 py-1 font-bold">
                {t.nav.programs}
              </Badge>
              <Heading size={{ initial: "6", sm: "7", md: "8" }} weight="bold" className="text-neutral-900 dark:text-white">
                {t.home.upcomingTitle}
              </Heading>
              <Text size={{ initial: "2", sm: "3" }} color="gray" className="max-w-xl">
                {t.home.upcomingSubtitle}
              </Text>
            </Flex>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full">
              {upcomingPrograms.map((prog) => (
                <Card
                  key={prog.id}
                  className="group overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs hover:shadow-md transition-all flex flex-col justify-between p-0"
                >
                  <Box className="relative h-44 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                    <NextImage
                      src={prog.image_url || "/logo.jpeg"}
                      alt={prog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge color="indigo" variant="solid" className="text-xs font-bold shadow-xs">
                        {prog.category}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500 text-white text-[11px] font-extrabold shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        Upcoming
                      </span>
                    </div>
                  </Box>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-base sm:text-lg text-neutral-900 dark:text-white line-clamp-2 mb-2 group-hover:text-[#0047BA] dark:group-hover:text-[#60a5fa] transition-colors">
                        {prog.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed mb-4">
                        {prog.description}
                      </p>

                      <div className="space-y-1.5 text-xs text-neutral-500 dark:text-neutral-400 border-t border-neutral-100 dark:border-neutral-800 pt-3">
                        {prog.date && (
                          <div className="flex items-center gap-2">
                            <Calendar size={14} className="text-[#0047BA] dark:text-[#60a5fa]" />
                            <span>{formatDate(prog.date)}</span>
                            {prog.time && <span>• {prog.time} WIB</span>}
                          </div>
                        )}
                        {prog.location && (
                          <div className="flex items-center gap-2">
                            <MapPin size={14} className="text-[#E31B23] dark:text-[#ff5c5c]" />
                            <span className="line-clamp-1">{prog.location}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-5 pt-3">
                      <Link
                        href={`${siteConfig.links.whatsapp}?text=${encodeURIComponent(
                          `Halo Admin PUPCL, saya ingin mendaftar workshop: "${prog.title}". Mohon info pendaftarannya.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full block"
                      >
                        <button className="w-full py-2.5 px-4 rounded-xl font-bold bg-[#0047BA] hover:bg-[#003894] text-white text-xs sm:text-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer">
                          <MessageCircle size={15} />
                          <span>{t.home.registerWorkshop}</span>
                        </button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <Link href="/programs">
                <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 font-bold text-xs sm:text-sm text-neutral-800 dark:text-white hover:border-[#0047BA] dark:hover:border-[#60a5fa] hover:text-[#0047BA] dark:hover:text-[#60a5fa] transition-all cursor-pointer shadow-xs">
                  <span>{t.home.viewAllPrograms}</span>
                  <ArrowRight size={16} />
                </button>
              </Link>
            </div>
          </Container>
        </Section>
      )}

      {/* =========================================================================
          WHY JOIN PUPCL SECTION
          ========================================================================= */}
      <Section size="3">
        <Container size="4" px="4">
          <Flex direction="column" align="center" mb="8" gap="3">
            <Heading size={{ initial: "6", sm: "7", md: "8" }} align="center" weight="bold" className="text-[#111827] dark:text-white">
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
          FAQ ACCORDION SECTION (Essential & High-Value for Student Queries)
          ========================================================================= */}
      {t.home.faqs && t.home.faqs.length > 0 && (
        <Section size="3" className="border-t border-neutral-200/70 dark:border-neutral-800/70 bg-neutral-50/40 dark:bg-neutral-950/40">
          <Container size="3" px="4">
            <Flex direction="column" align="center" mb="8" gap="2" className="text-center">
              <Badge size="2" color="gray" radius="full" className="px-3 py-1 font-bold">
                FAQ
              </Badge>
              <Heading size={{ initial: "6", sm: "7", md: "8" }} weight="bold" className="text-neutral-900 dark:text-white">
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

              <Heading size={{ initial: "6", sm: "8", md: "9" }} weight="bold" style={{ color: "white" }} className="tracking-tight font-black">
                {t.home.recruitmentTitle}
              </Heading>

              <Text size={{ initial: "3", sm: "4" }} style={{ color: "rgba(255, 255, 255, 0.95)", lineHeight: 1.6 }} className="font-medium">
                {t.home.recruitmentDesc}
              </Text>

              <Flex gap="3" mt="2" direction={{ initial: "column", sm: "row" }} className="w-full sm:w-auto">
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
