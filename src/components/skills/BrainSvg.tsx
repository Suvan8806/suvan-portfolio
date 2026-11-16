import { BRAIN_REGIONS, type BrainRegion } from "@/content/skills";
import { gyriFor, VIEWBOX_ATTR, wirePath, type Visible } from "./geometry";

type BrainSvgProps = {
  selectedId: string;
  hoveredId: string | null;
  visible: Visible;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
};

/** Brain centre, used for the HUD rings behind it. */
const CX = 300;
const CY = 222;

/** Cables from the neural-link port down into the top of the cortex. */
const CABLES = [
  "M364 30 C360 36 352 38 355 46",
  "M370 32 C371 38 368 42 370 47",
  "M376 30 C380 36 388 40 385 50",
] as const;

/**
 * Brain-tissue bridge behind the lower regions so the cerebellum and brainstem
 * read as attached to the cortex instead of floating (decorative).
 */
const BRIDGE = "380,302 400,297 430,292 420,300 404,312 400,334 398,340 392,306";

function polygonClass(isSelected: boolean, isHovered: boolean): string {
  if (isSelected) return "fill-cp-cyan/20 stroke-cp-cyan";
  if (isHovered) return "fill-cp-red/40 stroke-cp-red-hi";
  return "fill-cp-red-deep/25 stroke-cp-red group-hover:fill-cp-red/40 group-hover:stroke-cp-red-hi";
}

function HudRings() {
  return (
    <g aria-hidden="true" fill="none">
      <circle cx={CX} cy={CY} r={236} className="stroke-cp-red/15" strokeWidth={1} />
      <circle
        cx={CX}
        cy={CY}
        r={206}
        className="animate-spin-slow stroke-cp-red/60"
        strokeWidth={1.5}
        strokeDasharray="3 9 24 9"
      />
      <circle cx={CX} cy={CY} r={194} className="stroke-cp-red/35" strokeWidth={1} strokeDasharray="1 5" />
      <circle cx={CX} cy={CY} r={176} className="stroke-cp-red/10" strokeWidth={8} />
      <path
        d={`M${CX - 236} ${CY}h28M${CX + 208} ${CY}h28M${CX} ${CY - 236}v18`}
        className="stroke-cp-red/50"
        strokeWidth={1}
      />
      <ellipse cx={372} cy={446} rx={130} ry={16} fill="url(#brain-floor-glow)" />
      <ellipse cx={372} cy={446} rx={112} ry={11} className="stroke-cp-red/60" strokeWidth={1} />
      <ellipse
        cx={372}
        cy={446}
        rx={74}
        ry={7}
        className="stroke-cp-cyan/60"
        strokeWidth={1}
        strokeDasharray="6 5"
      />
    </g>
  );
}

function Wires({ selectedId, hoveredId, visible }: Pick<BrainSvgProps, "selectedId" | "hoveredId" | "visible">) {
  return (
    <g aria-hidden="true" className="max-lg:hidden">
      {BRAIN_REGIONS.map((region) => {
        const { d, end } = wirePath(region, visible);
        const isSelected = region.id === selectedId;
        const isHovered = region.id === hoveredId;
        return (
          <g key={region.id}>
            <path
              d={d}
              className={`wire ${isSelected ? "wire-live" : ""}`}
              style={isHovered && !isSelected ? { strokeOpacity: 0.85 } : undefined}
            />
            <rect
              x={end[0] - 3}
              y={end[1] - 3}
              width={6}
              height={6}
              className={isSelected ? "fill-cp-cyan" : "fill-cp-red"}
            />
          </g>
        );
      })}
    </g>
  );
}

type RegionShapeProps = {
  region: BrainRegion;
  isSelected: boolean;
  isHovered: boolean;
} & Pick<BrainSvgProps, "onSelect" | "onHover">;

/**
 * Pointer-only mirror of a label module. Keyboard and screen-reader users drive
 * the same selection through the module radios, so shapes add no tab stops.
 */
function RegionShape({ region, isSelected, isHovered, onSelect, onHover }: RegionShapeProps) {
  const gyri = gyriFor(region);
  const clipId = `clip-${region.id}`;

  return (
    <g
      data-region={region.id}
      className="group cursor-pointer"
      onClick={() => onSelect(region.id)}
      onMouseEnter={() => onHover(region.id)}
      onMouseLeave={() => onHover(null)}
    >
      <clipPath id={clipId}>
        <polygon points={region.points} />
      </clipPath>
      <polygon
        points={region.points}
        strokeWidth={1.25}
        strokeLinejoin="round"
        className={`transition-[fill,stroke] duration-150 ${polygonClass(isSelected, isHovered)}`}
        style={isSelected ? { filter: "drop-shadow(0 0 6px rgb(85 234 212 / 0.45))" } : undefined}
      />
      {gyri && (
        <path
          d={gyri.d}
          transform={gyri.transform}
          clipPath={`url(#${clipId})`}
          fill="none"
          strokeWidth={0.9}
          pointerEvents="none"
          className={isSelected ? "stroke-cp-cyan/45" : "stroke-cp-red/35"}
        />
      )}
      {!gyri && (
        <circle cx={region.anchor[0]} cy={region.anchor[1]} r={3.5} pointerEvents="none" className="fill-cp-red-hi" />
      )}
      {isSelected && (
        <circle cx={region.anchor[0]} cy={region.anchor[1]} r={3} pointerEvents="none" className="fill-cp-cyan" />
      )}
    </g>
  );
}

/** Blurred duplicate of every outline: makes the brain read as the screen's light source. */
function BrainGlow() {
  return (
    <g aria-hidden="true" filter="url(#brain-glow)" opacity={0.4} fill="none" strokeWidth={3}>
      <polygon points={BRIDGE} className="stroke-cp-red" />
      {BRAIN_REGIONS.map((region) => (
        <polygon key={region.id} points={region.points} className="stroke-cp-red-hi" />
      ))}
    </g>
  );
}

/**
 * Side-view brain wireframe: HUD rings, wires to the label columns, clickable regions.
 * Decorative for assistive tech (aria-hidden); the label modules are the accessible control.
 */
export function BrainSvg({ selectedId, hoveredId, visible, onSelect, onHover }: BrainSvgProps) {
  const cableLive = selectedId === "neural-link";
  return (
    <svg
      viewBox={VIEWBOX_ATTR}
      preserveAspectRatio="xMidYMid meet"
      className="absolute inset-0 h-full w-full overflow-visible"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="brain-floor-glow">
          <stop offset="0%" stopColor="#c5003c" stopOpacity={0.55} />
          <stop offset="100%" stopColor="#c5003c" stopOpacity={0} />
        </radialGradient>
        <filter id="brain-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation={6} />
        </filter>
      </defs>
      <HudRings />
      <Wires selectedId={selectedId} hoveredId={hoveredId} visible={visible} />
      <BrainGlow />
      <polygon
        points={BRIDGE}
        className="fill-cp-red-deep/25 stroke-cp-red/50"
        strokeWidth={1}
        strokeLinejoin="round"
        pointerEvents="none"
      />
      <g aria-hidden="true" fill="none" strokeWidth={1.25}>
        {CABLES.map((d) => (
          <path key={d} d={d} className={cableLive ? "stroke-cp-cyan" : "stroke-cp-red"} />
        ))}
      </g>
      {BRAIN_REGIONS.map((region) => (
        <RegionShape
          key={region.id}
          region={region}
          isSelected={region.id === selectedId}
          isHovered={region.id === hoveredId}
          onSelect={onSelect}
          onHover={onHover}
        />
      ))}
    </svg>
  );
}
