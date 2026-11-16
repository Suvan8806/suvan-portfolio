import type { Metadata } from "next";
import { PROJECTS, PROJECT_CATEGORIES } from "@/content/projects";
import { Container, PageHeader } from "@/components/ui";
import { GigBoard } from "@/components/projects/GigBoard";

const FLAGSHIP_COUNT = PROJECTS.filter((p) => p.flagship).length;

export const metadata: Metadata = {
  title: "Projects",
  description: `${PROJECTS.length} projects: ${PROJECT_CATEGORIES.join(", ")}.`,
};

export default function ProjectsPage() {
  return (
    <Container className="pb-24">
      <PageHeader
        title="Gig board"
        readout={`GIGS ${PROJECTS.length} · FLAGSHIP ${FLAGSHIP_COUNT}`}
        subtitle="My flagship builds, the ones I'd show you first, sit up top. Everything else I've shipped is below them, and you can filter the whole board by category."
      />
      <GigBoard />
    </Container>
  );
}
