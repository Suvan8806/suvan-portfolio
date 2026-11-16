import { FOCUS_AREAS } from "@/content/profile";
import { ArrowLink } from "./ArrowLink";
import { HomeSection } from "./HomeSection";

/** FOCUS_AREAS as three text columns divided by red rules (not icon cards). */
export function BuildSpecs() {
  return (
    <HomeSection
      id="specs"
      title="Build specs"
      sublabel="Focus areas"
      count={FOCUS_AREAS.length}
      action={<ArrowLink href="/skills">Skills</ArrowLink>}
    >
      <ul className="grid border-y border-cp-red/30 md:grid-cols-3">
        {FOCUS_AREAS.map((area) => (
          <li
            key={area.code}
            className="border-cp-red/30 py-6 not-first:border-t md:px-6 md:not-first:border-t-0 md:not-first:border-l md:first:pl-0 md:last:pr-0"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="label-red">{area.title}</h3>
              <span className="data shrink-0 text-mute">{area.code}</span>
            </div>
            <p className="mt-3 text-mute">{area.blurb}</p>
          </li>
        ))}
      </ul>
    </HomeSection>
  );
}
