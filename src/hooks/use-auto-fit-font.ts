import { useLayoutEffect, useState, type RefObject } from "react";

/**
 * Shared caption layout constants. The auto-fit measurement and the actual
 * <TimecardPreview> caption MUST use identical values or the on-screen fit
 * won't match the exported image. All spacing is expressed relative to the
 * container width so it scales with `cqw`.
 */
export const CAPTION_LAYOUT = {
  /** Padding per side, as a fraction of container width (used as `cqw`). */
  paddingRatio: 0.06,
  lineHeight: 1.05,
  fontWeight: 400 as number,
  maxLines: 4,
  /** Clamp range for the fitted size, in `cqw`. */
  minCqw: 3,
  maxCqw: 24,
};

/**
 * Computes the largest caption font size (returned in `cqw`) that fits inside
 * the container's width AND height, allowing wrapping up to `maxLines`.
 *
 * Returned as `cqw` (not px) so it is resolution-independent: the same value
 * renders correctly in the small on-screen preview and in the large fixed-size
 * html-to-image export. cqw = fontPx / containerWidthPx * 100.
 */
export function useAutoFitFont(
  text: string,
  containerRef: RefObject<HTMLElement | null>,
  fontFamily: string,
  enabled: boolean
): number {
  const [fitCqw, setFitCqw] = useState(CAPTION_LAYOUT.maxCqw);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || !enabled || typeof document === "undefined") return;

    const { paddingRatio, lineHeight, fontWeight, maxLines, minCqw, maxCqw } =
      CAPTION_LAYOUT;

    const mirror = document.createElement("div");
    Object.assign(mirror.style, {
      position: "absolute",
      left: "-99999px",
      top: "0",
      visibility: "hidden",
      pointerEvents: "none",
      boxSizing: "border-box",
      whiteSpace: "pre-wrap",
      wordBreak: "break-word",
      overflowWrap: "break-word",
      textAlign: "center",
      fontFamily,
      fontWeight: String(fontWeight),
      lineHeight: String(lineHeight),
      margin: "0",
      padding: "0",
    } satisfies Partial<CSSStyleDeclaration>);
    document.body.appendChild(mirror);
    // Non-empty content so an empty caption still yields a sensible size.
    mirror.textContent = text.length ? text : "M";

    function measure() {
      const rect = container!.getBoundingClientRect();
      const containerW = rect.width;
      const containerH = rect.height;
      if (containerW <= 0 || containerH <= 0) return;

      const padPx = paddingRatio * containerW;
      const availW = Math.max(1, containerW - padPx * 2);
      const availH = Math.max(1, containerH - padPx * 2);

      mirror.style.width = `${availW}px`;

      const fits = (px: number) => {
        mirror.style.fontSize = `${px}px`;
        const fitsWidth = mirror.scrollWidth <= Math.ceil(availW) + 1;
        const fitsHeight = mirror.scrollHeight <= Math.ceil(availH) + 1;
        const lines = Math.round(mirror.scrollHeight / (px * lineHeight));
        return fitsWidth && fitsHeight && lines <= maxLines;
      };

      // Upper bound: a single line can't be taller than the available height.
      let lo = 1;
      let hi = Math.max(2, availH / lineHeight);
      for (let i = 0; i < 24; i += 1) {
        const mid = (lo + hi) / 2;
        if (fits(mid)) lo = mid;
        else hi = mid;
      }

      const cqw = (lo / containerW) * 100;
      setFitCqw(Math.min(maxCqw, Math.max(minCqw, cqw)));
    }

    measure();

    const observer = new ResizeObserver(() => measure());
    observer.observe(container);

    return () => {
      observer.disconnect();
      mirror.remove();
    };
  }, [text, containerRef, fontFamily, enabled]);

  return fitCqw;
}
