# CLAUDE.md

Guidance for Claude Code (and future contributors) working in this repo.

## Purpose

Karen Xie's personal portfolio site. Former Deloitte strategy consultant, startup
co-founder/COO, MSc Design with Behaviour Science (Imperial College London), writer
and creative director. The site exists to show, in under 30 seconds, that she builds
things — AI projects, strategy work, research, and creative work — for roles at the
intersection of AI, consumer, and retail (first target: Sierra's Agent Strategist role).

## Design concept: file folders

- Home page (`/`) is a stack of manila-style file folders, one per project. Only each
  folder's tab shows at rest, staggered left-to-right like real index tabs.
- Clicking a tab navigates to that project's page (`/projects/[slug]`) with a shared-element
  animation (Motion `layoutId`) so the tab visually slides/expands into the full project view.
  Falls back to an instant transition under `prefers-reduced-motion`.
- On mobile, folders stack vertically and open full-screen (same route, same component,
  responsive layout — no separate mobile code path).
- Folders feel tactile: soft paper texture, subtle shadow, gentle motion.

## Visual style

- Display font (names, large headings): **Fraunces** — high-contrast serif, editorial feel.
- Body font: **Inter** — clean, neutral, highly legible.
- Both loaded via `next/font/google` in `src/app/layout.tsx`, self-hosted by Next.js
  (no external requests, no layout shift).
- Palette, spacing, and type scale all live in **`src/app/globals.css`** (Tailwind v4
  CSS-first `@theme` config — there is no separate `tailwind.config.js` in this project).
  To restyle the whole site, edit the CSS variables there.
- Starting palette: warm off-white/cream background, bright orange-red accent (`#E8432C`,
  adjustable), near-black text, muted paper tones (grey/blush/sand/peach) for folders.

## Content model

Each project is one Markdown file in `/content/projects/*.md` with frontmatter:

```yaml
title: string          # full project name
tabLabel: string       # short label shown on the folder tab
color: grey|blush|sand|peach   # folder paper tone
order: number          # lower = appears first in the stack
role: string           # Karen's role on the project
dates: string          # e.g. "2023–2024"
summary: string        # one-line summary
tags: string[]
links: { label: string, url: string }[]
coverImage: string     # path under /public
featured: boolean
```

The Markdown body (below the frontmatter) is free-form prose rendered on the project
page — use it for "what I built" / "the result" narrative, headings, etc.

**Adding a project = adding a file to `/content/projects`.**
**Reordering = changing the `order` number.**

Content is read at build time with `gray-matter` (frontmatter) + `react-markdown` (body)
in `src/lib/projects.ts`. No CMS, no database, no backend.

## Stack

- **Next.js 16** (App Router, TypeScript, Turbopack) — fully statically generated
  (`generateStaticParams` for every project slug). No backend.
- **Tailwind CSS v4** — CSS-first config in `src/app/globals.css`, no `tailwind.config.js`.
- **Motion** (the current package name for what was Framer Motion) — shared-element
  folder-opening animation.
- **gray-matter** + **react-markdown** — Markdown content parsing/rendering.
- Deployed on **Vercel**, connected to the `main` branch for automatic production deploys.

> Next.js 16 ships with breaking changes from older training data (see
> `node_modules/next/AGENTS.md`). This project deliberately does **not** enable
> `cacheComponents` / `partialPrefetching` — those are built for apps with live/dynamic
> data (databases, APIs, cookies). This site has none of that: every page is static
> content known at build time, so the plain, stable rendering model is simpler and
> sufficient. Re-evaluate only if the site gains real dynamic data (e.g. a CMS).

## Running locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Adding a project

1. Copy an existing file in `/content/projects` as a template.
2. Fill in the frontmatter and write the body.
3. Add a cover image to `/public`.
4. Commit — the folder appears automatically, ordered by `order`.

## Deploying

Every push to `main` on GitHub triggers a production deploy on Vercel. Other branches
get preview URLs automatically via the Vercel GitHub integration.

## Decisions log

- 2026-11-25: Chose Next.js + Tailwind + Vercel (static generation, no backend) —
  matches the "no backend needed" requirement and gives per-project URLs with good
  Open Graph previews.
- 2026-11-25: Display font changed from "sans-serif" (original brief) to **Fraunces**
  (serif) after Karen shared a reference image of a high-contrast editorial serif
  wordmark. Body font is Inter.
- 2026-11-25: Removed Next.js 16's `cacheComponents`/`partialPrefetching` flags from
  `next.config.ts` — unnecessary complexity for a fully static, no-backend site.
- 2026-11-25: GitHub repo `portfolio` set to **public**; Vercel deploy walkthrough
  covers both new and existing accounts; resume PDF/photo start as placeholders.
