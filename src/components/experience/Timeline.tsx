import { DiamondIcon } from "@/components/ui/icons";
import type { Experience } from "@/content/experience";
import { ExperienceEntry } from "./ExperienceEntry";
import styles from "./Timeline.module.css";

type TimelineProps = {
  entries: readonly Experience[];
};

/** Entrance stagger per DESIGN.md: 40ms steps, first 6 items only. */
const STAGGER_MS = 40;
const STAGGER_LIMIT = 6;

/**
 * Vertical job-log timeline: a 1px red spine (draws top-down once) with a diamond node per entry.
 * The first node is cyan; the rest are red. Order follows the EXPERIENCE array.
 */
export function Timeline({ entries }: TimelineProps) {
  return (
    <div className="relative">
      <span
        aria-hidden="true"
        className={`absolute top-2 bottom-8 left-[5px] w-px bg-cp-red/40 ${styles.spine}`}
      />
      <ol className="space-y-10 sm:space-y-12">
        {entries.map((exp, i) => (
          <li
            key={exp.id}
            id={exp.id}
            className="animate-rise relative scroll-mt-32 pl-7 sm:pl-10"
            style={i < STAGGER_LIMIT ? { animationDelay: `${(i + 1) * STAGGER_MS}ms` } : undefined}
          >
            <DiamondIcon
              size={11}
              className={`absolute top-7 left-0 ${i === 0 ? "text-cp-cyan" : "text-cp-red"}`}
            />
            <span
              aria-hidden="true"
              className="absolute top-[33px] left-[11px] h-px w-4 bg-cp-red/50 sm:w-7"
            />
            <ExperienceEntry exp={exp} />
          </li>
        ))}
      </ol>
      <p className="data relative mt-6 flex items-center gap-3 pl-7 text-mute sm:pl-10">
        <span aria-hidden="true" className="absolute left-0 h-px w-[11px] bg-cp-red/60" />
        End of log
      </p>
    </div>
  );
}
