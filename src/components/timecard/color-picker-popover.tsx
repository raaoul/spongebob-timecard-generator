"use client";

import { HexColorPicker } from "react-colorful";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface ColorPickerPopoverProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
}

export function ColorPickerPopover({
  label,
  color,
  onChange,
}: ColorPickerPopoverProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      <Popover>
        <PopoverTrigger
          className="flex items-center gap-2 rounded-md border px-2 py-1.5 text-sm hover:bg-accent"
          aria-label={`Choose ${label.toLowerCase()}`}
        >
          <span
            className="size-5 rounded-sm border"
            style={{ backgroundColor: color }}
          />
          <span className="font-mono uppercase">{color}</span>
        </PopoverTrigger>
        <PopoverContent className="w-auto items-center gap-3">
          <HexColorPicker color={color} onChange={onChange} />
          <Input
            value={color}
            onChange={(e) => onChange(e.target.value)}
            className="w-32 text-center font-mono uppercase"
            maxLength={7}
            aria-label={`${label} hex value`}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
