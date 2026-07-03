import { forwardRef } from "react";
import { getAspectRatio, type AspectRatioId } from "@/lib/aspect-ratios";
import { CAPTION_LAYOUT } from "@/hooks/use-auto-fit-font";
import { cn } from "@/lib/utils";

export interface TimecardPreviewProps {
  caption: string;
  backgroundSrc: string;
  fgColor: string;
  shadowColor: string;
  aspectRatio: AspectRatioId;
  /** Exact (hashed) font-family from next/font, so html-to-image embeds it. */
  fontFamily: string;
  /** Fitted caption size in `cqw`, from useAutoFitFont. */
  fitCqw: number;
  className?: string;
}

/**
 * The exportable timecard node. Everything sizes in container units (`cqw`) so
 * rendering the same node at a large fixed export size yields an identical,
 * crisp result. Uses a plain <img> (not next/image) for reliable rasterization.
 */
export const TimecardPreview = forwardRef<HTMLDivElement, TimecardPreviewProps>(
  function TimecardPreview(
    { caption, backgroundSrc, fgColor, shadowColor, aspectRatio, fontFamily, fitCqw, className },
    ref
  ) {
    const { cssAspect } = getAspectRatio(aspectRatio);
    const padCqw = CAPTION_LAYOUT.paddingRatio * 100;
    const shadowOffset = fitCqw * 0.06;

    return (
      <div
        ref={ref}
        className={cn("relative w-full overflow-hidden bg-black", className)}
        style={{ aspectRatio: cssAspect, containerType: "size" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={backgroundSrc}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <p
            style={{
              fontFamily,
              fontSize: `${fitCqw}cqw`,
              lineHeight: CAPTION_LAYOUT.lineHeight,
              color: fgColor,
              textShadow: `${shadowOffset}cqw ${shadowOffset}cqw 0 ${shadowColor}`,
              padding: `${padCqw}cqw`,
              margin: 0,
              width: "100%",
              textAlign: "center",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              overflowWrap: "break-word",
            }}
          >
            {caption}
          </p>
        </div>
      </div>
    );
  }
);
