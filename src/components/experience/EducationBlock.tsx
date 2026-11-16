import Link from "next/link";
import { Panel } from "@/components/ui/Panel";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { EDUCATION } from "@/content/profile";

type EducationBlockProps = {
  id: string;
};

/** Compact education record at the foot of the job log, linking to the full personal file. */
export function EducationBlock({ id }: EducationBlockProps) {
  return (
    <Panel as="section" padding="lg" id={id} aria-labelledby={`${id}-title`} className="scroll-mt-32">
      <SectionLabel
        id={`${id}-title`}
        title="Education"
        sublabel="Academic record"
        count={EDUCATION.length}
      />
      <ul className="mt-5 divide-y divide-cp-red/20">
        {EDUCATION.map((edu) => (
          <li
            key={edu.degree}
            className="flex flex-col gap-2 py-4 first:pt-0 last:pb-0 md:flex-row md:items-start md:justify-between md:gap-6"
          >
            <div className="min-w-0">
              <p className="font-semibold text-text">{edu.degree}</p>
              <p className="text-mute">{edu.school}</p>
            </div>
            <div className="shrink-0 md:text-right">
              <p className="data text-mute">{edu.date}</p>
              <p className="data mt-1 text-cp-cyan">{edu.detail}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-6 border-t border-cp-red/20 pt-4">
        <Link href="/about#education" className="cp-link data">
          Open personal file
        </Link>
      </p>
    </Panel>
  );
}
