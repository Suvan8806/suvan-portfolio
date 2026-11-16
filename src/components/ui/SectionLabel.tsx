type SectionLabelProps = {
  /** Heading text (uppercase via CSS). */
  title: string;
  /** Cyan .kicker sublabel rendered UNDER the title, e.g. "Installed in". */
  sublabel?: string;
  /** Optional .count-badge after the sublabel, like "AVAILABLE ITEMS [2]". */
  count?: number;
  /** Heading level. Default "h2". */
  as?: "h2" | "h3";
  /** "section" = .h-section (24px), "label" = .label-red (18px). Default: h2 -> section, h3 -> label. */
  variant?: "section" | "label";
  /** id on the heading, for aria-labelledby / anchors. */
  id?: string;
  className?: string;
};

/** The game's label triad: red label, cyan sublabel beneath, cyan count badge. */
export function SectionLabel({
  title,
  sublabel,
  count,
  as: Tag = "h2",
  variant,
  id,
  className = "",
}: SectionLabelProps) {
  const style = (variant ?? (Tag === "h2" ? "section" : "label")) === "section" ? "h-section" : "label-red";
  const hasMeta = sublabel !== undefined || count !== undefined;
  return (
    <div className={className}>
      <Tag id={id} className={style}>
        {title}
      </Tag>
      {hasMeta && (
        <p className="mt-1.5 flex items-center gap-2">
          {sublabel && <span className="kicker">{sublabel}</span>}
          {count !== undefined && <span className="count-badge">{count}</span>}
        </p>
      )}
    </div>
  );
}
