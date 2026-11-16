import type { Project } from "@/content/projects";
import { ChipList, ExternalIcon, Panel, SectionLabel } from "@/components/ui";

type LoadoutPanelProps = Pick<Project, "stack" | "links">;

/** Side panel: the stack as chips, then external links as ghost buttons. */
export function LoadoutPanel({ stack, links }: LoadoutPanelProps) {
  return (
    <Panel as="aside" padding="lg" aria-labelledby="loadout" className="flex flex-col gap-6">
      <div>
        <SectionLabel id="loadout" as="h2" variant="label" title="Loadout" sublabel="Stack" count={stack.length} />
        <ChipList items={stack} label="Stack" className="mt-4" />
      </div>

      <div className="border-t border-cp-red/20 pt-6">
        <SectionLabel id="uplinks" as="h2" variant="label" title="Uplinks" sublabel="Links" count={links.length} />
        {links.length > 0 ? (
          <ul aria-labelledby="uplinks" className="mt-4 flex flex-col gap-2">
            {links.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cp-btn cp-btn-ghost min-h-11 w-full justify-between"
                >
                  <span>{label}</span>
                  <ExternalIcon />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="data mt-4 text-mute">No public links on file</p>
        )}
      </div>
    </Panel>
  );
}
