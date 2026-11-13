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
      <section className="pt-28 pb-20 sm:pt-36 sm:pb-28 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 flex flex-col items-center text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 text-xs font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0047BA] animate-pulse" />
              {language === "id"
                ? "Komunitas Teknologi • President University Pekanbaru"
                : "Student Tech Community • President University Pekanbaru"}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="text-4xl sm:text-6xl font-black tracking-tight text-neutral-900 dark:text-white leading-[1.1]"
          >
            PU Pekanbaru{" "}
            <span className="text-[#0047BA]">Code Lab</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.12 }}
            className="mt-5 text-sm sm:text-base text-neutral-500 dark:text-neutral-400 max-w-xl leading-relaxed"
          >
            {t.home.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.18 }}
            className="flex flex-wrap items-center justify-center gap-3 mt-8"
          >
            <Link href="/programs">
              <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold bg-[#0047BA] text-white text-sm hover:bg-[#003894] transition-colors cursor-pointer">
                {t.home.explorePrograms}
                <ArrowRight size={15} />
              </button>
            </Link>
            <Link href="/about">
              <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold bg-transparent border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 text-sm hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors cursor-pointer">
                {language === "id" ? "Tentang Kami" : "About Us"}
              </button>
            </Link>
          </motion.div>

          {/* Code Window */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="mt-16 w-full max-w-4xl"
          >
            <div className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-lg">
              <HeroCodeWindow />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TRACKS ────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/60">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">

          <div className="text-center mb-10">
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2">
              {t.home.tracksBadge}
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
              {t.home.tracksTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tracks.map((track, i) => {
              const Icon = track.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.07 }}
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

            <div className="text-center mb-12">
              <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2">FAQ</p>
              <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
                {t.home.faqTitle}
              </h2>
              <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
                {t.home.faqSubtitle}
              </p>
            </div>

            <div className="space-y-3">
              {t.home.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
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
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white dark:bg-neutral-950">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 text-xs font-medium mb-6">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7b1200] opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#7b1200]" />
            </span>
            {t.home.recruitmentBadge}
          </div>

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
        </div>
      </section>

    </Box>
  );
}
