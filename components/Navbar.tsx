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
import { Menu, X, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
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

  // Link Items
  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Programs", href: "/programs" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
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
            width: "90%",
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
            <Flex gap="3" align="center">
              <ThemeToggle />

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
                  Join Now
                </Button>
              </Box>

              {/* Mobile Burger */}
              <Box display={{ initial: "block", md: "none" }}>
                <IconButton 
                  variant="ghost" 
                  color="gray" 
                  radius="full"
                  onClick={() => setIsOpen(!isOpen)}
                  style={{ zIndex: 101 }}
                >
                  {isOpen ? <X size={20} /> : <Menu size={20} />}
                </IconButton>
              </Box>
            </Flex>
          </Flex>
        </Box>
      </Box>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 90,
              background: "var(--color-background)",
            }}
            className="bg-white/95 dark:bg-black/95 flex flex-col items-center justify-center"
          >
             {/* Gradient Background Effect */}
             <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
                <div className="absolute top-[-20%] left-[-20%] w-[500px] h-[500px] bg-indigo-500 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-20%] w-[500px] h-[500px] bg-purple-500 rounded-full blur-[120px]" />
             </div>

            <Flex 
              direction="column" 
              align="center" 
              gap="8" 
              style={{ position: "relative", zIndex: 2, width: "100%" }}
            >
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.1 + (i * 0.1), duration: 0.4, ease: "easeOut" }}
                >
                  <Text 
                    size="8" 
                    weight="bold" 
                    className="cursor-pointer hover:text-indigo-500 transition-colors tracking-tight"
                    onClick={() => handleNavigation(item.href)}
                    style={{ 
                      color: pathname === item.href ? "var(--indigo-9)" : "var(--gray-12)" 
                    }}
                  >
                    {item.name}
                  </Text>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.6 }}
                style={{ marginTop: "2rem" }}
              >
                <Button 
                  size="4" 
                  variant="classic" 
                  radius="full"
                  className="px-8"
                  onClick={() => handleNavigation("/contact")}
                >
                  Join CodeLab <ArrowRight size={18} style={{ marginLeft: "8px" }}/>
                </Button>
              </motion.div>
            </Flex>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
