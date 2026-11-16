import Link from "next/link";
import type { ReactNode } from "react";

/** Authored chevron, 1.5px stroke, square caps. */
function ChevronIcon({ size = 12 }: { size?: number }) {
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
    >
      <path d="M4 2l4 4-4 4" />
    </svg>
  );
}

type ArrowLinkProps = { href: string; children: ReactNode; className?: string };

/** Section "see all" route link: red-hi label, chevron nudges on hover. 44px tall touch target. */
export function ArrowLink({ href, children, className = "" }: ArrowLinkProps) {
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-11 items-center gap-2 text-sm font-semibold tracking-[0.12em] text-cp-red-hi uppercase transition-colors duration-150 hover:text-text ${className}`}
    >
      {children}
      <span className="transition-transform duration-150 group-hover:translate-x-0.5">
        <ChevronIcon />
      </span>
    </Link>
  );
}
