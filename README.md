# Karen Xie — Portfolio

Personal portfolio site. See [`CLAUDE.md`](./CLAUDE.md) for the full design rationale,
content model, and decisions log.

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding a project

Each project on the home page is one Markdown file in [`content/projects`](./content/projects).

1. Copy an existing file in that folder as a template.
2. Fill in the frontmatter:
   - `title`, `tabLabel`, `summary`, `role`, `dates`, `tags`, `links`, `coverImage`
   - `color`: one of `grey`, `blush`, `sand`, `peach`
   - `order`: a number — lower numbers appear first in the stack
   - `featured`: `true`/`false`
3. Write the body below the frontmatter (Markdown) — this is the "what I built" /
   "the result" narrative shown on the project's page.
4. Add a cover image to `/public` if you have one, and point `coverImage` at it.
5. Commit. The folder appears automatically; no code changes needed.

Editing `about.md` or `contact.md` in [`content`](./content) updates the About/Contact
sections the same way.

## Deploying

The site is deployed on [Vercel](https://vercel.com), connected to this repo's `main`
branch. Every push to `main` triggers a production deploy; other branches and pull
requests get their own preview URLs automatically.

## Stack

Next.js (App Router, static generation) + Tailwind CSS v4 + Motion + Markdown content.
No backend. See `CLAUDE.md` for why.
