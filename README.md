# SpongeBob Timecard Generator

A client-side **SpongeBob-style timecard meme generator**. Type a caption, pick a
background and colors, choose an aspect ratio, and get a live preview you can
download as a PNG or share to social media. All image generation happens in the
browser via [`html-to-image`](https://github.com/bubkoo/html-to-image) — no server
is involved in producing the image.

## Getting started

```bash
bun install
bun run dev      # http://localhost:3000
bun run build    # production build
bun run lint     # eslint
```

## Features

- **Caption** with an auto-fitting font: short text renders large, long text
  shrinks and wraps to fit the frame without clipping.
- **Backgrounds** — a thumbnail gallery, center-cropped (`object-cover`) to the
  chosen aspect ratio.
- **Colors** — one-click classic presets plus custom text-color and shadow-color
  pickers.
- **Aspect ratios** — 16:9, 4:3, or 9:16, controlling both preview and export.
- **Download** a crisp PNG (1920×1080 / 1440×1080 / 1080×1920).
- **Share** links for X/Twitter, Facebook, and Reddit.

> Share links carry text + a URL only — they can't attach the image. Download the
> PNG first, then attach it in the post.

## How it works

- **One node for preview and export.** The timecard is rendered once and sizes all
  typography in container-relative units (`container-type: size` + `cqw`), so
  rasterizing the same node at a large fixed pixel size yields an identical, crisp
  image. `html-to-image` is called with explicit export dimensions per aspect ratio.
- **Auto-fit font size** is computed by binary-searching the largest size that fits
  the frame, returned in `cqw` (not px) so the on-screen preview and the exported
  image always match.
- **Fonts.** The "Some Time Later" font (SIL OFL 1.1) is self-hosted via
  `next/font/local`. Export waits for `document.fonts.ready` and embeds font CSS so
  the correct font is always captured.
- **State** lives in a single reducer; selecting a preset sets both colors atomically,
  and editing a color deselects the active preset.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4 ·
shadcn/ui (`@base-ui/react`) · `html-to-image` · `react-colorful` · `next-themes`.

## Documentation

The full knowledgebase lives in [`docs/`](docs/):

- [docs/architecture.md](docs/architecture.md) — structure, state model, preview↔export
  pipeline, auto-fit technique, font embedding, theming.
- [docs/features.md](docs/features.md) — user-facing behavior and limitations.
- [docs/customization.md](docs/customization.md) — add backgrounds, presets, aspect
  ratios; change export resolution or the font.

Documentation policy (see [`AGENTS.md`](AGENTS.md)): when a feature changes, update the
relevant doc in place — don't append changelogs.
