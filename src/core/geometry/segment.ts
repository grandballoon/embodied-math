import { type Point, distance, midpoint as pointMidpoint } from "./point.ts";

/**
 * A Segment is the straight path between two endpoint Points — the geometric
 * carrier for the linear-equation cluster of school algebra: slope, rise over
 * run, the midpoint formula, the distance formula, y = mx + b.
 *
 * Like the rest of the geometry module it is immutable, space-agnostic, and
 * unaware of coordinate brands. A full Line type (infinite extent) can be
 * derived from a Segment when needed; the segment is the manipulable thing.
 */
export interface Segment {
  readonly a: Point;
  readonly b: Point;
}

export function segment(a: Point, b: Point): Segment {
  return { a, b };
}

export function length(s: Segment): number {
  return distance(s.a, s.b);
}

export function midpoint(s: Segment): Point {
  return pointMidpoint(s.a, s.b);
}

/** Rise and run from `a` to `b`. */
export function deltas(s: Segment): { dx: number; dy: number } {
  return { dx: s.b.x - s.a.x, dy: s.b.y - s.a.y };
}

/** Slope Δy ⁄ Δx, or null for a vertical segment (undefined slope). */
export function slope(s: Segment): number | null {
  const { dx, dy } = deltas(s);
  return dx === 0 ? null : dy / dx;
}

/** y-intercept of the line through the segment, or null when vertical. */
export function yIntercept(s: Segment): number | null {
  const m = slope(s);
  return m === null ? null : s.a.y - m * s.a.x;
}
