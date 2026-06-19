/**
 * Interactive shape model: the layer that makes the pure geometry data types
 * (Point, Vector, Circle, VertexTriangle) manipulable, without knowing HOW
 * they are rendered or what input device drives them.
 *
 * Everything here stays in MATH units and stays pure — no Three.js, no DOM.
 * A Shape is a tagged wrapper around one geometry value plus the semantics of
 * how it can be grabbed:
 *
 *   - handles(shape)              -> the grabbable control points
 *   - moveHandle(shape, i, p)     -> new shape with handle i moved to p
 *   - translateShape(shape, v)    -> new shape moved rigidly by a Vector
 *   - pickHandle / hitTestBody    -> hit-testing, tolerance in math units
 *
 * The geometry primitives stay immutable: every manipulation returns a new
 * Shape wrapping new geometry values. SideAngleTriangle has no variant here —
 * realize one via Triangles.toVertices() and wrap the vertex form; the bridge
 * exists precisely so rendering/interaction only ever needs vertices.
 */

import {
  type Point,
  type Vector,
  type Circle,
  type VertexTriangle,
  type Segment,
  Points,
  Vec,
  Circles,
  Triangles,
  Segments,
} from "./geometry/index.ts";
import * as FnGraphs from "./algebra/graphs.ts";
import type { FunctionGraph } from "./algebra/graphs.ts";

export type Shape =
  | { readonly kind: "point"; readonly at: Point }
  | { readonly kind: "vector"; readonly tail: Point; readonly v: Vector }
  | { readonly kind: "circle"; readonly circle: Circle }
  | { readonly kind: "triangle"; readonly tri: VertexTriangle }
  | { readonly kind: "segment"; readonly seg: Segment }
  | { readonly kind: "graph"; readonly graph: FunctionGraph }
  | {
      // The trig-teaching circle: a point swept around a circle by its angle
      // θ, whose coordinates ARE (r·cos θ, r·sin θ) — the circle→wave bridge.
      readonly kind: "unitCircle";
      readonly center: Point;
      readonly radius: number;
      readonly angle: number;
    }
  | {
      // A fraction-of-a-whole pie: a disk cut into `divisions` equal sectors,
      // with `filled` of them shaded. Sweep the rim knob to shade more — it
      // snaps to whole sectors, so the picture always reads as an exact M⁄N.
      readonly kind: "fractionCircle";
      readonly center: Point;
      readonly radius: number;
      readonly divisions: number;
      readonly filled: number;
    }
  | {
      // An axis-aligned-or-rotated square: `half` is half the side length (the
      // natural size scalar, mirroring a circle's radius), `angle` the rotation
      // of the corner handle around the center. Its diagonal is the embodied
      // source of √2 — drag a corner and watch d ⁄ s stay 1.41421… (the
      // half-diagonal/diagonal overlays are a scene-layer display concern).
      readonly kind: "square";
      readonly center: Point;
      readonly half: number;
      readonly angle: number;
    };

/** Where the vector's arrowhead sits: tail translated by the displacement. */
export function vectorTip(s: { tail: Point; v: Vector }): Point {
  return Points.translate(s.tail, s.v);
}

/** The point swept to angle θ on the circle: center + (r·cos θ, r·sin θ). */
export function unitCirclePoint(s: {
  center: Point;
  radius: number;
  angle: number;
}): Point {
  return Points.point(
    s.center.x + s.radius * Math.cos(s.angle),
    s.center.y + s.radius * Math.sin(s.angle),
  );
}

/**
 * The square's four corners, counter-clockwise starting at the HANDLE corner.
 * Corner 0 is the local (+half, +half) point rotated by `angle` — so at angle 0
 * it sits up-and-right of the center, a half-diagonal away. Corners 0 and 2 are
 * opposite (one diagonal); 1 and 3 are opposite (the other).
 */
export function squareCorners(s: {
  center: Point;
  half: number;
  angle: number;
}): [Point, Point, Point, Point] {
  const c = Math.cos(s.angle);
  const sn = Math.sin(s.angle);
  const corner = (lx: number, ly: number): Point =>
    Points.point(
      s.center.x + lx * c - ly * sn,
      s.center.y + lx * sn + ly * c,
    );
  return [
    corner(s.half, s.half),
    corner(-s.half, s.half),
    corner(-s.half, -s.half),
    corner(s.half, -s.half),
  ];
}

