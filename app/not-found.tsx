import { Container, Flex, Heading, Text, Button, Box } from "@radix-ui/themes";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Meteors } from "@/components/ui/meteors";

export default function NotFound() {
  return (
    <Flex direction="column" style={{ minHeight: "100vh", width: "100%" }}>
      <Navbar />
      <Box 
        p="0" 
        style={{ flex: 1, width: "100%", position: "relative", overflow: "hidden" }}
        className="bg-gray-950" 
      >
        <Meteors number={30} />
        
        <Container size="2" px="4" style={{ position: "relative", zIndex: 10 }}>
          <Flex
            direction="column"
            align="center"
            justify="center"
            style={{ minHeight: "60vh" }}
            gap="4"
          >
            <Heading size={{ initial: "8", md: "9" }} className="text-indigo-500 font-bold tracking-tighter shadow-xl">
              404
            </Heading>
            <Heading size="6" className="text-gray-200">
              Halaman Tidak Ditemukan
            </Heading>
            <Text align="center" className="text-gray-400 max-w-md">
              Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan. 
              Mungkin tersesat di antariksa?
            </Text>
            <Button asChild size="3" variant="soft" mt="4" className="cursor-pointer hover:bg-indigo-500/20">
              <Link href="/">Kembali ke Bumi (Beranda)</Link>
            </Button>
          </Flex>
        </Container>
      </Box>
      <Footer />
    </Flex>
  );
}
