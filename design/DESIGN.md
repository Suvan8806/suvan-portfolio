---
name: Suvan Kasina // Ripperdoc Terminal
description: A personal site rendered as the Cyberpunk 2077 cyberware HUD, tuned so a recruiter can read it in 30 seconds.
colors:
  void: "#000000"
  ink: "#070304"
  panel: "#12070a"
  panel-hi: "#1c0a10"
  cp-red: "#c5003c"
  cp-red-deep: "#880425"
  cp-red-hi: "#ff4f6d"
  cp-yellow: "#f3e600"
  cp-cyan: "#55ead4"
  cp-green: "#3cf281"
  text: "#f2dfe3"
  mute: "#a58e94"
typography:
  display: { fontFamily: "Rajdhani", fontSize: "clamp(2.75rem, 9vw, 5.5rem)", fontWeight: 700, lineHeight: 0.92, letterSpacing: "-0.01em" }
  page: { fontFamily: "Rajdhani", fontSize: "clamp(2.25rem, 6vw, 3.75rem)", fontWeight: 700, lineHeight: 0.95 }
  section: { fontFamily: "Rajdhani", fontSize: "1.5rem", fontWeight: 600, lineHeight: 1.1, letterSpacing: "0.04em" }
  label: { fontFamily: "Rajdhani", fontSize: "1.125rem", fontWeight: 600, lineHeight: 1.15, letterSpacing: "0.06em" }
  body: { fontFamily: "Rajdhani", fontSize: "1.0625rem", fontWeight: 500, lineHeight: 1.55 }
  data: { fontFamily: "Share Tech Mono", fontSize: "0.8125rem", lineHeight: 1.4, letterSpacing: "0.08em" }
  micro: { fontFamily: "Share Tech Mono", fontSize: "0.75rem", lineHeight: 1.3, letterSpacing: "0.22em" }
rounded:
  none: "0px"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "6": "24px"
  "8": "32px"
  "12": "48px"
  "16": "64px"
  "24": "96px"
components:
  button-primary: { backgroundColor: "{colors.cp-yellow}", textColor: "{colors.void}", rounded: "{rounded.none}", padding: "10px 20px" }
  button-primary-hover: { backgroundColor: "{colors.cp-cyan}", textColor: "{colors.void}" }
  button-ghost: { backgroundColor: "rgb(197 0 60 / 0.12)", textColor: "{colors.cp-red-hi}", padding: "10px 20px" }
  chip: { backgroundColor: "rgb(85 234 212 / 0.06)", textColor: "{colors.text}", padding: "3px 9px" }
  chip-pressed: { backgroundColor: "{colors.cp-cyan}", textColor: "{colors.void}" }
  count-badge: { backgroundColor: "{colors.cp-cyan}", textColor: "{colors.void}", height: "22px" }
  tier-iconic: { backgroundColor: "{colors.cp-yellow}", textColor: "{colors.void}" }
---

# Design contract

## Overview

**North star: the ripperdoc terminal.** The whole site is one CP2077 HUD (reference/upgradeimage.png): red-black field, red uppercase condensed labels, cyan secondary readouts and counters, square bracketed slots, glowing wires, a top bar with stats and centered tabs over one thin red rule. The /skills brain screen is the signature; every other page borrows its grammar so the site feels like one machine.

Principles:
1. **Faithful, not costume.** Use the game's actual grammar (label + cyan sublabel + count badge, bracketed slot, diamond tabs, cut corners). Do not add generic "cyber" filler: no hex rain, no fake terminal noise blocks, no random hex IDs, no neon on everything.
2. **Recruiter-first.** Every page answers "who, what, proof" in the first viewport. Real content is the hero; chrome frames it. Body copy is calm Rajdhani 500 in `text`, never glowing, never all caps.
3. **Content is imported, never typed.** All facts come from `src/content/*`. New copy is UI flavor only (JOB LOG, GIG BOARD, INSTALLED IN, FLATLINED). Prose stays first person, conversational.
4. **One authored moment per page.** Each page gets one motion signature (listed per page); everything else is still.
5. **Sharp geometry.** Radius is always 0. Shape comes from clip-path cut corners and brackets.

## Colors

