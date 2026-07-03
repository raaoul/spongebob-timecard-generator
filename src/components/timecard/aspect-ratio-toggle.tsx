"use client";

import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  ASPECT_RATIOS,
  type AspectRatioId,
} from "@/lib/aspect-ratios";

export interface AspectRatioToggleProps {
  value: AspectRatioId;
  onChange: (value: AspectRatioId) => void;
}

export function AspectRatioToggle({ value, onChange }: AspectRatioToggleProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label>Aspect ratio</Label>
      <ToggleGroup
        value={[value]}
        onValueChange={(groupValue: string[]) => {
          // Ignore attempts to deselect the active item (keep one selected).
          if (groupValue.length > 0) {
            onChange(groupValue[0] as AspectRatioId);
          }
        }}
        variant="outline"
      >
        {ASPECT_RATIOS.map((ar) => (
          <ToggleGroupItem key={ar.id} value={ar.id} aria-label={ar.label}>
            {ar.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
