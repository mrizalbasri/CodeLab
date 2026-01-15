import { Container, Flex, Heading, Text, Button, Box } from "@radix-ui/themes";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <Flex direction="column" style={{ minHeight: "100vh", width: "100%" }}>
      <Navbar />
      <Box p="0" style={{ flex: 1, width: "100%" }}>
        <Container size="2">
          <Flex
            direction="column"
            align="center"
            justify="center"
            style={{ minHeight: "60vh" }}
            gap="4"
          >
            <Heading size="9" color="indigo">404</Heading>
            <Heading size="6">Halaman Tidak Ditemukan</Heading>
            <Text color="gray" align="center">
              Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
            </Text>
            <Button asChild size="3" variant="soft" mt="4">
              <Link href="/">Kembali ke Beranda</Link>
            </Button>
          </Flex>
        </Container>
      </Box>
      <Footer />
    </Flex>
  );
}
