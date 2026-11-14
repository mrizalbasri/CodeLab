"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button, Card, Container, Flex, Heading, Text } from "@radix-ui/themes";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";

interface RouteErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
  title?: string;
  description?: string;
}

export function RouteError({
  error,
  reset,
  title = "Terjadi kesalahan saat memuat halaman.",
  description = "Silakan coba lagi. Jika masalah berlanjut, hubungi pengurus PUPCL.",
}: RouteErrorProps) {
  useEffect(() => {
    console.error("Route error:", error);
  }, [error]);

  return (
    <Container size="2" px="6" py={{ initial: "8", md: "9" }}>
      <Card size="3">
        <Flex direction="column" align="center" gap="4" p={{ initial: "4", md: "6" }}>
          <Flex
            align="center"
            justify="center"
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              backgroundColor: "var(--red-3)",
              color: "var(--red-11)",
            }}
          >
            <AlertTriangle size={26} aria-hidden="true" />
          </Flex>

          <Heading size="6" align="center">
            {title}
          </Heading>

          <Text size="2" color="gray" align="center" style={{ maxWidth: 440 }}>
            {description}
          </Text>

          {error.digest ? (
            <Text size="1" color="gray" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
              Kode kesalahan: {error.digest}
            </Text>
          ) : null}

          <Flex gap="3" wrap="wrap" justify="center" mt="2">
            <Button size="3" onClick={reset} style={{ cursor: "pointer" }}>
              <RotateCcw size={16} />
              Coba lagi
            </Button>
            <Button asChild size="3" variant="soft" color="gray">
              <Link href="/">
                <Home size={16} />
                Kembali ke beranda
              </Link>
            </Button>
          </Flex>
        </Flex>
      </Card>
    </Container>
  );
}
