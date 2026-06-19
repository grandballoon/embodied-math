/**
 * Geometry module barrel.
 *
 * Each primitive is re-exported under its own namespace rather than flattened,
 * so names like `equals`, `add`, `area`, `length` can live naturally in each
 * file without colliding. Call sites read with the boundary visible:
 *
 *   import { Vec, Points, Circles, Triangles } from "../core/geometry";
 *   Vec.add(a, b)
 *   Points.distance(p, q)
 *   Circles.area(c)
 *   Triangles.fromSSS(3, 4, 5)
 *
 * The TYPES are re-exported flat for ergonomic annotations (Point, Vector,
 * Circle, ...), since type names are unique across the module; only the
 * value-level helper names collided, and those stay namespaced.
 */

// Namespaced value exports (functions + constants).
export * as Vec from "./vector.ts";
export * as Points from "./point.ts";
export * as Circles from "./circle.ts";
export * as Triangles from "./triangle.ts";
export * as Segments from "./segment.ts";

// Flat type re-exports for annotations.
export type { Vector } from "./vector.ts";
export type { Point } from "./point.ts";
export type { Circle } from "./circle.ts";
export type { VertexTriangle, SideAngleTriangle } from "./triangle.ts";
export type { Segment } from "./segment.ts";