import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter, Roboto_Mono } from "next/font/google";
import "@radix-ui/themes/styles.css";
import "./globals.css";
import { Theme } from "@radix-ui/themes";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { Analytics } from "@/components/Analytics";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CodeLab - President University Pekanbaru",
  description: "The official hub for young innovators and developers at President University Pekanbaru. Join us to learn, share, and build the future.",
  keywords: ["CodeLab", "PUPCL", "Coding Club", "Polytechnic", "Pekanbaru", "President University", "Programming", "Community", "Developer"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${robotoMono.variable} antialiased`}>
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