/**
 * The next power-of-two square, built ON this square's DIAGONAL: concentric,
 * rotated 45°, with its SIDE equal to `s`'s diagonal (so its `half` grows by
 * √2 and its AREA doubles). The original's four corners land exactly on the
 * midpoints of the new square's sides — the classic "doubling the square"
 * (Meno) construction. Apply it repeatedly to climb the powers of two: areas
 * go ×2, ×4, ×8, … and the squares spiral by 45° each step.
 */
export function doubleSquare(
  s: Extract<Shape, { kind: "square" }>,
): Extract<Shape, { kind: "square" }> {
  return {
    kind: "square",
    center: s.center,
    half: s.half * Math.SQRT2,
    angle: normalizeAngle(s.angle + Math.PI / 4),
  };
}

/** Fold any angle into [0, 2π) so the drawn arc and facts stay tidy. */
function normalizeAngle(a: number): number {
  const t = a % (2 * Math.PI);
  return t < 0 ? t + 2 * Math.PI : t;
}

/** The angular width of one sector: a full turn split `divisions` ways. */
function sectorStep(divisions: number): number {
  return (2 * Math.PI) / divisions;
}

/**
 * The rim knob that drives shading: it sits on the rim at the boundary of the
 * last shaded sector, angle = filled · (2π/divisions). Dragging it sweeps the
 * shaded count (see moveHandle), exactly the way unitCirclePoint anchors the
 * unit circle's polar handle.
 */
export function fractionKnob(s: {
  center: Point;
  radius: number;
  divisions: number;
  filled: number;
}): Point {
  const angle = s.filled * sectorStep(s.divisions);
  return Points.point(
    s.center.x + s.radius * Math.cos(angle),
    s.center.y + s.radius * Math.sin(angle),
  );
}

/**
 * The resize grip: a fixed point at the bottom of the rim (straight down from
 * the center). Its distance from the center sets the radius, mirroring a plain
 * circle's rim handle. Kept off the fill knob's sweep path (which starts at +x
 * and sweeps counter-clockwise) so the two seldom coincide; when they do, the
 * fill knob — the later handle — wins the pick.
 */
function fractionResizeHandle(s: { center: Point; radius: number }): Point {
  return Points.point(s.center.x, s.center.y - s.radius);
}

/**
 * The grabbable control points of a shape, as Points in math units.
 * Handle order is part of each variant's contract (moveHandle relies on it):
 *   point:    [the point]
 *   vector:   [tail, tip]
 *   circle:   [center, rim point at +x]
 *   triangle: [a, b, c]
 *   segment:  [a, b]
 *   graph:    delegated to algebra/graphs.ts (parameter handles)
 */
export function handles(s: Shape): readonly Point[] {
  switch (s.kind) {
    case "point":
      return [s.at];
    case "vector":
      return [s.tail, vectorTip(s)];
    case "circle":
      return [
        s.circle.center,
        Points.translate(s.circle.center, Vec.vector(s.circle.radius, 0)),
      ];
    case "triangle":
      return [s.tri.a, s.tri.b, s.tri.c];
    case "segment":
      return [s.seg.a, s.seg.b];
    case "graph":
      return FnGraphs.handles(s.graph);
    case "unitCircle":
      // [center, the angle point on the rim].
      return [s.center, unitCirclePoint(s)];
    case "fractionCircle":
      // [center, resize grip (bottom of rim), fill knob at the shaded boundary].
      // Fill is last so it wins the pick if the two rim handles ever coincide.
      return [s.center, fractionResizeHandle(s), fractionKnob(s)];
    case "square":
      // [center, the handle corner — a polar grip that rotates AND resizes].
      return [s.center, squareCorners(s)[0]];
  }
}

/**
 * Move one handle to a new location, returning a new Shape.
 *
 * Vector semantics: dragging the TAIL re-anchors the start while the tip stays
 * pinned (the displacement changes); dragging the TIP changes the displacement
 * directly. Rigid moves are translateShape's job, triggered by body drags.
 * Circle semantics: the center handle moves the circle; the rim handle resizes
 * it (radius = distance from center to the cursor).
 */
