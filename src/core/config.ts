/**
 * Plane configuration state. Mirrors the settings popup controls.
 *
 * Two scale concepts are kept deliberately separate, per the original design:
 *  - `step`  (grid unit): how many math units sit between gridlines.
 *  - `pixelsPerUnit` (zoom): how many screen pixels one math unit occupies.
 * Conflating them would force a choice between zooming and label density.
 */

export type DisplayMode = "extend" | "framed";

export interface PlaneConfig {
  displayMode: DisplayMode;
  /** Math units per gridline. */
  step: number;
  /** Screen pixels per math unit (zoom). */
  pixelsPerUnit: number;
  showGrid: boolean;
  showLabels: boolean;
}

export const DEFAULT_CONFIG: PlaneConfig = {
  displayMode: "extend",
  step: 1,
  pixelsPerUnit: 60,
  showGrid: true,
  showLabels: true,
};

/** Below this many pixels between gridlines, refuse to rebuild (density guard). */
export const MIN_PIXELS_BETWEEN_GRIDLINES = 4;
