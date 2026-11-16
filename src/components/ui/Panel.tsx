import type { ReactNode } from "react";

type PanelProps = {
  children: ReactNode;
  /** Semantic element to render. Default "div". */
  as?: "div" | "section" | "article" | "aside";
  /** Inner padding: "md" = 20px, "lg" = 24px, "none" for custom layouts. Default "md". */
  padding?: "none" | "md" | "lg";
  className?: string;
  id?: string;
  "aria-labelledby"?: string;
};

const PADDING = { none: "", md: "p-5", lg: "p-6" } as const;

/** .hud-panel wrapper (cut top-right corner). Never nest a Panel inside a Panel. */
export function Panel({
  children,
  as: Tag = "div",
  padding = "md",
  className = "",
  ...rest
}: PanelProps) {
  return (
    <Tag className={`hud-panel ${PADDING[padding]} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
