"use client";

import { useEffect } from "react";
import { isSoundEnabled, playHover, playSelect, suspendSound, wakeSound } from "@/lib/sound";

/** Anything the visitor can hover or click. Brain regions use .cursor-pointer. */
const INTERACTIVE = 'a[href], button, summary, [role="radio"], [role="button"], .cursor-pointer';
/** Minimum gap between hover ticks so sweeping the mouse doesn't machine-gun. */
const HOVER_GAP_MS = 70;

function interactiveAncestor(target: EventTarget | null): Element | null {
  return target instanceof Element ? target.closest(INTERACTIVE) : null;
}

/**
 * Site-wide sound wiring via delegated listeners (renders nothing). Every link,
 * button and brain region gets a hover tick (mouse only) and a select chirp,
 * without each component having to know about audio.
 */
export function SoundEffects() {
  useEffect(() => {
    let lastHovered: Element | null = null;
    let lastHoverAt = 0;

    function onPointerOver(event: PointerEvent) {
      if (event.pointerType !== "mouse" || !isSoundEnabled()) return;
      const el = interactiveAncestor(event.target);
      if (el === lastHovered) return;
      lastHovered = el;
      if (!el) return;
      const now = performance.now();
      if (now - lastHoverAt < HOVER_GAP_MS) return;
      lastHoverAt = now;
      playHover();
    }

    function onClick(event: MouseEvent) {
      if (!isSoundEnabled()) return;
      void wakeSound();
      const el = interactiveAncestor(event.target);
      if (el && !el.closest("[data-sound-toggle]")) playSelect();
    }

    function onVisibilityChange() {
      if (document.hidden) suspendSound();
      else if (isSoundEnabled()) void wakeSound();
    }

    document.addEventListener("pointerover", onPointerOver, { passive: true });
    document.addEventListener("click", onClick, true);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return null;
}
