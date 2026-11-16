import { DiamondIcon } from "./icons";

type AwardRibbonProps = {
  /** Exact award text from content (Project.award or Award.title). Never reword. */
  award: string;
  className?: string;
};

/** Green diamond + award text. Green is reserved for awards and the prize stat. */
export function AwardRibbon({ award, className = "" }: AwardRibbonProps) {
  return (
    <p className={`flex items-start gap-2 text-sm font-semibold text-cp-green ${className}`}>
      <DiamondIcon size={8} className="mt-1.5 shrink-0" />
      <span>{award}</span>
    </p>
  );
}
