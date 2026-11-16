import type { ProjectCategory } from "@/content/projects";
import { LineIcon } from "./icons";

type CategoryIconProps = { category: ProjectCategory; size?: number; className?: string };

/** One authored 1.5px line glyph per PROJECT_CATEGORIES entry (project slots). */
const PATHS: Record<ProjectCategory, string[]> = {
  // Agent node fanning out to tools.
  "Agents & LLMs": ["M9 9h6v6H9Z", "M12 9V4M12 15v5M9 12H4M15 12h5", "M3 3h2v2H3ZM19 19h2v2h-2ZM19 3h2v2h-2ZM3 19h2v2H3Z"],
  // Server rack.
  "ML Infrastructure": ["M4 4h16v5H4ZM4 9h16v5H4ZM4 14h16v6H4Z", "M7 6.5h2M7 11.5h2M7 17h2M15 6.5h2"],
  // Lens / eye.
  "Deep Learning & CV": ["M2 12c3-5 6.5-7 10-7s7 2 10 7c-3 5-6.5 7-10 7s-7-2-10-7Z", "M9.5 9.5h5v5h-5Z"],
  // Bar chart on an axis.
  "Data Science": ["M3 3v18h18", "M7 17v-5M11 17V8M15 17v-7M19 17V5"],
  // Browser window with code brackets.
  "Full-Stack": ["M3 4h18v16H3ZM3 8h18", "M9 11l-3 3 3 3M15 11l3 3-3 3"],
};

export function CategoryIcon({ category, size = 28, className }: CategoryIconProps) {
  return (
    <LineIcon size={size} className={className}>
      {PATHS[category].map((d) => (
        <path key={d} d={d} />
      ))}
    </LineIcon>
  );
}
