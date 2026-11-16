import { EDUCATION } from "@/content/profile";
import { Panel } from "@/components/ui";

/** One panel per EDUCATION entry: degree as label, school, then date + detail as data. */
export function EducationList() {
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {EDUCATION.map((entry) => (
        <li key={entry.degree} className="flex">
          <Panel as="article" className="flex w-full flex-col">
            <h3 className="label-red">{entry.degree}</h3>
            <p className="mt-2 text-text">{entry.school}</p>
            <div className="mt-auto pt-4">
              <p className="data text-cp-cyan">{entry.date}</p>
              <p className="data mt-1 text-mute">{entry.detail}</p>
            </div>
          </Panel>
        </li>
      ))}
    </ul>
  );
}
