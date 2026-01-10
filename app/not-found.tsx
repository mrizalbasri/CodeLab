import { Container, Flex, Heading, Text, Button } from "@radix-ui/themes";
import Link from "next/link";

export default function NotFound() {
  return (
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
  );
}
