import { redirect } from "next/navigation";
import { Box, Heading } from "@radix-ui/themes";
import { getCurrentProfile, getMyProjects } from "@/app/actions";
import { MemberDashboard } from "@/components/dashboard/MemberDashboard";

export default async function DashboardPage() {
  const profile = await getCurrentProfile();

  if (!profile) {
    redirect("/login");
  }

  if (profile.role === "admin") {
    redirect("/admin");
  }

  const projects = await getMyProjects();

  return (
    <Box className="min-h-screen bg-neutral-50 pt-20 dark:bg-neutral-950">
      <div className="mx-auto max-w-6xl px-6 pt-8 sm:px-8">
        <Heading size="2" className="text-neutral-500">
          Member Dashboard
        </Heading>
      </div>
      <MemberDashboard profile={profile} projects={projects} />
    </Box>
  );
}
