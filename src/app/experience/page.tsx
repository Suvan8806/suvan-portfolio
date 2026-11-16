import type { Metadata } from "next";
import { EducationBlock } from "@/components/experience/EducationBlock";
import { ExperienceIndex } from "@/components/experience/ExperienceIndex";
import { Timeline } from "@/components/experience/Timeline";
import { EDUCATION_ANCHOR } from "@/components/experience/anchors";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { EXPERIENCE } from "@/content/experience";

export const metadata: Metadata = {
  title: "Experience",
  description: "Job log: the roles I have held and what I built in each.",
};

export default function ExperiencePage() {
  return (
    <Container className="pb-24">
      <PageHeader title="Job log" kicker="Quest journal" readout={`Entries ${EXPERIENCE.length}`} />

      <div className="mt-10 grid gap-10 lg:mt-12 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12">
        <aside className="hidden lg:block">
          <ExperienceIndex />
        </aside>

        <div className="min-w-0">
          <Timeline entries={EXPERIENCE} />
          <div className="mt-16">
            <EducationBlock id={EDUCATION_ANCHOR} />
          </div>
        </div>
      </div>
    </Container>
  );
}
