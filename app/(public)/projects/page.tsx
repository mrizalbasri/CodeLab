import Link from "next/link";
import { ArrowRight, ExternalLink, FolderKanban } from "lucide-react";
import { Badge, Box, Card, Container, Flex, Heading, Text } from "@radix-ui/themes";
import { getPublishedProjects } from "@/app/actions";
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from "@/components/ui/scroll-reveal";

export default async function ProjectsPage() {
  const result = await getPublishedProjects();
  const projects = result.projects;

  return (
    <Box>
      <Box className="border-b border-neutral-200/70 bg-neutral-50/60 pb-16 pt-32 dark:border-neutral-800/80 dark:bg-neutral-950/60 sm:pb-20 sm:pt-40">
        <Container size="3" px="6">
          <ScrollReveal>
            <Flex direction="column" align="center" gap="4" className="text-center">
              <Badge size="2" color="indigo" variant="soft" radius="full">
                <FolderKanban size={14} />
                Project Showcase
              </Badge>
              <Heading size={{ initial: "7", md: "9" }} className="tracking-tight">
                Built by the community.
              </Heading>
              <Text size={{ initial: "3", sm: "4" }} color="gray" className="max-w-2xl leading-relaxed">
                Lihat karya yang sudah melewati review dan siap dibagikan oleh member PUPCL.
              </Text>
            </Flex>
          </ScrollReveal>
        </Container>
      </Box>

      <Container size="4" py={{ initial: "7", md: "9" }} px="6">
        {result.error ? (
          <ScrollReveal>
            <Box className="rounded-3xl border border-amber-200 bg-amber-50/70 px-6 py-16 text-center dark:border-amber-900/60 dark:bg-amber-950/20">
              <Flex direction="column" align="center" gap="3">
                <FolderKanban size={24} className="text-amber-700 dark:text-amber-400" />
                <Heading size="5">Showcase belum tersedia.</Heading>
                <Text size="2" color="gray" className="max-w-lg">
                  Koneksi Supabase belum tersedia atau migration project belum diterapkan. Coba lagi setelah konfigurasi backend selesai.
                </Text>
              </Flex>
            </Box>
          </ScrollReveal>
        ) : projects.length === 0 ? (
          <ScrollReveal>
            <Box className="rounded-3xl border border-dashed border-neutral-300 bg-neutral-50/70 px-6 py-16 text-center dark:border-neutral-700 dark:bg-neutral-900/50">
              <Flex direction="column" align="center" gap="3">
                <FolderKanban size={24} className="text-[#0047BA]" />
                <Heading size="5">Belum ada project published.</Heading>
                <Text size="2" color="gray" className="max-w-md">
                  Project member akan tampil di sini setelah disetujui admin.
                </Text>
                <Link href="/login" className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#0047BA] px-5 py-2.5 text-sm font-semibold text-white no-underline">
                  Upload project <ArrowRight size={14} />
                </Link>
              </Flex>
            </Box>
          </ScrollReveal>
        ) : (
          <ScrollStagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ScrollStaggerItem key={project.id}>
                <Card size="2" className="overflow-hidden h-full">
                  <Box className="h-44 overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={project.cover_url || "/logo.webp"} alt="" className="h-full w-full object-cover" />
                  </Box>
                  <Flex direction="column" gap="3" p="1">
                    <Box>
                      <Heading size="4">{project.title}</Heading>
                      <Text as="p" size="2" color="gray" className="mt-2 leading-relaxed">{project.summary}</Text>
                    </Box>
                    <Flex gap="2" wrap="wrap">
                      {project.tech_stack.map((tech) => <Badge key={tech} color="gray" variant="soft">{tech}</Badge>)}
                    </Flex>
                    <Flex justify="between" align="center" gap="3">
                      <Text size="1" color="gray">{project.owner?.full_name || "PUPCL Member"}</Text>
                      <Flex gap="2">
                        {project.demo_url && <Link href={project.demo_url} target="_blank" rel="noopener noreferrer" aria-label="Open demo"><ExternalLink size={16} /></Link>}
                        {project.repository_url && <Link href={project.repository_url} target="_blank" rel="noopener noreferrer" aria-label="Open repository"><FolderKanban size={16} /></Link>}
                      </Flex>
                    </Flex>
                  </Flex>
                </Card>
              </ScrollStaggerItem>
            ))}
          </ScrollStagger>
        )}
      </Container>
    </Box>
  );
}
