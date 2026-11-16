import type { ReactNode } from "react";

// Authored line icons: 1.5px stroke, square caps, currentColor (see DESIGN.md "Shapes").
// All are decorative (aria-hidden); give the parent control an accessible name.

type IconProps = { className?: string; size?: number };

/** 12px "opens elsewhere" arrow-out-of-box, for external links. */
export function ExternalIcon({ className, size = 12 }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 12"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="square"
      className={className}
    >
      <path d="M5 2H2v8h8V7" />
      <path d="M7 2h3v3M10 2 5.5 6.5" />
    </svg>
  );
}

/** "+" glyph for empty cyberware slots. */
export function PlusIcon({ className, size = 16 }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="square"
      className={className}
    >
      <path d="M8 3v10M3 8h10" />
    </svg>
  );
}

/** Small diamond marker (bullets, award ribbons, timeline nodes). */
export function DiamondIcon({
  className,
  size = 8,
  filled = true,
}: IconProps & { filled?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 10 10"
      width={size}
      height={size}
      className={className}
    >
      <path
        d="M5 0.75 9.25 5 5 9.25 0.75 5Z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={1.5}
      />
    </svg>
  );
}

type LineIconProps = IconProps & { viewBox?: number; children: ReactNode };

/** Shared frame for the 24px authored line icons below. */
export function LineIcon({ className, size = 24, viewBox = 24, children }: LineIconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${viewBox} ${viewBox}`}
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="square"
      strokeLinejoin="miter"
      className={className}
    >
      {children}
    </svg>
  );
}

/** LinkedIn channel: a square badge with "in" drawn in strokes. */
export function LinkedInIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M3 3h18v18H3Z" />
      <path d="M8 10v7M8 7v.5M12 17v-7M12 13c0-2 1.2-3 2.7-3S17 11 17 13v4" />
    </LineIcon>
  );
}

/** GitHub channel: a repository branch (two commits merging). */
export function GitHubIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M7 4v16" />
      <path d="M5 4h4v3H5ZM5 17h4v3H5ZM15 7h4v3h-4Z" />
      <path d="M17 10v2c0 2-2 3-5 3H7" />
    </LineIcon>
  );
}

