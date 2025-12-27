"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, DropdownMenu, Flex, Text, Box, Container, IconButton } from "@radix-ui/themes";
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
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                paddingTop: '1rem',
                display: 'flex',
                justifyContent: 'center',
                pointerEvents: 'none' // Allow clicking through empty space
            }}
        >
            <Box
                style={{
                    pointerEvents: 'auto',
                    width: '90%',
                    maxWidth: '1000px',
                    borderRadius: '9999px',
                    backgroundColor: scrolled ? "var(--color-panel-translucent)" : "rgba(255,255,255,0.05)", // Glass effect
                    backdropFilter: "blur(16px)",
                    border: "1px solid var(--gray-a4)",
                    boxShadow: scrolled ? "0 10px 30px -10px rgba(0,0,0,0.1)" : "none",
                    transition: "all 0.3s ease"
                }}
                px="4" py="2"
            >
                <Flex justify="between" align="center" style={{ height: '48px' }}>
                    {/* Logo Section */}
                    <Link href="/" className="no-underline">
                        <Flex align="center" gap="3" style={{ cursor: 'pointer' }}>
                            <Box style={{ borderRadius: "50%", overflow: "hidden", height: 36, width: 36, border: "2px solid var(--indigo-9)" }}>
                                <img src="/logo.jpeg" alt="PUPCL Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            </Box>
                            <Text size="3" weight="bold" style={{ color: "var(--gray-12)", letterSpacing: '-0.5px' }}>
                                PUPCL
                            </Text>
                        </Flex>
                    </Link>

                    {/* Desktop Navigation */}
                    <Flex gap="1" display={{ initial: "none", md: "flex" }} align="center" style={{ backgroundColor: "var(--gray-a3)", padding: '4px', borderRadius: "9999px" }}>
                        {navItems.map((item) => (
                            <Link key={item.href} href={item.href} className="no-underline">
                                <Box
                                    px="3" py="1"
                                    style={{
                                        borderRadius: "9999px",
                                        backgroundColor: pathname === item.href ? "var(--color-surface)" : "transparent",
                                        transition: "all 0.2s"
                                    }}
                                >
                                    <Text
                                        size="2"
                                        weight={pathname === item.href ? "medium" : "regular"}
                                        style={{ color: pathname === item.href ? "var(--gray-12)" : "var(--gray-10)" }}
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
                            <Button size="2" variant="solid" highContrast style={{ cursor: 'pointer', borderRadius: '9999px' }}>
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
                                <DropdownMenu.Content variant="soft" color="indigo">
                                    {navItems.map((item) => (
                                        <DropdownMenu.Item key={item.href} asChild>
                                            <Link href={item.href}>{item.name}</Link>
                                        </DropdownMenu.Item>
                                    ))}
                                    <DropdownMenu.Separator />
                                    <DropdownMenu.Item>Join Now</DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        </Box>
                    </Flex>
                </Flex>
            </Box>
        </Box>
    );
}
