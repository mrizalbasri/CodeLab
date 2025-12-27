"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, DropdownMenu, Flex, Text, Box, Container } from "@radix-ui/themes";
import { Menu, X, Laptop } from "lucide-react"; // Icons
import { useState } from "react";

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    // Link Items
    const navItems = [
        { name: "Beranda", href: "/" },
        { name: "Tentang Kami", href: "/about" },
        { name: "Program", href: "/programs" },
        { name: "Galeri", href: "/gallery" },
        { name: "Berita", href: "/news" },
        { name: "Kontak", href: "/contact" },
    ];

    return (
        <Box
            position="sticky"
            top="0"
            style={{
                zIndex: 100,
                backdropFilter: "blur(12px)",
                backgroundColor: "var(--color-background-alpha)", /* Fallback or custom variable */
                borderBottom: "1px solid var(--gray-4)"
            }}
            className="bg-slate-900/80 supports-[backdrop-filter]:bg-slate-900/50"
        >
            <Container size="4">
                <Flex justify="between" align="center" py="4" px="4">
                    {/* Logo Section */}
                    <Link href="/" passHref>
                        <Flex align="center" gap="2" className="cursor-pointer">
                            <Box p="2" style={{ backgroundColor: "var(--accent-9)", borderRadius: "8px" }}>
                                <Laptop color="white" size={20} />
                            </Box>
                            <Text size="4" weight="bold" style={{ color: "var(--gray-12)" }}>
                                TechClub
                            </Text>
                        </Flex>
                    </Link>

                    {/* Desktop Navigation */}
                    <Flex gap="6" display={{ initial: "none", md: "flex" }} align="center">
                        {navItems.map((item) => (
                            <Link key={item.href} href={item.href} className="no-underline">
                                <Text
                                    size="2"
                                    weight={pathname === item.href ? "medium" : "regular"}
                                    style={{
                                        color: pathname === item.href ? "var(--accent-11)" : "var(--gray-11)",
                                        transition: "color 0.2s"
                                    }}
                                    className="hover:text-[var(--accent-11)]"
                                >
                                    {item.name}
                                </Text>
                            </Link>
                        ))}
                        <Button variant="solid" highContrast style={{ cursor: 'pointer' }}>
                            Gabung Sekarang
                        </Button>
                    </Flex>

                    {/* Mobile Navigation (Dropdown) */}
                    <Box display={{ initial: "block", md: "none" }}>
                        <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
                            <DropdownMenu.Trigger>
                                <Button variant="ghost" color="gray">
                                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                                </Button>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content variant="soft" color="indigo">
                                {navItems.map((item) => (
                                    <DropdownMenu.Item key={item.href} asChild>
                                        <Link href={item.href}>{item.name}</Link>
                                    </DropdownMenu.Item>
                                ))}
                                <DropdownMenu.Separator />
                                <DropdownMenu.Item>
                                    Gabung Sekarang
                                </DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Root>
                    </Box>
                </Flex>
            </Container>
        </Box>
    );
}
