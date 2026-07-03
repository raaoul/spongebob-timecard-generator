# Architecture

The app is a single client-rendered page. The generator subtree is a Client
Component (`"use client"`); everything about producing the image runs in the browser.

## File map

```
src/
  app/
    layout.tsx              Root layout: fonts, ThemeProvider (forced light), Toaster
    page.tsx               Renders <TimecardGenerator/>
    fonts.ts               next/font/local def for "Some Time Later"
    globals.css            Tailwind v4 theme; maps --font-timecard token
  components/
    theme-provider.tsx     next-themes wrapper
    ui/                    shadcn components
    timecard/
      timecard-generator.tsx   Client root: owns state, preview ref, font-embed CSS
      timecard-preview.tsx     The exportable node (background <img> + caption)
      caption-controls.tsx     Caption textarea
      background-picker.tsx    Background thumbnail grid
      color-controls.tsx       Presets + custom color pickers
      color-picker-popover.tsx react-colorful in a popover
      aspect-ratio-toggle.tsx  16:9 / 4:3 / 9:16 selector
      export-actions.tsx       Download + platform share buttons
  hooks/
    use-timecard-state.ts   Reducer holding all generator state
    use-debounce.ts         Generic debounced value
    use-fonts-ready.ts      Gates export until fonts load
    use-auto-fit-font.ts    Computes caption size (in cqw) that fits the frame
  lib/
    aspect-ratios.ts        Ratio defs + canonical export dimensions
    backgrounds.ts          Background manifest
    color-presets.ts        Preset color combos
    export-image.ts         html-to-image wrapper + filename slug
    share.ts                Platform share-intent URLs
public/
  backgrounds/             Background images (placeholder SVGs by default)
  fonts/                   SomeTimeLater.woff2 + OFL license
```

## State model

All generator state lives in one reducer, `useTimecardState`
(`src/hooks/use-timecard-state.ts`):

```ts
interface TimecardState {
  caption: string;
  backgroundId: string;
  fgColor: string;         // hex
  shadowColor: string;     // hex
  activePresetId: string | null;
  aspectRatio: AspectRatioId;
}
```

**Preset ↔ custom-color coexistence:** `applyPreset` sets both colors and
`activePresetId`. Editing either color (`setFgColor`/`setShadowColor`) clears
`activePresetId` to `null`, so the preset chip visually deselects while the colors
you chose stay. A single reducer means presets update fg + shadow atomically.

## Live preview ↔ export pipeline

There is **one** node — `TimecardPreview` — used for both the on-screen preview and
the export. It is rendered at a responsive display size, but all typography sizes
in **container-relative units** (`container-type: size` + `cqw`). Rasterizing that
same node at a large fixed pixel size therefore yields an identical, crisp result.

`src/lib/export-image.ts` calls `toPng` with explicit `width`/`height`/`canvasWidth`/
`canvasHeight` from the selected aspect ratio (see below) and `pixelRatio: 1`. Fixed
output dimensions — rather than relying on `pixelRatio` against the display size —
guarantee the same crisp result across ratios.

Canonical export sizes (`src/lib/aspect-ratios.ts`):

| Ratio | Pixels      |
| ----- | ----------- |
| 16:9  | 1920 × 1080 |
| 4:3   | 1440 × 1080 |
| 9:16  | 1080 × 1920 |

## Auto-fit caption size

`useAutoFitFont` (`src/hooks/use-auto-fit-font.ts`) makes the caption grow/shrink to
fill the frame. It binary-searches the largest font size that fits both the width and
height of the content box (allowing wrapping up to `CAPTION_LAYOUT.maxLines`), measuring
against a hidden mirror element that mirrors the caption's font, wrapping, and box width.

The result is returned in **`cqw` (a number), not px**. This is the crux: a px size
measured on the small preview would be baked into the html-to-image clone and come out
tiny at 1920px. A `cqw` value re-resolves against the clone's actual width, so preview
and export match exactly.

`CAPTION_LAYOUT` (exported from the same file) holds the shared padding ratio, line
height, weight, max lines, and clamp range. **`TimecardPreview` imports these same
constants** so its rendered caption matches what the hook measured. Recompute triggers:
debounced caption change, aspect-ratio change, and container resize (`ResizeObserver`).

## Fonts + html-to-image embedding

"Some Time Later" is self-hosted with `next/font/local` (`src/app/fonts.ts`), which
generates a **hashed family name**. That exact family (`someTimeLater.style.fontFamily`)
is passed into `TimecardPreview` and `useAutoFitFont` — never hardcode the display name.

Two safeguards make export reliable:

1. **`useFontsReady`** awaits `document.fonts.ready` (and loads the timecard family)
   before export buttons are enabled — this prevents capturing a system-font fallback
   on the first export.
2. **`getFontEmbedCSS`** is precomputed once fonts are ready and passed to every `toPng`
   call, avoiding intermittent font-embed fetch failures.

The background is a plain `<img>` (not `next/image`) so html-to-image rasterizes it
reliably; images are same-origin (`/public`), so the canvas is never tainted.

## Theming

`ThemeProvider` (`next-themes`) is wired in `src/app/layout.tsx` with
`forcedTheme="light"`, so the app is locked to light mode for now. The `.dark` tokens
in `globals.css` are untouched — to enable dark mode later, drop `forcedTheme`, set
`defaultTheme="system"` + `enableSystem`, and add a toggle.
