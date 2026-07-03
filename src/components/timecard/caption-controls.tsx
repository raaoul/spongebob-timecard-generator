"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export interface CaptionControlsProps {
  value: string;
  onChange: (value: string) => void;
}

export function CaptionControls({ value, onChange }: CaptionControlsProps) {
  return (
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
      <p className="text-xs text-muted-foreground">
        Text size adjusts automatically to fit the frame.
      </p>
    </div>
  );
}
