"use client";

import Link from "next/link";
import NextImage from "next/image";
import { usePathname } from "next/navigation";
import {
  Flex,
  Text,
  Box,
  IconButton,
} from "@radix-ui/themes";
import {
  Menu,
  X,
  ArrowRight,
  Home,
  Users,
  Sparkles,
  LogIn,
  CalendarDays,
  BookOpen,
  FolderKanban,
} from "lucide-react";
import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "motion/react";

export function Navbar() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (pathname.startsWith("/admin")) {
    return null;
  }

  const navItems = [
    { name: t.nav.home, href: "/", icon: Home },
    { name: t.nav.programs, href: "/programs", icon: Sparkles },
    { name: t.nav.projects, href: "/projects", icon: FolderKanban },
    { name: t.nav.events, href: "/events", icon: CalendarDays },
    { name: t.nav.blog, href: "/blog", icon: BookOpen },
    { name: t.nav.about, href: "/about", icon: Users },
  ];

  return (
    <>
      <Box
        className="fixed-top flex-center"
        style={{ paddingTop: "1rem", pointerEvents: "none", zIndex: 100 }}
      >
        <Box
          className={`glass-navbar ${scrolled ? "glass-navbar-scrolled" : ""}`}
          px="4"
          py="2"
          style={{
            pointerEvents: "auto",
            width: "min(1120px, calc(100% - 32px))",
            position: "relative",
            zIndex: 100,
          }}
        >
          <Flex justify="between" align="center" style={{ height: "48px" }}>
            {/* Logo */}
            <Link
              href="/"
              prefetch
              onClick={() => setIsOpen(false)}
              className="no-underline"
              style={{
                textDecoration: "none",
              }}
              aria-label="CodeLab Home"
            >
              <Flex align="center" gap="2">
                <Box className="logo-circle">
                  <NextImage
                    src="/logo.jpeg"
                    alt="CodeLab Logo"
                    width={32}
                    height={32}
                    className="logo-img"
                  />
                </Box>
                <Text
                  size="3"
                  weight="bold"
                  style={{ color: "var(--gray-12)", letterSpacing: "-0.5px" }}
                >
                  CodeLab
                </Text>
              </Flex>
            </Link>

            <Flex
              gap="2"
              display={{ initial: "none", md: "flex" }}
              align="center"
              className="nav-pill"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch
                  onClick={() => setIsOpen(false)}
                  className="no-underline nav-button"
                  style={{
                    textDecoration: "none",
                  }}
                  aria-label={`Navigate to ${item.name}`}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  <Box
                    className={`nav-item ${pathname === item.href ? "nav-item-active" : ""}`}
                  >
                    <Text
                      size="2"
                      weight={pathname === item.href ? "medium" : "regular"}
                      style={{
                        color:
                          pathname === item.href
                            ? "var(--gray-12)"
                            : "var(--gray-10)",
                        position: "relative",
                        zIndex: 2,
                      }}
                      className="hover:text-[var(--gray-12)]"
                    >
                      {item.name}
                    </Text>
                  </Box>
                </Link>
              ))}
            </Flex>

            {/* Right Actions */}
            <Flex gap="2" align="center">
              <Box display={{ initial: "none", sm: "block" }}>
                <LanguageToggle />
              </Box>
              <Box display={{ initial: "none", sm: "block" }}>
                <ThemeToggle />
              </Box>

              <Box display={{ initial: "none", md: "block" }}>
                <Link
                  href="/login"
                  prefetch
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "7px 16px",
                    borderRadius: "9999px",
                    border: "1.5px solid var(--gray-6)",
                    background: "transparent",
                    color: "var(--gray-12)",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#0047BA";
                    e.currentTarget.style.color = "#0047BA";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--gray-6)";
                    e.currentTarget.style.color = "var(--gray-12)";
                  }}
                >
                  <LogIn size={14} />
                  {t.nav.login}
                </Link>
              </Box>

              {/* Mobile Burger */}
              <Box display={{ initial: "block", md: "none" }}>
                <IconButton
                  variant="ghost"
                  color="gray"
                  radius="full"
                  size="3"
                  onClick={() => setIsOpen(!isOpen)}
                  style={{ zIndex: 101, minWidth: "40px", minHeight: "40px" }}
                  aria-label={isOpen ? "Tutup menu" : "Buka menu"}
                >
                  {isOpen ? <X size={22} /> : <Menu size={22} />}
                </IconButton>
              </Box>
            </Flex>
          </Flex>
        </Box>
      </Box>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 110,
              background: "rgba(0, 0, 0, 0.45)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
            onClick={() => setIsOpen(false)}
            className="flex flex-col justify-start p-4 pt-6 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0, y: -24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -24, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: "100%",
                maxWidth: "460px",
                margin: "0 auto",
                backgroundColor: "var(--color-panel-solid)",
                border: "1px solid var(--gray-6)",
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.25)",
              }}
              className="rounded-3xl p-5 sm:p-6 flex flex-col overflow-y-auto max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drawer Header */}
              <Flex justify="between" align="center" pb="4" style={{ borderBottom: "1px solid var(--gray-5)" }}>
                <Flex align="center" gap="3">
                  <Box className="logo-circle">
                    <NextImage
                      src="/logo.jpeg"
                      alt="CodeLab Logo"
                      width={36}
                      height={36}
                      className="logo-img"
                    />
                  </Box>
                  <Flex direction="column">
                    <Text size="3" weight="bold" style={{ color: "var(--gray-12)" }}>
                      PU Pekanbaru Code Lab
                    </Text>
                    <Text size="1" color="gray">
                      Student Tech Community
                    </Text>
                  </Flex>
                </Flex>
                <IconButton
                  variant="soft"
                  color="gray"
                  radius="full"
                  size="2"
                  onClick={() => setIsOpen(false)}
                  aria-label="Tutup menu"
                  style={{ cursor: "pointer" }}
                >
                  <X size={18} />
                </IconButton>
              </Flex>

              <Flex direction="column" gap="2" py="4">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      prefetch
                      onClick={() => setIsOpen(false)}
                      className="w-full flex items-center justify-between p-3 rounded-2xl transition-all cursor-pointer text-left no-underline"
                      style={{
                        backgroundColor: isActive ? "var(--indigo-3)" : "var(--gray-2)",
                        color: isActive ? "var(--indigo-11)" : "var(--gray-12)",
                        border: isActive ? "1px solid var(--indigo-6)" : "1px solid transparent",
                      }}
                    >
                      <Flex align="center" gap="3">
                        <Box
                          p="2"
                          style={{
                            borderRadius: "10px",
                            backgroundColor: isActive ? "#0047BA" : "var(--gray-4)",
                            color: isActive ? "white" : "var(--gray-11)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Icon size={18} />
                        </Box>
                        <Text size="3" weight={isActive ? "bold" : "medium"}>
                          {item.name}
                        </Text>
                      </Flex>
                      {isActive && (
                        <Box
                          px="2"
                          py="1"
                          style={{
                            borderRadius: "9999px",
                            backgroundColor: "#0047BA",
                            color: "white",
                            fontSize: "11px",
                            fontWeight: "bold",
                          }}
                        >
                          Active
                        </Box>
                      )}
                    </Link>
                  );
                })}
              </Flex>

              {/* Preferences */}
              <Box pt="4" style={{ borderTop: "1px solid var(--gray-5)" }}>
                <Flex justify="between" align="center" mb="4">
                  <Text size="2" color="gray" weight="medium">
                    Preferensi Tampilan
                  </Text>
                  <Flex gap="2" align="center">
                    <LanguageToggle />
                    <ThemeToggle />
                  </Flex>
                </Flex>

                {/* Login CTA */}
                <Link
                  href="/login"
                  prefetch
                  className="w-full inline-flex items-center justify-center rounded-full py-3"
                  style={{
                    borderColor: "#0047BA",
                    color: "#0047BA",
                    fontWeight: 700,
                    marginBottom: "10px",
                    border: "1px solid #0047BA",
                    textDecoration: "none",
                  }}
                >
                  <LogIn size={16} style={{ marginRight: "6px" }} />
                  {t.nav.login}
                </Link>

                <Link
                  href="/contact"
                  prefetch
                  className="w-full inline-flex items-center justify-center rounded-full py-3 font-bold"
                  style={{
                    backgroundColor: "#0047BA",
                    color: "white",
                    textDecoration: "none",
                  }}
                >
                  {t.nav.joinNow} <ArrowRight size={18} style={{ marginLeft: "6px" }} />
                </Link>
              </Box>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
