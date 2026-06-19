import { type Point, point } from "./point.ts";

/**
 * Two representations of a triangle, both in plain (space-agnostic) units, so
 * we can compare ergonomics before committing to one (per the "build both,
 * decide later" call). Like the rest of geometry, this module is unaware of
 * coordinate-space brands; bridging to MathVec/WorldVec happens at the call site.
 *
 * Naming convention for both forms: vertices are A, B, C; the side opposite a
 * vertex shares its lowercase letter (side a is opposite vertex A, i.e. BC).
 * This is the standard trig labelling and keeps the law-of-cosines/sines code
 * readable.
 */

// ---------------------------------------------------------------------------
// Form 1: vertex-based — three points, sides and angles derived on demand.
// ---------------------------------------------------------------------------

export interface VertexTriangle {
  readonly a: Point;
  readonly b: Point;
  readonly c: Point;
}

export function vertexTriangle(a: Point, b: Point, c: Point): VertexTriangle {
  return { a, b, c };
}

function dist(p: Point, q: Point): number {
  const dx = p.x - q.x;
  const dy = p.y - q.y;
  return Math.hypot(dx, dy);
}

/**
 * Side lengths as [a, b, c], each opposite the same-letter vertex:
 *   a = |BC|, b = |CA|, c = |AB|.
 */
export function sides(t: VertexTriangle): [number, number, number] {
  return [dist(t.b, t.c), dist(t.c, t.a), dist(t.a, t.b)];
}

/**
 * Interior angles in radians as [A, B, C], via the law of cosines.
 * Returns zeros for a degenerate triangle (zero-length side).
 */
export function angles(t: VertexTriangle): [number, number, number] {
  const [a, b, c] = sides(t);
  if (a === 0 || b === 0 || c === 0) return [0, 0, 0];
  const A = Math.acos(clampCos((b * b + c * c - a * a) / (2 * b * c)));
  const B = Math.acos(clampCos((a * a + c * c - b * b) / (2 * a * c)));
  const C = Math.PI - A - B;
  return [A, B, C];
}

/** Signed area via the shoelace formula; positive when A,B,C are CCW. */
export function signedArea(t: VertexTriangle): number {
  return (
    ((t.b.x - t.a.x) * (t.c.y - t.a.y) -
      (t.c.x - t.a.x) * (t.b.y - t.a.y)) /
    2
  );
}

export function vertexArea(t: VertexTriangle): number {
  return Math.abs(signedArea(t));
}

export function perimeter(t: VertexTriangle): number {
  const [a, b, c] = sides(t);
  return a + b + c;
}

export type SideClassification = "equilateral" | "isosceles" | "scalene";
export type AngleClassification = "right" | "acute" | "obtuse";

/**
 * Classification by side lengths. `relTolerance` is the relative difference
 * under which two sides count as equal — deliberately loose (1%) so a user
 * dragging a vertex can actually land on "isosceles" or "equilateral".
 */
export function classifyBySides(
  t: VertexTriangle,
  relTolerance = 0.01,
): SideClassification {
  const [a, b, c] = sides(t);
  const eq = (x: number, y: number) =>
    Math.abs(x - y) <= relTolerance * Math.max(x, y);
  const pairs = (eq(a, b) ? 1 : 0) + (eq(b, c) ? 1 : 0) + (eq(a, c) ? 1 : 0);
  return pairs >= 2 ? "equilateral" : pairs === 1 ? "isosceles" : "scalene";
}

/** Classification by largest angle; tolerance in radians (default ≈ 0.5°). */
export function classifyByAngles(
  t: VertexTriangle,
  toleranceRad = 0.009,
): AngleClassification {
  const largest = Math.max(...angles(t));
  if (Math.abs(largest - Math.PI / 2) <= toleranceRad) return "right";
  return largest < Math.PI / 2 ? "acute" : "obtuse";
}

/** Circumradius via the law of sines (a = 2R·sin A); 0 when degenerate. */
export function circumradius(t: VertexTriangle): number {
  const [a] = sides(t);
  const [A] = angles(t);
  const sinA = Math.sin(A);
  return sinA === 0 ? 0 : a / (2 * sinA);
}

// ---------------------------------------------------------------------------
// Form 2: side/angle-based — the SSS/SAS/etc. world. Stores all three sides
// and all three angles in a canonical, fully-resolved form. Constructors take
// partial information and solve the rest.
// ---------------------------------------------------------------------------

export interface SideAngleTriangle {
  /** Side lengths [a, b, c], each opposite the same-letter angle. */
  readonly sides: readonly [number, number, number];
  /** Angles in radians [A, B, C], each opposite the same-letter side. */
  readonly angles: readonly [number, number, number];
}

/** SSS: three sides. Solves the angles via the law of cosines. */
export function fromSSS(a: number, b: number, c: number): SideAngleTriangle {
  const A = Math.acos(clampCos((b * b + c * c - a * a) / (2 * b * c)));
  const B = Math.acos(clampCos((a * a + c * c - b * b) / (2 * a * c)));
  const C = Math.PI - A - B;
  return { sides: [a, b, c], angles: [A, B, C] };
}

/**
 * SAS: two sides and the included angle (between sides b and c, i.e. angle A,
 * given in radians). Solves the third side via the law of cosines, then the
 * remaining angles.
 */
export function fromSAS(b: number, angleA: number, c: number): SideAngleTriangle {
  const a = Math.sqrt(b * b + c * c - 2 * b * c * Math.cos(angleA));
  return fromSSS(a, b, c);
}

/**
 * ASA: two angles (radians) and the included side between them (side c, the
 * side between angles A and B). Solves via angle sum + law of sines.
 */
export function fromASA(angleA: number, c: number, angleB: number): SideAngleTriangle {
  const C = Math.PI - angleA - angleB;
  // Law of sines: a / sin A = c / sin C.
  const a = (c * Math.sin(angleA)) / Math.sin(C);
  const b = (c * Math.sin(angleB)) / Math.sin(C);
  return { sides: [a, b, c], angles: [angleA, angleB, C] };
}

export function sideAngleArea(t: SideAngleTriangle): number {
  // Area = (1/2) · b · c · sin A.
  const [, b, c] = t.sides;
  const [A] = t.angles;
  return 0.5 * b * c * Math.sin(A);
}

// ---------------------------------------------------------------------------
// Bridge: realize a side/angle triangle as concrete vertices, so the two forms
// can be compared and so anything that renders needs only the vertex form.
// Places A at the origin, B along +x at distance c, C by polar placement.
// ---------------------------------------------------------------------------

export function toVertices(
  t: SideAngleTriangle,
  origin: Point = point(0, 0),
): VertexTriangle {
  const [, b, c] = t.sides;
  const [A] = t.angles;
  const a = origin;
  const bPt = point(origin.x + c, origin.y);
  const cPt = point(origin.x + b * Math.cos(A), origin.y + b * Math.sin(A));
  return { a, b: bPt, c: cPt };
}

// ---------------------------------------------------------------------------

/** Guard acos input against floating-point drift outside [-1, 1]. */
function clampCos(x: number): number {
  return Math.min(1, Math.max(-1, x));
}

/** Convenience: radians <-> degrees, since trig input is often in degrees. */
export const toDegrees = (rad: number): number => (rad * 180) / Math.PI;
export const toRadians = (deg: number): number => (deg * Math.PI) / 180;