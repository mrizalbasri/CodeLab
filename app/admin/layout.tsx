import { Theme, Box } from "@radix-ui/themes";
import { ThemeProvider } from "next-themes";
import "@radix-ui/themes/styles.css";
import "../globals.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class">
          <Theme
            accentColor="indigo"
            grayColor="slate"
            radius="medium"
            scaling="100%"
          >
            <Box style={{ minHeight: "100vh", width: "100%" }}>{children}</Box>
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  );
}
