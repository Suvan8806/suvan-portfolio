import { EDUCATION, PRIZE_SUMMARY } from "@/content/profile";

/** Primary navigation tabs, in top-bar order. */
export const NAV_TABS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/contact", label: "Contact" },
] as const;

/** True when `href` is the current section (prefix match, so /projects/x lights Projects). */
export function isActiveTab(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** GPA parsed from EDUCATION[0].detail ("GPA 3.97 · Dean's List"); null if absent. */
export const GPA: string | null = /GPA\s+([\d.]+)/.exec(EDUCATION[0].detail)?.[1] ?? null;

/** PRIZE_SUMMARY split into its count ("3x") and label ("Hackathon Prize Winner"). */
const prizeMatch = /^(\S+)\s+(.+)$/.exec(PRIZE_SUMMARY);
export const PRIZE_STAT = {
  value: prizeMatch?.[1] ?? PRIZE_SUMMARY,
  label: prizeMatch?.[2] ?? "",
} as const;
