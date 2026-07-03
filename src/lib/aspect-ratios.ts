export type AspectRatioId = "16:9" | "4:3" | "9:16";

export interface AspectRatio {
  id: AspectRatioId;
  label: string;
  /** CSS `aspect-ratio` value, e.g. "16 / 9". */
  cssAspect: string;
  /** Canonical export dimensions in pixels. */
  exportW: number;
  exportH: number;
}

export const ASPECT_RATIOS: AspectRatio[] = [
  { id: "16:9", label: "16:9", cssAspect: "16 / 9", exportW: 1920, exportH: 1080 },
  { id: "4:3", label: "4:3", cssAspect: "4 / 3", exportW: 1440, exportH: 1080 },
  { id: "9:16", label: "9:16", cssAspect: "9 / 16", exportW: 1080, exportH: 1920 },
];

export const DEFAULT_ASPECT_RATIO_ID: AspectRatioId = "16:9";

export function getAspectRatio(id: AspectRatioId): AspectRatio {
  return ASPECT_RATIOS.find((ar) => ar.id === id) ?? ASPECT_RATIOS[0];
}
