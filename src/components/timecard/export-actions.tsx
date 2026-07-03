"use client";

import { useState, type RefObject } from "react";
import { DownloadIcon, Share2Icon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { getAspectRatio, type AspectRatioId } from "@/lib/aspect-ratios";
import { exportTimecardPng, slugifyCaption } from "@/lib/export-image";
import { SHARE_TARGETS, buildShareUrl } from "@/lib/share";

export interface ExportActionsProps {
  previewRef: RefObject<HTMLDivElement | null>;
  fontsReady: boolean;
  caption: string;
  aspectRatio: AspectRatioId;
  fontEmbedCSS?: string;
}

export function ExportActions({
  previewRef,
  fontsReady,
  caption,
  aspectRatio,
  fontEmbedCSS,
}: ExportActionsProps) {
  const [busy, setBusy] = useState(false);

  async function generatePng(): Promise<string | null> {
    const node = previewRef.current;
    if (!node) return null;
    const { exportW, exportH } = getAspectRatio(aspectRatio);
    return exportTimecardPng(node, {
      width: exportW,
      height: exportH,
      fontEmbedCSS,
    });
  }

  async function handleDownload() {
    setBusy(true);
    try {
      const dataUrl = await generatePng();
      if (!dataUrl) return;
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${slugifyCaption(caption)}.png`;
      link.click();
      toast.success("Timecard downloaded");
    } catch (error) {
      console.error(error);
      toast.error("Could not generate the image. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  function handleShare(platform: (typeof SHARE_TARGETS)[number]["platform"]) {
    const shareUrl = buildShareUrl(platform, {
      text: caption,
      url: typeof window !== "undefined" ? window.location.href : "",
    });
    window.open(shareUrl, "_blank", "noopener,noreferrer");
    toast.info(
      "Download your timecard first, then attach the image in the post — links can't carry the image automatically."
    );
  }

  const disabled = !fontsReady || busy;

  return (
    <div className="flex flex-col gap-3">
      <Button onClick={handleDownload} disabled={disabled} className="w-full">
        <DownloadIcon className="size-4" />
        {busy ? "Generating…" : "Download PNG"}
      </Button>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Share2Icon className="size-3.5" />
          Share (opens a composer — attach your downloaded image)
        </div>
        <div className="grid grid-cols-3 gap-2">
          {SHARE_TARGETS.map((target) => (
            <Button
              key={target.platform}
              variant="outline"
              size="sm"
              disabled={busy}
              onClick={() => handleShare(target.platform)}
            >
              {target.label}
            </Button>
          ))}
        </div>
      </div>

      {!fontsReady && (
        <p className="text-xs text-muted-foreground">Loading font…</p>
      )}
    </div>
  );
}
