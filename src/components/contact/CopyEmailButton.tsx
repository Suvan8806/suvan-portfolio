"use client";

import { useEffect, useRef, useState } from "react";

type Status = "idle" | "copied" | "failed";

const RESET_MS = 2000;
const LABEL: Record<Status, string> = { idle: "Copy", copied: "Copied", failed: "Copy failed" };
const ANNOUNCE: Record<Status, string> = {
  idle: "",
  copied: "Email address copied to clipboard",
  failed: "Could not copy. Select the address and copy it manually.",
};

/** Copies an email address to the clipboard, then shows a 2s COPIED state (announced politely). */
export function CopyEmailButton({ email }: { email: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  async function copy() {
    let next: Status = "copied";
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      next = "failed";
    }
    setStatus(next);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), RESET_MS);
  }

  const tone = status === "copied" ? "text-cp-cyan" : status === "failed" ? "text-mute" : "";

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className={`cp-btn cp-btn-ghost min-h-11 ${tone}`}
        aria-label={status === "idle" ? `Copy email address ${email}` : LABEL[status]}
      >
        <CopyGlyph done={status === "copied"} />
        {LABEL[status]}
      </button>
      <span role="status" className="sr-only">
        {ANNOUNCE[status]}
      </span>
    </>
  );
}

function CopyGlyph({ done }: { done: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 14 14"
      width={14}
      height={14}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="square"
    >
      {done ? (
        <path d="M2.5 7.5 5.5 10.5 11.5 3.5" />
      ) : (
        <>
          <path d="M4.5 4.5h7v7h-7z" />
          <path d="M9.5 2.5h-7v7" />
        </>
      )}
    </svg>
  );
}
