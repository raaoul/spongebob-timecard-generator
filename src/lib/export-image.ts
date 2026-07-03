import { toPng, toBlob } from "html-to-image";

export interface ExportOptions {
  /** Output width in pixels (canonical export dimension). */
  width: number;
  /** Output height in pixels (canonical export dimension). */
  height: number;
  /** Pre-computed embedded @font-face CSS (see getFontEmbedCSS). */
  fontEmbedCSS?: string;
}

/**
 * Shared html-to-image options. We pass explicit pixel dimensions (rather than
 * relying on pixelRatio alone) so the exported image is crisp and identical
 * across aspect ratios regardless of the on-screen preview size. Because the
 * preview uses container-relative units (cqw/cqh), rendering the same node at a
 * larger fixed width just produces a sharper version of the same layout.
 */
function baseOptions({ width, height, fontEmbedCSS }: ExportOptions) {
  return {
    width,
    height,
    canvasWidth: width,
    canvasHeight: height,
    pixelRatio: 1,
    cacheBust: true,
    fontEmbedCSS,
    // Neutralize any transform/scale applied to the on-screen preview so the
    // clone rasterizes at its natural (fixed) dimensions.
    style: { transform: "none", transformOrigin: "top left" },
  } as const;
}

export function exportTimecardPng(
  node: HTMLElement,
  options: ExportOptions
): Promise<string> {
  return toPng(node, baseOptions(options));
}

export async function exportTimecardBlob(
  node: HTMLElement,
  options: ExportOptions
): Promise<Blob> {
  const blob = await toBlob(node, baseOptions(options));
  if (!blob) {
    throw new Error("Failed to render timecard image.");
  }
  return blob;
}

/** Slugify a caption into a safe filename base, e.g. "3 Hours Later…" -> "3-hours-later". */
export function slugifyCaption(caption: string, fallback = "timecard"): string {
  const slug = caption
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return slug || fallback;
}
