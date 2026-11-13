"use client";

import { Badge, Box, Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { Check, ExternalLink, X } from "lucide-react";
import { toast } from "sonner";
import { Project, reviewProject } from "@/app/actions";

interface ProjectsTabProps {
  projects: Project[];
  onRefresh: () => Promise<void>;
  startTransition: (callback: () => void) => void;
}

const statusLabels: Record<Project["status"], string> = {
  draft: "Draft",
  pending: "Menunggu Review",
  published: "Published",
  rejected: "Rejected",
};

export function ProjectsTab({ projects, onRefresh, startTransition }: ProjectsTabProps) {
  const handleReview = (project: Project, status: "published" | "rejected") => {
    const rejectionReason =
      status === "rejected"
        ? window.prompt("Catatan revisi untuk member:", project.rejection_reason || "")
        : undefined;

    if (status === "rejected" && rejectionReason === null) return;

    startTransition(async () => {
      try {
        await reviewProject(project.id, status, rejectionReason || undefined);
        await onRefresh();
        toast.success(status === "published" ? "Project dipublikasikan." : "Project dikembalikan untuk revisi.");
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Gagal memperbarui review project.");
      }
    });
  };

  return (
    <Flex direction="column" gap="4">
      <Box>
        <Heading size="5">Project submissions</Heading>
        <Text size="2" color="gray">
          Review project member sebelum tampil di halaman showcase publik.
        </Text>
      </Box>

      {projects.length === 0 ? (
        <Card>
          <Text color="gray">Belum ada project yang dikirim member.</Text>
        </Card>
      ) : (
        projects.map((project) => (
          <Card key={project.id} size="2">
            <Flex direction={{ initial: "column", sm: "row" }} justify="between" gap="5">
              <Box className="min-w-0 flex-1">
                <Flex align="center" gap="2" wrap="wrap">
                  <Heading size="4">{project.title}</Heading>
                  <Badge color={project.status === "published" ? "green" : project.status === "rejected" ? "red" : "amber"} variant="soft">
                    {statusLabels[project.status]}
                  </Badge>
                </Flex>
                <Text as="p" size="2" color="gray" className="mt-2">{project.summary}</Text>
                <Text as="p" size="1" color="gray" className="mt-2">
                  Oleh {project.owner?.full_name || "Member"}{project.owner?.member_id ? ` · ${project.owner.member_id}` : ""}
                </Text>
                <Flex gap="2" wrap="wrap" className="mt-3">
                  {project.tech_stack.map((tech) => <Badge key={tech} color="gray" variant="soft">{tech}</Badge>)}
                </Flex>
              </Box>

              <Flex align={{ initial: "start", sm: "center" }} gap="2" wrap="wrap">
                {project.demo_url && (
                  <Button asChild size="2" variant="soft" color="gray">
                    <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={14} /> Demo
                    </a>
                  </Button>
                )}
                {project.status !== "published" && (
                  <Button size="2" color="green" variant="soft" onClick={() => handleReview(project, "published")} style={{ cursor: "pointer" }}>
                    <Check size={14} /> Publish
                  </Button>
                )}
                {project.status !== "rejected" && (
                  <Button size="2" color="red" variant="soft" onClick={() => handleReview(project, "rejected")} style={{ cursor: "pointer" }}>
                    <X size={14} /> Reject
                  </Button>
                )}
              </Flex>
            </Flex>
          </Card>
        ))
      )}
    </Flex>
  );
}
