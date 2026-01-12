"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <Box className="fixed-top flex-center" style={{ paddingTop: "1rem", pointerEvents: "none" }}>
      <Box
        className={`glass-navbar ${scrolled ? "glass-navbar-scrolled" : ""}`}
        px="4"
        py="2"
        style={{
          pointerEvents: "auto",
          width: "90%",
          maxWidth: "1000px",
        }}
      >
        <Flex justify="between" align="center" style={{ height: "48px" }}>
          {/* Logo Section */}
          <Link
            href="/"
            className="no-underline"
            style={{ textDecoration: "none" }}
          >
            <Flex align="center" gap="3" style={{ cursor: "pointer" }}>
              <Box className="logo-circle">
                <img
                  src="/logo.jpeg"
                  alt="PUPCL Logo"
                  className="logo-img"
                />
              </Box>
              <Text
                size="3"
                weight="bold"
                style={{ color: "var(--gray-12)", letterSpacing: "-0.5px" }}
              >
                PUPCL
              </Text>
            </Flex>
          </Link>

          {/* Desktop Navigation */}
          <Flex
            gap="1"
            display={{ initial: "none", md: "flex" }}
            align="center"
            className="nav-pill"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="no-underline"
                style={{ textDecoration: "none" }}
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
          <Flex gap="3" align="center">
            <ThemeToggle />

            <Box display={{ initial: "none", md: "block" }}>
              <Link href="/contact">
                <Button
                  size="2"
                  variant="solid"
                  highContrast
                  className="btn-primary-pill"
                >
                  Join Now
                </Button>
              </Link>
            </Box>

            {/* Mobile Burger */}
            <Box display={{ initial: "block", md: "none" }}>
              <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenu.Trigger>
                  <IconButton variant="ghost" color="gray" radius="full">
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                  </IconButton>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content variant="soft" color="indigo">
                  {navItems.map((item) => (
                    <DropdownMenu.Item key={item.href} asChild>
                      <Link href={item.href}>{item.name}</Link>
                    </DropdownMenu.Item>
                  ))}
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item asChild>
                    <Link href="/contact">Join Now</Link>
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
