import type { Metadata } from "next";
import Link from "next/link";
import { Container, GlitchText } from "@/components/ui";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Flatlined",
};

/** Two beats, then a long flat line. Drawn in a 600 x 80 box. */
const EKG_PATH =
  "M0 48H90l8-6 8 6h14l6 16 10-58 10 50 6-8h22l10-8 10 8H260l6 16 10-46 10 38 6-8h16l8-6 8 6H600";

export default function NotFound() {
  return (
    <Container className="py-16 sm:py-24">
      <div className="animate-rise">
        <GlitchText as="h1" text="Flatlined" className="h-display neon-red text-cp-red-hi" />
        <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="kicker">Error 404</span>
          <span className="data text-cp-cyan">Signal lost</span>
        </p>
        <p className="mt-6 max-w-[68ch] text-xl text-text">
          That page doesn&apos;t exist on this net.
        </p>
      </div>

      <div className="mt-10" aria-hidden="true">
        <svg viewBox="0 0 600 80" preserveAspectRatio="none" className="h-16 w-full sm:h-20">
          <path d="M0 48H600" className="stroke-cp-red/15" strokeWidth={1} fill="none" />
          <path
            d={EKG_PATH}
            pathLength={1}
            className={`stroke-cp-red ${styles.trace}`}
            strokeWidth={1.5}
            strokeLinejoin="miter"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <div className="mt-2 flex justify-between">
          <span className="data text-mute">Vitals</span>
          <span className="data text-mute">0 BPM</span>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link href="/" className="cp-btn cp-btn-ghost min-h-11">
          Back to home
        </Link>
        <Link href="/projects" className="cp-btn cp-btn-ghost min-h-11">
          Gig board
        </Link>
      </div>
    </Container>
  );
}
