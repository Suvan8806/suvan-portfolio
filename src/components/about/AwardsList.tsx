import Link from "next/link";
import { AWARDS, PRIZE_FOOTNOTE } from "@/content/profile";
import { getProject } from "@/content/projects";
import { PRIZE_STAT } from "@/lib/site";
import { DiamondIcon, StatReadout } from "@/components/ui";

/** Prize summary readout, then AWARDS as rows with green diamond markers and exact titles. */
export function AwardsList() {
  return (
    <>
      <div className="flex flex-wrap items-end gap-x-4 gap-y-1">
        <StatReadout value={PRIZE_STAT.value} label={PRIZE_STAT.label} tone="green" bar />
        <p className="data text-mute">{PRIZE_FOOTNOTE}</p>
      </div>

      <ul className="mt-6 divide-y divide-cp-red/20 border-y border-cp-red/20">
        {AWARDS.map((award) => {
          const project = award.projectSlug ? getProject(award.projectSlug) : undefined;
          const meta = [award.event, award.date].filter(Boolean).join(" · ");
          return (
            <li key={award.title} className="flex gap-3 py-4">
              <DiamondIcon size={10} className="mt-1.5 shrink-0 text-cp-green" />
              <div className="min-w-0">
                <h3 className="text-lg font-semibold leading-snug text-text">{award.title}</h3>
                <p className="data mt-1 text-mute">{meta}</p>
                <p className="mt-2 max-w-[68ch] text-mute">{award.detail}</p>
                {project && (
                  <Link
                    href={`/projects/${project.slug}`}
                    className="cp-link data mt-2 inline-flex min-h-11 items-center"
                  >
                    Open gig // {project.name}
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
