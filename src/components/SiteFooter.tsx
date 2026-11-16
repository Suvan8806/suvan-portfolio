import { PROFILE } from "@/content/profile";
import { ExternalLabel, NEW_TAB } from "./contact/ExternalLabel";
import { NETWORK_CHANNELS } from "./contact/channels";
import { Container } from "./ui/Container";

const LINKS = [
  { label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}`, external: false },
  ...NETWORK_CHANNELS.map(({ label, handle, href }) => ({ label, value: handle, href, external: true })),
];

/** Site footer: contact links, copyright, small HUD flavor line. */
export function SiteFooter() {
  return (
    <footer className="relative z-10 mt-24">
      <hr className="hud-rule opacity-60" />
      <Container className="flex flex-col gap-8 py-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="label-red">{PROFILE.name}</p>
          <p className="kicker mt-1.5">Connection open</p>
          <p className="data mt-4 text-mute">{PROFILE.location}</p>
        </div>

        <ul className="flex flex-col gap-3 sm:flex-row sm:gap-8">
          {LINKS.map(({ label, value, href, external }) => (
            <li key={label} className="min-w-0">
              <span className="kicker block">{label}</span>
              <a
                href={href}
                className="cp-link inline-flex min-h-11 items-center gap-1.5 break-all"
                {...(external ? NEW_TAB : {})}
              >
                {value}
                {external && <ExternalLabel />}
              </a>
            </li>
          ))}
        </ul>
      </Container>
      <Container className="flex flex-wrap justify-between gap-2 pb-8">
        <p className="data text-mute">© 2026 {PROFILE.name}</p>
        <p className="data text-mute" aria-hidden="true">
          SYS // NOMINAL
        </p>
      </Container>
    </footer>
  );
}
