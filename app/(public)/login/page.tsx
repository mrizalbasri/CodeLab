"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Sparkles,
  Terminal,
  AlertCircle,
  Loader2,
  CheckCircle2,
  MessageCircle,
  Code2,
  KeyRound,
  X,
  ChevronRight,
  UserCheck,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { getCurrentProfile } from "@/app/actions";
import { siteConfig } from "@/lib/data/site-config";
import { useLanguage } from "@/context/LanguageContext";

export default function LoginPage() {
  const { t, language } = useLanguage();
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [activeTab, setActiveTab] = useState<"member" | "admin">("member");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [capsLockActive, setCapsLockActive] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Quick student email domain helper
  const studentDomains = ["@student.president.ac.id", "@president.ac.id"];

  // Restore remembered email on mount
  useEffect(() => {
    try {
      const savedEmail = localStorage.getItem("pupcl_remembered_email");
      if (savedEmail) {
        setEmail(savedEmail);
        setRememberMe(true);
      }
    } catch {
      // Ignore localStorage errors in SSR or restricted environments
    }
  }, []);

  // Detect Caps Lock key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.getModifierState) {
      setCapsLockActive(e.getModifierState("CapsLock"));
    }
  };

  const handleDomainChip = (domain: string) => {
    if (!email) {
      setEmail(`nama${domain}`);
      return;
    }
    const atIndex = email.indexOf("@");
    if (atIndex !== -1) {
      setEmail(email.substring(0, atIndex) + domain);
    } else {
      setEmail(email + domain);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (signInError) {
        throw signInError;
      }

      // Persist remember me
      try {
        if (rememberMe) {
          localStorage.setItem("pupcl_remembered_email", email.trim());
        } else {
          localStorage.removeItem("pupcl_remembered_email");
        }
      } catch {
        // Ignore
      }

      setIsSuccess(true);
      const profile = await getCurrentProfile();
      const targetRoute = profile?.role === "admin" ? "/admin" : "/dashboard";
      router.push(targetRoute);
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan saat masuk.";
      // Map standard supabase errors to friendly Indonesian/English text
      if (msg.includes("Invalid login credentials")) {
        setError(
          language === "id"
            ? "Email atau kata sandi tidak cocok. Mohon periksa kembali atau hubungi pengurus."
            : "Invalid email or password. Please verify your credentials or contact PUPCL admin."
        );
      } else if (msg.includes("Email not confirmed")) {
        setError(
          language === "id"
            ? "Email belum dikonfirmasi. Silakan cek kotak masuk email Anda."
            : "Email is not confirmed yet. Please check your inbox for confirmation."
        );
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  // WhatsApp prefilled message URL
  const waHelpUrl = `${siteConfig.links.whatsapp}?text=${encodeURIComponent(
    activeTab === "admin"
      ? "Halo Pengurus PUPCL, saya membutuhkan bantuan akses masuk ke akun Pengurus / Admin CodeLab."
      : "Halo Pengurus PUPCL, saya mahasiswa President University ingin menanyakan pendaftaran akun Member CodeLab."
  )}`;

  return (
    <div className="relative min-h-[calc(100vh-80px)] w-full overflow-hidden bg-neutral-50 dark:bg-neutral-950">
      {/* Background ambient lighting effects */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[#0047BA]/10 blur-[120px] dark:bg-[#0047BA]/20" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-blue-500/10 blur-[140px] dark:bg-blue-600/15" />

      <div className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl flex-col justify-center px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Top return navigation link */}
        <div className="mb-4 flex items-center justify-between sm:mb-6">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full border border-neutral-200/80 bg-white/80 px-3.5 py-1.5 text-xs font-medium text-neutral-600 shadow-sm backdrop-blur-md transition-all hover:border-[#0047BA]/40 hover:bg-white hover:text-[#0047BA] dark:border-neutral-800 dark:bg-neutral-900/80 dark:text-neutral-300 dark:hover:border-[#0047BA]/50 dark:hover:bg-neutral-900 dark:hover:text-blue-400"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>{t.login?.backToHome || "Kembali ke Beranda"}</span>
          </Link>

          <span className="hidden items-center gap-1.5 text-xs text-neutral-400 sm:inline-flex">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Auth Gateway v2.4 • Active</span>
          </span>
        </div>

        {/* Main Split Grid */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          
          {/* ══════════════════════════════════════════════════════════════
              LEFT COLUMN: Interactive Tech Showcase (Desktop Only)
             ══════════════════════════════════════════════════════════════ */}
          <div className="hidden flex-col justify-center space-y-6 lg:col-span-6 lg:flex xl:col-span-7">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#0047BA]/20 bg-[#0047BA]/5 px-3.5 py-1 text-xs font-semibold text-[#0047BA] dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-400">
                <Sparkles className="h-3.5 w-3.5" />
                <span>{t.login?.showcaseBadge || "PUPCL Tech Ecosystem"}</span>
              </div>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white xl:text-4xl">
                {t.login?.showcaseTitle || "President University Pekanbaru Code Lab"}
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 xl:text-base">
                {t.login?.showcaseSubtitle ||
                  "Membentuk generasi software engineer handal melalui pembelajaran berbasis proyek nyata dan inkubasi hackathon."}
              </p>
            </div>

            {/* Interactive Mock Terminal */}
            <div className="overflow-hidden rounded-2xl border border-neutral-200/90 bg-neutral-900 text-neutral-200 shadow-2xl dark:border-neutral-800">
              <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-950/70 px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                  <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-xs text-neutral-400">
                    {t.login?.terminalTitle || "pupcl-auth --secure-session"}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-400">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>TLS 1.3 GCM</span>
                </div>
              </div>

              <div className="space-y-2 p-4 font-mono text-xs leading-relaxed">
                <div className="flex items-center gap-2 text-neutral-400">
                  <Terminal className="h-3.5 w-3.5 text-[#0047BA]" />
                  <span>session.initialize --cluster=ap-southeast-1</span>
                </div>
                <div className="text-emerald-400">
                  ✔ Database connected (President University Campus Node)
                </div>
                <div className="text-neutral-300">
                  ℹ Active portal:{" "}
                  <span className="font-semibold text-blue-400">
                    {activeTab === "member" ? "Member ID & Resource Hub" : "Administrator / Management CMS"}
                  </span>
                </div>
                <div className="text-neutral-500">
                  &gt; input status: {email ? `identity stream [${email}]` : "awaiting user credential stream..."}
                </div>
              </div>
            </div>

            {/* Feature Points Bento */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-neutral-200/80 bg-white/70 p-3.5 backdrop-blur-sm transition-all hover:border-[#0047BA]/30 hover:shadow-md dark:border-neutral-800/80 dark:bg-neutral-900/60">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#0047BA] dark:bg-blue-950/60 dark:text-blue-400">
                  <UserCheck className="h-4 w-4" />
                </div>
                <h4 className="mt-2 text-xs font-semibold text-neutral-900 dark:text-white">
                  {t.login?.showcaseFeature1Title || "Digital Member Pass"}
                </h4>
                <p className="mt-1 text-[11px] text-neutral-500 dark:text-neutral-400">
                  {t.login?.showcaseFeature1Desc || "Verifikasi ID digital dan rekam pencapaian koding."}
                </p>
              </div>

              <div className="rounded-xl border border-neutral-200/80 bg-white/70 p-3.5 backdrop-blur-sm transition-all hover:border-[#0047BA]/30 hover:shadow-md dark:border-neutral-800/80 dark:bg-neutral-900/60">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                  <Code2 className="h-4 w-4" />
                </div>
                <h4 className="mt-2 text-xs font-semibold text-neutral-900 dark:text-white">
                  {t.login?.showcaseFeature2Title || "Pusat Materi & Lab"}
                </h4>
                <p className="mt-1 text-[11px] text-neutral-500 dark:text-neutral-400">
                  {t.login?.showcaseFeature2Desc || "Akses repository workshop dan modul belajar praktikum."}
                </p>
              </div>

              <div className="rounded-xl border border-neutral-200/80 bg-white/70 p-3.5 backdrop-blur-sm transition-all hover:border-[#0047BA]/30 hover:shadow-md dark:border-neutral-800/80 dark:bg-neutral-900/60">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
                  <KeyRound className="h-4 w-4" />
                </div>
                <h4 className="mt-2 text-xs font-semibold text-neutral-900 dark:text-white">
                  {t.login?.showcaseFeature3Title || "Role-Based Security"}
                </h4>
                <p className="mt-1 text-[11px] text-neutral-500 dark:text-neutral-400">
                  {t.login?.showcaseFeature3Desc || "Enkripsi modern Supabase Auth dengan isolasi data teruji."}
                </p>
              </div>
            </div>

            {/* Tech stack badge pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-neutral-500 dark:text-neutral-400">
              <span className="font-medium text-neutral-400">Powered by:</span>
              <span className="rounded-md border border-neutral-200 bg-white px-2 py-0.5 text-[11px] font-mono dark:border-neutral-800 dark:bg-neutral-900">
                Next.js 16
              </span>
              <span className="rounded-md border border-neutral-200 bg-white px-2 py-0.5 text-[11px] font-mono dark:border-neutral-800 dark:bg-neutral-900">
                Supabase Auth
              </span>
              <span className="rounded-md border border-neutral-200 bg-white px-2 py-0.5 text-[11px] font-mono dark:border-neutral-800 dark:bg-neutral-900">
                TypeScript
              </span>
              <span className="rounded-md border border-neutral-200 bg-white px-2 py-0.5 text-[11px] font-mono dark:border-neutral-800 dark:bg-neutral-900">
                Tailwind CSS 4
              </span>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════
              RIGHT COLUMN: Interactive Login Card (Desktop & Mobile)
             ══════════════════════════════════════════════════════════════ */}
          <div className="w-full lg:col-span-6 xl:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-neutral-200/90 bg-white/90 p-6 shadow-xl backdrop-blur-xl dark:border-neutral-800 dark:bg-neutral-900/90 sm:p-8"
            >
              {/* Header inside Card */}
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0047BA]/10 text-[#0047BA] shadow-inner dark:bg-blue-500/15 dark:text-blue-400">
                  <Image
                    src="/logo.webp"
                    alt="PUPCL Logo"
                    width={38}
                    height={38}
                    className="h-9 w-9 object-contain"
                    priority
                  />
                </div>

                <h2 className="mt-4 text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
                  {activeTab === "admin"
                    ? (language === "id" ? "Portal Pengurus / Admin" : "Admin Management Portal")
                    : (t.login?.title || "Selamat Datang Kembali")}
                </h2>
                <p className="mt-1.5 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400 sm:text-sm">
                  {activeTab === "admin"
                    ? (language === "id"
                        ? "Masuk dengan akun berwenang untuk mengelola sistem PUPCL."
                        : "Sign in with verified administrator credentials.")
                    : (t.login?.subtitle || "Masuk untuk mengakses dashboard member dan materi proyek.")}
                </p>
              </div>

              {/* Interactive Segmented Switcher (Member vs Admin) */}
              <div className="mt-6 flex rounded-xl border border-neutral-200 bg-neutral-100 p-1 dark:border-neutral-800 dark:bg-neutral-800/70">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("member");
                    setError(null);
                  }}
                  className={`relative flex-1 rounded-lg py-2 text-xs font-semibold transition-colors duration-200 min-h-[38px] ${
                    activeTab === "member"
                      ? "text-neutral-900 dark:text-white"
                      : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                  }`}
                >
                  {activeTab === "member" && (
                    <motion.div
                      layoutId="login-portal-pill"
                      className="absolute inset-0 rounded-lg bg-white shadow-sm dark:bg-neutral-900"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center justify-center gap-1.5">
                    <UserCheck className="h-3.5 w-3.5" />
                    <span>{t.login?.memberTab || "Portal Member"}</span>
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("admin");
                    setError(null);
                  }}
                  className={`relative flex-1 rounded-lg py-2 text-xs font-semibold transition-colors duration-200 min-h-[38px] ${
                    activeTab === "admin"
                      ? "text-neutral-900 dark:text-white"
                      : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                  }`}
                >
                  {activeTab === "admin" && (
                    <motion.div
                      layoutId="login-portal-pill"
                      className="absolute inset-0 rounded-lg bg-white shadow-sm dark:bg-neutral-900"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center justify-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>{t.login?.adminTab || "Pengurus / Admin"}</span>
                  </span>
                </button>
              </div>

              {/* Error Alert Box with Shake Animation */}
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      x: [-6, 6, -4, 4, -2, 2, 0],
                    }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600 dark:text-red-400" />
                    <div className="flex-1">
                      <p className="font-medium leading-relaxed">{error}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setError(null)}
                      className="text-red-400 hover:text-red-600"
                      aria-label="Tutup pesan error"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form Element */}
              <form onSubmit={handleLogin} className="mt-6 space-y-4">
                
                {/* Email Input */}
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="login-email"
                      className="text-xs font-semibold text-neutral-800 dark:text-neutral-200"
                    >
                      {t.login?.emailLabel || "Alamat Email"}
                    </label>
                    <span className="text-[11px] text-neutral-400">
                      {activeTab === "member" ? "PresUniv Student" : "Official PUPCL"}
                    </span>
                  </div>

                  <div className="relative mt-1.5">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-400">
                      <Mail className="h-4 w-4" />
                    </div>
                    <input
                      id="login-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.login?.emailPlaceholder || "nama@student.president.ac.id"}
                      autoComplete="email"
                      inputMode="email"
                      className="block h-12 w-full rounded-xl border border-neutral-300 bg-white pl-10 pr-9 text-sm text-neutral-900 placeholder-neutral-400 shadow-sm transition-all focus:border-[#0047BA] focus:outline-none focus:ring-2 focus:ring-[#0047BA]/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-500 dark:focus:border-blue-500 dark:focus:ring-blue-500/25"
                    />
                    {email && (
                      <button
                        type="button"
                        onClick={() => setEmail("")}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                        aria-label="Bersihkan email"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  {/* Quick Domain Suggestion Chips (Mobile & Desktop UX booster) */}
                  {!email.includes("@") && email.length > 1 && (
                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      <span className="text-[11px] text-neutral-400">Auto-fill:</span>
                      {studentDomains.map((domain) => (
                        <button
                          key={domain}
                          type="button"
                          onClick={() => handleDomainChip(domain)}
                          className="rounded-md border border-neutral-200 bg-neutral-100 px-2 py-0.5 text-[11px] text-neutral-700 transition hover:border-[#0047BA] hover:bg-[#0047BA]/5 hover:text-[#0047BA] dark:border-neutral-800 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:border-blue-500"
                        >
                          {domain}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Password Input */}
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="login-password"
                      className="text-xs font-semibold text-neutral-800 dark:text-neutral-200"
                    >
                      {t.login?.passwordLabel || "Kata Sandi"}
                    </label>
                    <a
                      href={waHelpUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-[#0047BA] hover:underline dark:text-blue-400"
                    >
                      {t.login?.forgotPassword || "Lupa kata sandi?"}
                    </a>
                  </div>

                  <div className="relative mt-1.5">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-400">
                      <Lock className="h-4 w-4" />
                    </div>
                    <input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyDown={handleKeyDown}
                      onKeyUp={handleKeyDown}
                      placeholder={t.login?.passwordPlaceholder || "••••••••"}
                      autoComplete="current-password"
                      className="block h-12 w-full rounded-xl border border-neutral-300 bg-white pl-10 pr-11 text-sm text-neutral-900 placeholder-neutral-400 shadow-sm transition-all focus:border-[#0047BA] focus:outline-none focus:ring-2 focus:ring-[#0047BA]/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-500 dark:focus:border-blue-500 dark:focus:ring-blue-500/25"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-neutral-400 hover:text-neutral-600 focus:outline-none dark:hover:text-neutral-200"
                      aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 transition-transform hover:scale-110" />
                      ) : (
                        <Eye className="h-4 w-4 transition-transform hover:scale-110" />
                      )}
                    </button>
                  </div>

                  {/* Caps Lock warning indicator */}
                  {capsLockActive && (
                    <motion.div
                      initial={{ opacity: 0, y: -2 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1.5 flex items-center gap-1.5 text-[11px] text-amber-600 dark:text-amber-400"
                    >
                      <AlertCircle className="h-3 w-3" />
                      <span>Caps Lock sedang aktif</span>
                    </motion.div>
                  )}
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex cursor-pointer items-center gap-2 select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 rounded border-neutral-300 text-[#0047BA] focus:ring-[#0047BA] dark:border-neutral-700 dark:bg-neutral-800"
                    />
                    <span className="text-xs text-neutral-600 dark:text-neutral-400">
                      {t.login?.rememberMe || "Ingat saya di perangkat ini"}
                    </span>
                  </label>
                </div>

                {/* Submit Action Button */}
                <motion.button
                  whileHover={{ scale: loading ? 1 : 1.01 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  type="submit"
                  disabled={loading || isSuccess}
                  className="group relative flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#0047BA] px-6 text-sm font-semibold text-white shadow-lg shadow-[#0047BA]/25 transition-all hover:bg-[#003894] hover:shadow-xl hover:shadow-[#0047BA]/30 focus:outline-none focus:ring-2 focus:ring-[#0047BA] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 dark:focus:ring-offset-neutral-900"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>{t.login?.submittingBtn || "Memverifikasi..."}</span>
                    </div>
                  ) : isSuccess ? (
                    <div className="flex items-center gap-2 text-emerald-100">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Berhasil! Mengalihkan...</span>
                    </div>
                  ) : (
                    <>
                      <span>{t.login?.submitBtn || "Masuk ke Portal"}</span>
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </motion.button>
              </form>

              {/* Bottom Assistance & WhatsApp Action */}
              <div className="mt-6 border-t border-neutral-200/80 pt-5 text-center dark:border-neutral-800">
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  {t.login?.noAccount || "Belum memiliki akun?"}{" "}
                  <a
                    href={waHelpUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-[#0047BA] hover:underline dark:text-blue-400"
                  >
                    <MessageCircle className="h-3 w-3" />
                    <span>{t.login?.contactAdmin || "Hubungi Admin PUPCL"}</span>
                  </a>
                </p>

                <p className="mt-2 text-[11px] text-neutral-400 dark:text-neutral-500">
                  {t.login?.adminHelpNote ||
                    "Akun member disediakan untuk mahasiswa aktif President University Pekanbaru."}
                </p>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
}
