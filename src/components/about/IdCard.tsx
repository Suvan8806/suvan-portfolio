import type { ReactNode } from "react";
import { ExternalLabel, NEW_TAB } from "@/components/contact/ExternalLabel";
import { NETWORK_CHANNELS } from "@/components/contact/channels";
import { PROFILE } from "@/content/profile";
import { Panel } from "@/components/ui";
import { PhotoSlot } from "./PhotoSlot";

/** Left-column ID card: photo slot, name, role, then label/value rows. */
export function IdCard({ className = "" }: { className?: string }) {
  return (
    <Panel as="aside" padding="lg" aria-labelledby="id-name" className={className}>
      <div className="grid gap-6 sm:grid-cols-[180px_minmax(0,1fr)] lg:grid-cols-1">
        <PhotoSlot className="max-w-[240px] sm:max-w-none" />

        <div className="min-w-0">
          <h2 id="id-name" className="label-red text-2xl">
            {PROFILE.name}
          </h2>
          <p className="mt-1 text-lg font-semibold text-cp-cyan">{PROFILE.role}</p>

          <dl className="mt-5 divide-y divide-cp-red/20 border-t border-cp-red/20">
            <Field label="Location">
              <span className="text-text">{PROFILE.location}</span>
            </Field>
            <Field label="Email">
              <a href={`mailto:${PROFILE.email}`} className="cp-link break-all">
                {PROFILE.email}
              </a>
            </Field>
            {NETWORK_CHANNELS.map(({ label, handle, href }) => (
              <Field key={label} label={label}>
                <a
                  href={href}
                  {...NEW_TAB}
                  className="cp-link inline-flex items-center gap-1.5 break-all"
                >
                  {handle}
                  <ExternalLabel />
                </a>
              </Field>
            ))}
          </dl>
        </div>
      </div>
    </Panel>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex min-h-11 flex-col justify-center py-2">
      <dt className="kicker">{label}</dt>
      <dd className="mt-0.5 min-w-0">{children}</dd>
    </div>
  );
}
