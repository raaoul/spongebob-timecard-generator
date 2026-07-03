import { useMemo, useReducer } from "react";
import {
  DEFAULT_ASPECT_RATIO_ID,
  type AspectRatioId,
} from "@/lib/aspect-ratios";
import { DEFAULT_BACKGROUND_ID } from "@/lib/backgrounds";
import { COLOR_PRESETS, DEFAULT_PRESET_ID, getPreset } from "@/lib/color-presets";

export interface TimecardState {
  caption: string;
  backgroundId: string;
  fgColor: string;
  shadowColor: string;
  /** Which preset is active, or null once a color is hand-edited. */
  activePresetId: string | null;
  aspectRatio: AspectRatioId;
}

type TimecardAction =
  | { type: "setCaption"; caption: string }
  | { type: "setBackground"; backgroundId: string }
  | { type: "setFgColor"; fgColor: string }
  | { type: "setShadowColor"; shadowColor: string }
  | { type: "applyPreset"; presetId: string }
  | { type: "setAspectRatio"; aspectRatio: AspectRatioId }
  | { type: "reset" };

function buildInitialState(): TimecardState {
  const preset = getPreset(DEFAULT_PRESET_ID) ?? COLOR_PRESETS[0];
  return {
    caption: "3 Hours Later…",
    backgroundId: DEFAULT_BACKGROUND_ID,
    fgColor: preset.fg,
    shadowColor: preset.shadow,
    activePresetId: preset.id,
    aspectRatio: DEFAULT_ASPECT_RATIO_ID,
  };
}

function reducer(state: TimecardState, action: TimecardAction): TimecardState {
  switch (action.type) {
    case "setCaption":
      return { ...state, caption: action.caption };
    case "setBackground":
      return { ...state, backgroundId: action.backgroundId };
    case "setFgColor":
      // Hand-editing a color deselects any active preset.
      return { ...state, fgColor: action.fgColor, activePresetId: null };
    case "setShadowColor":
      return { ...state, shadowColor: action.shadowColor, activePresetId: null };
    case "applyPreset": {
      const preset = getPreset(action.presetId);
      if (!preset) return state;
      return {
        ...state,
        fgColor: preset.fg,
        shadowColor: preset.shadow,
        activePresetId: preset.id,
      };
    }
    case "setAspectRatio":
      return { ...state, aspectRatio: action.aspectRatio };
    case "reset":
      return buildInitialState();
    default:
      return state;
  }
}

export function useTimecardState() {
  const [state, dispatch] = useReducer(reducer, undefined, buildInitialState);

  const actions = useMemo(
    () => ({
      setCaption: (caption: string) => dispatch({ type: "setCaption", caption }),
      setBackground: (backgroundId: string) =>
        dispatch({ type: "setBackground", backgroundId }),
      setFgColor: (fgColor: string) => dispatch({ type: "setFgColor", fgColor }),
      setShadowColor: (shadowColor: string) =>
        dispatch({ type: "setShadowColor", shadowColor }),
      applyPreset: (presetId: string) =>
        dispatch({ type: "applyPreset", presetId }),
      setAspectRatio: (aspectRatio: AspectRatioId) =>
        dispatch({ type: "setAspectRatio", aspectRatio }),
      reset: () => dispatch({ type: "reset" }),
    }),
    []
  );

  return { state, actions };
}