export function moveHandle(s: Shape, index: number, p: Point): Shape {
  switch (s.kind) {
    case "point":
      return { kind: "point", at: p };
    case "vector":
      return index === 0
        ? { kind: "vector", tail: p, v: Points.displacement(p, vectorTip(s)) }
        : { kind: "vector", tail: s.tail, v: Points.displacement(s.tail, p) };
    case "circle":
      return index === 0
        ? { kind: "circle", circle: Circles.circle(p, s.circle.radius) }
        : {
            kind: "circle",
            circle: Circles.circle(
              s.circle.center,
              Points.distance(s.circle.center, p),
            ),
          };
    case "triangle": {
      const verts: [Point, Point, Point] = [s.tri.a, s.tri.b, s.tri.c];
      verts[index] = p;
      return { kind: "triangle", tri: Triangles.vertexTriangle(...verts) };
    }
    case "segment":
      return index === 0
        ? { kind: "segment", seg: Segments.segment(p, s.seg.b) }
        : { kind: "segment", seg: Segments.segment(s.seg.a, p) };
    case "graph":
      return { kind: "graph", graph: FnGraphs.moveHandle(s.graph, index, p) };
    case "unitCircle": {
      if (index === 0) return { ...s, center: p };
      // The rim handle is a polar drag: its angle around the center sets θ,
      // its distance sets the radius — spin to sweep, pull to resize.
      const d = Points.displacement(s.center, p);
      return {
        ...s,
        angle: normalizeAngle(Math.atan2(d.y, d.x)),
        radius: Math.max(Points.distance(s.center, p), 0.05),
      };
    }
    case "fractionCircle": {
      if (index === 0) return { ...s, center: p };
      if (index === 1) {
        // Resize grip: distance from the center sets the radius, leaving the
        // fill/angle untouched (so shading and sizing stay independent).
        return { ...s, radius: Math.max(Points.distance(s.center, p), 0.1) };
      }
      // The fill knob is an angular slider: its angle around the center picks
      // how many whole sectors are shaded (snapped), 0..divisions. Distance is
      // ignored, so shading never resizes the pie.
      const d = Points.displacement(s.center, p);
      const theta = normalizeAngle(Math.atan2(d.y, d.x));
      const filled = Math.max(
        0,
        Math.min(s.divisions, Math.round(theta / sectorStep(s.divisions))),
      );
      return { ...s, filled };
    }
    case "square": {
      if (index === 0) return { ...s, center: p };
      // The corner handle is a polar grip: its direction around the center sets
      // the rotation (the handle corner sits 45° ahead of `angle`), its distance
      // sets the size (corner is a half-diagonal = half·√2 from the center).
      const d = Points.displacement(s.center, p);
      return {
        ...s,
        angle: normalizeAngle(Math.atan2(d.y, d.x) - Math.PI / 4),
        half: Math.max(Vec.length(d) / Math.SQRT2, 0.05),
      };
    }
  }
}

/** Move the whole shape rigidly by a displacement, returning a new Shape. */
export function translateShape(s: Shape, by: Vector): Shape {
  switch (s.kind) {
    case "point":
      return { kind: "point", at: Points.translate(s.at, by) };
    case "vector":
      return { kind: "vector", tail: Points.translate(s.tail, by), v: s.v };
    case "circle":
      return {
        kind: "circle",
        circle: Circles.circle(
          Points.translate(s.circle.center, by),
          s.circle.radius,
        ),
      };
    case "triangle":
      return {
        kind: "triangle",
        tri: Triangles.vertexTriangle(
          Points.translate(s.tri.a, by),
          Points.translate(s.tri.b, by),
          Points.translate(s.tri.c, by),
        ),
      };
    case "segment":
      return {
        kind: "segment",
        seg: Segments.segment(
          Points.translate(s.seg.a, by),
          Points.translate(s.seg.b, by),
        ),
      };
    case "graph":
      return { kind: "graph", graph: FnGraphs.translate(s.graph, by) };
    case "unitCircle":
      return { ...s, center: Points.translate(s.center, by) };
    case "fractionCircle":
      return { ...s, center: Points.translate(s.center, by) };
    case "square":
      return { ...s, center: Points.translate(s.center, by) };
  }
}

