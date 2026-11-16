import type { Metadata } from "next";
import { AvailabilityList } from "@/components/contact/AvailabilityList";
import { ChannelRow } from "@/components/contact/ChannelRow";
import { CopyEmailButton } from "@/components/contact/CopyEmailButton";
import { NEW_TAB } from "@/components/contact/ExternalLabel";
import { NETWORK_CHANNELS } from "@/components/contact/channels";
import { AVAILABILITY, PROFILE } from "@/content/profile";
import { Container, PageHeader, Panel, SectionLabel } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact",
  description: `Reach ${PROFILE.name} by email, LinkedIn or GitHub.`,
};

/** Email + network channels; counted for the header readout. */
const CHANNEL_COUNT = NETWORK_CHANNELS.length + 1;

export default function ContactPage() {
  return (
    <Container>
      <PageHeader title="Contact me" readout={`Channels ${CHANNEL_COUNT}`} />

      <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-start">
        <Panel
          as="section"
          padding="lg"
          aria-labelledby="direct-line"
          className="animate-rise sm:p-8"
        >
          <SectionLabel id="direct-line" title="Direct line" />
          <p className="kicker caret mt-1.5">Connection open</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
            <a
              href={`mailto:${PROFILE.email}`}
              className="cp-link min-w-0 break-all font-display text-2xl font-semibold sm:text-3xl"
            >
              {PROFILE.email}
            </a>
            <CopyEmailButton email={PROFILE.email} />
          </div>

          <div className="mt-8 border-t border-cp-red/20 pt-6">
            <SectionLabel
              as="h3"
              title="Network"
              sublabel="Linked channels"
              count={NETWORK_CHANNELS.length}
            />
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {NETWORK_CHANNELS.map((channel) => (
                <li key={channel.label}>
                  <ChannelRow channel={channel} />
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-cp-red/20 pt-6">
            <a href={PROFILE.resumeHref} {...NEW_TAB} className="cp-btn cp-btn-ghost min-h-11">
              Resume
              <span className="sr-only"> (PDF, opens in a new tab)</span>
            </a>
            <span className="data text-mute" aria-hidden="true">
              PDF
            </span>
          </div>
        </Panel>

        <Panel
          as="section"
          padding="lg"
          aria-labelledby="availability"
          className="animate-rise [animation-delay:80ms]"
        >
          <SectionLabel
            id="availability"
            title="Availability"
            sublabel="Open windows"
            count={AVAILABILITY.length}
          />
          <AvailabilityList className="mt-5" />

          <div className="mt-6 border-t border-cp-red/20 pt-5">
            <p className="kicker">Location</p>
            <p className="mt-1 text-lg font-semibold text-text">{PROFILE.location}</p>
          </div>
        </Panel>
      </div>
    </Container>
  );
}
