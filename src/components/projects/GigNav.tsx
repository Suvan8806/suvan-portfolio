import Link from "next/link";
import type { Project } from "@/content/projects";

type GigNavProps = { prev: Project; next: Project };

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 12"
      width={12}
      height={12}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="square"
      className="shrink-0"
    >
      <path d={dir === "left" ? "M8 2 4 6l4 4" : "M4 2l4 4-4 4"} />
    </svg>
  );
}

const CARD =
  "hud-panel group flex min-h-11 flex-col gap-1 p-5 transition-colors duration-150 hover:bg-panel-hi";

/** Previous / next gig (wraps around) plus a link back to the board. */
export function GigNav({ prev, next }: GigNavProps) {
  return (
    <nav aria-label="More gigs" className="flex flex-col gap-6">
      <hr className="hud-rule" />
      <ul className="grid gap-4 sm:grid-cols-2">
        <li>
          <Link href={`/projects/${prev.slug}`} rel="prev" className={CARD}>
            <span className="kicker flex items-center gap-2">
              <Chevron dir="left" />
              Previous gig
            </span>
            <span className="label-red group-hover:text-text">{prev.name}</span>
            <span className="text-sm text-mute">{prev.subtitle}</span>
          </Link>
        </li>
        <li>
          <Link href={`/projects/${next.slug}`} rel="next" className={`${CARD} sm:items-end sm:text-right`}>
            <span className="kicker flex items-center gap-2">
              Next gig
              <Chevron dir="right" />
            </span>
            <span className="label-red group-hover:text-text">{next.name}</span>
            <span className="text-sm text-mute">{next.subtitle}</span>
          </Link>
        </li>
      </ul>
      <p>
        <Link href="/projects" className="cp-link data inline-flex min-h-11 items-center gap-2">
          <Chevron dir="left" />
          Back to gig board
        </Link>
      </p>
    </nav>
  );
}
