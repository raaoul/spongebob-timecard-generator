"use client";

import { CheckIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { BACKGROUNDS } from "@/lib/backgrounds";

export interface BackgroundPickerProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export function BackgroundPicker({
  selectedId,
  onSelect,
}: BackgroundPickerProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label>Background</Label>
      <div className="grid grid-cols-3 gap-2">
        {BACKGROUNDS.map((bg) => {
          const selected = bg.id === selectedId;
          return (
            <button
              key={bg.id}
              type="button"
              onClick={() => onSelect(bg.id)}
              aria-pressed={selected}
              title={bg.label}
              className={cn(
                "group relative aspect-video overflow-hidden rounded-md border transition-all",
                selected
                  ? "border-primary ring-2 ring-primary/40"
                  : "hover:opacity-90"
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={bg.thumbnailSrc ?? bg.src}
                alt={bg.label}
                className="h-full w-full object-cover"
                draggable={false}
              />
              {selected && (
                <span className="absolute right-1 top-1 rounded-full bg-primary p-0.5 text-primary-foreground">
                  <CheckIcon className="size-3" />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
