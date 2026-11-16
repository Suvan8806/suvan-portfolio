import type { ReactNode } from "react";

type PageHeaderProps = {
  /** The page's single h1 (rendered uppercase via CSS; pass normal case). */
  title: string;
  /** Cyan mono sublabel shown BESIDE/UNDER the title, never above it (e.g. "Personal file"). */
  kicker?: string;
  /** Cyan data readout derived from content, e.g. "GIGS 11" or "REGIONS 8 · SKILLS 40". */
  readout?: string;
  /** Optional one-sentence lead in mute. */
  subtitle?: string;
  /** Optional right-side slot (a StatReadout, count, button...). Stacks under the title on mobile. */
  aside?: ReactNode;
  /** Use the red display color for the title instead of `text`. */
  red?: boolean;
  className?: string;
};

/**
 * Standard header for every page except home: h1, cyan readout line, optional lead,
 * then the thin red .hud-rule. Animates in once with .animate-rise.
 */
export function PageHeader({
  title,
  kicker,
  readout,
  subtitle,
  aside,
  red = false,
  className = "",
}: PageHeaderProps) {
  return (
    <div className={`animate-rise pt-10 sm:pt-14 ${className}`}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <h1 className={`h-page break-words ${red ? "text-cp-red-hi" : "text-text"}`}>{title}</h1>
          {(kicker || readout) && (
            <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
              {kicker && <span className="kicker">{kicker}</span>}
              {readout && <span className="data text-cp-cyan">{readout}</span>}
            </p>
          )}
          {subtitle && <p className="mt-4 max-w-[68ch] text-xl text-mute">{subtitle}</p>}
        </div>
        {aside && <div className="shrink-0">{aside}</div>}
      </div>
      <hr className="hud-rule mt-6" />
    </div>
  );
}
