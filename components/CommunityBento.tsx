"use client";

import { motion } from "motion/react";
import { Shield, TrendingUp, BookOpen, CreditCard, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

/**
 * CommunityBento
 * Layout bento grid yang clean dan rapi.
 * Warna solid, tidak ada gradasi.
 * Grid 3-kolom dengan tinggi card yang proporsional dan konsisten.
 */
export function CommunityBento() {
  const { t } = useLanguage();

  return (
    <section className="py-16 sm:py-20 border-b border-neutral-200/70 dark:border-neutral-800/70">
      <div className="max-w-5xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-neutral-900 dark:text-white">
            {t.home.whyTitle}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-500 dark:text-neutral-400 max-w-lg mx-auto leading-relaxed">
            {t.home.whySubtitle}
          </p>
        </div>

        {/* Bento Grid — 3 kolom di desktop, 1 kolom di mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Row 1 kiri: Stat card — tinggi penuh vertikal */}
          <div className="md:row-span-2 flex flex-col gap-4">

            {/* Card: 500+ Stat */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0 }}
              className="flex-1 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 flex flex-col justify-between min-h-[180px]"
            >
              <div
                className="text-6xl font-black tracking-tight leading-none"
                style={{ color: "#0047BA" }}
              >
                {t.home.bento1Stat}
              </div>
              <div>
                <p className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mt-3">
                  {t.home.bento1Title}
                </p>
              </div>
            </motion.div>

            {/* Card: Komunitas Terpercaya */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="flex-1 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 flex flex-col justify-between min-h-[180px]"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: "#0047BA" }}
              >
                <Shield size={20} color="white" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-neutral-900 dark:text-white mt-4 mb-1.5">
                  {t.home.bento2Title}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {t.home.bento2Desc}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Row 1 tengah + kanan: Level Up (lebar 2 col) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.12 }}
            className="md:col-span-2 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 flex flex-col justify-between min-h-[220px]"
          >
            <div>
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 mb-4"
                style={{ backgroundColor: "#7b1200" }}
              >
                <TrendingUp size={20} color="white" />
              </div>
              <h3 className="font-bold text-sm text-neutral-900 dark:text-white mb-1.5">
                {t.home.bento3Title}
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-sm">
                {t.home.bento3Desc}
              </p>
            </div>
            {/* Progress bars */}
            <div className="mt-5 space-y-2.5">
              {[
                { label: "Web Dev", pct: 85, color: "#0047BA" },
                { label: "Mobile", pct: 70, color: "#7b1200" },
                { label: "AI & ML", pct: 60, color: "#0284c7" },
              ].map((bar) => (
                <div key={bar.label} className="flex items-center gap-3">
                  <span className="text-[11px] text-neutral-400 w-14 shrink-0 font-medium">{bar.label}</span>
                  <div className="flex-1 h-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${bar.pct}%`, backgroundColor: bar.color }}
                    />
                  </div>
                  <span className="text-[11px] text-neutral-400 w-8 text-right tabular-nums">{bar.pct}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Row 2 tengah: Safe Space */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.16 }}
            className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 flex flex-col justify-between min-h-[220px]"
          >
            <div>
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 mb-4"
                style={{ backgroundColor: "#0047BA" }}
              >
                <BookOpen size={20} color="white" />
              </div>
              <h3 className="font-bold text-sm text-neutral-900 dark:text-white mb-1.5">
                {t.home.bento4Title}
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                {t.home.bento4Desc}
              </p>
            </div>
            {/* Avatar stack */}
            <div className="flex -space-x-2 mt-5">
              {["M", "R", "C", "A", "T", "I"].map((letter, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full border-2 border-white dark:border-neutral-900 flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                  style={{ backgroundColor: i % 2 === 0 ? "#0047BA" : "#7b1200" }}
                >
                  {letter}
                </div>
              ))}
              <div className="w-7 h-7 rounded-full border-2 border-white dark:border-neutral-900 bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-[10px] font-bold text-neutral-500 dark:text-neutral-300 shrink-0">
                +
              </div>
            </div>
          </motion.div>

          {/* Row 2 kanan: Digital Member Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="rounded-2xl border border-neutral-800 bg-neutral-900 dark:bg-black p-6 flex flex-col justify-between min-h-[220px]"
          >
            <div>
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "#0047BA" }}
                >
                  <CreditCard size={20} color="white" />
                </div>
                {/* Mini card preview */}
                <div
                  className="w-24 h-14 rounded-lg flex flex-col justify-between p-2 shrink-0"
                  style={{ backgroundColor: "#0047BA", border: "1.5px solid rgba(255,255,255,0.15)" }}
                >
                  <span className="text-[7px] font-bold text-blue-200 tracking-wider">PUPCL MEMBER</span>
                  <div className="flex justify-between items-end">
                    <div className="w-4 h-4 rounded-full bg-white/20" />
                    <span className="text-[6px] text-blue-300 font-mono">#2024</span>
                  </div>
                </div>
              </div>
              <h3 className="font-bold text-sm text-white mb-1.5">
                {t.home.bento5Title}
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {t.home.bento5Desc}
              </p>
            </div>
            <Link href="/login" className="mt-4 inline-block">
              <button
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white transition-opacity hover:opacity-80"
                style={{ backgroundColor: "#0047BA" }}
              >
                {t.home.bento5Cta}
                <ArrowRight size={13} />
              </button>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
