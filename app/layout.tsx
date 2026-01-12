import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "@radix-ui/themes/styles.css";
import "./globals.css";
import { Theme, Box, Flex } from "@radix-ui/themes";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
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
  title: "PUPCL - PU Pekanbaru Code Lab",
  description: "Official community website for Polytechnic Computer Club at President University Pekanbaru. A place to learn, build, and innovate together.",
  keywords: ["PUPCL", "Coding Club", "Polytechnic", "Pekanbaru", "President University", "Programming", "Community"],
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
            <Flex direction="column" style={{ minHeight: "100vh", width: "100%" }}>
              <Navbar />
              <Box p="0" style={{ flex: 1, width: "100%" }}>
                {children}
              </Box>
              <Footer />
            </Flex>
            <Toaster position="top-center" />
            <Analytics />
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  );
}
