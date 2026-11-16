import Link from "next/link";
import type { Project } from "@/content/projects";
import { AwardRibbon } from "./AwardRibbon";
import { CategoryIcon } from "./CategoryIcon";
import { ChipList } from "./Chip";
import { ItemSlot } from "./ItemSlot";

type ProjectCardProps = {
  project: Project;
  /**
   * "row"     = horizontal dossier row (home FLAGSHIP GIGS): category-icon slot, name, subtitle, heroStat, award.
   * "feature" = large gig-board card (flagship, spans 2 cols): adds pitch + categories.
   * "compact" = small gig-board card: name, subtitle, date, first 3 stack chips.
   * Default "compact".
   */
  variant?: "row" | "feature" | "compact";
  /** Heading level for the name. Default "h3". */
  headingLevel?: "h2" | "h3";
  className?: string;
};

// Stretched-link pattern: the name link covers the whole card; focus ring is drawn on the card.
const CARD =
  "hud-panel group relative transition-colors duration-150 hover:bg-panel-hi " +
  "has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-cp-cyan has-[a:focus-visible]:-outline-offset-4";
const LINK =
  "after:absolute after:inset-0 after:content-[''] focus-visible:outline-none group-hover:text-text";

/** One project as a link to /projects/[slug]. Used by the home and projects pages. */
export function ProjectCard({
  project,
  variant = "compact",
  headingLevel: H = "h3",
  className = "",
}: ProjectCardProps) {
  const { slug, name, subtitle, date, heroStat, award, categories, stack, pitch } = project;
  const isRow = variant === "row";
  const isFeature = variant === "feature";

  return (
    <article
      className={`${CARD} ${isRow ? "flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:gap-6" : "flex flex-col gap-3 p-5 lg:p-6"} ${className}`}
    >
      {(isRow || isFeature) && (
        <ItemSlot size={isRow ? 56 : 72} state="filled">
          <CategoryIcon category={categories[0]} size={isRow ? 24 : 30} />
        </ItemSlot>
      )}

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <H className="label-red normal-case">
            <Link href={`/projects/${slug}`} className={LINK}>
              {name}
            </Link>
          </H>
          <p className="data text-mute">{date}</p>
        </div>
        <p className="mt-1 text-cp-cyan">{subtitle}</p>
        {isFeature && <p className="mt-3 max-w-[68ch] text-text">{pitch}</p>}
      </div>

      {(isRow || isFeature) && (
        <div className={`flex flex-col gap-2 ${isRow ? "sm:w-64 sm:shrink-0" : ""}`}>
          <p className="data">
            <span className="text-cp-cyan">{heroStat.value}</span>{" "}
            <span className="text-mute">{heroStat.label}</span>
          </p>
          {award && <AwardRibbon award={award} />}
        </div>
      )}

      {isFeature && <ChipList items={categories} label="Categories" />}
      {variant === "compact" && <ChipList items={stack.slice(0, 3)} label="Stack" className="mt-auto" />}
    </article>
  );
}
