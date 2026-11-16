type Tone = "cyan" | "green" | "yellow" | "text";

type StatReadoutProps = {
  /** The number/value, taken from content only (GPA, heroStat.value, counts). */
  value: string;
  /** Label beside/under the value, e.g. "GPA". */
  label: string;
  /** Color of value + label. Green is reserved for the prize stat / awards. Default "cyan". */
  tone?: Tone;
  /** "sm" = top-bar size (24px value), "lg" = the one big dossier number. Default "sm". */
  size?: "sm" | "lg";
  /** Draw the 2px XP-style underbar (top bar). Default false. */
  bar?: boolean;
  /** Stack label under the value instead of inline. Default false. */
  stacked?: boolean;
  className?: string;
};

const TONE: Record<Tone, string> = {
  cyan: "text-cp-cyan",
  green: "text-cp-green",
  yellow: "text-cp-yellow",
  text: "text-text",
};
const BAR: Record<Tone, string> = {
  cyan: "bg-cp-cyan",
  green: "bg-cp-green",
  yellow: "bg-cp-yellow",
  text: "bg-text",
};

/** .stat readout, modelled on the game's LEVEL / STREET CRED counters. */
export function StatReadout({
  value,
  label,
  tone = "cyan",
  size = "sm",
  bar = false,
  stacked = false,
  className = "",
}: StatReadoutProps) {
  const valueSize = size === "lg" ? "text-4xl sm:text-5xl" : "";
  return (
    <div className={`inline-flex flex-col ${className}`}>
      <p className={`stat ${stacked ? "flex-col items-start gap-1" : ""} ${TONE[tone]}`}>
        <span className={`stat-value ${valueSize}`}>{value}</span>
        <span className={size === "lg" ? "data text-mute" : "text-xs sm:text-sm"}>{label}</span>
      </p>
      {bar && (
        <span aria-hidden="true" className="mt-1 block h-0.5 w-full bg-white/10">
          <span className={`block h-full w-3/5 ${BAR[tone]}`} />
        </span>
      )}
    </div>
  );
}
