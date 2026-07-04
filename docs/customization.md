# Customization

## Add or change backgrounds

1. Drop an image into `public/backgrounds/` (e.g. `my-scene.jpg`). Use a
   reasonably high-resolution image — it's center-cropped to the chosen ratio.
2. Add an entry to `BACKGROUNDS` in `src/lib/backgrounds.ts`:

   ```ts
   { id: "my-scene", label: "My Scene", src: "/backgrounds/my-scene.jpg" },
   ```

The `id` must be unique and stable. Optionally set `thumbnailSrc` (a smaller image for
the picker grid) and `credit`. To change the default selection, update
`DEFAULT_BACKGROUND_ID` (currently the first entry).

Because one source is cropped across every ratio, size each image to cover the widest
export — **1920×1080 minimum**. The bundled set is all 1080-tall (16:9 art at 1920×1080,
4:3 art at ~1440×1080), which is exactly the current export height with no headroom:
**do not raise `exportW`/`exportH` past 1080p** or every background upscales. A 4:3-framed
source shown at 16:9 already upscales ~33% (tolerable, but visibly softer).

## Add a color preset

Add an entry to `COLOR_PRESETS` in `src/lib/color-presets.ts`:

```ts
{ id: "lagoon", label: "Lagoon", fg: "#eafff7", shadow: "#0f5c4a" },
```

Colors must be plain hex. `DEFAULT_PRESET_ID` sets the initial selection.

## Change aspect ratios / export resolution

Edit `ASPECT_RATIOS` in `src/lib/aspect-ratios.ts`. Each entry defines the CSS aspect
(`cssAspect`) used for the preview and the `exportW`/`exportH` pixel dimensions used for
the PNG. To bump export resolution, raise `exportW`/`exportH` while keeping the ratio
(e.g. 16:9 → 2560×1440). Because the caption sizes in `cqw`, no other change is needed.

## Tune the caption fit

`CAPTION_LAYOUT` in `src/hooks/use-auto-fit-font.ts` controls the caption padding,
line height, max line count, and the min/max size clamp (in `cqw`). `TimecardPreview`
imports these same constants, so changing them keeps the measured fit and the rendered
caption in sync — edit them in one place only.

## Change the font

Replace `public/fonts/SomeTimeLater.woff2` and update the `src` in `src/app/fonts.ts`.
Keep the accompanying license file if the font requires attribution (the bundled font is
under SIL OFL 1.1 — see `public/fonts/SomeTimeLater-OFL.txt`).

## Enable dark mode later

The app is locked to light via `forcedTheme="light"` in `src/app/layout.tsx`. To allow
theme switching, remove `forcedTheme`, set `defaultTheme="system"` + `enableSystem`, and
add a theme toggle. The `.dark` tokens already exist in `src/app/globals.css`.
