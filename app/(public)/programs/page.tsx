import { getPublicPrograms } from "@/lib/data/public-content";
import { ProgramsSection } from "@/components/programs/ProgramsSection";

export const revalidate = 300;

export default async function ProgramsPage() {
  const programs = await getPublicPrograms();

  return <ProgramsSection initialPrograms={programs} />;
}
