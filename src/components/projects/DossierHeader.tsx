import Link from "next/link";
import type { Project } from "@/content/projects";
import { AwardRibbon, CategoryIcon, ChipList, ItemSlot } from "@/components/ui";

type DossierHeaderProps = { project: Project };

const SEPARATOR = " · ";

/** Split "46 tests · ~90s · $0.28" so each part keeps its trailing "·" and a line never starts with one. */
function readoutParts(value: string): string[] {
  const parts = value.split(SEPARATOR);
  return parts.map((part, i) => (i < parts.length - 1 ? `${part}${SEPARATOR.trimEnd()}` : part));
}

/** Breadcrumb, h1, subtitle, date, categories, award and the one big heroStat readout. */
export function DossierHeader({ project }: DossierHeaderProps) {
  const { name, subtitle, date, categories, award, heroStat } = project;

  return (
    <div className="pt-8 sm:pt-12">
      <nav aria-label="Breadcrumb">
        <ol className="data flex flex-wrap items-center gap-2 text-mute">
          <li>
            <Link href="/projects" className="cp-link">
              Gig board
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-text">
            {name}
          </li>
        </ol>
      </nav>

      <div className="animate-rise mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div className="min-w-0">
          <div className="flex items-center gap-4 sm:gap-5">
            <ItemSlot size={72} state="filled" className="hidden sm:grid">
              <CategoryIcon category={categories[0]} size={30} />
            </ItemSlot>
            <h1 className="h-page min-w-0 break-words text-text">{name}</h1>
          </div>
          <p className="mt-3 text-xl font-semibold text-cp-cyan">{subtitle}</p>
          <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="kicker">Filed</span>
            <span className="data text-mute">{date}</span>
          </p>
          <ChipList items={categories} label="Categories" className="mt-4" />
          {award && <AwardRibbon award={award} className="mt-4 max-w-[60ch]" />}
        </div>

        <div className="brackets min-w-0 px-6 py-5 lg:max-w-md">
          <p className="kicker">Headline readout</p>
          <p
            className={`mt-2 font-display font-bold leading-none text-cp-cyan tabular-nums ${
              heroStat.value.length > 12 ? "text-[clamp(1.75rem,4vw,2.5rem)]" : "text-[clamp(2rem,7vw,3.25rem)]"
            }`}
          >
            {readoutParts(heroStat.value).map((part, i) => (
              <span key={`${i}-${part}`}>
                {i > 0 && " "}
                <span className="inline-block break-words sm:whitespace-nowrap">{part}</span>
              </span>
            ))}
          </p>
          <p className="data mt-2 text-mute">{heroStat.label}</p>
        </div>
      </div>

      <hr className="hud-rule mt-8" />
    </div>
  );
}
