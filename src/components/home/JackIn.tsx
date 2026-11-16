import Link from "next/link";
import { Panel } from "@/components/ui";
import { AVAILABILITY, PROFILE } from "@/content/profile";

/** Closing call to action: availability windows plus routes to /contact and email. */
export function JackIn() {
  return (
    <section
      aria-labelledby="jackin-heading"
      className="mt-16 mb-16 sm:mt-24 sm:mb-24"
    >
      <Panel
        padding="lg"
        className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:p-10"
      >
        <div className="min-w-0">
          <h2 id="jackin-heading" className="h-section text-3xl sm:text-4xl">
            Contact me
          </h2>
          <p className="kicker mt-1.5">Connection open</p>
          <p className="mt-5 max-w-[56ch] text-xl text-text">
            Working on agents, ML infrastructure or vision research? I&apos;d
            love to hear about it.
          </p>
          <dl className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-3">
            {AVAILABILITY.map(({ term, detail }) => (
              <div key={term} className="border-l border-cp-red/40 pl-3">
                <dt className="data text-cp-cyan">{term}</dt>
                <dd className="mt-1 text-sm text-mute">{detail}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="flex flex-wrap gap-3 lg:flex-col lg:items-stretch">
          <Link
            href="/contact"
            className="cp-btn cp-btn-primary min-h-11 justify-center"
          >
            Contact me
          </Link>
          <a
            href={`mailto:${PROFILE.email}`}
            className="cp-btn cp-btn-ghost min-h-11 justify-center normal-case tracking-[0.04em] break-all"
          >
            {PROFILE.email}
          </a>
        </div>
      </Panel>
    </section>
  );
}
