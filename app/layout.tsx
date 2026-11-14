import type { Metadata } from "next";
import { Suspense } from "react";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "@radix-ui/themes/styles.css";
import "./globals.css";
import { Theme } from "@radix-ui/themes";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { Analytics } from "@/components/Analytics";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

import { siteConfig } from "@/lib/data/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "CodeLab - President University Pekanbaru",
    template: "%s | PUPCL",
  },
  description: "The coding and tech community for students at President University Pekanbaru. Join us to learn, share, and build the future.",
  keywords: ["CodeLab", "PUPCL", "Coding Club", "Polytechnic", "Pekanbaru", "President University", "Programming", "Community", "Developer"],
  authors: [{ name: "PUPCL" }],
  creator: "President University Pekanbaru Code Lab",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName: siteConfig.name,
    title: "CodeLab - President University Pekanbaru",
    description: "The coding and tech community for students at President University Pekanbaru. Join us to learn, share, and build the future.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeLab - President University Pekanbaru",
    description: "The coding and tech community for students at President University Pekanbaru. Join us to learn, share, and build the future.",
  },
  icons: {
    icon: "/logo.webp",
    shortcut: "/logo.webp",
    apple: "/logo.webp",
  },
};

import { LanguageProvider } from "@/context/LanguageContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} ${jetbrainsMono.variable} antialiased`}>
        <ThemeProvider attribute="class">
          <Theme accentColor="blue" grayColor="slate" radius="medium" scaling="100%">
            <LanguageProvider>
              {children}
            </LanguageProvider>
            <Toaster position="top-center" />
            <Suspense fallback={null}>
              <Analytics />
            </Suspense>
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  );
}
