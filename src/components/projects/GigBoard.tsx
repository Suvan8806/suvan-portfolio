"use client";

import { useState } from "react";
import { PROJECTS, PROJECT_CATEGORIES, type Project } from "@/content/projects";
import { ProjectCard, SectionLabel } from "@/components/ui";
import { FilterBar, type FilterOption, type GigFilter } from "./FilterBar";

const STAGGER_MS = 40;
const STAGGER_LIMIT = 6;

const FILTER_OPTIONS: readonly FilterOption[] = [
  { value: "all", label: "All", count: PROJECTS.length },
  ...PROJECT_CATEGORIES.map((category) => ({
    value: category,
    label: category,
    count: PROJECTS.filter((p) => p.categories.includes(category)).length,
  })),
];

function matches(project: Project, filter: GigFilter): boolean {
  return filter === "all" || project.categories.includes(filter);
}

function staggerStyle(index: number) {
  return index < STAGGER_LIMIT ? { animationDelay: `${index * STAGGER_MS}ms` } : undefined;
}

/** Client gig board: category filter bar, flagship gigs (feature cards), then the rest (compact). */
export function GigBoard() {
  const [filter, setFilter] = useState<GigFilter>("all");

  const visible = PROJECTS.filter((p) => matches(p, filter));
  const flagship = visible.filter((p) => p.flagship);
  const side = visible.filter((p) => !p.flagship);
  const filterLabel = filter === "all" ? "all categories" : filter;

  return (
    <div className="mt-8 flex flex-col gap-12 sm:gap-16">
      <div className="flex flex-col gap-3">
        <FilterBar options={FILTER_OPTIONS} active={filter} onChange={setFilter} />
        <p aria-live="polite" className="data text-mute">
          Showing <span className="text-cp-cyan">{visible.length}</span> of {PROJECTS.length} gigs
          <span className="sr-only"> in {filterLabel}</span>
        </p>
      </div>

      {visible.length === 0 ? (
        <div className="brackets flex flex-col items-start gap-4 p-8">
          <p className="label-red">No gigs match this filter</p>
          <button type="button" className="cp-btn cp-btn-ghost min-h-11" onClick={() => setFilter("all")}>
            Reset filter
          </button>
        </div>
      ) : (
        <div key={filter} className="flex flex-col gap-12 sm:gap-16">
          {flagship.length > 0 && (
            <section aria-labelledby="flagship-gigs">
              <SectionLabel
                id="flagship-gigs"
                title="Flagship gigs"
                sublabel="Priority contracts"
                count={flagship.length}
              />
              <ul className="mt-6 grid gap-4 lg:grid-cols-2">
                {flagship.map((project, i) => (
                  <li key={project.slug} className="animate-rise flex" style={staggerStyle(i)}>
                    <ProjectCard project={project} variant="feature" className="w-full" />
                  </li>
                ))}
              </ul>
            </section>
          )}

          {side.length > 0 && (
            <section aria-labelledby="side-gigs">
              <SectionLabel id="side-gigs" title="Side gigs" sublabel="On file" count={side.length} />
              <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {side.map((project, i) => (
                  <li
                    key={project.slug}
                    className="animate-rise flex"
                    style={staggerStyle(flagship.length + i)}
                  >
                    <ProjectCard project={project} variant="compact" className="w-full" />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
