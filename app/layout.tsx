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

export const metadata: Metadata = {
  title: "CodeLab - President University Pekanbaru",
  description: "The official hub for young innovators and developers at President University Pekanbaru. Join us to learn, share, and build the future.",
  keywords: ["CodeLab", "PUPCL", "Coding Club", "Polytechnic", "Pekanbaru", "President University", "Programming", "Community", "Developer"],
  icons: {
    icon: "/logo.jpeg",
    shortcut: "/logo.jpeg",
    apple: "/logo.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} ${jetbrainsMono.variable} antialiased`}>
        <ThemeProvider attribute="class">
          <Theme accentColor="indigo" grayColor="slate" radius="medium" scaling="100%">
            {children}
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
