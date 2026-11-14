import { Box, Container, Flex } from "@radix-ui/themes";

export default function PublicLoading() {
  return (
    <Box role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">Memuat halaman…</span>

      <Box className="border-b border-neutral-200/70 bg-neutral-50/60 pb-16 pt-32 dark:border-neutral-800/80 dark:bg-neutral-950/60 sm:pb-20 sm:pt-40">
        <Container size="3" px="6">
          <Flex direction="column" align="center" gap="4" className="animate-pulse">
            <div className="h-6 w-36 rounded-full bg-neutral-200 dark:bg-neutral-800" />
            <div className="h-10 w-full max-w-xl rounded-lg bg-neutral-200 dark:bg-neutral-800" />
            <div className="h-4 w-full max-w-md rounded bg-neutral-200 dark:bg-neutral-800" />
          </Flex>
        </Container>
      </Box>

      <Container size="4" py={{ initial: "7", md: "9" }} px="6">
        <div className="grid animate-pulse gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-3xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="mb-4 h-40 w-full rounded-2xl bg-neutral-200 dark:bg-neutral-800" />
              <div className="mb-2 h-4 w-3/4 rounded bg-neutral-200 dark:bg-neutral-800" />
              <div className="h-3 w-full rounded bg-neutral-200/70 dark:bg-neutral-800/70" />
            </div>
          ))}
        </div>
      </Container>
    </Box>
  );
}
