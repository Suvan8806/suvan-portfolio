import { ProjectCard } from "@/components/ui";
import { PROJECTS } from "@/content/projects";
import { ArrowLink } from "./ArrowLink";
import { HomeSection } from "./HomeSection";

const FLAGSHIPS = PROJECTS.filter((p) => p.flagship);

/** The four flagship projects as horizontal dossier rows. */
export function FlagshipGigs() {
  return (
    <HomeSection
      id="flagship"
      title="Flagship gigs"
      sublabel="Featured"
      count={FLAGSHIPS.length}
      action={
        <ArrowLink href="/projects">Gig board · {PROJECTS.length}</ArrowLink>
      }
    >
      <ul className="flex flex-col gap-3">
        {FLAGSHIPS.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} variant="row" headingLevel="h3" />
          </li>
        ))}
      </ul>
    </HomeSection>
  );
}
