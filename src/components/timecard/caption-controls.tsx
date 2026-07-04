"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CAPTION_LAYOUT } from "@/hooks/use-auto-fit-font";

export interface CaptionControlsProps {
  value: string;
  onChange: (value: string) => void;
  autoFit: boolean;
  onAutoFitChange: (autoFit: boolean) => void;
  /** Effective caption size in `cqw` (fitted value when auto-fitting). */
  fontSize: number;
  /** Largest size that still fits the frame, in `cqw`. */
  maxFontSize: number;
  onFontSizeChange: (fontSize: number) => void;
}

export function CaptionControls({
  value,
  onChange,
  autoFit,
  onAutoFitChange,
  fontSize,
  maxFontSize,
  onFontSizeChange,
}: CaptionControlsProps) {
  const min = Math.round(CAPTION_LAYOUT.minCqw);
  const max = Math.max(min, Math.round(maxFontSize));
  const sizeValue = Math.min(max, Math.max(min, Math.round(fontSize)));

  const clamp = (n: number) =>
    onFontSizeChange(Math.min(max, Math.max(min, n)));

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <Label htmlFor="timecard-caption">Caption</Label>
        <Textarea
          id="timecard-caption"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="3 Hours Later…"
          rows={2}
          className="resize-none"
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="timecard-fontsize">Font size</Label>
        <label className="flex items-center gap-2 text-xs text-muted-foreground">
          <input
            type="checkbox"
            checked={autoFit}
            onChange={(e) => onAutoFitChange(e.target.checked)}
            className="size-4 accent-primary"
          />
          Auto-fit
        </label>
      </div>

      <div className="flex items-center gap-3">
        <input
          id="timecard-fontsize"
          type="range"
          min={min}
          max={max}
          value={sizeValue}
          disabled={autoFit}
          onChange={(e) => clamp(Number(e.target.value))}
          className="h-2 flex-1 accent-primary disabled:opacity-50"
        />
        <Input
          type="number"
          min={min}
          max={max}
          value={sizeValue}
          disabled={autoFit}
          onChange={(e) => clamp(Number(e.target.value))}
          className="h-8 w-16"
        />
      </div>
    </div>
  );
}
