"use client";

import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { FolderKanban, Upload } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { createProject } from "@/app/actions";
import { MemberCardDisplay } from "@/components/MemberCardDisplay";
import { Profile, Project } from "@/lib/types";

interface MemberDashboardProps {
  profile: Profile;
  projects: Project[];
}

const statusLabels: Record<Project["status"], string> = {
  draft: "Draft",
  pending: "Menunggu Review",
  published: "Published",
  rejected: "Perlu Revisi",
};

export function MemberDashboard({ profile, projects }: MemberDashboardProps) {
  const [isPending, startTransition] = useTransition();

  const refreshProjects = async () => {
    window.location.reload();
  };

  return (
    <Container>
      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <Card size="2" className="h-fit">
          <Flex direction="column" align="center" gap="4">
            <Heading size="4">Member Card</Heading>
            <MemberCardDisplay
              name={profile.full_name}
              role={profile.division || "PUPCL Member"}
              division={profile.division || "Community"}
              batch={profile.batch || "PUPCL"}
              memberId={profile.member_id || `PUPCL-${profile.id.slice(0, 8).toUpperCase()}`}
              avatarUrl={profile.avatar_url || undefined}
              skills={profile.skills}
            />
          </Flex>
        </Card>

        <Flex direction="column" gap="6">
          <Box>
            <Badge color="indigo" variant="soft" radius="full">
              <FolderKanban size={13} />
              Member workspace
            </Badge>
            <Heading size={{ initial: "6", sm: "7" }} className="mt-3">
              Showcase your work.
            </Heading>
            <Text as="p" color="gray" className="mt-2 max-w-2xl leading-relaxed">
              Upload project yang sudah kamu buat. Project akan masuk review admin sebelum tampil di halaman publik.
            </Text>
          </Box>

          <Card size="2">
            <Heading size="4" mb="4">
              Submit project
            </Heading>
            <form
              action={(formData) => {
                startTransition(async () => {
                  try {
                    await createProject(formData);
                    toast.success("Project berhasil dikirim untuk review.");
                    await refreshProjects();
                  } catch (error) {
                    toast.error(error instanceof Error ? error.message : "Gagal mengirim project.");
                  }
                });
              }}
            >
              <Flex direction="column" gap="4">
                <Box>
                  <Text as="label" size="2" weight="bold">Project name</Text>
                  <TextField.Root name="title" placeholder="Contoh: Campus Event Hub" required />
                </Box>
                <Box>
                  <Text as="label" size="2" weight="bold">Short summary</Text>
                  <TextArea name="summary" placeholder="Jelaskan project dalam satu atau dua kalimat." required />
                </Box>
                <Box>
                  <Text as="label" size="2" weight="bold">Description</Text>
                  <TextArea name="description" placeholder="Masalah, solusi, dan kontribusimu." />
                </Box>
                <Box className="grid gap-4 sm:grid-cols-2">
                  <Box>
                    <Text as="label" size="2" weight="bold">Tech stack</Text>
                    <TextField.Root name="techStack" placeholder="Next.js, Supabase, TypeScript" />
                  </Box>
                  <Box>
                    <Text as="label" size="2" weight="bold">Cover image</Text>
                    <input name="cover" type="file" accept="image/*" className="mt-1 w-full text-sm" />
                  </Box>
                </Box>
                <Box className="grid gap-4 sm:grid-cols-2">
                  <Box>
                    <Text as="label" size="2" weight="bold">Demo URL</Text>
                    <TextField.Root name="demoUrl" type="url" placeholder="https://" />
                  </Box>
                  <Box>
                    <Text as="label" size="2" weight="bold">Repository URL</Text>
                    <TextField.Root name="repositoryUrl" type="url" placeholder="https://github.com/..." />
                  </Box>
                </Box>
                <Button type="submit" size="3" disabled={isPending} style={{ cursor: "pointer", backgroundColor: "#0047BA" }}>
                  <Upload size={16} />
                  {isPending ? "Mengirim..." : "Kirim untuk Review"}
                </Button>
              </Flex>
            </form>
          </Card>

          <Box>
            <Flex justify="between" align="center" mb="3">
              <Heading size="4">My projects</Heading>
              <Text size="2" color="gray">{projects.length} project</Text>
            </Flex>
            {projects.length === 0 ? (
              <Card size="2">
                <Text color="gray">Belum ada project. Upload karya pertamamu di form di atas.</Text>
              </Card>
            ) : (
              <Flex direction="column" gap="3">
                {projects.map((project) => (
                  <Card key={project.id} size="2">
                    <Flex justify="between" align="start" gap="4">
                      <Box>
                        <Heading size="3">{project.title}</Heading>
                        <Text as="p" size="2" color="gray" className="mt-1">{project.summary}</Text>
                      </Box>
                      <Badge color={project.status === "published" ? "green" : project.status === "rejected" ? "red" : "amber"} variant="soft">
                        {statusLabels[project.status]}
                      </Badge>
                    </Flex>
                    {project.rejection_reason && (
                      <Text as="p" size="2" color="red" className="mt-3">
                        Catatan admin: {project.rejection_reason}
                      </Text>
                    )}
                  </Card>
                ))}
              </Flex>
            )}
          </Box>
        </Flex>
      </div>
    </Container>
  );
}

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-8 sm:py-14">{children}</div>;
}
