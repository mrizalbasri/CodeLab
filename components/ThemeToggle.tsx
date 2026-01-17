"use client";

import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return (
        <AnimatedThemeToggler className="rounded-full p-2 hover:bg-[var(--gray-a3)] transition-colors" />
    );
}
