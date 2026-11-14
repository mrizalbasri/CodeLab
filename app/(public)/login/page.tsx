"use client";

import { useState } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
} from "lucide-react";
import { getCurrentProfile } from "@/app/actions";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useLanguage } from "@/context/LanguageContext";
import { createClient } from "@/lib/supabase/client";
import { siteConfig } from "@/lib/data/site-config";

// Only President University email addresses are allowed to sign in, including
// campus subdomains such as @student.president.ac.id.
const ALLOWED_EMAIL_DOMAIN = "president.ac.id";

const isCampusEmail = (email: string) =>
  email.endsWith(`@${ALLOWED_EMAIL_DOMAIN}`) ||
  email.endsWith(`.${ALLOWED_EMAIL_DOMAIN}`);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const supabase = createClient();
  const { t } = useLanguage();

  const getErrorMessage = (err: unknown): string => {
    if (err instanceof Error) {
      const message = err.message.toLowerCase();
      if (
        message.includes("invalid login credentials") ||
        message.includes("invalid_grant") ||
        message.includes("invalid email or password")
      ) {
        return t.auth.invalidCredentials;
      }
      if (message.includes("email not confirmed")) {
        return t.auth.emailNotConfirmed;
      }
      if (
        message.includes("rate limit") ||
        message.includes("too many requests") ||
        message.includes("over_email_send_rate_limit")
      ) {
        return t.auth.rateLimited;
      }
    }

    return t.auth.generalError;
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      setError(t.auth.invalidCredentials);
      return;
    }

    if (!isCampusEmail(cleanEmail)) {
      setError(t.auth.emailDomainNotAllowed);
      toast.error(t.auth.emailDomainNotAllowed);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (signInError) {
        throw signInError;
      }

      const profile = await getCurrentProfile();
      const destination = profile?.role === "admin" ? "/admin" : "/dashboard";

      toast.success(t.auth.successToast);
      router.push(destination);
      router.refresh();
    } catch (err) {
      const friendlyMessage = getErrorMessage(err);
      setError(friendlyMessage);
      toast.error(friendlyMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col justify-between bg-slate-50/80 px-4 py-6 text-slate-800 antialiased selection:bg-[#0047BA]/20 selection:text-[#0047BA] sm:px-6 lg:px-8 dark:bg-[#07090d] dark:text-zinc-100">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full bg-blue-500/10 blur-[100px] dark:bg-blue-600/10" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-indigo-500/10 blur-[100px] dark:bg-indigo-600/10" />

      {/* Top Header Navigation */}
      <header className="relative z-20 mx-auto flex w-full max-w-5xl items-center justify-between pb-4 sm:pb-6">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-3.5 py-1.5 text-xs font-medium text-slate-600 shadow-xs backdrop-blur-sm transition-all hover:border-slate-300 hover:text-slate-900 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-white"
        >
          <ArrowLeft
            size={14}
            className="transition-transform group-hover:-translate-x-0.5"
          />
          <span>{t.auth.backToHome}</span>
        </Link>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </header>

      {/* Main Split-Card: Midnight Developer Showcase on LEFT, Login Form on RIGHT */}
      <div className="relative z-10 mx-auto my-auto w-full max-w-5xl pb-2 pt-14 sm:pb-4 lg:pt-4">
        {/* Codi perched on the top border of the form card (mobile only) */}
        <motion.div
          initial={{ y: 6, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="pointer-events-none absolute right-7 top-2 z-20 flex items-center gap-2 sm:right-10 lg:hidden"
        >
          <div className="relative rounded-xl bg-[#0047BA] px-2.5 py-1 text-[11px] font-semibold text-white shadow-md">
            <span>{t.auth.mascotBubble}</span>
            {/* Bubble tail pointing to Codi on the right */}
            <span className="absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 bg-[#0047BA]" />
          </div>
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center filter drop-shadow-md">
            <NextImage
              src="/club-pixel-mascot.svg"
              alt="Codi, the CodeLab Mascot"
              width={56}
              height={56}
              className="h-full w-full object-contain"
              priority
            />
            {/* Contact shadow on the card border */}
            <div className="absolute -bottom-0.5 h-1.5 w-10 rounded-full bg-black/50 blur-[1px]" />
          </div>
        </motion.div>
        <div className="grid overflow-hidden rounded-[26px] border border-slate-200/90 bg-white shadow-xl sm:rounded-[32px] lg:grid-cols-12 dark:border-zinc-800/90 dark:bg-[#101318] dark:shadow-2xl">
          {/* SISI KIRI: Desktop-only Midnight Developer Showcase Panel with Codi Sitting on the Card */}
          <section className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-b from-[#08152e] via-[#091b3d] to-[#040d1f] p-7 text-white sm:p-10 lg:col-span-5 lg:flex lg:p-12">
            {/* Ambient Background Aura */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] opacity-25 [background-size:20px_20px]"
            />

            {/* Top Identity */}
            <div className="relative z-10">
              <h2 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
                {t.auth.cardHeadline}
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-blue-100/75 sm:text-sm">
                {t.auth.cardSubheadline}
              </p>
            </div>

            {/* The Code Card with Codi Perched / Sitting on Top */}
            <div className="relative z-10 my-8 pt-16 sm:my-10 sm:pt-20">
              {/* The IDE / Terminal Card */}
              <div className="relative rounded-2xl border border-white/15 bg-slate-950/70 p-4.5 shadow-2xl backdrop-blur-xl sm:p-5">
                {/* Codi Mascot Sitting on the Top Border of this Card */}
                <motion.div
                  initial={{ y: 6, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="absolute bottom-[calc(100%-8px)] right-6 z-20 flex flex-col items-center pointer-events-none"
                >
                  {/* Speech Bubble directly above Codi */}
                  <div className="relative mb-1 rounded-xl bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-900 shadow-md dark:bg-zinc-100">
                    <span>{t.auth.mascotBubble}</span>
                    {/* Bubble tail pointing down towards Codi */}
                    <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-white dark:bg-zinc-100" />
                  </div>

                  {/* KUBI / Codi Pixel Mascot Sitting on Card */}
                  <div className="relative flex h-14 w-14 shrink-0 items-center justify-center filter drop-shadow-md transition-transform hover:scale-105 sm:h-16 sm:w-16">
                    <NextImage
                      src="/club-pixel-mascot.svg"
                      alt="Codi, the CodeLab Mascot"
                      width={64}
                      height={64}
                      className="h-full w-full object-contain"
                      priority
                    />
                    {/* Contact shadow overlapping the card border */}
                    <div className="absolute -bottom-0.5 h-1.5 w-10 rounded-full bg-black/60 blur-[1px]" />
                  </div>
                </motion.div>
                {/* Terminal Window Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                    <span className="ml-2 font-mono text-[11px] text-blue-200/60">
                      main.ts
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-blue-300/60">TypeScript</span>
                </div>

                {/* Code Snippet */}
                <div className="mt-3.5 space-y-1.5 font-mono text-[11px] leading-relaxed text-blue-100 sm:text-xs">
                  <p className="text-blue-300/50">
                    <span className="text-emerald-400/90">{"// President University Pekanbaru"}</span>
                  </p>
                  <p>
                    <span className="text-purple-300">const</span>{" "}
                    <span className="text-amber-200">codeLab</span> ={" "}
                    <span className="text-blue-300">new</span>{" "}
                    <span className="text-amber-300">Community</span>();
                  </p>
                  <p>
                    <span className="text-blue-400">await</span>{" "}
                    <span className="text-amber-200">codeLab</span>.
                    <span className="text-sky-300">buildRealProjects</span>();
                  </p>
                </div>

                {/* Tags row */}
                <div className="mt-4 flex flex-wrap gap-1.5 pt-1 text-[10px] font-medium text-blue-200/80">
                  <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5">Fullstack Web</span>
                  <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5">Mobile Apps</span>
                  <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5">AI & Cloud</span>
                </div>
              </div>
            </div>
          </section>

          {/* SISI KANAN: Clean Login Form */}
          <section className="flex flex-col justify-center p-7 sm:p-10 lg:col-span-7 lg:p-12">
            <div className="mx-auto w-full max-w-md">
              {/* Logo & Brand Header */}
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/80 bg-slate-50 p-1.5 dark:border-zinc-700/80 dark:bg-zinc-850">
                  <NextImage
                    src="/logo.webp"
                    alt="PUPCL Logo"
                    width={24}
                    height={24}
                    className="object-contain"
                    priority
                  />
                </div>
                <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">
                  PUPCL <span className="font-normal text-slate-500 dark:text-zinc-400">CodeLab</span>
                </span>
              </div>

              {/* Single Clear Heading & Subtitle */}
              <div className="mt-7">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                  {t.auth.title}
                </h1>
                <p className="mt-1.5 text-sm text-slate-500 dark:text-zinc-400">
                  {t.auth.subtitle}
                </p>
              </div>

              {/* Error Alert */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="alert"
                  className="mt-5 rounded-xl border border-red-200/80 bg-red-50/80 p-3 text-xs text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300"
                >
                  {error}
                </motion.div>
              )}

              {/* Form Fields */}
              <form onSubmit={handleLogin} className="mt-7 space-y-5">
                <div>
                  <label
                    htmlFor="login-email"
                    className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-zinc-300"
                  >
                    {t.auth.emailLabel}
                  </label>
                  <div className="relative flex items-center">
                    <Mail
                      size={17}
                      className="pointer-events-none absolute left-3.5 text-slate-400 dark:text-zinc-500"
                    />
                    <input
                      id="login-email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError(null);
                      }}
                      placeholder={t.auth.emailPlaceholder}
                      autoComplete="email"
                      autoCapitalize="none"
                      autoCorrect="off"
                      spellCheck="false"
                      required
                      disabled={loading}
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-10 pr-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 hover:bg-slate-50 focus:border-[#0047BA] focus:bg-white focus:ring-3 focus:ring-blue-500/10 disabled:opacity-60 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-blue-500 dark:focus:bg-zinc-900"
                    />
                  </div>
                  <p className="mt-1.5 text-[11px] leading-none text-slate-400 dark:text-zinc-500">
                    {t.auth.emailDomainHint}
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="login-password"
                    className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-zinc-300"
                  >
                    {t.auth.passwordLabel}
                  </label>
                  <div className="relative flex items-center">
                    <LockKeyhole
                      size={17}
                      className="pointer-events-none absolute left-3.5 text-slate-400 dark:text-zinc-500"
                    />
                    <input
                      id="login-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (error) setError(null);
                      }}
                      placeholder={t.auth.passwordPlaceholder}
                      autoComplete="current-password"
                      required
                      disabled={loading}
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-10 pr-11 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 hover:bg-slate-50 focus:border-[#0047BA] focus:bg-white focus:ring-3 focus:ring-blue-500/10 disabled:opacity-60 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-blue-500 dark:focus:bg-zinc-900"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={showPassword ? t.auth.hidePassword : t.auth.showPassword}
                      className="absolute right-2.5 rounded-lg p-1 text-slate-400 hover:text-slate-700 dark:text-zinc-500 dark:hover:text-zinc-200"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between pt-1 text-xs">
                  <label className="flex cursor-pointer select-none items-center gap-2 text-slate-600 dark:text-zinc-400">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-[#0047BA] focus:ring-[#0047BA]/20 dark:border-zinc-700 dark:bg-zinc-800"
                    />
                    <span>{t.auth.rememberMe}</span>
                  </label>

                  <a
                    href={`${siteConfig.links.whatsapp}?text=${encodeURIComponent(
                      "Halo Pengurus PUPCL, saya ingin menanyakan perihal reset kata sandi atau akses akun CodeLab."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#0047BA] transition-colors hover:underline dark:text-blue-400"
                  >
                    {t.auth.forgotPassword}
                  </a>
                </div>

                {/* Primary Action Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#0047BA] px-6 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#00388f] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-blue-600 dark:hover:bg-blue-500"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>{t.auth.submittingButton}</span>
                    </>
                  ) : (
                    <>
                      <span>{t.auth.submitButton}</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Bottom Support Link */}
            <div className="mx-auto mt-8 w-full max-w-md border-t border-slate-100 pt-5 text-xs text-slate-500 dark:border-zinc-800 dark:text-zinc-400">
              {t.auth.noAccountHelp}{" "}
              <a
                href={`${siteConfig.links.whatsapp}?text=${encodeURIComponent(
                  "Halo Pengurus PUPCL, saya mahasiswa President University Pekanbaru yang ingin bergabung dengan CodeLab."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#0047BA] hover:underline dark:text-blue-400"
              >
                {t.auth.contactAdmin}
              </a>
            </div>
          </section>
        </div>
      </div>

      {/* Subtle Copyright / Legal Footer */}
      <footer className="relative z-10 mx-auto mt-auto w-full max-w-5xl pt-4 text-center text-xs text-slate-400 dark:text-zinc-600">
        <p>&copy; {new Date().getFullYear()} PUPCL CodeLab &middot; President University Pekanbaru</p>
      </footer>
    </main>
  );
}
