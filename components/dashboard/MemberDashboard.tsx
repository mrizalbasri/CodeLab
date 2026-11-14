"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
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
import { toast } from "sonner";
import { createProject } from "@/app/actions";
import { MemberCardDisplay } from "@/components/MemberCardDisplay";
import { ProfileEditForm } from "@/components/dashboard/ProfileEditForm";
import { useLanguage } from "@/context/LanguageContext";
import { Profile, Project, ProjectStatus } from "@/lib/types";

interface MemberDashboardProps {
  profile: Profile;
  projects: Project[];
}

const statusColor: Record<ProjectStatus, "green" | "red" | "amber" | "gray"> = {
  draft: "gray",
  pending: "amber",
  published: "green",
  rejected: "red",
};

export function MemberDashboard({ profile, projects }: MemberDashboardProps) {
  const [isPending, startTransition] = useTransition();
  const [profileUrl, setProfileUrl] = useState<string | undefined>();
  const { t } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    setProfileUrl(`${window.location.origin}/members/${profile.id}`);
  }, [profile.id]);

  const statusLabels: Record<ProjectStatus, string> = {
    draft: t.dashboard.statusDraft,
    pending: t.dashboard.statusPending,
    published: t.dashboard.statusPublished,
    rejected: t.dashboard.statusRejected,
  };

  return (
    <Container>
      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <Flex direction="column" gap="6">
          <Card size="2" className="h-fit">
            <Flex direction="column" align="center" gap="4">
              <Heading size="4">{t.dashboard.memberCardTitle}</Heading>
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
          </Card>

          <ProfileEditForm profile={profile} />
        </Flex>

        <Flex direction="column" gap="6">
          <Box>
            <Badge color="indigo" variant="soft" radius="full">
              <FolderKanban size={13} />
              {t.dashboard.workspaceBadge}
            </Badge>
            <Heading size={{ initial: "6", sm: "7" }} className="mt-3">
              {t.dashboard.showcaseHeadline}
            </Heading>
            <Text as="p" color="gray" className="mt-2 max-w-2xl leading-relaxed">
              {t.dashboard.showcaseBody}
            </Text>
          </Box>

          <Card size="2">
            <Heading size="4" mb="4">
              {t.dashboard.submitProjectTitle}
            </Heading>
            <form
              action={(formData) => {
                startTransition(async () => {
                  try {
                    await createProject(formData);
                    toast.success(t.dashboard.projectSentToast);
                    router.refresh();
                  } catch (error) {
                    toast.error(
                      error instanceof Error
                        ? error.message
                        : t.dashboard.projectSendErrorToast,
                    );
                  }
                });
              }}
            >
              <Flex direction="column" gap="4">
                <Box>
                  <Text as="label" size="2" weight="bold">
                    {t.dashboard.projectNameLabel}
                  </Text>
                  <TextField.Root
                    name="title"
                    placeholder={t.dashboard.projectNamePlaceholder}
                    required
                  />
                </Box>
                <Box>
                  <Text as="label" size="2" weight="bold">
                    {t.dashboard.summaryLabel}
                  </Text>
                  <TextArea
                    name="summary"
                    placeholder={t.dashboard.summaryPlaceholder}
                    required
                  />
                </Box>
                <Box>
                  <Text as="label" size="2" weight="bold">
                    {t.dashboard.descriptionLabel}
                  </Text>
                  <TextArea
                    name="description"
                    placeholder={t.dashboard.descriptionPlaceholder}
                  />
                </Box>
                <Box className="grid gap-4 sm:grid-cols-2">
                  <Box>
                    <Text as="label" size="2" weight="bold">
                      {t.dashboard.techStackLabel}
                    </Text>
                    <TextField.Root
                      name="techStack"
                      placeholder={t.dashboard.techStackPlaceholder}
                    />
                  </Box>
                  <Box>
                    <Text as="label" size="2" weight="bold">
                      {t.dashboard.coverImageLabel}
                    </Text>
                    <input name="cover" type="file" accept="image/*" className="mt-1 w-full text-sm" />
                  </Box>
                </Box>
                <Box className="grid gap-4 sm:grid-cols-2">
                  <Box>
                    <Text as="label" size="2" weight="bold">
                      {t.dashboard.demoUrlLabel}
                    </Text>
                    <TextField.Root name="demoUrl" type="url" placeholder="https://" />
                  </Box>
                  <Box>
                    <Text as="label" size="2" weight="bold">
                      {t.dashboard.repoUrlLabel}
                    </Text>
                    <TextField.Root name="repositoryUrl" type="url" placeholder="https://github.com/..." />
                  </Box>
                </Box>
                <Button type="submit" size="3" disabled={isPending} style={{ cursor: "pointer", backgroundColor: "#0047BA" }}>
                  <Upload size={16} />
                  {isPending ? t.dashboard.sending : t.dashboard.sendForReview}
                </Button>
              </Flex>
            </form>
          </Card>

          <Box>
            <Flex justify="between" align="center" mb="3">
              <Heading size="4">{t.dashboard.myProjects}</Heading>
              <Text size="2" color="gray">
                {projects.length}{" "}
                {projects.length === 1
                  ? t.dashboard.projectCount
                  : t.dashboard.projectCountPlural}
              </Text>
            </Flex>
            {projects.length === 0 ? (
              <Card size="2">
                <Text color="gray">{t.dashboard.noProjects}</Text>
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
                      <Badge color={statusColor[project.status]} variant="soft">
                        {statusLabels[project.status]}
                      </Badge>
                    </Flex>
                    {project.rejection_reason && (
                      <Text as="p" size="2" color="red" className="mt-3">
                        {t.dashboard.adminNotePrefix} {project.rejection_reason}
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
