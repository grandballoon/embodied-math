import { type Point, point } from "./point.ts";

/**
 * A circle: a center Point and a radius, both in plain (space-agnostic) units.
 * Like the rest of the geometry module, Circle knows nothing about coordinate
 * spaces — bridging to a branded MathVec/WorldVec happens at the call site.
 *
 * Future primitives (Line, Rect, Polygon, ...) live alongside it here.
 */
export interface Circle {
  readonly center: Point;
  /** Radius. Expected to be non-negative. */
  readonly radius: number;
}

/** Construct a Circle. Radius is clamped to be non-negative. */
export function circle(center: Point, radius: number): Circle {
  return { center, radius: Math.max(0, radius) };
}

/** The unit circle: center at origin, radius 1. */
export const UNIT_CIRCLE: Circle = circle(point(0, 0), 1);

export function diameter(c: Circle): number {
  return 2 * c.radius;
}

export function area(c: Circle): number {
  return Math.PI * c.radius * c.radius;
}

/** Arc length subtended by `angleRad` radians: s = rθ. */
export function arcLength(c: Circle, angleRad: number): number {
  return c.radius * angleRad;
}

/** Area of the sector subtended by `angleRad` radians: A = ½r²θ. */
export function sectorArea(c: Circle, angleRad: number): number {
  return 0.5 * c.radius * c.radius * angleRad;
}

export function circumference(c: Circle): number {
  return 2 * Math.PI * c.radius;
}

/** Whether a point lies inside or on the circle's edge. */
export function contains(c: Circle, p: Point): boolean {
  const dx = p.x - c.center.x;
  const dy = p.y - c.center.y;
  return dx * dx + dy * dy <= c.radius * c.radius;
}

/** Whether two circles overlap (touching counts as overlapping). */
export function intersects(a: Circle, b: Circle): boolean {
  const dx = a.center.x - b.center.x;
  const dy = a.center.y - b.center.y;
  const r = a.radius + b.radius;
  return dx * dx + dy * dy <= r * r;
}