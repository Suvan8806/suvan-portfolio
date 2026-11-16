import type { ComponentType } from "react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { PROFILE } from "@/content/profile";

/** Last path segment of a profile URL, e.g. "https://github.com/Suvan8806" -> "Suvan8806". */
export function handleFrom(url: string): string {
  try {
    return new URL(url).pathname.split("/").filter(Boolean).pop() ?? url;
  } catch {
    return url;
  }
}

export type Channel = {
  label: string;
  /** Authored line icon for the channel's slot. */
  Icon: ComponentType<{ size?: number; className?: string }>;
  handle: string;
  href: string;
};

/** External network channels, derived from PROFILE. Email is handled separately. */
export const NETWORK_CHANNELS: readonly Channel[] = [
  { label: "LinkedIn", Icon: LinkedInIcon, handle: handleFrom(PROFILE.linkedin), href: PROFILE.linkedin },
  { label: "GitHub", Icon: GitHubIcon, handle: handleFrom(PROFILE.github), href: PROFILE.github },
];
