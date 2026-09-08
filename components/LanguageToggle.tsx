"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useState } from "react";

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-8 w-14 rounded-full bg-[var(--gray-3)] opacity-60" />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="inline-flex h-8 items-center justify-center rounded-full border border-[var(--gray-6)] bg-[var(--color-panel-solid)] px-2.5 py-1 text-xs font-semibold shadow-xs hover:border-[var(--gray-8)] hover:bg-[var(--gray-3)] transition-colors cursor-pointer select-none"
      title={language === "en" ? "Ganti ke Bahasa Indonesia" : "Switch to English"}
      aria-label="Toggle language"
    >
      <span
        className={`transition-colors ${
          language === "id"
            ? "font-extrabold text-[#E31B23]"
            : "font-normal text-[var(--gray-9)]"
        }`}
      >
        ID
      </span>
      <span className="mx-1 text-[var(--gray-6)] text-[10px]">|</span>
      <span
        className={`transition-colors ${
          language === "en"
            ? "font-extrabold text-[#0047BA] dark:text-blue-400"
            : "font-normal text-[var(--gray-9)]"
        }`}
      >
        EN
      </span>
    </button>
  );
}
