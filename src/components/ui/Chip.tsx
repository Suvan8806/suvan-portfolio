import type { ReactNode } from "react";

type ChipProps = {
  children: ReactNode;
  /** "li" when inside a <ul> of tags, otherwise "span". Default "span". */
  as?: "span" | "li";
  className?: string;
};

/**
 * Static .chip tag for stack / categories / coursework.
 * For filter chips render your own <button className="chip" aria-pressed={...}>.
 */
export function Chip({ children, as: Tag = "span", className = "" }: ChipProps) {
  return <Tag className={`chip ${className}`}>{children}</Tag>;
}

type ChipListProps = {
  items: readonly string[];
  /** Accessible label for the list, e.g. "Stack". */
  label?: string;
  className?: string;
};

/** Wrapping <ul> of static chips. */
export function ChipList({ items, label, className = "" }: ChipListProps) {
  return (
    <ul aria-label={label} className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((item) => (
        <Chip as="li" key={item}>
          {item}
        </Chip>
      ))}
    </ul>
  );
}

/** Alias: some pages call these tags. */
export const Tag = Chip;
