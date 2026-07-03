"use client";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { COLOR_PRESETS } from "@/lib/color-presets";
import { ColorPickerPopover } from "./color-picker-popover";

export interface ColorControlsProps {
  fgColor: string;
  shadowColor: string;
  activePresetId: string | null;
  onFgChange: (color: string) => void;
  onShadowChange: (color: string) => void;
  onApplyPreset: (presetId: string) => void;
}

export function ColorControls({
  fgColor,
  shadowColor,
  activePresetId,
  onFgChange,
  onShadowChange,
  onApplyPreset,
}: ColorControlsProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label>Presets</Label>
        <div className="flex flex-wrap gap-2">
          {COLOR_PRESETS.map((preset) => {
            const active = preset.id === activePresetId;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => onApplyPreset(preset.id)}
                aria-pressed={active}
                className={cn(
                  "flex items-center gap-2 rounded-full border px-3 py-1 text-xs transition-colors",
                  active
                    ? "border-primary ring-2 ring-primary/40"
                    : "hover:bg-accent"
                )}
              >
                <span
                  className="size-3.5 rounded-full border"
                  style={{ backgroundColor: preset.fg }}
                />
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <ColorPickerPopover
          label="Text color"
          color={fgColor}
          onChange={onFgChange}
        />
        <ColorPickerPopover
          label="Shadow color"
          color={shadowColor}
          onChange={onShadowChange}
        />
      </div>
    </div>
  );
}
