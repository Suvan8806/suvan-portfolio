"use client";

import { useSyncExternalStore } from "react";
import { isSoundEnabled, setSoundEnabled, subscribeSound } from "@/lib/sound";

function SpeakerIcon({ on }: { on: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      width={20}
      height={20}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="square"
    >
      <path d="M3 8h3l4-3.5v11L6 12H3z" />
      {on ? (
        <path d="M13 7.5c1 .8 1 4.2 0 5M15.5 5.5c2.2 2 2.2 7 0 9" />
      ) : (
        <path d="M13.5 8l4 4M17.5 8l-4 4" />
      )}
    </svg>
  );
}

/** Header switch for UI sounds + ambient hum. Off by default; choice is remembered. */
export function SoundToggle() {
  const on = useSyncExternalStore(subscribeSound, isSoundEnabled, () => false);
  return (
    <button
      type="button"
      data-sound-toggle
      aria-pressed={on}
      aria-label="Sound"
      title={on ? "Turn sound off" : "Turn sound on"}
      onClick={() => void setSoundEnabled(!on)}
      className={`cp-btn min-h-11 px-3 ${on ? "bg-cp-cyan/10 text-cp-cyan shadow-[inset_0_0_0_1px_rgb(85_234_212/0.7)]" : "cp-btn-ghost"}`}
    >
      <SpeakerIcon on={on} />
    </button>
  );
}
