"use client";

import Link from "next/link";
import NextImage from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Button,
  Flex,
  Text,
  Box,
  IconButton,
} from "@radix-ui/themes";
import { Menu, X, ArrowRight, Home, Users, Sparkles, Image as ImageIcon, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  // Handle navigation with loading state
  const handleNavigation = (href: string) => {
    if (href === pathname) {
        setIsOpen(false);
        return;
    }
    
    setIsNavigating(true);
    setIsOpen(false);
    
    router.push(href);
    // Reset navigation state shortly after push
    setTimeout(() => setIsNavigating(false), 300);
  };

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent, href: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleNavigation(href);
    }
  };

  // Hide navbar on admin pages
  if (pathname.startsWith("/admin")) {
    return null;
  }

  // Link Items with icons for mobile
  const navItems = [
    { name: t.nav.home, href: "/", icon: Home },
    { name: t.nav.about, href: "/about", icon: Users },
    { name: t.nav.programs, href: "/programs", icon: Sparkles },
    { name: t.nav.gallery, href: "/gallery", icon: ImageIcon },
    { name: t.nav.contact, href: "/contact", icon: Mail },
  ];

  return (
    <>
      <Box
        className="fixed-top flex-center"
        style={{ paddingTop: "1rem", pointerEvents: "none", zIndex: 100 }}
      >
        <Box
          className={`glass-navbar ${scrolled ? "glass-navbar-scrolled" : ""} ${isNavigating ? "navbar-navigating" : ""}`}
          px="4"
          py="2"
          style={{
            pointerEvents: "auto",
            width: "92%",
            maxWidth: "1000px",
            transform: isNavigating ? "scale(0.98)" : "scale(1)",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            position: "relative",
            zIndex: 100
          }}
        >
          {/* Loading bar */}
          <div className="nav-loading-bar" />
          
          <Flex justify="between" align="center" style={{ height: "48px" }}>
            {/* Logo Section */}
            <button
              onClick={() => handleNavigation("/")}
              onKeyDown={(e) => handleKeyDown(e, "/")}
              className="no-underline"
              style={{ 
                textDecoration: "none", 
                background: "none", 
                border: "none", 
                cursor: "pointer",
                transition: "transform 0.2s ease"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              aria-label="CodeLab Home"
            >
              <Flex align="center" gap="3" style={{ cursor: "pointer" }}>
                <Box className="logo-circle">
                  <NextImage
                    src="/logo.jpeg"
                    alt="CodeLab Logo"
                    width={36}
                    height={36}
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
            </button>

            {/* Desktop Navigation */}
            <Flex
              gap="1"
              display={{ initial: "none", md: "flex" }}
              align="center"
              className="nav-pill"
            >
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavigation(item.href)}
                  onKeyDown={(e) => handleKeyDown(e, item.href)}
                  className="no-underline nav-button"
                  style={{ 
                    textDecoration: "none", 
                    background: "none", 
                    border: "none", 
                    cursor: "pointer"
                  }}
                  aria-label={`Navigate to ${item.name}`}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  <Box
                    className={`nav-item ${pathname === item.href ? "nav-item-active" : ""} ${isNavigating ? "nav-item-loading" : ""}`}
                    style={{ 
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      position: "relative",
                      overflow: "hidden"
                    }}
                  >
                    <Text
                      size="2"
                      weight={pathname === item.href ? "medium" : "regular"}
                      style={{
                        color:
                          pathname === item.href
                            ? "var(--gray-12)"
                            : "var(--gray-10)",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        position: "relative",
                        zIndex: 2
                      }}
                      className="hover:text-[var(--gray-12)]"
                    >
                      {item.name}
                    </Text>
                    {/* Ripple effect */}
                    <div className="nav-ripple" />
                  </Box>
                </button>
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
                <Button
                  size="2"
                  variant="solid"
                  highContrast
                  radius="full"
                  className="btn-primary-pill"
                  onClick={() => handleNavigation("/contact")}
                  style={{
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    transform: isNavigating ? "scale(0.95)" : "scale(1)"
                  }}
                >
                  {t.nav.joinNow}
                </Button>
              </Box>

              {/* Mobile Burger Button */}
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

      {/* Mobile Drawer Overlay */}
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
              {/* Top Drawer Header */}
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

              {/* Navigation Links */}
              <Flex direction="column" gap="2" py="4">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <button
                      key={item.href}
                      onClick={() => handleNavigation(item.href)}
                      className="w-full flex items-center justify-between p-3 rounded-2xl transition-all cursor-pointer text-left"
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
                            backgroundColor: isActive ? "var(--indigo-9)" : "var(--gray-4)",
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
                            backgroundColor: "var(--indigo-9)",
                            color: "white",
                            fontSize: "11px",
                            fontWeight: "bold",
                          }}
                        >
                          Active
                        </Box>
                      )}
                    </button>
                  );
                })}
              </Flex>

              {/* Preferences Row (Language & Theme) */}
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

                {/* Thumb-friendly CTA Button */}
                <Button
                  size="3"
                  variant="solid"
                  radius="large"
                  className="w-full py-3 font-bold"
                  style={{
                    backgroundColor: "#0047BA",
                    color: "white",
                    cursor: "pointer",
                  }}
                  onClick={() => handleNavigation("/contact")}
                >
                  {t.nav.joinNow} <ArrowRight size={18} style={{ marginLeft: "6px" }} />
                </Button>
              </Box>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
