# Golem Intelligence

The marketing site for **Golem** — the independent, evidence-grounded AI operations layer for cannabis retail. Independent · grounded · approval-first.

A premium, motion-rich reimagining built with a modern, type-safe stack.

## Tech stack

- **Next.js 15** (App Router) + **React 19**
- **TypeScript** (strict)
- **Tailwind CSS v4** with a custom Golem design system
- **shadcn/ui** primitives
- **Framer Motion** for scroll, stagger, parallax and micro-interactions
- **ESLint** + **Prettier** (with Tailwind class sorting)

## Getting started

```bash
# install dependencies
npm install

# run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — lint with ESLint
- `npm run typecheck` — type-check with the TypeScript compiler
- `npm run format` — format the codebase with Prettier

## Project structure

```
src/
  app/            # App Router entrypoints, layout, global styles
  components/
    sections/     # Page sections (hero, map, edges, etc.)
    ui/           # shadcn/ui primitives
    motion/       # Reusable Framer Motion building blocks
  lib/            # Utilities (cn, constants, content)
```

## Design system

Brand tokens live in `src/app/globals.css` and are exposed as Tailwind
utilities (e.g. `bg-spruce`, `text-leaf`, `text-copper`). The palette centers on
a deep spruce ground, a leaf-green accent and a copper call-to-action, with a
soft "paper" reading surface.
