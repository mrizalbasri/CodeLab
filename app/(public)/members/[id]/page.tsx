import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { ExternalLink, FolderKanban } from "lucide-react";
import { Badge, Box, Card, Container, Flex, Heading, Text } from "@radix-ui/themes";
import { getPublicMemberProfile } from "@/app/actions";
import { MemberCardDisplay } from "@/components/MemberCardDisplay";
import { Project } from "@/lib/types";

interface MemberPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: MemberPageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const { profile } = await getPublicMemberProfile(id);
    if (!profile) {
      return {
        title: "Member Not Found",
        description: "Profil member tidak ditemukan.",
      };
    }

    const title = `${profile.full_name} (${profile.division || "Member"})`;
    const details = [profile.division, profile.batch].filter(Boolean).join(" · ");
    const description = details
      ? `${profile.full_name} - ${details} di President University Pekanbaru Code Lab.`
      : `Profil member ${profile.full_name} di PUPCL.`;

    return {
      title,
      description,
      openGraph: {
        title: `${title} | PUPCL`,
        description,
        type: "profile",
        images: profile.avatar_url
          ? [{ url: profile.avatar_url, alt: profile.full_name }]
          : undefined,
      },
      twitter: {
        card: "summary",
        title: `${title} | PUPCL`,
        description,
        images: profile.avatar_url ? [profile.avatar_url] : undefined,
      },
    };
  } catch {
    return {
      title: "Member Profile",
      description: "Profil member President University Pekanbaru Code Lab.",
    };
  }
}

export default async function MemberPage({ params }: MemberPageProps) {
  const { id } = await params;
  const { profile, projects } = await getPublicMemberProfile(id);

  if (!profile) {
    notFound();
  }

  const headersList = await headers();
  const host = headersList.get("x-forwarded-host") ?? headersList.get("host") ?? "localhost:3000";
  const protocol = headersList.get("x-forwarded-proto") ?? "http";
  const profileUrl = `${protocol}://${host}/members/${profile.id}`;

  return (
    <Box>
      <Box className="border-b border-neutral-200/70 bg-neutral-50/60 pb-16 pt-32 dark:border-neutral-800/80 dark:bg-neutral-950/60 sm:pb-20 sm:pt-40">
        <Container size="3" px="6">
          <Flex direction="column" align="center" gap="4" className="text-center">
            <Badge size="2" color="indigo" variant="soft" radius="full">
              <FolderKanban size={14} />
              PUPCL Member
            </Badge>
            <Heading size={{ initial: "7", md: "8" }} className="tracking-tight">
              {profile.full_name}
            </Heading>
            <Text size={{ initial: "3", sm: "4" }} color="gray">
              {[profile.division, profile.batch].filter(Boolean).join(" · ")}
            </Text>
          </Flex>
        </Container>
      </Box>

      <Container size="4" py={{ initial: "7", md: "9" }} px="6">
        <Flex direction="column" align="center" gap="6" mb="8">
          <MemberCardDisplay
            name={profile.full_name}
            role={profile.division || "PUPCL Member"}
            division={profile.division || "Community"}
            batch={profile.batch || "PUPCL"}
            memberId={profile.member_id || `PUPCL-${profile.id.slice(0, 8).toUpperCase()}`}
            avatarUrl={profile.avatar_url || undefined}
            skills={profile.skills}
            profileUrl={profileUrl}
          />
        </Flex>

        <Heading size="5" mb="4">
          Published projects
        </Heading>
        {projects.length === 0 ? (
          <Box className="rounded-3xl border border-dashed border-neutral-300 bg-neutral-50/70 px-6 py-16 text-center dark:border-neutral-700 dark:bg-neutral-900/50">
            <Flex direction="column" align="center" gap="3">
              <FolderKanban size={24} className="text-[#0047BA]" />
              <Heading size="5">Belum ada project published.</Heading>
              <Text size="2" color="gray" className="max-w-md">
                Project member ini akan tampil di sini setelah disetujui admin.
              </Text>
            </Flex>
          </Box>
        ) : (
          <ProjectGrid projects={projects} />
        )}
      </Container>
    </Box>
  );
}

function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Card key={project.id} size="2" className="overflow-hidden">
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
                {project.demo_url && (
                  <a href={project.demo_url} target="_blank" rel="noopener noreferrer" aria-label="Open demo">
                    <ExternalLink size={16} />
                  </a>
                )}
                {project.repository_url && (
                  <a href={project.repository_url} target="_blank" rel="noopener noreferrer" aria-label="Open repository">
                    <FolderKanban size={16} />
                  </a>
                )}
              </Flex>
            </Flex>
          </Flex>
        </Card>
      ))}
    </div>
  );
}
