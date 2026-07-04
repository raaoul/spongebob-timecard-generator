# Features

## Caption

A textarea drives the caption. Multi-line input and characters like "…" are supported.

By default the font size **auto-fits** the frame: short text renders large, long text
shrinks and wraps (up to a max line count) so it never overflows or clips. Uncheck
**Auto-fit** to set the size by hand with the slider or number input. The manual range is
capped at the auto-fit size — the largest that still fits — so a hand-picked size can
never overflow the frame either.

## Backgrounds

A thumbnail grid lets you pick a background. The set ships with 24 SpongeBob
title-card scenes (12 framed 16:9 at 1920×1080, 12 framed 4:3 at ~1440×1080).
Backgrounds are center-cropped (`object-cover`) to fill whatever aspect ratio is
selected, so any source image works regardless of its native dimensions — a 4:3
source shown at 16:9 upscales ~33%, which is why exports stay at 1× (see
[customization.md](customization.md)).

## Colors

- **Presets:** one-click classic timecard color combos (text + shadow).
- **Custom pickers:** independent color pickers for the text color and the shadow color
  (`react-colorful`, with a hex input).

Selecting a preset sets both colors at once. Editing either color deselects the active
preset while keeping your chosen colors.

## Aspect ratio

Choose **16:9**, **4:3**, or **9:16**. This controls both the on-screen preview shape and
the exported image dimensions (1920×1080 / 1440×1080 / 1080×1920). The caption re-fits
automatically when the ratio changes.

## Download

**Download PNG** rasterizes the preview to a crisp PNG at the canonical export size and
downloads it. The filename is derived from the caption (e.g. `3-hours-later.png`).
Buttons stay disabled until the timecard font has loaded, so the exported text always
uses the correct font.

## Share

Platform buttons (**X/Twitter**, **Facebook**, **Reddit**) open that platform's share
composer prefilled with the caption text and the app URL.

**Limitation:** with no backend, share links can only carry text + a URL — they cannot
attach the generated image file. The intended flow is: **Download** the PNG first, then
use a share button and attach the downloaded image in the post. A toast reminds you of
this. (Auto-attaching the image would require an upload backend or the Web Share API.)
