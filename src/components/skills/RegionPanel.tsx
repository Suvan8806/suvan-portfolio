import Link from "next/link";
import { DiamondIcon } from "@/components/ui/icons";
import { ItemSlot } from "@/components/ui/ItemSlot";
import type { BrainRegion, Skill } from "@/content/skills";
import { resolveRef, type ResolvedRef } from "./geometry";
import { RegionIcon } from "./RegionIcon";

/** Core skills carry the region's icon in an active slot; the rest a plain filled slot. */
function SkillItem({ skill, regionId }: { skill: Skill; regionId: string }) {
  const refs = (skill.refs ?? []).map(resolveRef).filter((r): r is ResolvedRef => r !== null);
  return (
    <li className="flex gap-4 border-t border-cp-red/20 py-4">
      <ItemSlot size={56} state={skill.core ? "active" : "filled"}>
        {skill.core ? <RegionIcon id={regionId} size={24} /> : <DiamondIcon size={8} />}
      </ItemSlot>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h3 className="font-semibold leading-tight break-words text-text">{skill.name}</h3>
          {skill.core && <span className="tier-iconic">Iconic</span>}
        </div>
        {refs.length > 0 && (
          <div className="mt-2">
            <p className="kicker text-[0.6875rem]">Installed in:</p>
            <ul className="mt-1.5 flex flex-wrap gap-1.5">
              {refs.map((ref) => (
                <li key={ref.key}>
                  <Link
                    href={ref.href}
                    className="chip min-h-8 transition-colors duration-150 hover:bg-cp-cyan/15 hover:text-cp-cyan"
                  >
                    {ref.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </li>
  );
}

/** Full-width readout of the selected region's installed skills. */
export function RegionPanel({ region }: { region: BrainRegion }) {
  const iconic = region.skills.filter((s) => s.core).length;
  return (
    <section
      id="region-panel"
      aria-labelledby="region-panel-title"
      className="hud-panel mt-10 p-5 sm:p-6 lg:mt-12"
    >
      <div aria-live="polite" className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h2 id="region-panel-title" className="h-section break-words">
            {region.category}
          </h2>
        </div>
        <p className="flex shrink-0 items-center gap-4">
          <span className="flex items-center gap-2">
            <span className="data text-mute">Items</span>
            <span className="count-badge">{region.skills.length}</span>
          </span>
          {iconic > 0 && (
            <span className="flex items-center gap-2">
              <span className="data text-mute">Iconic</span>
              <span className="count-badge bg-cp-yellow">{iconic}</span>
            </span>
          )}
        </p>
      </div>
      <ul
        key={region.id}
        className="animate-rise mt-5 grid gap-x-8 md:grid-cols-2 xl:grid-cols-3"
        style={{ animationDuration: "200ms" }}
      >
        {region.skills.map((skill) => (
          <SkillItem key={skill.name} skill={skill} regionId={region.id} />
        ))}
      </ul>
    </section>
  );
}