/**
 * The handle within `tolerance` of `p` that is closest to it, or null.
 * Tolerance is in math units (divide a pixel tolerance by pixelsPerUnit).
 */
export function pickHandle(
  s: Shape,
  p: Point,
  tolerance: number,
): number | null {
  const hs = handles(s);
  let best: number | null = null;
  let bestDistSq = tolerance * tolerance;
  for (let i = 0; i < hs.length; i++) {
    const dSq = Points.distanceSquared(hs[i], p);
    if (dSq <= bestDistSq) {
      best = i;
      bestDistSq = dSq;
    }
  }
  return best;
}

/**
 * Whether `p` touches the shape's body (for hover and rigid drags).
 * Filled shapes count their interior, so they can be grabbed anywhere;
 * stroke-like shapes (vector, point) use distance-to-geometry.
 */
export function hitTestBody(s: Shape, p: Point, tolerance: number): boolean {
  switch (s.kind) {
    case "point":
      return Points.distance(s.at, p) <= tolerance;
    case "vector":
      return distanceToSegment(s.tail, vectorTip(s), p) <= tolerance;
    case "circle":
      return Points.distance(s.circle.center, p) <= s.circle.radius + tolerance;
    case "triangle":
      return (
        containsPoint(s.tri, p) ||
        distanceToSegment(s.tri.a, s.tri.b, p) <= tolerance ||
        distanceToSegment(s.tri.b, s.tri.c, p) <= tolerance ||
        distanceToSegment(s.tri.c, s.tri.a, p) <= tolerance
      );
    case "segment":
      return distanceToSegment(s.seg.a, s.seg.b, p) <= tolerance;
    case "graph": {
      // Distance to the curve, approximated over a sampled window around
      // p.x — wide enough that steep curves whose nearest point is
      // horizontally offset still register.
      const window = Math.max(4 * tolerance, 0.25);
      const steps = 8;
      let prev = curvePoint(s.graph, p.x - window);
      for (let i = 1; i <= steps; i++) {
        const x = p.x - window + (2 * window * i) / steps;
        const cur = curvePoint(s.graph, x);
        if (distanceToSegment(prev, cur, p) <= tolerance) return true;
        prev = cur;
      }
      return false;
    }
    case "unitCircle":
      // Grabbable anywhere inside the disk (like a circle), for rigid moves.
      return Points.distance(s.center, p) <= s.radius + tolerance;
    case "fractionCircle":
      // Grabbable anywhere inside the disk, for rigid moves.
      return Points.distance(s.center, p) <= s.radius + tolerance;
    case "square": {
      // Rotate p into the square's local frame and test the [-half, half] box.
      const d = Points.displacement(s.center, p);
      const c = Math.cos(s.angle);
      const sn = Math.sin(s.angle);
      const lx = d.x * c + d.y * sn;
      const ly = -d.x * sn + d.y * c;
      return Math.abs(lx) <= s.half + tolerance && Math.abs(ly) <= s.half + tolerance;
    }
  }
}

// ---------------------------------------------------------------------------
// Size locking. A shape can have its characteristic scalar SIZE pinned during
// manipulation, driven by a per-shape lock toggle in the fact sheet. The lock
// flag lives in the scene layer (like color); these pure helpers say what
// "size" means and re-impose it after a handle move.
// ---------------------------------------------------------------------------

/** The shape's characteristic scalar size, or null if it has none. */
export function sizeOf(s: Shape): number | null {
  switch (s.kind) {
    case "point":
    case "graph":
      return null;
    case "vector":
      return Vec.length(s.v);
    case "circle":
      return s.circle.radius;
    case "unitCircle":
    case "fractionCircle":
      return s.radius;
    case "segment":
      return Points.distance(s.seg.a, s.seg.b);
    case "triangle":
      return Triangles.perimeter(s.tri);
    case "square":
      return 2 * s.half; // the side length
  }
}

/**
 * Whether a handle drag can change this shape's size — i.e. whether a size lock
 * is meaningful (and the fact sheet should offer one). Points/graphs have no
 * size; a fraction circle's radius is fixed (its knob only fills), so none of
 * the three is resizable.
 */
