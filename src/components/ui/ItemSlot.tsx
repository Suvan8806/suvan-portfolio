import type { ReactNode } from "react";
import { PlusIcon } from "./icons";

export type SlotState = "empty" | "filled" | "active";
export type SlotSize = 56 | 72 | 96;

type ItemSlotProps = {
  /** Slot content (icon / glyph). Ignored for "empty", which shows a red "+". */
  children?: ReactNode;
  /** empty = bracketed "+" slot, filled = cyan rarity bar, active = yellow selected. Default "filled". */
  state?: SlotState;
  /** Edge length in px. Default 72. */
  size?: SlotSize;
  /** Accessible label; when omitted the slot is decorative (aria-hidden). */
  label?: string;
  className?: string;
};

const SIZE: Record<SlotSize, string> = { 56: "w-14", 72: "w-[72px]", 96: "w-24" };
const STATE: Record<SlotState, string> = {
  empty: "brackets text-cp-red",
  filled: "slot-filled text-cp-cyan",
  active: "slot-active text-cp-yellow",
};

/** Square cyberware slot (.slot, cut bottom-right corner). Non-interactive; wrap in a button/link if needed. */
export function ItemSlot({
  children,
  state = "filled",
  size = 72,
  label,
  className = "",
}: ItemSlotProps) {
  const a11y = label ? { role: "img", "aria-label": label } : { "aria-hidden": true };
  return (
    <span className={`slot shrink-0 ${SIZE[size]} ${STATE[state]} ${className}`} {...a11y}>
      {state === "empty" ? <PlusIcon size={size >= 72 ? 18 : 14} /> : children}
    </span>
  );
}
