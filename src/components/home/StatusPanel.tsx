import { ItemSlot, Panel, StatReadout } from "@/components/ui";
import { EXPERIENCE } from "@/content/experience";
import { PROJECTS } from "@/content/projects";
import { TOTAL_SKILLS } from "@/content/skills";
import { GPA, PRIZE_STAT } from "@/lib/site";

/** Authored line glyph: two hemispheres with a circuit trace. Decorative. */
function BrainGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="square"
    >
      <path d="M11 4H8L5 7v3L3 12l2 2v3l3 3h3V4Z" />
      <path d="M13 4h3l3 3v3l2 2-2 2v3l-3 3h-3V4Z" />
      <path d="M7 10h2v4M17 10h-2v4" />
    </svg>
  );
}

/** Hero-side readout, modelled on the game's LEVEL / STREET CRED block. All values derived from content. */
export function StatusPanel() {
  return (
    <div className="animate-rise" style={{ animationDelay: "200ms" }}>
      <Panel as="aside" padding="lg" aria-labelledby="status-heading">
        <h2 id="status-heading" className="label-red">
          Status
        </h2>
        <p className="kicker mt-1.5">Operator readout</p>

        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-6">
          {GPA && (
            <StatReadout value={GPA} label="GPA" tone="cyan" bar stacked />
          )}
          <StatReadout
            value={PRIZE_STAT.value}
            label={PRIZE_STAT.label}
            tone="green"
            bar
            stacked
          />
          <StatReadout
            value={String(EXPERIENCE.length)}
            label="Roles logged"
            tone="text"
            stacked
          />
          <StatReadout
            value={String(PROJECTS.length)}
            label="Projects"
            tone="text"
            stacked
          />
        </div>

        <div className="mt-6 border-t border-cp-red/25 pt-5">
          <p className="flex items-center gap-2">
            <span className="kicker">Skills installed</span>
            <span className="count-badge">{TOTAL_SKILLS}</span>
          </p>
          <div className="mt-3 flex gap-2">
            <ItemSlot size={56} state="filled">
              <BrainGlyph />
            </ItemSlot>
            <ItemSlot size={56} state="empty" />
            <ItemSlot size={56} state="empty" />
          </div>
        </div>
      </Panel>
    </div>
  );
}