export function isResizable(s: Shape): boolean {
  switch (s.kind) {
    case "circle":
    case "unitCircle":
    case "fractionCircle":
    case "segment":
    case "vector":
    case "triangle":
    case "square":
      return true;
    case "point":
    case "graph":
      return false;
  }
}

/**
 * Re-impose `before`'s size onto `after` (same kind), leaving every other
 * manipulation intact: a circle still moves but keeps its radius, a vector
 * still rotates but keeps its length, a unit circle still sweeps its angle. A
 * triangle's size can't be separated from its shape, so any resizing drag is
 * rejected (the vertex freezes — move the whole triangle by its interior).
 */
export function constrainSize(before: Shape, after: Shape): Shape {
  switch (before.kind) {
    case "point":
    case "graph":
      return after;
    case "vector": {
      const a = after as Extract<Shape, { kind: "vector" }>;
      const target = Vec.length(before.v);
      const moved = Vec.length(a.v);
      if (moved < 1e-9) return before; // direction undefined; keep as-is
      return { kind: "vector", tail: a.tail, v: Vec.scale(a.v, target / moved) };
    }
    case "circle": {
      const a = after as Extract<Shape, { kind: "circle" }>;
      return {
        kind: "circle",
        circle: Circles.circle(a.circle.center, before.circle.radius),
      };
    }
    case "unitCircle": {
      const a = after as Extract<Shape, { kind: "unitCircle" }>;
      return { ...a, radius: before.radius };
    }
    case "fractionCircle": {
      const a = after as Extract<Shape, { kind: "fractionCircle" }>;
      return { ...a, radius: before.radius };
    }
    case "segment": {
      const a = after as Extract<Shape, { kind: "segment" }>;
      const target = Points.distance(before.seg.a, before.seg.b);
      // Keep whichever endpoint didn't move; re-place the dragged one so the
      // length is preserved (its direction still follows the cursor).
      const aMoved = Points.distance(before.seg.a, a.seg.a) > 1e-9;
      const fixed = aMoved ? a.seg.b : a.seg.a;
      const moving = aMoved ? a.seg.a : a.seg.b;
      const dir = Points.displacement(fixed, moving);
      const len = Vec.length(dir);
      const placed =
        len < 1e-9 ? moving : Points.translate(fixed, Vec.scale(dir, target / len));
      return {
        kind: "segment",
        seg: aMoved ? Segments.segment(placed, fixed) : Segments.segment(fixed, placed),
      };
    }
    case "triangle": {
      const a = after as Extract<Shape, { kind: "triangle" }>;
      const resized =
        Math.abs(Triangles.perimeter(a.tri) - Triangles.perimeter(before.tri)) > 1e-9;
      return resized ? before : a; // can't separate size from shape: freeze
    }
    case "square": {
      const a = after as Extract<Shape, { kind: "square" }>;
      return { ...a, half: before.half }; // keep size; rotation/center still move
    }
  }
}

// ---------------------------------------------------------------------------
// Position locking. Independent of the size lock: pins WHERE a shape sits while
// still letting handle drags resize/rotate/sweep it. Like size locking, the
// flag lives in the scene layer; these pure helpers define a shape's anchor
// point and re-impose it after a manipulation.
// ---------------------------------------------------------------------------

/**
 * Whether a shape can be repositioned — i.e. a position lock is meaningful (and
 * the fact sheet should offer one). Graphs are excluded: a line has no single
 * anchor point, so "position" isn't well defined. A point's only attribute is
 * its position, so locking it freezes the point entirely (intended).
 */
export function isMovable(s: Shape): boolean {
  return s.kind !== "graph";
}

/** The reference point a position lock pins; null for shapes with no anchor. */
function anchor(s: Shape): Point | null {
  switch (s.kind) {
    case "point":
      return s.at;
    case "vector":
      return s.tail;
    case "circle":
      return s.circle.center;
    case "unitCircle":
    case "fractionCircle":
    case "square":
      return s.center;
    case "segment":
      return Points.midpoint(s.seg.a, s.seg.b);
    case "triangle":
      return Points.centroid([s.tri.a, s.tri.b, s.tri.c]);
    case "graph":
      return null;
  }
}

