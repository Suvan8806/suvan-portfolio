import { getExperience } from "@/content/experience";
import { getProject } from "@/content/projects";
import { BRAIN_REGIONS, type BrainRegion, type SkillRef } from "@/content/skills";

/** Brain SVG viewBox (brain coordinates span roughly x 60-540, y 0-445). */
export const VIEWBOX = { x: -40, y: -10, w: 680, h: 470 } as const;
export const VIEWBOX_ATTR = `${VIEWBOX.x} ${VIEWBOX.y} ${VIEWBOX.w} ${VIEWBOX.h}`;
const VB_CX = VIEWBOX.x + VIEWBOX.w / 2;
const VB_CY = VIEWBOX.y + VIEWBOX.h / 2;

export const DEFAULT_REGION_ID = "prefrontal-cortex";

const bySlot = (a: BrainRegion, b: BrainRegion) => a.slot - b.slot;
export const LEFT_REGIONS = BRAIN_REGIONS.filter((r) => r.side === "left").sort(bySlot);
export const RIGHT_REGIONS = BRAIN_REGIONS.filter((r) => r.side === "right").sort(bySlot);
/** Keyboard order: left column top to bottom, then right column top to bottom. */
export const REGION_ORDER: readonly BrainRegion[] = [...LEFT_REGIONS, ...RIGHT_REGIONS];

/**
 * The part of viewBox space the rendered <svg> actually shows. With
 * preserveAspectRatio "meet", a cell taller (or wider) than 680:470 reveals
 * extra space around the viewBox; wires must reach that visible edge.
 */
export type Visible = { left: number; top: number; width: number; height: number };

export const DEFAULT_VISIBLE: Visible = {
  left: VIEWBOX.x,
  top: VIEWBOX.y,
  width: VIEWBOX.w,
  height: VIEWBOX.h,
};

export function visibleArea(pxWidth: number, pxHeight: number): Visible {
  if (pxWidth <= 0 || pxHeight <= 0) return DEFAULT_VISIBLE;
  const scale = Math.min(pxWidth / VIEWBOX.w, pxHeight / VIEWBOX.h);
  const width = pxWidth / scale;
  const height = pxHeight / scale;
  return { left: VB_CX - width / 2, top: VB_CY - height / 2, width, height };
}

const round = (n: number) => Math.round(n * 10) / 10;

/**
 * Cubic wire from the region anchor out to the stage edge. The label columns
 * are 4 equal rows, so the wire lands on the vertical centre of row `slot`.
 */
export function wirePath(region: BrainRegion, vis: Visible): { d: string; end: [number, number] } {
  const [ax, ay] = region.anchor;
  const ex = region.side === "left" ? vis.left : vis.left + vis.width;
  const ey = vis.top + vis.height * ((region.slot + 0.5) / 4);
  const mx = (ax + ex) / 2;
  const d = `M${round(ax)} ${round(ay)} C${round(mx)} ${round(ay)} ${round(mx)} ${round(ey)} ${round(ex)} ${round(ey)}`;
  return { d, end: [round(ex), round(ey)] };
}

type Box = { x: number; y: number; w: number; h: number; cx: number; cy: number };

function bounds(points: string): Box {
  const pts = points
    .trim()
    .split(/\s+/)
    .map((pair) => pair.split(",").map(Number) as [number, number]);
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  const x = Math.min(...xs);
  const y = Math.min(...ys);
  const w = Math.max(...xs) - x;
  const h = Math.max(...ys) - y;
  return { x, y, w, h, cx: x + w / 2, cy: y + h / 2 };
}

/** Fold direction and spacing per region, so each lobe reads differently. */
const GYRI: Record<string, { angle: number; gap: number; amp: number }> = {
  "motor-cortex": { angle: 78, gap: 16, amp: 4 },
  "prefrontal-cortex": { angle: -32, gap: 22, amp: 6 },
  "temporal-lobe": { angle: -6, gap: 20, amp: 5 },
  brainstem: { angle: 90, gap: 12, amp: 2.5 },
  "parietal-lobe": { angle: 24, gap: 22, amp: 6 },
  "occipital-lobe": { angle: 62, gap: 20, amp: 5 },
  cerebellum: { angle: 4, gap: 8, amp: 2 },
};

/**
 * Decorative wavy "gyri" lines covering a region's bounding box, rotated per
 * region. Rendered inside a clipPath of the region polygon. Empty for regions
 * without a fold style (the neural-link port).
 */
export function gyriFor(region: BrainRegion): { d: string; transform: string } | null {
  const style = GYRI[region.id];
  if (!style) return null;
  const box = bounds(region.points);
  const half = Math.hypot(box.w, box.h) / 2 + 6;
  const wavelength = style.gap * 1.6;
  const lines: string[] = [];
  for (let y = -half; y <= half; y += style.gap) {
    let d = `M${round(box.cx - half)} ${round(box.cy + y)}`;
    let up = true;
    for (let x = -half; x < half; x += wavelength / 2) {
      const qx = box.cx + x + wavelength / 4;
      const qy = box.cy + y + (up ? -style.amp : style.amp);
      d += ` Q${round(qx)} ${round(qy)} ${round(box.cx + x + wavelength / 2)} ${round(box.cy + y)}`;
      up = !up;
    }
    lines.push(d);
  }
  return {
    d: lines.join(" "),
    transform: `rotate(${style.angle} ${round(box.cx)} ${round(box.cy)})`,
  };
}

export type ResolvedRef = { key: string; href: string; label: string };

/** Turn a skill ref into a link target + display label taken from content. */
export function resolveRef(ref: SkillRef): ResolvedRef | null {
  if (ref.kind === "project") {
    const project = getProject(ref.id);
    return project ? { key: `p-${ref.id}`, href: `/projects/${ref.id}`, label: project.name } : null;
  }
  if (ref.kind === "role") {
    const role = getExperience(ref.id);
    return role ? { key: `r-${ref.id}`, href: `/experience#${ref.id}`, label: role.org } : null;
  }
  return { key: "edu-hpml", href: "/about", label: "HPML Research" };
}
