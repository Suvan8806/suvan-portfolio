import Link from "next/link";
import { Container, GlitchText } from "@/components/ui";
import { PROFILE } from "@/content/profile";
import { BootLog } from "./BootLog";
import { StatusPanel } from "./StatusPanel";

/** First viewport: boot log, glitched name, role, tagline, CTAs, and the status readout. */
export function HomeHero() {
  return (
    <Container>
      <div className="grid gap-10 pt-10 sm:pt-16 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end lg:gap-14 lg:pt-20">
        <div className="min-w-0">
          <BootLog />

          <div
            className="animate-rise mt-8"
            style={{ animationDelay: "150ms" }}
          >
            <GlitchText
              as="h1"
              text={PROFILE.name}
              className="h-display neon-red text-cp-red-hi"
            />
            <p className="mt-4 text-xl font-semibold tracking-[0.08em] text-cp-cyan uppercase sm:text-2xl">
              {PROFILE.role}
            </p>
            <p className="mt-5 max-w-[60ch] text-xl text-text">
              {PROFILE.tagline}
            </p>
            <p className="data mt-4 text-mute">{PROFILE.location}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              {/* Ghost only: the header RESUME is this viewport's single yellow element. */}
              <Link href="/projects" className="cp-btn cp-btn-ghost min-h-11">
                View projects
              </Link>
              <Link href="/skills" className="cp-btn cp-btn-ghost min-h-11">
                View skills
              </Link>
              <Link href="/contact" className="cp-btn cp-btn-ghost min-h-11">
                Contact me
              </Link>
            </div>
          </div>
        </div>

        <StatusPanel />
      </div>
    </Container>
  );
}