/**
 * Re-impose `before`'s position onto `after` (same kind): translate `after` so
 * its anchor returns to where it was, leaving size/rotation/sweep intact. A
 * body drag becomes a no-op; a rim/tip handle drag still resizes or rotates
 * about the pinned anchor, while dragging the anchor handle itself does nothing.
 */
export function constrainPosition(before: Shape, after: Shape): Shape {
  const from = anchor(after);
  const to = anchor(before);
  if (!from || !to) return after;
  return translateShape(after, Points.displacement(from, to));
}

// ---------------------------------------------------------------------------
// Grid snapping. An optional, driver-wide aid (toggled in the controls panel):
// while dragging, a shape's key points jump to nearby whole-number lattice
// points so it lands on tidy coordinates. Every shape opts in now, via three
// snap kinds:
//   POSITION — moving the whole shape lands its anchor on a lattice point. The
//     center for circle/unit-circle/fraction-circle; for the multi-point shapes
//     (point/vector/segment/triangle) the nearest handle clicks into place while
//     the shape stays rigid.
//   RESIZE — dragging a circle-family rim grip sets the radius so the rim passes
//     through the lattice point nearest the cursor.
//   HANDLE — dragging any free point handle (a triangle corner, a vector/segment
//     endpoint, a graph's parameter handle — slope, intercept, vertex, …) snaps
//     that one handle to a lattice point via the shape's own moveHandle, which
//     turns tidy positions into tidy parameters. A unit circle's ANGLE and a
//     fraction circle's FILL knob stay free (polar/quantized — snapping a
//     coordinate would fight the gesture).
// The flag lives in the scene layer; `snapRole` says what a given handle drag
// should snap, and these pure helpers define the snap itself.
// ---------------------------------------------------------------------------

/** How close (in math units) a point must be to a lattice point to snap. */
const SNAP_TOLERANCE = 0.3;

/** The whole-number (integer-coordinate) point nearest to `p`. */
function nearestLatticePoint(p: Point): Point {
  return Points.point(Math.round(p.x), Math.round(p.y));
}

/**
 * What grid snap a handle drag should trigger: moving the center snaps the
 * shape's POSITION, dragging a resize grip snaps the CIRCUMFERENCE, dragging a
 * free point handle (triangle corner, vector/segment endpoint, graph parameter
 * handle) snaps that one HANDLE, and the polar/quantized handles (a unit
 * circle's angle, a fraction circle's fill knob) snap NOTHING. The driver
 * consults this before applying a snap.
 */
export type SnapRole = "position" | "resize" | "handle" | "none";

export function snapRole(s: Shape, handleIndex: number): SnapRole {
  switch (s.kind) {
    case "circle":
    case "unitCircle":
      // [center, rim] — center moves, rim resizes.
      return handleIndex === 0 ? "position" : "resize";
    case "fractionCircle":
      // [center, resize grip, fill knob] — the knob only shades, never resizes.
      if (handleIndex === 0) return "position";
      if (handleIndex === 1) return "resize";
      return "none";
    case "square":
      // [center, corner] — center moves, the corner is a free handle whose
      // lattice snap (via moveHandle) lands a tidy rotation AND size at once.
      return handleIndex === 0 ? "position" : "handle";
    case "point":
    case "vector":
    case "segment":
    case "triangle":
    case "graph":
      // Every handle is a free point (or a parameter handle living at a point):
      // dragging one snaps just that handle to the nearest lattice point.
      return "handle";
  }
}

/**
 * Snap a moved shape's anchor to a nearby lattice point, keeping the shape
 * rigid. Circle-family kinds snap their CENTER; the multi-point kinds
 * (point/vector/segment/triangle) translate by the smallest offset that lands
 * one of their handles on a lattice point, so the nearest corner/endpoint clicks
 * into place. A no-op when nothing is within tolerance (or for kinds, like a
 * graph, that have no single anchor to pin).
 */
