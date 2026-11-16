import { PlusIcon, SectionLabel } from "@/components/ui";

type AlsoShippedProps = { items: readonly string[] };

/** Smaller features shipped alongside the headline work, as installed "+" mods. */
export function AlsoShipped({ items }: AlsoShippedProps) {
  return (
    <section aria-labelledby="also-shipped">
      <SectionLabel id="also-shipped" title="Also shipped" sublabel="Extra mods" count={items.length} />
      <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <PlusIcon size={14} className="mt-1 shrink-0 text-cp-cyan" />
            <span className="text-text">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
