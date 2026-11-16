import { Container } from "@/components/ui";
import { AwardsStrip } from "@/components/home/AwardsStrip";
import { BuildSpecs } from "@/components/home/BuildSpecs";
import { FlagshipGigs } from "@/components/home/FlagshipGigs";
import { HomeHero } from "@/components/home/HomeHero";
import { JackIn } from "@/components/home/JackIn";
import { JobLogPreview } from "@/components/home/JobLogPreview";

// Home: the boot sequence. Every fact is imported from src/content.
export default function Home() {
  return (
    <>
      <HomeHero />
      <Container>
        <FlagshipGigs />
        <BuildSpecs />
        <JobLogPreview />
        <AwardsStrip />
        <JackIn />
      </Container>
    </>
  );
}
