/**
 * A Point is a LOCATION in 2D space — distinct from a Vector, which is a
 * displacement. This module is self-contained: it does NOT know about the
 * coordinate-space brands (MathVec/WorldVec/CameraVec) in coordinates.ts.
 * Bridging between a branded space-vec and a geometry Point is explicit and
 * lives at the call site, which keeps the two concerns cleanly separated.
 *
 * The Point/Vector distinction is enforced in the algebra:
 *   - point - point  -> Vector   (the displacement between two locations)
 *   - point + vector -> Point    (translate a location by a displacement)
 *   - point + point  -> (disallowed; meaningless)
 * The point + point case simply has no function, so it can't be expressed.
 *
 * Everything here is immutable: operations return new objects.
 */

import { type Vector, vector } from "./vector.ts";

export interface Point {
  readonly x: number;
  readonly y: number;
}

export function point(x: number, y: number): Point {
  return { x, y };
}

export const ORIGIN: Point = point(0, 0);

/** Displacement FROM `a` TO `b`, as a Vector (b - a). */
export function displacement(a: Point, b: Point): Vector {
  return vector(b.x - a.x, b.y - a.y);
}

/** Translate a point by a vector, returning a new point. */
export function translate(p: Point, v: Vector): Point {
  return point(p.x + v.x, p.y + v.y);
}

/** Straight-line distance between two points. */
export function distance(a: Point, b: Point): number {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

/** Squared distance — cheaper when you only need to compare distances. */
export function distanceSquared(a: Point, b: Point): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return dx * dx + dy * dy;
}

/** The point partway from `a` to `b`; t=0 gives a, t=1 gives b. */
export function lerp(a: Point, b: Point, t: number): Point {
  return point(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t);
}

/** Midpoint of two points. */
export function midpoint(a: Point, b: Point): Point {
  return lerp(a, b, 0.5);
}

/** Centroid (average) of a set of points; throws on empty input. */
export function centroid(points: readonly Point[]): Point {
  if (points.length === 0) {
    throw new Error("centroid requires at least one point");
  }
  let sx = 0;
  let sy = 0;
  for (const p of points) {
    sx += p.x;
    sy += p.y;
  }
  return point(sx / points.length, sy / points.length);
}

export function equals(a: Point, b: Point, epsilon = 0): boolean {
  return Math.abs(a.x - b.x) <= epsilon && Math.abs(a.y - b.y) <= epsilon;
}