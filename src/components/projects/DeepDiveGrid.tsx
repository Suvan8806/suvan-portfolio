import type { DeepDive } from "@/content/projects";
import { SectionLabel } from "@/components/ui";

type DeepDiveGridProps = { items: readonly DeepDive[] };

/** Labeled label/text pairs ("DEEP DIVE"), two columns from sm. */
export function DeepDiveGrid({ items }: DeepDiveGridProps) {
  return (
    <section aria-labelledby="deep-dive">
      <SectionLabel id="deep-dive" title="Deep dive" sublabel="Subsystems" count={items.length} />
      <dl className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
        {items.map(({ label, text }) => (
          <div key={label} className="border-t border-cp-red/30 pt-4">
            <dt className="label-red text-base">{label}</dt>
            <dd className="mt-2 text-text">{text}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
