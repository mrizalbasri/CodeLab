"use client";

import { IconButton } from "@radix-ui/themes";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return (
        <IconButton
            variant="ghost"
            color="gray"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            style={{ cursor: 'pointer' }}
        >
            {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
        </IconButton>
    );
}
