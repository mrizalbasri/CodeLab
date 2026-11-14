"use client";

import { Box } from "@radix-ui/themes";
import {
  ArrowRight,
  ExternalLink,
  ChevronDown,
  Globe,
  Smartphone,
  Sparkles,
  Terminal,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HeroCodeWindow } from "@/components/HeroCodeWindow";
import { CommunityBento } from "@/components/CommunityBento";
import { siteConfig } from "@/lib/data/site-config";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t, language } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const tracks = [
    {
      icon: Globe,
      color: "#0047BA",
      badge: t.home.trackWebBadge,
      title: t.home.trackWebTitle,
      desc: t.home.trackWebDesc,
    },
    {
      icon: Smartphone,
      color: "#7b1200",
      badge: t.home.trackMobileBadge,
      title: t.home.trackMobileTitle,
      desc: t.home.trackMobileDesc,
    },
    {
      icon: Sparkles,
      color: "#0284c7",
      badge: t.home.trackAiBadge,
      title: t.home.trackAiTitle,
      desc: t.home.trackAiDesc,
    },
    {
      icon: Terminal,
      color: "#d97706",
      badge: t.home.trackDevOpsBadge,
      title: t.home.trackDevOpsTitle,
      desc: t.home.trackDevOpsDesc,
    },
  ];

  return (
    <Box className="overflow-hidden">

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="border-b border-neutral-200 bg-white pb-20 pt-28 dark:border-neutral-800 dark:bg-neutral-950 sm:pb-28 sm:pt-36">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-6 text-center sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-100 px-4 py-1.5 text-xs font-medium text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0047BA] animate-pulse" />
              {language === "id"
                ? "President University Club • Pekanbaru"
                : "President University Club • Pekanbaru"}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="text-4xl font-black leading-[1.1] tracking-tight text-neutral-900 dark:text-white sm:text-6xl"
          >
            PU Pekanbaru{" "}
            <span className="text-[#0047BA]">Code Lab</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.12 }}
            className="mt-5 max-w-xl text-sm leading-relaxed text-neutral-500 dark:text-neutral-400 sm:text-base"
          >
            {t.home.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.18 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <Link href="/programs">
              <button className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#0047BA] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#003894]">
                {t.home.explorePrograms}
                <ArrowRight size={15} />
              </button>
            </Link>
            <Link href="/about">
              <button className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-neutral-300 bg-transparent px-6 py-2.5 text-sm font-semibold text-neutral-700 transition-colors hover:border-neutral-400 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-neutral-600">
                {language === "id" ? "Tentang Kami" : "About Us"}
              </button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="mt-16 w-full max-w-4xl"
          >
            <div className="relative pt-10">
              <div className="group absolute right-3 -top-4 z-20 sm:-top-8 sm:right-10">
                <span className="pointer-events-none absolute right-full top-1/2 mr-2 -translate-y-1/2 whitespace-nowrap rounded-2xl border border-neutral-200 bg-white px-3 py-2 text-xs font-medium text-neutral-700 opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200">
                  👋 {language === "id" ? "Hai! Aku KUBI." : "Hi! I’m KUBI."}
                  <span className="absolute -right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 border-r border-t border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900" />
                </span>
                <button
                  type="button"
                  aria-label={language === "id" ? "Sapa KUBI" : "Say hi to KUBI"}
                  className="rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0047BA]"
                >
                  <Image
                    src="/club-pixel-mascot.svg"
                    alt="KUBI, maskot PU Pekanbaru Code Lab"
                    width={84}
                    height={84}
                    priority
                    className="h-16 w-16 transition-transform duration-200 group-hover:scale-105 sm:h-20 sm:w-20"
                  />
                </button>
              </div>
              <motion.div
                className="overflow-hidden rounded-2xl border border-neutral-200 shadow-lg dark:border-neutral-800"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <HeroCodeWindow />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TRACKS ────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/60">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">

          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-10"
          >
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2">
              {t.home.tracksBadge}
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
              {t.home.tracksTitle}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tracks.map((track, i) => {
              const Icon = track.icon;
              return (
                <motion.div
                  key={i}
                  initial={{
                    opacity: 0,
                    x: i % 2 === 0 ? -24 : 24,
                    y: i % 2 === 0 ? 8 : 24,
                    filter: "blur(10px)",
                  }}
                  whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-[#0047BA]/50 dark:hover:border-[#0047BA]/40 hover:-translate-y-0.5 transition-all"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: track.color + "18" }}
                  >
                    <Icon size={20} style={{ color: track.color }} />
                  </div>
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: track.color }}
                  >
                    {track.badge}
                  </span>
                  <h3 className="font-bold text-sm text-neutral-900 dark:text-white mt-1 mb-2">
                    {track.title}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {track.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHY PUPCL / COMMUNITY BENTO ───────────────────────────── */}
      <CommunityBento />

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      {t.home.faqs && t.home.faqs.length > 0 && (
        <section className="py-20 sm:py-24 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/60">
          <div className="max-w-3xl mx-auto px-6 sm:px-8">

            <motion.div
              initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-center mb-12"
            >
              <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2">FAQ</p>
              <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
                {t.home.faqTitle}
              </h2>
              <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
                {t.home.faqSubtitle}
              </p>
            </motion.div>

            <div className="space-y-3">
              {t.home.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <motion.div
                    key={idx}
                    initial={{
                      opacity: 0,
                      x: idx % 2 === 0 ? -20 : 20,
                      y: 10,
                      filter: "blur(8px)",
                    }}
                    whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.4, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-sm"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${idx}`}
                      className="w-full px-5 py-5 flex items-center justify-between text-left text-sm font-semibold text-neutral-900 dark:text-white cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        size={16}
                        className={`text-neutral-400 transition-transform duration-200 shrink-0 ml-3 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22, ease: "easeOut" }}
                            className="overflow-hidden"
                            id={`faq-answer-${idx}`}
                        >
                            <p className="px-5 pb-5 pt-4 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed border-t border-neutral-100 dark:border-neutral-800">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white dark:bg-neutral-950">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto px-6 sm:px-8 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 text-xs font-medium mb-6"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7b1200] opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#7b1200]" />
            </span>
            {t.home.recruitmentBadge}
          </motion.div>

          <h2 className="text-2xl sm:text-4xl font-black text-neutral-900 dark:text-white tracking-tight">
            {t.home.recruitmentTitle}
          </h2>
          <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-lg mx-auto">
            {t.home.recruitmentDesc}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <Link
              href={`${siteConfig.links.whatsapp}?text=${encodeURIComponent(
                "Halo Admin PUPCL, saya tertarik dengan Open Recruitment Member PUPCL dan ingin bertanya lebih lanjut."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold bg-[#0047BA] text-white text-sm hover:bg-[#003894] transition-colors cursor-pointer">
                <MessageCircle size={15} />
                {t.home.recruitmentContact}
              </button>
            </Link>
            <Link
              href={siteConfig.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 text-sm hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors cursor-pointer">
                {t.home.recruitmentInsta}
                <ExternalLink size={13} />
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

    </Box>
  );
}
