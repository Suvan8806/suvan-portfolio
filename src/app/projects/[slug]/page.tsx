import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS, getProject } from "@/content/projects";
import { Container } from "@/components/ui";
import { AlsoShipped } from "@/components/projects/AlsoShipped";
import { DeepDiveGrid } from "@/components/projects/DeepDiveGrid";
import { DossierHeader } from "@/components/projects/DossierHeader";
import { GigNav } from "@/components/projects/GigNav";
import { LoadoutPanel } from "@/components/projects/LoadoutPanel";
import { MissionLog } from "@/components/projects/MissionLog";
import { NoteCallout } from "@/components/projects/NoteCallout";

type Props = { params: Promise<{ slug: string }> };

// Cache Components: dynamicParams is unsupported; unknown slugs hit notFound() below.
export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.name, description: project.pitch };
}

/** Neighbours in PROJECTS order, wrapping at both ends. */
function neighbours(slug: string) {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  const n = PROJECTS.length;
  return { prev: PROJECTS[(i - 1 + n) % n], next: PROJECTS[(i + 1) % n] };
}

export default async function ProjectDossierPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { prev, next } = neighbours(project.slug);

  return (
    <Container className="pb-24">
      <DossierHeader project={project} />

      <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10">
        <div className="flex min-w-0 flex-col gap-12 sm:gap-16">
          <div className="flex flex-col gap-6">
            <p className="max-w-[68ch] text-xl text-text">{project.pitch}</p>
            {project.note && <NoteCallout note={project.note} />}
          </div>
          <MissionLog highlights={project.highlights} />
          {project.deepDive && project.deepDive.length > 0 && <DeepDiveGrid items={project.deepDive} />}
          {project.alsoShipped && project.alsoShipped.length > 0 && (
            <AlsoShipped items={project.alsoShipped} />
          )}
        </div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <LoadoutPanel stack={project.stack} links={project.links} />
        </div>
      </div>

      <div className="mt-16">
        <GigNav prev={prev} next={next} />
      </div>
    </Container>
  );
}
