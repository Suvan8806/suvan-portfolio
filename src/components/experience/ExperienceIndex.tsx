"use client";

import { useEffect, useState } from "react";
import { DiamondIcon } from "@/components/ui/icons";
import { EXPERIENCE } from "@/content/experience";
import { EDUCATION_ANCHOR } from "./anchors";

type IndexItem = { id: string; title: string; meta: string };

const ITEMS: readonly IndexItem[] = [
  ...EXPERIENCE.map((exp) => ({ id: exp.id, title: exp.title, meta: exp.org })),
  { id: EDUCATION_ANCHOR, title: "Education", meta: "Academic record" },
];

/** Band of the viewport that counts as "reading": below the sticky top bar, above the lower half. */
const SPY_ROOT_MARGIN = "-20% 0px -55% 0px";

/** Tracks which job-log entry is currently in the reading band. */
function useActiveAnchor(ids: readonly string[]): string {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const first = ids.find((id) => visible.has(id));
        if (first) setActiveId(first);
      },
      { rootMargin: SPY_ROOT_MARGIN },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}

const IDS = ITEMS.map((item) => item.id);

/** Sticky side index (lg+) of anchor links; the entry in view lights cyan. */
export function ExperienceIndex() {
  const activeId = useActiveAnchor(IDS);

  return (
    <nav aria-labelledby="job-log-index" className="sticky top-28">
      <h2 id="job-log-index" className="label-red">
        Index
      </h2>
      <p className="mt-1.5 flex items-center gap-2">
        <span className="kicker">Entries</span>
        <span className="count-badge">{EXPERIENCE.length}</span>
      </p>
      <ol className="mt-5 space-y-1">
        {ITEMS.map((item) => {
          const isActive = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                className={`group flex min-h-11 gap-3 border-l py-2 pr-2 pl-3 transition-colors duration-150 hover:bg-panel-hi ${
                  isActive ? "border-cp-cyan bg-panel" : "border-cp-red/30"
                }`}
              >
                <DiamondIcon
                  size={8}
                  filled={isActive}
                  className={`mt-[0.45em] shrink-0 ${isActive ? "text-cp-cyan" : "text-cp-red"}`}
                />
                <span className="min-w-0">
                  <span
                    className={`block font-semibold leading-tight ${
                      isActive ? "text-cp-cyan" : "text-text group-hover:text-text"
                    }`}
                  >
                    {item.title}
                  </span>
                  <span className="data mt-0.5 block text-mute">{item.meta}</span>
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
