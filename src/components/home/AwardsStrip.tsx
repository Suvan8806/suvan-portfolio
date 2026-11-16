import Link from "next/link";
import { AwardRibbon } from "@/components/ui";
import { AWARDS, PRIZE_FOOTNOTE } from "@/content/profile";
import { getProject } from "@/content/projects";
import { HomeSection } from "./HomeSection";

/** AWARDS rows with exact titles; hackathon wins link to their project dossier. */
export function AwardsStrip() {
  return (
    <HomeSection
      id="awards"
      title="Awards"
      sublabel="Street cred"
      count={AWARDS.length}
    >
      <p className="data -mt-3 mb-5 text-mute">{PRIZE_FOOTNOTE}</p>
      <ul className="grid border-t border-cp-red/30 sm:grid-cols-2 sm:gap-x-10">
        {AWARDS.map((award) => {
          const project = award.projectSlug
            ? getProject(award.projectSlug)
            : undefined;
          return (
            <li key={award.title} className="border-b border-cp-red/30 py-5">
              <AwardRibbon award={award.title} />
              <p className="data mt-2 pl-4 text-mute">
                {award.event}
                {award.date && ` · ${award.date}`}
              </p>
              <p className="mt-2 max-w-[60ch] pl-4 text-mute">{award.detail}</p>
              {project && (
                <p className="mt-2 pl-4">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="cp-link data"
                  >
                    Open {project.name} dossier
                  </Link>
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </HomeSection>
  );
}
