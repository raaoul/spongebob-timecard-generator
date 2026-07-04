"use client";

import { useEffect, useRef, useState } from "react";
import { getFontEmbedCSS } from "html-to-image";
import { someTimeLater } from "@/app/fonts";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useTimecardState } from "@/hooks/use-timecard-state";
import { useDebounce } from "@/hooks/use-debounce";
import { useFontsReady } from "@/hooks/use-fonts-ready";
import { useAutoFitFont } from "@/hooks/use-auto-fit-font";
import { getBackground } from "@/lib/backgrounds";
import { CaptionControls } from "./caption-controls";
import { BackgroundPicker } from "./background-picker";
import { ColorControls } from "./color-controls";
import { AspectRatioToggle } from "./aspect-ratio-toggle";
import { ExportActions } from "./export-actions";
import { TimecardPreview } from "./timecard-preview";

export function TimecardGenerator() {
  const { state, actions } = useTimecardState();
  const previewRef = useRef<HTMLDivElement>(null);

  const fontFamily = someTimeLater.style.fontFamily;
  const fontsReady = useFontsReady(fontFamily);

  // Debounce the caption feeding the fit calculation so typing stays smooth;
  // the visible caption still binds to live state.
  const debouncedCaption = useDebounce(state.caption, 150);
  const fitCqw = useAutoFitFont(
    debouncedCaption,
    previewRef,
    fontFamily,
    fontsReady
  );

  // Precompute embedded font CSS once fonts are ready so every export is
  // reliable (avoids intermittent font-embed fetch failures in html-to-image).
  const [fontEmbedCSS, setFontEmbedCSS] = useState<string | undefined>();
  useEffect(() => {
    if (!fontsReady || !previewRef.current) return;
    let cancelled = false;
    getFontEmbedCSS(previewRef.current)
      .then((css) => {
        if (!cancelled) setFontEmbedCSS(css);
      })
      .catch(() => {
        /* fall back to on-the-fly embedding during export */
      });
    return () => {
      cancelled = true;
    };
  }, [fontsReady]);

  // fitCqw is the largest size that fits, so it doubles as the max in manual
  // mode — capping there prevents caption overflow.
  const effectiveCqw = state.autoFit
    ? fitCqw
    : Math.min(state.fontSize, fitCqw);

  const background = getBackground(state.backgroundId);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 md:py-12">
      <header className="mb-8 text-center">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          SpongeBob Timecard Generator
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Type a caption, pick a background and colors, then download or share.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_1fr]">
        {/* Preview + export */}
        <div className="flex flex-col gap-4">
          <TimecardPreview
            ref={previewRef}
            caption={state.caption}
            backgroundSrc={background.src}
            fgColor={state.fgColor}
            shadowColor={state.shadowColor}
            aspectRatio={state.aspectRatio}
            fontFamily={fontFamily}
            fitCqw={effectiveCqw}
            className="rounded-xl shadow-sm"
          />
          <ExportActions
            previewRef={previewRef}
            fontsReady={fontsReady}
            caption={state.caption}
            aspectRatio={state.aspectRatio}
            fontEmbedCSS={fontEmbedCSS}
          />
        </div>

        {/* Controls */}
        <Card>
          <CardContent className="flex flex-col gap-6">
            <CaptionControls
              value={state.caption}
              onChange={actions.setCaption}
              autoFit={state.autoFit}
              onAutoFitChange={actions.setAutoFit}
              fontSize={state.autoFit ? fitCqw : state.fontSize}
              maxFontSize={fitCqw}
              onFontSizeChange={actions.setFontSize}
            />
            <Separator />
            <BackgroundPicker
              selectedId={state.backgroundId}
              onSelect={actions.setBackground}
            />
            <Separator />
            <ColorControls
              fgColor={state.fgColor}
              shadowColor={state.shadowColor}
              activePresetId={state.activePresetId}
              onFgChange={actions.setFgColor}
              onShadowChange={actions.setShadowColor}
              onApplyPreset={actions.applyPreset}
            />
            <Separator />
            <AspectRatioToggle
              value={state.aspectRatio}
              onChange={actions.setAspectRatio}
            />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
