# Timecard Generator — Knowledgebase

A client-side **SpongeBob-style timecard meme generator**. Type a caption, pick a
background and colors, choose an aspect ratio, and get a live preview you can
download as a PNG or share to social media. All image generation happens in the
browser via [`html-to-image`](https://github.com/bubkoo/html-to-image) — no
server is involved in producing the image.

## Run it

```bash
bun install
bun run dev      # http://localhost:3000
bun run build    # production build
bun run lint     # eslint
```

## Docs

- [architecture.md](architecture.md) — how the app is structured: state model, the
  live-preview ↔ export pipeline, the auto-fit font technique, font embedding, and theming.
- [features.md](features.md) — what the app does from a user's perspective, including
  current behavior and known limitations.
- [customization.md](customization.md) — how to add backgrounds, color presets, or
  aspect ratios, and how to change export resolution.

## Stack

- Next.js 16 (App Router, Turbopack), React 19, TypeScript.
- Tailwind CSS v4 (CSS-first config in `src/app/globals.css`).
- shadcn/ui components (built on `@base-ui/react`, `lucide-react`).
- `html-to-image` (rasterize), `react-colorful` (color picker), `next-themes` (theme provider).
- Font: **"Some Time Later"** (SIL OFL 1.1) self-hosted via `next/font/local`.

> Documentation policy lives in [`../AGENTS.md`](../AGENTS.md): finished features
> update these docs by rewriting the relevant file, not by appending changelogs.
