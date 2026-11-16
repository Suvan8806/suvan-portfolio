type GlitchTextProps = {
  text: string;
  /** Element to render. Default "span". Use "h1" for the home name / 404 title. */
  as?: "h1" | "h2" | "p" | "span";
  className?: string;
};

/**
 * Chromatic .glitch text: cyan/yellow split layers drawn as aria-hidden spans,
 * so assistive tech reads the text once. Hidden under reduced motion (globals.css).
 * DESIGN.md: only on the home name and the 404 title. Pair with .h-display .neon-red.
 */
export function GlitchText({ text, as: Tag = "span", className = "" }: GlitchTextProps) {
  return (
    <Tag className={`glitch ${className}`}>
      {text}
      <span aria-hidden="true" className="glitch-layer glitch-layer-a">
        {text}
      </span>
      <span aria-hidden="true" className="glitch-layer glitch-layer-b">
        {text}
      </span>
    </Tag>
  );
}
