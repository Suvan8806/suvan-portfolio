# Suvan Kasina — personal site

A multi-page personal site for Suvan Kasina (ML / AI engineer), styled after the Cyberpunk 2077 cyberware ("ripperdoc") screen. The `/skills` page is the signature: a clickable brain whose regions open the skill sets installed in them.

## Stack

Next.js 16 (App Router, Cache Components, React Compiler) · React 19 · TypeScript · Tailwind CSS v4.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npx tsc --noEmit   # type-check
npm run lint
```

## Structure

```
src/
  app/              routes: / about experience projects projects/[slug] skills contact, not-found
    layout.tsx      fonts (Rajdhani, Share Tech Mono), metadata, header/footer, skip link
    globals.css     theme tokens (@theme) and HUD component classes
    icon.svg        favicon
  components/
    SiteHeader.tsx  game-style top bar (stats, tabs, resume)
    SiteFooter.tsx
    ui/             shared primitives: PageHeader, Panel, Chip, SectionLabel, StatReadout,
                    GlitchText, ItemSlot, ProjectCard, AwardRibbon, Container, icons
  content/          ALL site facts (see below)
  lib/site.ts       nav tabs and values derived from content (GPA, prize stat)
design/DESIGN.md    design contract: colors, type, components, per-page specs
reference/          visual references (palette, CP2077 upgrade screen)
```

## Content

Every fact on the site comes from `src/content/`. Edit these files, never the pages:

- `profile.ts` — name, links, bio, education, coursework, awards, availability
- `experience.ts` — roles, in display order
- `projects.ts` — projects, categories, flagship flags
- `skills.ts` — brain regions and the skills in each

The resume is served from `public/resume.pdf`. To add a photo, put it in `public/` and set `PROFILE.photoSrc`.
