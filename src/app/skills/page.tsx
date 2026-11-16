import type { Metadata } from "next";
import { BrainMap } from "@/components/skills/BrainMap";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatReadout } from "@/components/ui/StatReadout";
import { BRAIN_REGIONS, TOTAL_SKILLS } from "@/content/skills";

export const metadata: Metadata = {
  title: "Skills",
  description: `My skills mapped onto a brain: ${BRAIN_REGIONS.length} regions, ${TOTAL_SKILLS} skills, each linked to where I used it.`,
};

export default function SkillsPage() {
  return (
    <div className="pb-20">
      <Container>
        <PageHeader
          title="Skills"
          readout={`Regions ${BRAIN_REGIONS.length} · Skills ${TOTAL_SKILLS}`}
          kicker="Brain map"
          subtitle="Select a region of my brain to see what's installed there and where I've put it to work."
          aside={<StatReadout value={String(TOTAL_SKILLS)} label="Installed" tone="cyan" bar />}
        />
      </Container>
      {/* The stage runs wide (max-w-7xl); header and the region panel keep the site's max-w-6xl edges. */}
      <BrainMap />
    </div>
  );
}
