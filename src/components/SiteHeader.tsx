"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PROFILE } from "@/content/profile";
import { GPA, NAV_TABS, PRIZE_STAT, isActiveTab } from "@/lib/site";
import { SoundToggle } from "./SoundToggle";
import { StatReadout } from "./ui/StatReadout";

const MENU_ID = "site-menu";

function NavTabs({
  pathname,
  className,
  linkClassName = "",
}: {
  pathname: string;
  className: string;
  linkClassName?: string;
}) {
  return (
    <ul className={className}>
      {NAV_TABS.map(({ href, label }) => (
        <li key={href} className="shrink-0">
          <Link
            href={href}
            className={`hud-tab min-h-11 ${linkClassName}`}
            aria-current={isActiveTab(pathname, href) ? "page" : undefined}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function Stats({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-end gap-6 ${className}`}>
      {GPA && <StatReadout value={GPA} label="GPA" tone="cyan" bar />}
      <StatReadout value={PRIZE_STAT.value} label={PRIZE_STAT.label} tone="green" bar />
    </div>
  );
}

/**
 * Below lg: the MENU disclosure (DESIGN.md "Top bar"). Open state is keyed to the
 * pathname it was opened on, so any route change closes it without an effect.
 * Esc closes it and returns focus to the button. No modal, no focus trap.
 */
function useMenu(pathname: string) {
  const [openOn, setOpenOn] = useState<string | null>(null);
  const isOpen = openOn === pathname;
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpenOn(null);
      buttonRef.current?.focus();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const toggle = () => setOpenOn(isOpen ? null : pathname);
  return { isOpen, toggle, buttonRef };
}

/**
 * Game-style top bar (DESIGN.md "Top bar").
 * lg+: stats left, tabs centered, RESUME right. Below lg: name, RESUME and a MENU
 * button; the menu drops a full-width panel of tabs plus the two stats.
 */
export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const { isOpen, toggle, buttonRef } = useMenu(pathname);

  return (
    <header className="sticky top-0 z-50 bg-ink/95">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-8">
        <Link href="/" className="label-red min-w-0 truncate hover:text-text lg:hidden">
          {PROFILE.name}
        </Link>
        <Stats className="hidden lg:flex" />

        <nav aria-label="Primary" className="hidden lg:block">
          <NavTabs pathname={pathname} className="flex items-center gap-5 xl:gap-7" />
        </nav>

        <div className="flex shrink-0 items-center justify-end gap-2 sm:gap-3">
          <SoundToggle />
          <a
            href={PROFILE.resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="cp-btn cp-btn-primary min-h-11 px-4 sm:px-5"
          >
            Resume
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <button
            ref={buttonRef}
            type="button"
            aria-expanded={isOpen}
            aria-controls={MENU_ID}
            onClick={toggle}
            className="cp-btn cp-btn-ghost min-h-11 px-4 lg:hidden"
          >
            {isOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      <div id={MENU_ID} hidden={!isOpen} className="px-4 pb-4 sm:px-6 lg:hidden">
        <nav aria-label="Primary mobile" className="hud-panel p-4">
          <NavTabs
            pathname={pathname}
            className="flex flex-col divide-y divide-cp-red/20"
            linkClassName="w-full"
          />
          <Stats className="mt-4 border-t border-cp-red/30 pt-4" />
        </nav>
      </div>

      <hr className="hud-rule" />
    </header>
  );
}
