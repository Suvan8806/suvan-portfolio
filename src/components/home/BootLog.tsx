import type { CSSProperties } from "react";
import { PROFILE } from "@/content/profile";
import styles from "./BootLog.module.css";

// Fact-free flavor lines; the only fact (the name) comes from PROFILE.
const LINES = [
  { text: "Link established", delay: 0, dur: 280 },
  { text: `Loading profile // ${PROFILE.name}`, delay: 300, dur: 360 },
  { text: "Ready", delay: 700, dur: 200 },
] as const;

/** Three-line terminal boot readout. Decorative: the h1 carries the name. */
export function BootLog() {
  return (
    <div aria-hidden="true" className="data max-w-md space-y-1 text-mute">
      {LINES.map(({ text, delay, dur }) => (
        <p
          key={text}
          className={`${styles.line} flex items-baseline gap-3`}
          style={
            {
              "--delay": `${delay}ms`,
              "--dur": `${dur}ms`,
              "--steps": text.length + 4,
            } as CSSProperties
          }
        >
          <span className="text-cp-red-hi">&gt;</span>
          <span className="min-w-0 flex-1 truncate">{text}</span>
          <span className="text-cp-cyan">[ OK ]</span>
        </p>
      ))}
    </div>
  );
}
