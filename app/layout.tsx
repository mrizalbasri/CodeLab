import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google"; // Use premium fonts
import "@radix-ui/themes/styles.css";
import "./globals.css";
import { Theme, Box } from "@radix-ui/themes";
import { Navbar } from "@/components/Navbar";

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
  title: "Club Website",
  description: "Official website for the club",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${robotoMono.variable} antialiased`}
      >
        <Theme appearance="dark" accentColor="indigo" grayColor="slate" radius="medium" scaling="100%">
          <Navbar />
          <Box p="0" style={{ minHeight: "100vh" }}>
            {children}
          </Box>
        </Theme>
      </body>
    </html>
  );
}
