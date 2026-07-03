import { useEffect, useState } from "react";

/**
 * Resolves true once web fonts are loaded and ready to rasterize. Gating export
 * on this prevents html-to-image from capturing a system-font fallback before
 * the real glyphs have loaded (which otherwise produces the wrong font on the
 * first export). Optionally waits for a specific font family.
 */
export function useFontsReady(fontFamily?: string): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function waitForFonts() {
      if (typeof document === "undefined" || !("fonts" in document)) {
        setReady(true);
        return;
      }
      try {
        await document.fonts.ready;
        if (fontFamily) {
          // Ask specifically for the timecard family so its glyphs are decoded.
          await document.fonts.load(`1em ${fontFamily}`).catch(() => {});
        }
      } finally {
        if (!cancelled) setReady(true);
      }
    }

    waitForFonts();
    return () => {
      cancelled = true;
    };
  }, [fontFamily]);

  return ready;
}
