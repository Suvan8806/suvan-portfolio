import { LineIcon } from "@/components/ui/icons";

/** Authored 1.5px line glyph per brain region id (BRAIN_REGIONS[].id). */
const PATHS: Record<string, string[]> = {
  // Execution: a launch arrow out of a box.
  "motor-cortex": ["M4 10v10h10", "M9 15 20 4M13 4h7v7"],
  // Planning: a decision tree.
  "prefrontal-cortex": ["M10 3h4v4h-4ZM3 17h4v4H3ZM17 17h4v4h-4Z", "M12 7v4M5 17v-6h14v6"],
  // Language: a speech bubble with lines.
  "temporal-lobe": ["M3 4h18v12h-9l-5 4v-4H3Z", "M7 8h10M7 12h6"],
  // Core life support: a stacked data core.
  brainstem: ["M5 4h14v5H5ZM5 9h14v5H5ZM5 14h14v6H5Z", "M12 4v16"],
  // AI co-pilot implant: a plug.
  "neural-link": ["M9 2v5M15 2v5", "M6 7h12v5a6 6 0 0 1-12 0Z", "M12 18v4"],
  // Spatial / systems: a grid.
  "parietal-lobe": ["M3 3h18v18H3Z", "M9 3v18M15 3v18M3 9h18M3 15h18"],
  // Vision: an eye.
  "occipital-lobe": ["M2 12c3-5 6.5-7 10-7s7 2 10 7c-3 5-6.5 7-10 7s-7-2-10-7Z", "M10 10h4v4h-4Z"],
  // Balance / fine control: sliders.
  cerebellum: ["M4 6h16M4 12h16M4 18h16", "M8 4v4M15 10v4M10 16v4"],
};

const FALLBACK = ["M12 3 21 12 12 21 3 12Z"];

export function RegionIcon({ id, size = 28, className }: { id: string; size?: number; className?: string }) {
  return (
    <LineIcon size={size} className={className}>
      {(PATHS[id] ?? FALLBACK).map((d) => (
        <path key={d} d={d} />
      ))}
    </LineIcon>
  );
}