export function snapToGridPosition(s: Shape): Shape {
  if (s.kind === "circle") {
    const target = nearestLatticePoint(s.circle.center);
    if (Points.distance(s.circle.center, target) > SNAP_TOLERANCE) return s;
    return { kind: "circle", circle: Circles.circle(target, s.circle.radius) };
  }
  if (s.kind === "unitCircle" || s.kind === "fractionCircle" || s.kind === "square") {
    const target = nearestLatticePoint(s.center);
    if (Points.distance(s.center, target) > SNAP_TOLERANCE) return s;
    return { ...s, center: target };
  }
  if (
    s.kind === "point" ||
    s.kind === "vector" ||
    s.kind === "segment" ||
    s.kind === "triangle"
  ) {
    // No single center: translate by the smallest offset that lands a handle
    // (corner/endpoint) on a lattice point. Nothing within tolerance => no snap.
    let bestOffset: Vector | null = null;
    let bestDist = SNAP_TOLERANCE;
    for (const h of handles(s)) {
      const target = nearestLatticePoint(h);
      const d = Points.distance(h, target);
      if (d <= bestDist) {
        bestDist = d;
        bestOffset = Points.displacement(h, target);
      }
    }
    return bestOffset ? translateShape(s, bestOffset) : s;
  }
  return s;
}

/**
 * Snap the dragged handle at `index` to a nearby lattice point, leaving the
 * shape's other handles fixed, by reconstructing through the shape's own
 * `moveHandle`. Generic over the free-point handles (triangle corner,
 * vector/segment endpoint, graph parameter handle — where landing the handle on
 * tidy coordinates yields tidy parameters). A no-op when the handle is beyond
 * tolerance. NOT for polar/quantized handles (circle rim, unit-circle angle,
 * fraction-circle fill) — those use position/resize/none roles instead.
 */
export function snapToGridHandle(s: Shape, index: number): Shape {
  const current = handles(s)[index];
  const target = nearestLatticePoint(current);
  if (Points.distance(current, target) > SNAP_TOLERANCE) return s;
  return moveHandle(s, index, target);
}

/**
 * Snap a resized shape's circumference to a nearby lattice point: the radius is
 * set so the rim passes through the lattice point nearest the cursor `p` (the
 * live rim position), when that point is within tolerance. A unit circle keeps
 * its angle and a fraction circle its shading — only the radius snaps.
 */
export function snapToGridResize(s: Shape, p: Point): Shape {
  if (s.kind === "circle") {
    const target = nearestLatticePoint(p);
    if (Points.distance(p, target) > SNAP_TOLERANCE) return s;
    const radius = Points.distance(s.circle.center, target);
    if (radius < 0.05) return s;
    return { kind: "circle", circle: Circles.circle(s.circle.center, radius) };
  }
  if (s.kind === "unitCircle" || s.kind === "fractionCircle") {
    const target = nearestLatticePoint(p);
    if (Points.distance(p, target) > SNAP_TOLERANCE) return s;
    const radius = Points.distance(s.center, target);
    if (radius < 0.05) return s;
    return { ...s, radius };
  }
  return s;
}

function curvePoint(g: FunctionGraph, x: number): Point {
  return Points.point(x, FnGraphs.evaluate(g, x));
}

/** Distance from `p` to the closed segment from `a` to `b`. */
export function distanceToSegment(a: Point, b: Point, p: Point): number {
  const ab = Points.displacement(a, b);
  const lenSq = Vec.lengthSquared(ab);
  if (lenSq === 0) return Points.distance(a, p);
  const t = Math.max(0, Math.min(1, Vec.dot(Points.displacement(a, p), ab) / lenSq));
  return Points.distance(p, Points.translate(a, Vec.scale(ab, t)));
}

/** Point-in-triangle via edge cross-product signs (works for either winding). */
function containsPoint(t: VertexTriangle, p: Point): boolean {
  const d1 = Vec.cross(Points.displacement(t.a, t.b), Points.displacement(t.a, p));
  const d2 = Vec.cross(Points.displacement(t.b, t.c), Points.displacement(t.b, p));
  const d3 = Vec.cross(Points.displacement(t.c, t.a), Points.displacement(t.c, p));
  const hasNeg = d1 < 0 || d2 < 0 || d3 < 0;
  const hasPos = d1 > 0 || d2 > 0 || d3 > 0;
  return !(hasNeg && hasPos);
}
