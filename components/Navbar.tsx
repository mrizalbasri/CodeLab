"use client";

import Link from "next/link";
import NextImage from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Button,
  DropdownMenu,
  Flex,
  Text,
  Box,
  IconButton,
} from "@radix-ui/themes";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";

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

  // Handle navigation with loading state
  const handleNavigation = (href: string) => {
    if (href === pathname) return;
    
    setIsNavigating(true);
    setIsOpen(false);
    
    router.push(href);
    // Reset navigation state shortly after push
    // The delay here is just for the visual "press" effect to finish if needed, 
    // but the navigation itself happens immediately now.
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
    // { name: "News", href: "/news" }, // Hidden for cleaner look as requested implicitly by "less monotony"
    { name: "Contact", href: "/contact" },
  ];

  return (
    <Box
      className="fixed-top flex-center"
      style={{ paddingTop: "1rem", pointerEvents: "none" }}
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
              <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenu.Trigger>
                  <IconButton variant="ghost" color="gray" radius="full">
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                  </IconButton>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content variant="soft" color="indigo" className="mobile-dropdown">
                  {navItems.map((item) => (
                    <DropdownMenu.Item 
                      key={item.href} 
                      onSelect={() => handleNavigation(item.href)}
                      className="mobile-nav-item"
                    >
                      {item.name}
                    </DropdownMenu.Item>
                  ))}
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item 
                    onSelect={() => handleNavigation("/contact")}
                    className="mobile-nav-item"
                  >
                    Join Now
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}