| Token | Role | Rules |
|---|---|---|
| `ink` / `void` | Page field (`ink` with the red radial glow already in body) | Dark only. |
| `panel`, `panel-hi` | Panel fills (`.hud-panel`), hovered rows | Max one level of nesting. |
| `cp-red` | Strokes: rules, brackets, borders, wires, slot outlines, large (>=24px bold) display text | Never for text under 24px (3.4:1 on ink). |
| `cp-red-deep` | Inactive fills, scrollbar, quiet dividers | Never text. |
| `cp-red-hi` | Red labels at any size: region labels, section heads, tabs, ghost buttons | 6.8:1 on ink. The "game red" text color. |
| `cp-cyan` | Secondary labels, counters, active tab, links, focus ring, selected state, data values | The "this is interactive / live" color. |
| `cp-yellow` | Primary CTA fill, ICONIC tier, selection, caret, the single highest-priority highlight per view | At most one yellow element group per viewport. |
| `cp-green` | Street-cred stat only (PRIZE_SUMMARY in the top bar), award ribbons | Nowhere else. |
| `text` | Body copy, headings that are not labels | Default reading color. |
| `mute` | Metadata, dates, secondary prose | 6:1 on ink; OK for small text. |

Proportion: ~85% ink/panel, ~10% red strokes and labels, ~4% cyan, ~1% yellow.

## Typography

Fonts: load `Rajdhani` (400/500/600/700) and `Share Tech Mono` (400) via `next/font/google` in `src/app/layout.tsx` with `variable: "--font-rajdhani"` and `"--font-share-tech-mono"`; replace the Geist scaffold.

| Role | Class | Size | Use |
|---|---|---|---|
| Display | `.h-display` | clamp 44-88px, 700, uppercase | Home name, 404 only |
| Page title | `.h-page` | clamp 36-60px, 700, uppercase, `text` or `cp-red` | One h1 per page |
| Section | `.h-section` | 24px, 600, uppercase, `cp-red-hi` | h2 |
| Label | `.label-red` | 18px, 600, uppercase, `cp-red-hi` | Region names, card titles, job titles (h3) |
| Body | default body | 17px / 1.55, 500 | Prose, max 68ch (`.prose-cp`) |
| Lead | `text-xl` (20px) 500 | | Taglines, pitches |
| Data | `.data` | 13px mono, uppercase, tabular | Dates, stats, stack, counts |
| Micro | `.kicker` | 12px mono, cyan, 0.22em | Sublabels BELOW a label ("AVAILABLE ITEMS", "INSTALLED IN"), field names |

Rules: mono only for data, counts, dates, IDs, field names, never for prose. **`.kicker` never sits above a heading as an eyebrow**; in the game it is the cyan line under the red label, so it goes under or beside. Never use gradient text. Display max 88px. Numbers in readouts use `.stat-value` (tabular).

## Layout

- Container: `max-w-6xl` (1152px) centered, side padding 16px (<640), 24px (sm), 32px (lg). Skills page may use `max-w-7xl`.
- Spacing scale: 4/8/12/16/24/32/48/64/96 (Tailwind 1,2,3,4,6,8,12,16,24). Inside panels 16-24px; between sections 64px (mobile 48px). More space above a heading than below.
- Breakpoints: Tailwind defaults. Design at 360, 768, 1280. No horizontal page scroll at 360px; long tokens (`break-words`) and chip rows wrap.
- Page header (every page except home): h1 `.h-page`, then a cyan `.data` readout line under it derived from content (e.g. `ENTRIES 4`, `GIGS 11`, `REGIONS 8 · SKILLS {TOTAL_SKILLS}`), then `.hud-rule`. Optional one-sentence lead in `mute`.

## Elevation & Depth

Flat tonal layering: `ink` field -> `panel` -> `panel-hi` on hover/selected. No drop shadows on panels. Glow is a light source, not a border:
- Allowed glow: `.hud-rule`, active tab (`.neon-cyan`), selected slot (`.slot-active`), `.wire-live`, home name and 404 title (`.neon-red`).
- Max two glowing elements per viewport. Never glow body text, chips, or buttons at rest.
- Background grid and scanlines are global (body pseudo-elements); do not add more texture layers.

## Shapes

