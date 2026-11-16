import { ChipList } from "@/components/ui/Chip";
import { DiamondIcon } from "@/components/ui/icons";
import type { Experience, ExperienceTrack } from "@/content/experience";

type ExperienceEntryProps = {
  exp: Experience;
};

/** Unlabeled tracks get the quest-journal heading "Objectives" (UI flavor, not a fact). */
const DEFAULT_TRACK_LABEL = "Objectives";

function TrackBlock({ track, headingId }: { track: ExperienceTrack; headingId: string }) {
  return (
    <section aria-labelledby={headingId}>
      <div className="flex items-center gap-2">
        <h3 id={headingId} className="kicker">
          {track.label ?? DEFAULT_TRACK_LABEL}
        </h3>
        <span className="count-badge">
          {track.bullets.length}
        </span>
      </div>
      <ul className="mt-3 space-y-3">
        {track.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-3">
            <DiamondIcon size={8} className="mt-[0.55em] shrink-0 text-cp-red" />
            <span className="max-w-[68ch] text-text">{bullet}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** One job-log entry: title, org, period/location readout, summary, tracks, stack. */
export function ExperienceEntry({ exp }: ExperienceEntryProps) {
  const titleId = `${exp.id}-title`;
  return (
    <article aria-labelledby={titleId} className="hud-panel p-5 sm:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <h2 id={titleId} className="label-red text-xl sm:text-2xl">
            {exp.title}
          </h2>
          <p className="mt-1 text-lg font-semibold text-text">{exp.org}</p>
        </div>
        <dl className="grid shrink-0 grid-cols-[auto_1fr] gap-x-4 gap-y-1 md:text-right">
          <dt className="kicker self-center">Period</dt>
          <dd className="data text-mute">
            {exp.start} <span aria-hidden="true">–</span>
            <span className="sr-only">to</span> {exp.end}
          </dd>
          <dt className="kicker self-center">Location</dt>
          <dd className="data break-words text-mute">{exp.location}</dd>
        </dl>
      </div>

      <p className="prose-cp mt-4 text-mute">{exp.summary}</p>

      <div className="mt-5 space-y-6 border-t border-cp-red/20 pt-5">
        {exp.tracks.map((track, i) => (
          <TrackBlock key={track.label ?? i} track={track} headingId={`${exp.id}-track-${i}`} />
        ))}
      </div>

      <div className="mt-6 border-t border-cp-red/20 pt-4">
        <p className="kicker">Stack</p>
        <ChipList items={exp.tags} label={`${exp.org} stack`} className="mt-2" />
      </div>
    </article>
  );
}
