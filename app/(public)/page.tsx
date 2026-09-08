"use client";

import {
  Box,
  Container,
  Flex,
  Heading,
  Section,
  Text,
} from "@radix-ui/themes";
import { Users, Calendar, ArrowRight, ExternalLink, Trophy } from "lucide-react";
import Link from "next/link";
import {
  MotionWrapper,
  CodeBlock,
  FloatingCodeWindow,
} from "@/components/HeroAnimations";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { WobbleCard } from "@/components/ui/wobble-card";
import { RippleButton } from "@/components/ui/ripple-button";
import { Spotlight } from "@/components/ui/Spotlight";
import { siteConfig } from "@/lib/data/site-config";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  return (
    <Box className="overflow-hidden">
      {/* Hero Section */}
      <Box className="bg-white dark:bg-[#0a0a0a] hero-container relative overflow-hidden">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="#0047BA"
        />

        <BackgroundBeamsWithCollision className="!h-auto min-h-[800px] w-full bg-transparent">
          <Container size="3" className="relative z-10" px="4">
            <Flex direction="column" align="center" gap="6" px="4">
              {/* Main Headline (Original wording restored with solid brand color) */}
              <MotionWrapper
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ textAlign: "center", width: "100%" }}
              >
                <Heading 
                  size={{ initial: "5", xs: "6", sm: "8", md: "9" }} 
                  align="center" 
                  className="text-heading font-black tracking-tight"
                  style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
                >
                  <span className="text-[#0047BA] dark:text-[#60a5fa]">PU PEKANBARU </span>
                  <span className="text-[#E31B23] dark:text-[#ff5c5c]">CODE LAB</span>
                </Heading>
                <Heading
                  size={{ initial: "5", xs: "6", sm: "7", md: "8" }}
                  align="center"
                  className="text-heading font-black tracking-tight"
                  style={{ marginTop: "-2px" }}
                >
                  <span className="text-neutral-400 dark:text-neutral-600 font-bold">(</span>
                  <span className="text-[#0047BA] dark:text-[#60a5fa]">PU</span>
                  <span className="text-[#E31B23] dark:text-[#ff5c5c]">PCL</span>
                  <span className="text-neutral-400 dark:text-neutral-600 font-bold">)</span>
                </Heading>
              </MotionWrapper>

              {/* Subheadline */}
              <MotionWrapper
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <Text
                  size={{ initial: "3", sm: "4", md: "5" }}
                  align="center"
                  className="max-w-content text-neutral-600 dark:text-neutral-300 font-medium"
                  style={{ marginTop: "12px", lineHeight: 1.7 }}
                >
                  {t.home.subtitle}
                </Text>
              </MotionWrapper>

              {/* Solid Action Buttons (No Gradients) */}
              <MotionWrapper
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <Flex gap="4" mt="4" mb="8" direction={{ initial: "column", sm: "row" }} align="center">
                  <Link href="/programs">
                    <button
                      className="w-48 py-3.5 px-6 rounded-xl font-bold bg-[#0047BA] text-white hover:bg-[#003894] shadow-md hover:shadow-lg hover:scale-105 transition-all cursor-pointer text-sm sm:text-base"
                    >
                      {t.home.explorePrograms}
                    </button>
                  </Link>
                  <Link href="/about">
                    <button
                      className="w-48 py-3.5 px-6 rounded-xl font-bold bg-transparent border-2 border-[#E31B23] dark:border-[#ff5c5c] text-[#E31B23] dark:text-[#ff5c5c] hover:bg-[#E31B23] hover:text-white dark:hover:bg-[#ff5c5c] dark:hover:text-black shadow-sm hover:shadow-md hover:scale-105 transition-all cursor-pointer text-sm sm:text-base"
                    >
                      {t.nav.about} PUPCL
                    </button>
                  </Link>
                </Flex>
              </MotionWrapper>

              {/* Visual Content (Code Mockup) */}
              <FloatingCodeWindow>
                <Box mt="6" mb="9" className="code-window border-2 border-neutral-200 dark:border-neutral-800 shadow-xl">
                  {/* Window Controls */}
                  <Flex gap="2" className="code-window-header bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 px-4 py-3">
                    <Box className="window-control window-control-red" />
                    <Box className="window-control window-control-yellow" />
                    <Box className="window-control window-control-green" />
                    <Text size="1" color="gray" className="ml-2 font-mono font-semibold">
                      pupcl-main.tsx
                    </Text>
                  </Flex>

                  {/* Animated Code Content */}
                  <CodeBlock />
                </Box>
              </FloatingCodeWindow>
            </Flex>
          </Container>
        </BackgroundBeamsWithCollision>
      </Box>


      {/* Feature Section: Why Join PUPCL? */}
      <Section size="3">
        <Container size="4" px="4">
          <Flex direction="column" align="center" mb="8" gap="3">
            <Heading size={{ initial: "7", md: "8" }} align="center" weight="bold" className="text-[#111827] dark:text-white">
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
            {/* Card 1: Networking & Mentorship (Solid Brand Blue) */}
            <WobbleCard
              containerClassName="col-span-1 lg:col-span-2 h-full min-h-[300px] lg:min-h-[320px] bg-[#0047BA] border border-blue-600 shadow-xl"
              className="relative"
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
              <Box className="absolute -right-6 lg:-right-[5%] -bottom-8 pointer-events-none object-contain">
                <Users size={220} className="text-white/15" />
              </Box>
            </WobbleCard>

            {/* Card 2: Weekly Workshops (Solid Brand Red) */}
            <WobbleCard
              containerClassName="col-span-1 min-h-[300px] lg:min-h-[320px] bg-[#E31B23] border border-red-600 shadow-xl"
              className="relative"
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
                <Calendar size={130} className="text-white/15" />
              </Box>
            </WobbleCard>

            {/* Card 3: Build Real-World Projects (Solid Dark Charcoal) */}
            <WobbleCard
              containerClassName="col-span-1 lg:col-span-3 min-h-[300px] lg:min-h-[320px] bg-[#0f172a] border border-slate-800 shadow-xl"
              className="relative"
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
              <Box className="absolute -right-8 md:-right-[5%] lg:-right-[2%] -bottom-10 pointer-events-none object-contain">
                <Trophy size={280} className="text-white/10" />
              </Box>
            </WobbleCard>
          </div>
        </Container>
      </Section>

      {/* =========================================================================
          COMING SOON: OPEN RECRUITMENT SECTION (Solid Brand Colors, No Gradients)
          ========================================================================= */}
      <Box py="8" pb="9" px="4" className="relative">
        <Container size="4">
          <Box
            className="rounded-3xl p-8 sm:p-12 relative overflow-hidden text-center bg-[#0047BA] border-2 border-blue-600 shadow-2xl"
          >
            <Flex direction="column" align="center" gap="4" className="relative z-10 max-w-2xl mx-auto">
              {/* Animated Coming Soon Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#0047BA] text-xs sm:text-sm font-extrabold tracking-wider shadow-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E31B23] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E31B23]"></span>
                </span>
                <span>{t.home.recruitmentBadge.toUpperCase()}</span>
              </div>

              <Heading size={{ initial: "7", sm: "9" }} weight="bold" style={{ color: "white" }} className="tracking-tight font-black">
                {t.home.recruitmentTitle}
              </Heading>

              <Text size={{ initial: "3", sm: "4" }} style={{ color: "rgba(255, 255, 255, 0.95)", lineHeight: 1.7 }} className="font-medium">
                {t.home.recruitmentDesc}
              </Text>

              <Flex gap="4" mt="3" direction={{ initial: "column", sm: "row" }}>
                <Link
                  href={`${siteConfig.links.whatsapp}?text=${encodeURIComponent(
                    "Halo Admin PUPCL, saya tertarik dengan Open Recruitment Member PUPCL dan ingin bertanya lebih lanjut."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold bg-[#E31B23] text-white hover:bg-[#c7171e] shadow-lg hover:scale-105 transition-all cursor-pointer">
                    {t.home.recruitmentContact}
                    <ArrowRight size={18} />
                  </button>
                </Link>
                <Link href={siteConfig.links.instagram} target="_blank" rel="noopener noreferrer">
                  <button className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold bg-white text-[#0047BA] hover:bg-neutral-100 shadow-md hover:scale-105 transition-all cursor-pointer">
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
