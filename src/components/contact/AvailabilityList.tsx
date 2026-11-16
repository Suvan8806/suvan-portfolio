import { AVAILABILITY } from "@/content/profile";
import { DiamondIcon } from "@/components/ui";

/** AVAILABILITY as term / detail rows separated by thin red dividers. */
export function AvailabilityList({ className = "" }: { className?: string }) {
  return (
    <dl className={`divide-y divide-cp-red/20 ${className}`}>
      {AVAILABILITY.map(({ term, detail }, i) => (
        <div key={term} className="flex gap-3 py-3 first:pt-0 last:pb-0">
          <DiamondIcon
            size={8}
            filled={i === 0}
            className="mt-1.5 shrink-0 text-cp-cyan"
          />
          <div className="min-w-0">
            <dt className="data text-cp-cyan">{term}</dt>
            <dd className="mt-0.5 text-text">{detail}</dd>
          </div>
        </div>
      ))}
    </dl>
  );
}
