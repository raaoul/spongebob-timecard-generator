export interface ColorPreset {
  id: string;
  label: string;
  /** Caption text color (hex). */
  fg: string;
  /** Caption text-shadow color (hex). */
  shadow: string;
}

/**
 * Classic SpongeBob-timecard color combos. Colors are plain hex so the
 * html-to-image rasterizer and CSS `text-shadow` render predictably.
 */
export const COLOR_PRESETS: ColorPreset[] = [
  { id: "classic", label: "Classic", fg: "#ffffff", shadow: "#1b1b1b" },
  { id: "ocean", label: "Ocean", fg: "#ffffff", shadow: "#0b3a63" },
  { id: "krabby", label: "Krabby", fg: "#ffd24a", shadow: "#7a4a00" },
  { id: "jellyfish", label: "Jellyfish", fg: "#ffd9ef", shadow: "#7a1f52" },
  { id: "seafoam", label: "Seafoam", fg: "#eafff7", shadow: "#0f5c4a" },
  { id: "midnight", label: "Midnight", fg: "#c9e4ff", shadow: "#0a1030" },
];

export const DEFAULT_PRESET_ID = COLOR_PRESETS[0].id;

export function getPreset(id: string | null): ColorPreset | undefined {
  if (!id) return undefined;
  return COLOR_PRESETS.find((p) => p.id === id);
}
