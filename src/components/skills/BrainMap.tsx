"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import type { BrainRegion } from "@/content/skills";
import { BrainSvg } from "./BrainSvg";
import {
  DEFAULT_REGION_ID,
  DEFAULT_VISIBLE,
  LEFT_REGIONS,
  REGION_ORDER,
  RIGHT_REGIONS,
  visibleArea,
} from "./geometry";
import { RegionModule } from "./RegionModule";
import { RegionPanel } from "./RegionPanel";

const HINT_ID = "brain-hint";
const PANEL_ID = "region-panel";
/** Room left above the panel for the site header when scrolling to it. */
const SCROLL_OFFSET = 96;

/** Smoothly scroll the skills panel into view (instant under reduced motion). */
function scrollToPanel(onlyIfHidden: boolean) {
  const panel = document.getElementById(PANEL_ID);
  if (!panel) return;
  const top = panel.getBoundingClientRect().top;
  if (onlyIfHidden && top < window.innerHeight * 0.75) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: window.scrollY + top - SCROLL_OFFSET, behavior: reduce ? "auto" : "smooth" });
}

type ColumnProps = {
  regions: readonly BrainRegion[];
  selectedId: string;
  hoveredId: string | null;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
  onArrow: (id: string, step: 1 | -1) => void;
  className: string;
};

/**
 * One label column. On lg it is 4 equal rows so each wire lands on its module.
 * Plain divs (not a list) so the radios sit directly in the radiogroup.
 */
function RegionColumn({ regions, className, ...shared }: ColumnProps) {
  return (
    <div className={`flex flex-col gap-3 lg:grid lg:grid-rows-4 lg:gap-0 ${className}`}>
      {regions.map((region) => (
        <div key={region.id} className="flex lg:items-center">
          <RegionModule
            region={region}
            isSelected={region.id === shared.selectedId}
            isHovered={region.id === shared.hoveredId}
            onSelect={shared.onSelect}
            onHover={shared.onHover}
            onArrow={shared.onArrow}
          />
        </div>
      ))}
    </div>
  );
}

/**
 * The cyberware screen with a brain instead of a body: label columns on both
 * sides wired to clickable brain regions, and the selected region's items below.
 * Keyboard: the 8 label modules form one radio group (one tab stop, arrows move).
 * The brain shapes mirror the modules for pointer users and stay out of the a11y tree.
 */
export function BrainMap() {
  const [selectedId, setSelectedId] = useState(DEFAULT_REGION_ID);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [visible, setVisible] = useState(DEFAULT_VISIBLE);
  const [isPanelInView, setIsPanelInView] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cell = stageRef.current;
    if (!cell) return;
    const observer = new ResizeObserver(([entry]) => {
      setVisible(visibleArea(entry.contentRect.width, entry.contentRect.height));
    });
    observer.observe(cell);
    return () => observer.disconnect();
  }, []);

  // Show the floating "skills below" cue only while the panel is off screen.
  useEffect(() => {
    const panel = document.getElementById(PANEL_ID);
    if (!panel) return;
    const observer = new IntersectionObserver(([entry]) => setIsPanelInView(entry.isIntersecting), {
      rootMargin: "0px 0px -15% 0px",
    });
    observer.observe(panel);
    return () => observer.disconnect();
  }, []);

  function handleArrow(id: string, step: 1 | -1) {
    const index = REGION_ORDER.findIndex((r) => r.id === id);
    const next = REGION_ORDER[(index + step + REGION_ORDER.length) % REGION_ORDER.length];
    setSelectedId(next.id);
    groupRef.current?.querySelector<HTMLButtonElement>(`[data-module="${next.id}"]`)?.focus();
  }

  // Pointer/Enter selection also reveals the skills list when it sits below the fold.
  function selectAndReveal(id: string) {
    setSelectedId(id);
    requestAnimationFrame(() => scrollToPanel(true));
  }

  const selected = REGION_ORDER.find((r) => r.id === selectedId) ?? REGION_ORDER[0];
  const shared = {
    selectedId,
    hoveredId,
    onSelect: selectAndReveal,
    onHover: setHoveredId,
    onArrow: handleArrow,
  };

  return (
    <div className="mt-8 lg:mt-10">
      <Container wide>
        <div
          ref={groupRef}
          role="radiogroup"
          aria-label="Brain regions"
          aria-describedby={HINT_ID}
          className="grid grid-cols-2 gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-0 xl:grid-cols-[minmax(320px,1fr)_minmax(520px,560px)_minmax(320px,1fr)]"
        >
          <div ref={stageRef} className="relative col-span-2 mb-2 lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:mb-0">
            <div aria-hidden="true" className="aspect-[680/470] w-full" />
            <BrainSvg
              selectedId={selectedId}
              hoveredId={hoveredId}
              visible={visible}
              onSelect={selectAndReveal}
              onHover={setHoveredId}
            />
          </div>
          <RegionColumn regions={LEFT_REGIONS} className="lg:col-start-1 lg:row-start-1" {...shared} />
          <RegionColumn regions={RIGHT_REGIONS} className="lg:col-start-3 lg:row-start-1" {...shared} />
        </div>
        <p id={HINT_ID} className="data mt-4 text-center text-mute">
          Pick a region on the brain or a label. Arrow keys move between regions.
        </p>
        <div
          className={`fixed inset-x-0 bottom-5 z-40 flex justify-center px-4 transition-opacity duration-200 ${
            isPanelInView ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <a
            aria-hidden={isPanelInView}
            tabIndex={isPanelInView ? -1 : undefined}
            href={`#${PANEL_ID}`}
            onClick={(event) => {
              event.preventDefault();
              scrollToPanel(false);
            }}
            className="cp-btn min-h-11 bg-ink/95 normal-case tracking-[0.06em] text-cp-cyan shadow-[inset_0_0_0_1px_rgb(85_234_212/0.7),0_0_24px_rgb(85_234_212/0.25)] hover:bg-cp-cyan hover:text-void"
          >
            <span aria-hidden="true" className="inline-block animate-bounce [animation-iteration-count:4]">↓</span>
            {selected.skills.length} {selected.category} skills listed below
          </a>
        </div>
      </Container>
      <Container>
        <RegionPanel region={selected} />
      </Container>
    </div>
  );
}
