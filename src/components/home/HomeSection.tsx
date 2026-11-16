import type { ReactNode } from "react";
import { SectionLabel } from "@/components/ui";

type HomeSectionProps = {
  id: string;
  title: string;
  sublabel?: string;
  count?: number;
  /** Right-aligned route link (an ArrowLink). */
  action?: ReactNode;
  children: ReactNode;
  className?: string;
};

/** Home section shell: label triad + optional route link, then content. */
export function HomeSection({
  id,
  title,
  sublabel,
  count,
  action,
  children,
  className = "",
}: HomeSectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section
      aria-labelledby={headingId}
      className={`mt-16 sm:mt-24 ${className}`}
    >
      <div className="mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <SectionLabel
          id={headingId}
          title={title}
          sublabel={sublabel}
          count={count}
        />
        {action}
      </div>
      {children}
    </section>
  );
}