- Radius 0 everywhere. Cut corners: `.hud-panel` (top-right 18px), `.cp-btn` (two corners 12px), `.slot` (bottom-right 10px).
- `.brackets` = empty/available slot or framed media (photo slot). Use with `--b` override for cyan when selected.
- Borders 1px; the only thicker line is the 3px inset left accent inside `.slot-filled`/`.slot-active` (game's item rarity bar), never on cards or list rows.
- Icons: authored inline SVG, 1.5px stroke, square caps, `currentColor`. No emoji, no unicode arrows as icons.

## Components

**Top bar** (`<header>`, sticky, `bg-ink/90`, `backdrop-blur-sm` allowed only here for legibility over content). Desktop (>=1024): three zones.
- Left: two `.stat` readouts like LEVEL / STREET CRED: `3.97` (`.stat-value text-cp-cyan`) + `GPA` (cyan), then `3x` (`text-cp-green`) + `HACKATHON PRIZE WINNER` (green). Derive "3.97" from `EDUCATION[0].detail` and the second from `PRIZE_SUMMARY`; do not hardcode new facts. A 2px underbar under each stat (cyan / green, ~60% width) echoes the game's XP bars.
- Center: `<nav aria-label="Primary">` of `.hud-tab` links HOME ABOUT EXPERIENCE PROJECTS SKILLS CONTACT; `aria-current="page"` on the active one (cyan, filled diamond) via `usePathname` (prefix match so `/projects/x` lights PROJECTS).
- Right: `.cp-btn .cp-btn-primary` "RESUME" -> `PROFILE.resumeHref`.
- Bottom: `.hud-rule` full width.
- <1024: left shows `SUVAN KASINA` label-red link home; right shows RESUME (compact) + a `MENU` disclosure button (`aria-expanded`, `aria-controls`). The panel drops below the bar as a full-width `.hud-panel` list of tabs (44px rows) plus the two stats. Esc closes it; route change closes it. No modal, no focus trap.

**Panels:** `.hud-panel` with 20-24px padding. Title as `.label-red`, sublabel `.kicker` below. Never nest a panel in a panel; inside use dividers (`border-cp-red/20`).

**Item slot / cards:** `.slot` squares for skills and project glyphs (sizes 56/72/96px). Filled = `.slot-filled`, selected = `.slot-active`, empty = `.slot .brackets` with a 1.5px "+" SVG in `cp-red`. Project cards are not equal tiles; see /projects.

**Chips:** `.chip` for stack/tags (static `<li>`), `button.chip` with `aria-pressed` for filters. Counts inside chips use `.count-badge` sizing scaled down.

**Buttons:** `.cp-btn-primary` (one per view: Resume or the main CTA), `.cp-btn-ghost` for secondary actions. Min height 44px on touch. External links get an authored 12px "external" SVG and `rel="noopener noreferrer"`.

**Links:** `.cp-link` inline; nav-style links use `hover:text-text` with no underline.

**Stat readouts:** `.stat` + `.stat-value` + label. Only for real numbers from content (GPA, project `heroStat`, counts). Never a hero row of three big numbers.

**Count badge:** `.count-badge` after a `.kicker` sublabel, exactly as "AVAILABLE ITEMS [2]".

**Timeline (experience):** a 1px `cp-red/40` vertical spine at left with a 10px diamond node per entry (cyan for the first entry, red otherwise). Order follows `EXPERIENCE` array (positioning order, not strict chronology, so no "years" axis).

**Focus:** global 2px cyan outline, offset 3px. clip-path clips outlines, so globals.css already insets the outline (offset -4px) on `.cp-btn`, `.slot`, `.hud-panel` when they are focusable. For any other clipped interactive element, do the same. Verify every interactive element shows focus.

## Pages

**/ Home (boot / hero).** First viewport: a 3-line mono boot log (`.data text-mute`, fact-free: `> LINK ESTABLISHED`, `> LOADING PROFILE`, `> READY`) typed once (motion signature, ~900ms total, then static; reduced motion shows it complete). Then `.h-display.glitch.neon-red` name (`data-text` = name, glitch only here and 404), role in `text-cp-cyan` label size, `PROFILE.tagline` lead, location `.data`. CTAs: RESUME (primary), VIEW PROJECTS (ghost), JACK IN (ghost -> /contact). Right column (lg): the photo/ID slot mini or a brain silhouette teaser linking /skills. Below the fold: "FLAGSHIP GIGS" (4 flagship projects as horizontal dossier rows: slot glyph, name, subtitle, `heroStat` as `.data` cyan, award ribbon in green if present), then FOCUS_AREAS as three side-by-side text columns (not icon cards) separated by red rules, then a row of route links ("OPEN FILE", "JOB LOG", "CYBERWARE").

**/about (personal file).** Two columns on lg: left 320px ID card: `.slot.brackets` 4:5 photo frame; if `PROFILE.photoSrc` is null show "IMAGE PENDING" (`.data text-mute`) with a cyan scan line and a faint person silhouette SVG; when set, `next/image` cover. Under it: name `.label-red`, role, location, email, LinkedIn, GitHub as label/value rows (`.kicker` field names). Right: BIO paragraphs (`.prose-cp`), then sections EDUCATION (panel per entry, detail in `.data`), AWARDS (rows with green 2px marker diamond, exact award titles), COURSEWORK (chip cloud), HPML_RESEARCH (one paragraph panel), AVAILABILITY (term/detail rows). Mobile: single column, ID card first. Signature: ID card photo frame brackets draw in once.

**/experience (job log).** Page header `JOB LOG`. lg: sticky left index (titles + org as anchor links `#{id}`, current anchor cyan) + right timeline. Each entry: `.label-red` title (MITRE is exactly "AI Intern"), org in `text`, `start - end` + location `.data text-mute`, summary, tags as chips, tracks: optional track label as `.kicker` then bullets with small red diamond markers. Each entry `id={exp.id}` for deep links from /skills. Signature: timeline spine draws top-down on load.

**/projects (gig board).** Header `GIG BOARD` + `GIGS 11`. Filter bar: ALL + PROJECT_CATEGORIES as `button.chip` with `aria-pressed` and counts; filter state in URL `?cat=` (client component reading `useSearchParams` inside Suspense) or local state; announce result count in an `aria-live="polite"` `.data` line. Grid: flagship gigs span 2 columns on lg (larger panel, pitch + heroStat + award), others 1 column compact (name, subtitle, date, first 3 stack chips). Whole card is one link to `/projects/[slug]` (name is the link text; card uses stretched-link pattern). Empty filter result: "NO GIGS MATCH THIS FILTER" + reset button. Signature: cards re-flow with a 150ms fade on filter change.

**/projects/[slug] (dossier).** `generateStaticParams` from PROJECTS, `dynamicParams = false`, `await params`, `notFound()` on miss, `generateMetadata` from content. Breadcrumb `GIG BOARD / NAME` (`.data`). Header: name `.h-page`, subtitle cyan, date, categories chips, award ribbon (green diamond + exact text). Hero readout: `heroStat.value` as `.stat-value text-cp-cyan` + label (this is the one allowed big number). Body two columns lg: main (pitch lead, HIGHLIGHTS bullets, DEEP DIVE label/text pairs, ALSO SHIPPED, note in mute panel) and side panel (STACK chips, LINKS as ghost buttons). Prev/next gig nav at bottom.

**/skills (cyberware screen, signature).** Header `CYBERWARE` + `REGIONS 8 · SKILLS {TOTAL_SKILLS}`. Stage (lg+): 3-column grid `[1fr auto 1fr]`. Center: brain SVG (viewBox ~`0 0 600 445`) drawn as translucent red wireframe: region polygons from `BRAIN_REGIONS[].points`, fill `cp-red-deep/25`, stroke `cp-red`; hover/focus fill `cp-red/35`; selected fill `cp-cyan/20` stroke `cp-cyan`. A slow `.animate-spin-slow` dashed ring behind the brain (the game's floor ring). Left/right columns: 4 region modules each, ordered by `slot`, aligned to their side. Module = `.label-red` region name, `.kicker` "INSTALLED" + `.count-badge` (skills.length), plus one `.slot.slot-filled` (72px) holding the region's authored line icon and, beside it, up to 2 `.slot.brackets` empty "+" slots for the game look. Wires: one absolutely positioned SVG overlay spanning the stage, a cubic path from each module's inner edge to the region `anchor`; `.wire` at rest, `.wire-live` for the selected region. Each module and each polygon is a `<button>` (polygons via `role="button" tabIndex=0` on `<path>`/`<g>` with Enter/Space, `aria-label` = region name) with `aria-pressed`, `aria-controls="region-panel"`. Arrow keys move between regions. Default selection: first region. Detail panel `#region-panel` (`aria-live="polite"`), full width under the stage: region name `.h-section`, then a grid of skill items: each item is a row with a 56px `.slot` (slot-active if core), name in `text` 600, `.tier-iconic` "ICONIC" when `core`, and `INSTALLED IN` (`.kicker`) followed by ref chips linking to `/projects/{id}` (project name from getProject), `/experience#{id}` (title/org from getExperience), `/about#education` for `edu`. Non-core items show no tier label (do not invent tiers). Below lg: brain on top at full width (tap regions), modules become a 2-column button grid (no wires), then the panel. Signature: wire of selected region pulses; panel content fades in 150ms.

**/contact (jack in).** Header `JACK IN`. One hero panel: email as a large `.label-red`-sized `.cp-link` with a COPY button (clipboard, then "COPIED" state in cyan for 2s, `aria-live`), LinkedIn and GitHub as slot rows with icons, RESUME primary button, AVAILABILITY as term/detail list. No contact form, never a phone number. Signature: a single blinking `.caret` after "CONNECTION OPEN".

**404 (flatlined).** `not-found.tsx`: `.h-display.glitch` "FLATLINED" in `cp-red` with `.neon-red`, line "That page doesn't exist on this net." (`text`), a flat EKG SVG line in cp-red, buttons BACK TO HOME (primary) and GIG BOARD (ghost).

## Motion

- Durations: 150ms (hover/state), 200-300ms (panel/content swap), 500ms (`.animate-rise` entrance). Easing `cubic-bezier(0.16, 1, 0.3, 1)` for entrances.
- Entrance: `.animate-rise` on the page header and at most the first 6 list items, staggered 40ms via inline `animationDelay`. Content must be readable if animation never runs (opacity starts visible under reduced motion; the global rule kills animations).
- `.glitch` only on home name and 404. `.animate-spin-slow` only on the skills ring. `.wire-live` only on skills.
- No scroll-jacking, no parallax, no cursor effects, no autoplaying loops besides the ring, wire pulse and caret.
- Reduced motion is global in globals.css; do not add JS animations that bypass it (check `matchMedia` for the boot log typing).

## Accessibility

- Landmarks: one `<header>`, `<nav aria-label="Primary">`, `<main id="main">`, `<footer>`. Skip link "Skip to content" as the first focusable element (visible on focus, yellow fill).
- One h1 per page; headings in order. Uppercase via CSS, not typed caps, so screen readers read words.
- Text contrast AA: body in `text`/`mute`; small red text only `cp-red-hi`. Cyan/yellow fills carry `void` text.
- Keyboard: everything reachable and operable; filter chips and region buttons use `aria-pressed`; menu uses `aria-expanded`. Touch targets >=44px.
- Decorative SVG (`aria-hidden="true"`), brain SVG has `<title>`; region polygons labelled. Images need alt; the photo placeholder is `role="img"` with `aria-label="Photo coming soon"`.
- `prefers-reduced-motion` respected (global). No information conveyed by color alone (ICONIC has text; active tab has `aria-current` + filled diamond).

## Do's and Don'ts

Do: import every fact; use the label + cyan sublabel + count-badge triad; keep prose calm and readable; use real numbers only from content; theme selection, scrollbar, caret, focus (already done globally).

Don't: invent metrics, tiers, dates or skills; show a phone number; write "AI Futures" or "won 3 hackathons"; say Shipyard runs on the Claude API; put `.kicker` eyebrows above headings; use cp-red / cp-red-deep for small text; use rounded corners, gradient text, glassmorphism cards, drop-shadow cards, emoji icons, or identical icon+heading+text card grids; use section numbers (FOCUS_AREAS codes may render only as muted `.data` beside the title, not as giant numerals); glow more than two things per viewport.
