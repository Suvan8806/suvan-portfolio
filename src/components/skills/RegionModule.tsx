import type { KeyboardEvent } from "react";
import { ItemSlot } from "@/components/ui/ItemSlot";
import type { BrainRegion } from "@/content/skills";
import { RegionIcon } from "./RegionIcon";

type RegionModuleProps = {
  region: BrainRegion;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
  onArrow: (id: string, step: 1 | -1) => void;
};

/** Empty bracketed "+" slots beside the filled one, for the game's slot row. */
const EMPTY_SLOTS = 2;

/**
 * One cyberware-style label module: red skill-category name,
 * INSTALLED count, and (lg+) a slot row (region icon + empty slots) wired to
 * the brain. A radio in the BrainMap radiogroup: roving tabindex, arrows move.
 * Left modules read right-aligned toward the brain, right modules mirror them.
 */
export function RegionModule({ region, isSelected, isHovered, onSelect, onHover, onArrow }: RegionModuleProps) {
  const isLeft = region.side === "left";
  const lit = isSelected || isHovered;

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      onArrow(region.id, 1);
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      onArrow(region.id, -1);
    }
  }

  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      aria-controls="region-panel"
      tabIndex={isSelected ? 0 : -1}
      data-module={region.id}
      onClick={() => onSelect(region.id)}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => onHover(region.id)}
      onMouseLeave={() => onHover(null)}
      className={`group flex min-h-11 w-full items-center gap-3 border p-3 text-left transition-colors duration-150 lg:border-0 lg:bg-transparent lg:p-0 ${
        isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
      } ${isSelected ? "border-cp-cyan/70 bg-cp-cyan/5" : "border-cp-red/30 bg-panel/60 hover:bg-panel-hi"}`}
    >
      <span className={`flex min-w-0 flex-1 flex-col gap-2 ${isLeft ? "lg:items-end lg:text-right" : "lg:items-start"}`}>
        <span className="block min-w-0">
          <span
            className={`label-red block break-words transition-colors duration-150 ${
              isSelected ? "text-cp-cyan" : lit ? "text-text" : "group-hover:text-text"
            }`}
          >
            {region.category}
          </span>
          <span className={`mt-1.5 flex items-center gap-2 ${isLeft ? "lg:justify-end" : ""}`}>
            <span className="data text-[0.6875rem] text-mute">Installed</span>
            <span className="count-badge">{region.skills.length}</span>
          </span>
        </span>

        <span aria-hidden="true" className={`hidden gap-1.5 lg:flex ${isLeft ? "flex-row-reverse" : ""}`}>
          <ItemSlot size={72} state="filled">
            <RegionIcon id={region.id} size={30} />
          </ItemSlot>
          {Array.from({ length: EMPTY_SLOTS }, (_, i) => (
            <ItemSlot key={i} state="empty" size={56} className="self-end" />
          ))}
        </span>
      </span>

      <span
        aria-hidden="true"
        className={`hidden h-px w-4 shrink-0 transition-colors duration-150 lg:block ${
          isSelected ? "bg-cp-cyan" : "bg-cp-red/60"
        }`}
      />
    </button>
  );
}
