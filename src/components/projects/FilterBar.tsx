import type { ProjectCategory } from "@/content/projects";

export type GigFilter = ProjectCategory | "all";

export type FilterOption = { value: GigFilter; label: string; count: number };

type FilterBarProps = {
  options: readonly FilterOption[];
  active: GigFilter;
  onChange: (value: GigFilter) => void;
};

/** Row of toggle chips (aria-pressed) over the project categories, each with a count. */
export function FilterBar({ options, active, onChange }: FilterBarProps) {
  return (
    <div role="group" aria-label="Filter gigs by category" className="flex flex-wrap gap-2">
      {options.map(({ value, label, count }) => {
        const pressed = value === active;
        return (
          <button
            key={value}
            type="button"
            className="chip min-h-11 gap-2 px-3 uppercase"
            aria-pressed={pressed}
            onClick={() => onChange(value)}
          >
            <span>{label}</span>
            <span
              aria-hidden="true"
              className={`inline-grid h-5 min-w-5 place-items-center px-1 tabular-nums ${
                pressed ? "bg-void text-cp-cyan" : "bg-cp-cyan/15 text-cp-cyan"
              }`}
            >
              {count}
            </span>
            <span className="sr-only">, {count} gigs</span>
          </button>
        );
      })}
    </div>
  );
}
