import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AwardsList } from "@/components/about/AwardsList";
import { EducationList } from "@/components/about/EducationList";
import { IdCard } from "@/components/about/IdCard";
import { AvailabilityList } from "@/components/contact/AvailabilityList";
import {
  AVAILABILITY,
  AWARDS,
  BIO,
  COURSEWORK,
  EDUCATION,
  HPML_RESEARCH,
  PROFILE,
} from "@/content/profile";
import { ChipList, Container, PageHeader, Panel, SectionLabel } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description: BIO[0],
};

export default function AboutPage() {
  const [lead, ...rest] = BIO;
  return (
    <Container>
      <PageHeader
        title="Personal file"
        readout={`Awards ${AWARDS.length} · Courses ${COURSEWORK.length}`}
      />

      <div className="mt-10 grid gap-12 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-14">
        <IdCard className="animate-rise lg:self-start" />

        <div className="min-w-0">
          <Section id="bio" title="Bio" sublabel={`Subject // ${PROFILE.name}`} first>
            <div className="prose-cp">
              <p className="text-xl">{lead}</p>
              {rest.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Section>

          <Section id="education" title="Education" sublabel="Training records" count={EDUCATION.length}>
            <EducationList />
          </Section>

          <Section id="awards" title="Awards" sublabel="Commendations" count={AWARDS.length}>
            <AwardsList />
          </Section>

          <section aria-labelledby="research" className="mt-16 scroll-mt-28">
            <Panel padding="lg">
              <SectionLabel id="research" title="High-Performance ML" sublabel="Research log" />
              <p className="prose-cp mt-4">{HPML_RESEARCH}</p>
            </Panel>
          </section>

          <Section
            id="coursework"
            title="Coursework"
            sublabel="Loaded modules"
            count={COURSEWORK.length}
          >
            <ChipList items={COURSEWORK} label="Coursework" />
          </Section>

          <Section
            id="availability"
            title="Availability"
            sublabel="Open windows"
            count={AVAILABILITY.length}
          >
            <AvailabilityList className="max-w-[68ch]" />
          </Section>
        </div>
      </div>
    </Container>
  );
}

type SectionProps = {
  id: string;
  title: string;
  sublabel?: string;
  count?: number;
  /** First section sits flush with the column top. */
  first?: boolean;
  children: ReactNode;
};

/** Right-column section: label triad heading, then content. `id` doubles as the deep-link anchor. */
function Section({ id, title, sublabel, count, first = false, children }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`scroll-mt-28 ${first ? "" : "mt-16"}`}
    >
      <SectionLabel id={headingId} title={title} sublabel={sublabel} count={count} />
      <div className="mt-6">{children}</div>
    </section>
  );
}
