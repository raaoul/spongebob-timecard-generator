export interface BackgroundImage {
  /** Stable key used in state and filenames. */
  id: string;
  /** Human-friendly name shown in the picker. */
  label: string;
  /** Full-size image served from /public. */
  src: string;
  /** Optional smaller image for the picker grid; falls back to `src`. */
  thumbnailSrc?: string;
  /** Optional attribution shown in the UI. */
  credit?: string;
}

/**
 * Background manifest. To add a background, drop the image file into
 * `public/backgrounds/` and add a matching entry here — no other code changes.
 * Images should be reasonably high-resolution (they are center-cropped with
 * `object-cover` to whatever aspect ratio the user selects).
 */
export const BACKGROUNDS: BackgroundImage[] = [
  {
    id: "bikini-bottom",
    label: "Bikini Bottom",
    src: "/backgrounds/bikini-bottom.svg",
  },
  {
    id: "jellyfish-fields",
    label: "Jellyfish Fields",
    src: "/backgrounds/jellyfish-fields.svg",
  },
  {
    id: "sunset-reef",
    label: "Sunset Reef",
    src: "/backgrounds/sunset-reef.svg",
  },
];

export const DEFAULT_BACKGROUND_ID = BACKGROUNDS[0].id;

export function getBackground(id: string): BackgroundImage {
  return BACKGROUNDS.find((bg) => bg.id === id) ?? BACKGROUNDS[0];
}
