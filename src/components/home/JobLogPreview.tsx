import Link from "next/link";
import { DiamondIcon, Panel } from "@/components/ui";
import { EXPERIENCE } from "@/content/experience";
import { ArrowLink } from "./ArrowLink";
import { HomeSection } from "./HomeSection";

/** Compact job log: every role on a spine, each row deep-links to /experience#id. */
export function JobLogPreview() {
  return (
    <HomeSection
      id="joblog"
      title="Job log"
      sublabel="Entries"
      count={EXPERIENCE.length}
      action={<ArrowLink href="/experience">Full log</ArrowLink>}
    >
      <Panel padding="none">
        <ol className="relative before:absolute before:top-8 before:bottom-8 before:left-[23px] before:w-px before:bg-cp-red/40 sm:before:left-[31px]">
          {EXPERIENCE.map((exp, i) => (
            <li
              key={exp.id}
              className="group relative grid gap-x-6 gap-y-1 py-5 pr-6 pl-12 transition-colors duration-150 not-first:border-t not-first:border-cp-red/20 hover:bg-panel-hi has-[a:focus-visible]:outline-2 has-[a:focus-visible]:-outline-offset-4 has-[a:focus-visible]:outline-cp-cyan sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline sm:pl-16"
            >
              <DiamondIcon
                size={10}
                filled={i === 0}
                className={`absolute top-[1.6rem] left-[19px] sm:left-[27px] ${i === 0 ? "text-cp-cyan" : "text-cp-red"}`}
              />
              <div className="min-w-0">
                <h3 className="label-red">
                  <Link
                    href={`/experience#${exp.id}`}
                    className="after:absolute after:inset-0 after:content-[''] group-hover:text-text focus-visible:outline-none"
                  >
                    {exp.title}
                  </Link>
                </h3>
                <p className="mt-1 text-text">
                  {exp.org} <span className="text-mute">· {exp.location}</span>
                </p>
              </div>
              <p className="data text-mute sm:text-right">
                {exp.start} – {exp.end}
              </p>
            </li>
          ))}
        </ol>
      </Panel>
    </HomeSection>
  );
}
