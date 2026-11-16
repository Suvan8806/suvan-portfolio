import { DiamondIcon, SectionLabel } from "@/components/ui";

type MissionLogProps = { highlights: readonly string[] };

/** Project highlights as the dossier's "MISSION LOG". */
export function MissionLog({ highlights }: MissionLogProps) {
  return (
    <section aria-labelledby="mission-log">
      <SectionLabel
        id="mission-log"
        title="Mission log"
        sublabel="Highlights"
        count={highlights.length}
      />
      <ul className="mt-6 flex flex-col divide-y divide-cp-red/20 border-y border-cp-red/20">
        {highlights.map((item) => (
          <li key={item} className="flex gap-4 py-4">
            <DiamondIcon size={8} className="mt-2.5 shrink-0 text-cp-red-hi" />
            <p className="max-w-[68ch] text-text">{item}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
