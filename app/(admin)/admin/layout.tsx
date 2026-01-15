"use client";

import { Theme, Box } from "@radix-ui/themes";
import { ThemeProvider } from "next-themes";
import "@radix-ui/themes/styles.css";


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" enableSystem defaultTheme="system">
      <Theme
        accentColor="indigo"
        grayColor="slate"
        radius="medium"
        scaling="100%"
      >
        <Box style={{ minHeight: "100vh", width: "100%" }}>{children}</Box>
      </Theme>
    </ThemeProvider>
  );
}
