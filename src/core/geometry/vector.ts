/**
 * A Vector is a DISPLACEMENT (or direction + magnitude) in 2D — distinct from
 * a Point, which is a location. Like point.ts, this module is self-contained
 * and unaware of the coordinate-space brands; that separation is deliberate.
 *
 * Vector algebra is closed: vector +/- vector -> vector, vector * scalar ->
 * vector. The interactions with Point (point - point -> vector, point + vector
 * -> point) live in point.ts, so this file has no dependency on Point and the
 * two can be reasoned about independently.
 *
 * Immutable throughout: every operation returns a new Vector.
 */

export interface Vector {
  readonly x: number;
  readonly y: number;
}

export function vector(x: number, y: number): Vector {
  return { x, y };
}

export const ZERO: Vector = vector(0, 0);
export const UNIT_X: Vector = vector(1, 0);
export const UNIT_Y: Vector = vector(0, 1);

export function add(a: Vector, b: Vector): Vector {
  return vector(a.x + b.x, a.y + b.y);
}

export function subtract(a: Vector, b: Vector): Vector {
  return vector(a.x - b.x, a.y - b.y);
}

/** Scale by a scalar. */
export function scale(v: Vector, s: number): Vector {
  return vector(v.x * s, v.y * s);
}

/** Reverse direction. */
export function negate(v: Vector): Vector {
  return vector(-v.x, -v.y);
}

export function dot(a: Vector, b: Vector): number {
  return a.x * b.x + a.y * b.y;
}

/**
 * 2D cross product, returning the scalar z-component of the 3D cross. Useful
 * for orientation tests (sign = which side) and parallelogram area.
 */
export function cross(a: Vector, b: Vector): number {
  return a.x * b.y - a.y * b.x;
}

export function length(v: Vector): number {
  return Math.hypot(v.x, v.y);
}

export function lengthSquared(v: Vector): number {
  return v.x * v.x + v.y * v.y;
}

/**
 * Unit vector in the same direction. A zero vector has no direction, so this
 * returns ZERO rather than producing NaNs — callers comparing against ZERO can
 * detect the degenerate case.
 */
export function normalize(v: Vector): Vector {
  const len = length(v);
  return len === 0 ? ZERO : vector(v.x / len, v.y / len);
}

/** Angle of the vector from +x axis, in radians, range (-π, π]. */
export function angle(v: Vector): number {
  return Math.atan2(v.y, v.x);
}

/** Signed angle FROM `a` TO `b`, in radians. */
export function angleBetween(a: Vector, b: Vector): number {
  return Math.atan2(cross(a, b), dot(a, b));
}

/** Rotate by `radians` counterclockwise. */
export function rotate(v: Vector, radians: number): Vector {
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  return vector(v.x * cos - v.y * sin, v.x * sin + v.y * cos);
}

/** Perpendicular vector (90° CCW). */
export function perpendicular(v: Vector): Vector {
  return vector(-v.y, v.x);
}

/** Projection of `a` onto `b`; returns ZERO if `b` is degenerate. */
export function project(a: Vector, b: Vector): Vector {
  const lenSq = lengthSquared(b);
  return lenSq === 0 ? ZERO : scale(b, dot(a, b) / lenSq);
}

export function equals(a: Vector, b: Vector, epsilon = 0): boolean {
  return Math.abs(a.x - b.x) <= epsilon && Math.abs(a.y - b.y) <= epsilon;
}