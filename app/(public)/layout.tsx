import { Box, Flex } from "@radix-ui/themes";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex direction="column" style={{ minHeight: "100vh", width: "100%" }}>
      <Navbar />
      <Box p="0" style={{ flex: 1, width: "100%" }}>
        {children}
      </Box>
      <Footer />
      <ScrollToTop />
    </Flex>
  );
}
