import * as THREE from "three";
import { type CoordinateSystem, mathVec } from "../core/coordinates.ts";
import { type Point, Points, Vec } from "../core/geometry/index.ts";
import {
  type Shape,
  handles,
  squareCorners,
  unitCirclePoint,
  vectorTip,
} from "../core/shapes.ts";
import * as FnGraphs from "../core/algebra/graphs.ts";

/**
 * Renders interactive shapes (core/shapes.ts models) as Three.js meshes, and
 * owns the list of shape entries plus their highlight ("lit") state. The
 * ShapeDriver reads `shapes` to hit-test and calls the mutators here; this
 * class never touches the DOM. Lit shapes draw brighter and show their
 * handles — the driver decides what is lit (hovered or grabbed, by any input
 * source); this layer doesn't distinguish why.
 *
 * Follows the CartesianPlane pattern: full rebuild on any change, disposing
 * per-rebuild geometry and materials. Shape counts are small (units, not
 * thousands), so rebuilding mid-drag is well within budget — don't add
 * per-mesh mutation until that's a measured problem.
 *
 * All math->world conversion goes through the CoordinateSystem ("one module
 * owns conversions"); geometry Points are bridged to MathVecs here at the
 * call site, as the geometry module's docs prescribe. Like the plane, world
 * units equal pixels, so stroke widths and handle radii read as px. Shapes
 * draw at z 2..5, above the plane's grid and labels (z 0..1).
 */

const SHAPE_COLORS: Record<Shape["kind"], number> = {
  point: 0xffd166,
  vector: 0x5ad1c2,
  circle: 0xc77dff,
  triangle: 0xff6b8a,
  segment: 0x8aa9ff,
  graph: 0xff9f43,
  unitCircle: 0xffe066,
  fractionCircle: 0x69db7c,
  square: 0x9775fa,
};
/** The square's diagonal and half-diagonal overlays each get a standout hue. */
const SQUARE_DIAGONAL_COLOR = 0xffd166;
const SQUARE_HALF_DIAGONAL_COLOR = 0xff922b;
/** The dot-product projection overlay: the "shadow" of v₂ along v₁. */
const PROJECTION_COLOR = 0xffd43b;
/** Per-form override so the graph families read differently. */
const GRAPH_COLORS: Record<FnGraphs.FunctionGraph["form"], number> = {
  linear: 0xff9f43,
  quadratic: 0x51cf66,
  trig: 0x4dabf7,
};
/** sin/cos/tan each get their own hue, all under the one "trig" form. */
const TRIG_COLORS: Record<FnGraphs.TrigFn, number> = {
  sin: 0x4dabf7,
  cos: 0xda77f2,
  tan: 0xffa94d,
};
const graphColor = (g: FnGraphs.FunctionGraph): number =>
  g.form === "trig" ? TRIG_COLORS[g.fn] : GRAPH_COLORS[g.form];
/** Samples across the visible width when plotting a function graph. */
const GRAPH_SAMPLES = 160;

/**
 * Where the unit circle's cosine trace is drawn:
 *  - "onSine": overlaid on the sine's right-side axis (compare the two waves).
 *  - "right": the same horizontal unroll, in its own lane below the sine.
 *  - "above": "stood up" vertically above the circle (the cosine mirror of the
 *    sine unroll — horizontal offset r·cos θ is preserved).
 */
export type CosinePlacement = "onSine" | "right" | "above";

const Z_FILL = 2;
const Z_BODY = 3;
const Z_HANDLE = 4;
const POINT_RADIUS = 6;
const STROKE = 3;
/** Shapes render at this multiple of their base material opacity by default. */
const DEFAULT_ALPHA = 2;

export interface ShapeEntry {
  readonly id: number;
  shape: Shape;
  /** Per-instance color override (0xRRGGBB); falls back to the kind default. */
  color?: number;
  /** When set, handle drags keep the shape's scalar size fixed (see shapes.ts). */
  sizeLocked?: boolean;
  /** When set, the shape's canvas position is pinned (see shapes.ts), independent of sizeLocked. */
  positionLocked?: boolean;
  /** Per-instance opacity multiplier on the body materials; default DEFAULT_ALPHA. */
  alpha?: number;
}

export class ShapeLayer {
  readonly group = new THREE.Group();

  private entries: ShapeEntry[] = [];
  private litIds: ReadonlySet<number> = new Set();
  private hiddenKinds = new Set<Shape["kind"]>();
  /** Hidden function families (a graph is shown only if its family is on too). */
  private hiddenGraphs = new Set<FnGraphs.GraphFamily>();
  private showTrace = true;
  private showCosTrace = false;
  /** Scene-level display toggles for the square's diagonal / half-diagonal. */
  private showDiagonal = false;
  private showHalfDiagonal = false;
  /** Dot-product projection overlay: drop v₂ onto v₁'s line, tail-to-tail. */
  private showProjection = false;
  /** Which two vectors the projection overlay relates (onto = v₁, from = v₂). */
  private projectionPair: { onto: number; from: number } | null = null;
  private cosPlacement: CosinePlacement = "onSine";
  /** Monotonic id source, so ids stay unique as shapes are added at runtime. */
  private nextId = 0;
  /** Opacity multiplier for the shape being drawn (set per entry in rebuild). */
  private bodyAlpha = 1;

  constructor(private readonly cs: CoordinateSystem) {}

  /**
   * The shapes the driver may pick: visible ones only, in draw order (later
   * entries render on top and win picks). Hidden kinds are excluded so you
   * can't grab what you can't see.
   */
  get shapes(): readonly ShapeEntry[] {
    return this.hiddenKinds.size === 0 && this.hiddenGraphs.size === 0
      ? this.entries
      : this.entries.filter((e) => this.isVisible(e.shape));
  }

  /**
   * Whether a shape renders / can be picked: its kind must be on, and a function
   * graph's family (sin/cos/tan/quadratic/linear) must be on as well.
   */
  private isVisible(shape: Shape): boolean {
    if (this.hiddenKinds.has(shape.kind)) return false;
    if (
      shape.kind === "graph" &&
      this.hiddenGraphs.has(FnGraphs.family(shape.graph))
    ) {
      return false;
    }
    return true;
  }

  /** Show or hide every shape of one kind, then redraw. */
  setKindVisible(kind: Shape["kind"], visible: boolean): void {
    const wasHidden = this.hiddenKinds.has(kind);
    if (visible === !wasHidden) return; // already in the requested state
    if (visible) this.hiddenKinds.delete(kind);
    else this.hiddenKinds.add(kind);
    this.rebuild();
  }

  /**
   * Show or hide one function family (sin/cos/tan/quadratic/linear), then
   * redraw. Independent of the "graph" kind toggle, which gates them all: a
   * graph shows only when its kind AND its family are both visible.
   */
  setGraphVisible(family: FnGraphs.GraphFamily, visible: boolean): void {
    const wasHidden = this.hiddenGraphs.has(family);
    if (visible === !wasHidden) return;
    if (visible) this.hiddenGraphs.delete(family);
    else this.hiddenGraphs.add(family);
    this.rebuild();
  }

  /** Toggle the sine-wave trace drawn beside each unit circle. */
  setTraceVisible(visible: boolean): void {
    if (this.showTrace === visible) return;
    this.showTrace = visible;
    this.rebuild();
  }

  /** Toggle the diagonal drawn across each square (corner to opposite corner). */
  setDiagonalVisible(visible: boolean): void {
    if (this.showDiagonal === visible) return;
    this.showDiagonal = visible;
    this.rebuild();
  }

  /** Toggle the half-diagonal drawn from each square's center to a corner. */
  setHalfDiagonalVisible(visible: boolean): void {
    if (this.showHalfDiagonal === visible) return;
    this.showHalfDiagonal = visible;
    this.rebuild();
  }

  /** Toggle the dot-product projection overlay between the paired vectors. */
  setProjectionVisible(visible: boolean): void {
    if (this.showProjection === visible) return;
    this.showProjection = visible;
    this.rebuild();
  }

  /**
   * Set which two vectors the projection overlay relates: `onto` is v₁ (the
   * direction projected ONTO), `from` is v₂ (the vector whose shadow is cast).
   * Pass null for either to clear the pair. Stored by id (not snapshot) so the
   * overlay follows both vectors live as they're dragged. Redraws only while
   * the overlay is on.
   */
  setProjectionPair(onto: number | null, from: number | null): void {
    const next = onto === null || from === null ? null : { onto, from };
    const same =
      (next === null && this.projectionPair === null) ||
      (next !== null &&
        this.projectionPair !== null &&
        next.onto === this.projectionPair.onto &&
        next.from === this.projectionPair.from);
    if (same) return;
    this.projectionPair = next;
    if (this.showProjection) this.rebuild();
  }

  /** Toggle the cosine-wave trace drawn for each unit circle. */
  setCosTraceVisible(visible: boolean): void {
    if (this.showCosTrace === visible) return;
    this.showCosTrace = visible;
    this.rebuild();
  }

  /** Choose where the cosine trace sits relative to the sine/circle. */
  setCosPlacement(placement: CosinePlacement): void {
    if (this.cosPlacement === placement) return;
    this.cosPlacement = placement;
    if (this.showCosTrace) this.rebuild();
  }

  setShapes(shapes: readonly Shape[]): void {
    this.entries = shapes.map((shape, id) => ({ id, shape }));
    this.nextId = shapes.length;
    this.rebuild();
  }

  /** Append a new shape with a fresh unique id (for runtime spawning). */
  addShape(shape: Shape): number {
    const id = this.nextId++;
    this.entries.push({ id, shape });
    this.rebuild();
    return id;
  }

  /** Remove a shape by id (for runtime deletion). No-op if it's already gone. */
  removeShape(id: number): void {
    const i = this.entries.findIndex((e) => e.id === id);
    if (i === -1) return;
    this.entries.splice(i, 1);
    if (this.litIds.has(id)) {
      const next = new Set(this.litIds);
      next.delete(id);
      this.litIds = next;
    }
    this.rebuild();
  }

  updateShape(id: number, shape: Shape): void {
    const entry = this.entries.find((e) => e.id === id);
    if (!entry) return;
    entry.shape = shape;
    this.rebuild();
  }

  setLit(ids: Iterable<number>): void {
    const next = new Set(ids);
    if (next.size === this.litIds.size && [...next].every((id) => this.litIds.has(id))) {
      return;
    }
    this.litIds = next;
    this.rebuild();
  }

  rebuild(): void {
    this.clearGroup();
    for (const entry of this.entries) {
      if (!this.isVisible(entry.shape)) continue;
      this.bodyAlpha = this.resolveAlpha(entry);
      this.drawShape(entry.shape, this.litIds.has(entry.id), this.resolveColor(entry));
    }
    this.bodyAlpha = 1; // overlays draw at their own opacity, not a shape's
    if (this.showProjection) this.drawProjection();
  }

  /**
   * The geometric heart of the dot product: drop v₂ onto v₁'s line. Both
   * vectors are placed TAIL-TO-TAIL at v₁'s tail (vectors are displacements, so
   * position is free) and the right triangle is drawn — adjacent leg = the
   * projection (the "shadow" projᵥ₁ v₂), hypotenuse = a ghost of v₂, opposite
   * leg = the perpendicular drop, plus a right-angle marker at the foot. The
   * shadow's length is exactly comp = (v₁·v₂)/|v₁|, so a·b = |v₁|·(that shadow).
   */
  private drawProjection(): void {
    if (this.projectionPair === null) return;
    const onto = this.entries.find((e) => e.id === this.projectionPair?.onto);
    const from = this.entries.find((e) => e.id === this.projectionPair?.from);
    if (!onto || !from) return; // a paired vector was deleted
    if (onto.shape.kind !== "vector" || from.shape.kind !== "vector") return;
    if (!this.isVisible(onto.shape) || !this.isVisible(from.shape)) return;
    const a = onto.shape; // v₁ — the direction projected onto
    const b = from.shape; // v₂ — the vector whose shadow we cast
    if (Vec.length(a.v) === 0) return; // no direction to project onto

    const origin = a.tail; // both vectors share this tail in the picture
    const proj = Vec.project(b.v, a.v); // the shadow vector, along v₁
    const foot = Points.translate(origin, proj); // tip of the shadow
    const ghostTip = Points.translate(origin, b.v); // v₂ relocated tail-to-tail

    const originW = this.toWorld(origin);
    const footW = this.toWorld(foot);
    const ghostTipW = this.toWorld(ghostTip);

    // Ghost of v₂ (the hypotenuse) and the perpendicular drop, faint white —
    // they're construction lines, not shapes.
    this.addSegment(originW, ghostTipW, 1.5, this.mat(0xffffff, 0.35));
    this.addSegment(ghostTipW, footW, 1.5, this.mat(0xffffff, 0.5));
    // The projection itself (adjacent leg) — the standout "shadow".
    this.addSegment(originW, footW, STROKE + 1, this.mat(PROJECTION_COLOR, 0.95));
    this.addDot(footW, 4, this.mat(PROJECTION_COLOR, 0.95));

    this.addRightAngleMarker(footW, originW, ghostTipW);
  }

  /**
   * A small square corner at `cornerW` showing the right angle between the two
   * legs running toward `aW` and `bW`. Skipped if either leg is degenerate (a
   * perpendicular projection collapses the shadow to a point).
   */
  private addRightAngleMarker(
    cornerW: { x: number; y: number },
    aW: { x: number; y: number },
    bW: { x: number; y: number },
  ): void {
    const size = 9; // world px
    const unit = (to: { x: number; y: number }) => {
      const dx = to.x - cornerW.x;
      const dy = to.y - cornerW.y;
      const len = Math.hypot(dx, dy);
      return len === 0 ? null : { x: dx / len, y: dy / len };
    };
    const u = unit(aW);
    const v = unit(bW);
    if (!u || !v) return;
    const p1 = { x: cornerW.x + u.x * size, y: cornerW.y + u.y * size };
    const p2 = { x: cornerW.x + v.x * size, y: cornerW.y + v.y * size };
    const elbow = {
      x: cornerW.x + (u.x + v.x) * size,
      y: cornerW.y + (u.y + v.y) * size,
    };
    const mat = this.mat(0xffffff, 0.5);
    this.addSegment(p1, elbow, 1.5, mat);
    this.addSegment(elbow, p2, 1.5, mat);
  }

  /** The color a shape draws in: its override, else the kind/graph default. */
  private resolveColor(entry: ShapeEntry): number {
    if (entry.color !== undefined) return entry.color;
    return entry.shape.kind === "graph"
      ? graphColor(entry.shape.graph)
      : SHAPE_COLORS[entry.shape.kind];
  }

  /** The effective color of one shape, for a color picker to reflect. */
  colorOf(id: number): number | null {
    const entry = this.entries.find((e) => e.id === id);
    return entry ? this.resolveColor(entry) : null;
  }

  /** Override one shape's color (0xRRGGBB), then redraw. */
  setColor(id: number, color: number): void {
    const entry = this.entries.find((e) => e.id === id);
    if (!entry || entry.color === color) return;
    entry.color = color;
    this.rebuild();
  }

  /** The opacity multiplier a shape draws at: its override, else the default. */
  private resolveAlpha(entry: ShapeEntry): number {
    return entry.alpha ?? DEFAULT_ALPHA;
  }

  /** The effective opacity multiplier of one shape, for the alpha slider. */
  alphaOf(id: number): number | null {
    const entry = this.entries.find((e) => e.id === id);
    return entry ? this.resolveAlpha(entry) : null;
  }

  /** Override one shape's opacity multiplier, then redraw. */
  setAlpha(id: number, alpha: number): void {
    const entry = this.entries.find((e) => e.id === id);
    if (!entry || entry.alpha === alpha) return;
    entry.alpha = alpha;
    this.rebuild();
  }

  /** Whether this shape's size is locked (the driver reads this live). */
  isSizeLocked(id: number): boolean {
    return this.entries.find((e) => e.id === id)?.sizeLocked ?? false;
  }

  /** Lock or unlock one shape's size. No redraw — nothing visual changes. */
  setSizeLocked(id: number, locked: boolean): void {
    const entry = this.entries.find((e) => e.id === id);
    if (entry) entry.sizeLocked = locked;
  }

  /** Whether this shape's position is locked (the driver reads this live). */
  isPositionLocked(id: number): boolean {
    return this.entries.find((e) => e.id === id)?.positionLocked ?? false;
  }

  /** Lock or unlock one shape's position. No redraw — nothing visual changes. */
  setPositionLocked(id: number, locked: boolean): void {
    const entry = this.entries.find((e) => e.id === id);
    if (entry) entry.positionLocked = locked;
  }

  private drawShape(s: Shape, lit: boolean, color: number): void {
    switch (s.kind) {
      case "point": {
        // The dot IS the handle, so a point never draws separate handles.
        const radius = lit ? POINT_RADIUS + 2 : POINT_RADIUS;
        this.addDot(this.toWorld(s.at), radius, this.mat(color, lit ? 1 : 0.9));
        return;
      }
      case "vector":
        this.addArrow(s.tail, vectorTip(s), color, lit);
        break;
      case "circle":
        this.addCircleShape(s.circle.center, s.circle.radius, color, lit);
        break;
      case "triangle":
        this.addTriangleShape(s.tri.a, s.tri.b, s.tri.c, color, lit);
        break;
      case "segment": {
        const aW = this.toWorld(s.seg.a);
        const bW = this.toWorld(s.seg.b);
        const material = this.mat(color, lit ? 1 : 0.85);
        this.addSegment(aW, bW, lit ? STROKE + 1 : STROKE, material);
        this.addDot(aW, 4, material);
        this.addDot(bW, 4, material);
        break;
      }
      case "graph":
        this.addGraph(s.graph, color, lit);
        break;
      case "unitCircle":
        this.addUnitCircle(s, color, lit);
        break;
      case "fractionCircle":
        this.addFractionCircle(s, color, lit);
        break;
      case "square":
        this.addSquare(s, color, lit);
        break;
    }
    if (lit) {
      this.bodyAlpha = 1; // handle markers are UI chrome — always full opacity
      for (const h of handles(s)) this.addHandle(h);
    }
  }

  private addArrow(tail: Point, tip: Point, color: number, lit: boolean): void {
    const a = this.toWorld(tail);
    const b = this.toWorld(tip);
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = Math.hypot(dx, dy);
    const material = this.mat(color, lit ? 1 : 0.85);
    if (len === 0) {
      // Zero vector: draw a small dot so it stays visible and grabbable.
      this.addDot(a, 4, material);
      return;
    }
    const headLen = Math.min(16, len * 0.5);
    const shaftEnd = {
      x: b.x - (dx / len) * headLen,
      y: b.y - (dy / len) * headLen,
    };
    this.addSegment(a, shaftEnd, lit ? STROKE + 1 : STROKE, material);

    // Arrowhead: a triangle with its apex at the tip, pointing along the vector.
    const head = new THREE.Shape();
    head.moveTo(0, 0);
    head.lineTo(-headLen, headLen * 0.42);
    head.lineTo(-headLen, -headLen * 0.42);
    const headMesh = new THREE.Mesh(new THREE.ShapeGeometry(head), material);
    headMesh.position.set(b.x, b.y, Z_BODY);
    headMesh.rotation.z = Math.atan2(dy, dx);
    this.group.add(headMesh);
  }

  private addCircleShape(
    center: Point,
    radius: number,
    color: number,
    lit: boolean,
  ): void {
    const c = this.toWorld(center);
    const r = radius * this.cs.pixelsPerUnit;
    if (r <= 0) {
      this.addDot(c, 4, this.mat(color, 1));
      return;
    }
    const fill = new THREE.Mesh(
      new THREE.CircleGeometry(r, 64),
      this.mat(color, lit ? 0.16 : 0.08),
    );
    fill.position.set(c.x, c.y, Z_FILL);
    this.group.add(fill);

    const t = lit ? STROKE + 1 : STROKE;
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(Math.max(0, r - t / 2), r + t / 2, 64),
      this.mat(color, lit ? 1 : 0.85),
    );
    ring.position.set(c.x, c.y, Z_BODY);
    this.group.add(ring);
  }

  /**
   * The trig circle: the ring, the radius to the swept point, and the right
   * triangle whose legs ARE cos θ (horizontal, in the cosine hue) and sin θ
   * (vertical, in the sine hue) — so the picture reads as the wave's source.
   */
  private addUnitCircle(
    s: Extract<Shape, { kind: "unitCircle" }>,
    color: number,
    lit: boolean,
  ): void {
    const p = unitCirclePoint(s);
    const foot: Point = { x: p.x, y: s.center.y }; // base of the sin leg
    const cW = this.toWorld(s.center);
    const pW = this.toWorld(p);
    const footW = this.toWorld(foot);
    const r = s.radius * this.cs.pixelsPerUnit;

    // The ring (faint fill so the disk is grabbable but doesn't dominate).
    if (r > 0) {
      const fill = new THREE.Mesh(
        new THREE.CircleGeometry(r, 64),
        this.mat(color, lit ? 0.12 : 0.06),
      );
      fill.position.set(cW.x, cW.y, Z_FILL);
      this.group.add(fill);
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(Math.max(0, r - STROKE / 2), r + STROKE / 2, 64),
        this.mat(color, lit ? 0.9 : 0.7),
      );
      ring.position.set(cW.x, cW.y, Z_BODY);
      this.group.add(ring);

      // The swept angle, drawn as a wedge arc from the +x axis to θ.
      const arc = new THREE.Mesh(
        new THREE.RingGeometry(r * 0.18, r * 0.26, 32, 1, 0, s.angle),
        this.mat(color, lit ? 0.95 : 0.75),
      );
      arc.position.set(cW.x, cW.y, Z_BODY);
      this.group.add(arc);
    }

    // The two legs of the reference triangle, colored to match the waves.
    const t = lit ? STROKE + 1 : STROKE;
    this.addSegment(cW, footW, t, this.mat(TRIG_COLORS.cos, lit ? 1 : 0.85)); // cos
    this.addSegment(footW, pW, t, this.mat(TRIG_COLORS.sin, lit ? 1 : 0.85)); // sin
    // The radius (hypotenuse) on top, in the circle's own hue.
    this.addSegment(cW, pW, t, this.mat(color, lit ? 1 : 0.9));
    this.addDot(cW, 4, this.mat(color, 0.95));

    if (this.showTrace) this.addSineTrace(s, lit);
    if (this.showCosTrace) this.addCosineTrace(s, lit, this.cosPlacement);
  }

  /**
   * The circle→wave bridge made literal: unroll the height sin θ to the right
   * of the circle as the curve y = k + r·sin t for t ∈ [0, θ], so sweeping the
   * angle handle draws the sine wave out one radian at a time. A faint
   * connector ties the point on the circle to the wave's leading edge — both
   * sit at the same height, which is the whole idea.
   */
  private addSineTrace(
    s: Extract<Shape, { kind: "unitCircle" }>,
    lit: boolean,
  ): void {
    if (s.angle <= 1e-6) return;
    const startX = s.center.x + s.radius; // wave axis begins at the 3-o'clock point
    // One horizontal math unit per radian, so the drawn period is 2π wide.
    const samples = Math.max(2, Math.ceil(s.angle * 16));
    const pts: Point[] = [];
    for (let i = 0; i <= samples; i++) {
      const t = (s.angle * i) / samples;
      pts.push({ x: startX + t, y: s.center.y + s.radius * Math.sin(t) });
    }
    const wave = pts.map((p) => this.toWorld(p));
    this.addPolyline(wave, lit ? STROKE + 1 : STROKE, this.mat(TRIG_COLORS.sin, lit ? 0.95 : 0.8));

    // Connector: the circle's current point across to the wave's tip.
    const tipW = wave[wave.length - 1];
    const pointW = this.toWorld(unitCirclePoint(s));
    this.addSegment(pointW, tipW, 1.5, this.mat(0xffffff, lit ? 0.5 : 0.3));
    this.addDot(tipW, 4, this.mat(TRIG_COLORS.sin, 0.95));
  }

  /**
   * The cosine companion to addSineTrace, in the cos hue (matching the circle's
   * magenta cos leg). Sweeping θ draws y = r·cos t for t ∈ [0, θ] in one of
   * three placements (see CosinePlacement):
   *  - "onSine"/"right": unrolled HORIZONTALLY like the sine, sharing the sine's
   *    right-side axis ("onSine") or in its own panel just past the sine's tip at
   *    the same height ("right", with a faint baseline since that panel has no
   *    natural anchor).
   *  - "above": unrolled VERTICALLY above the circle (x = cx + r·cos t over
   *    y = startY + t). Here the wave's horizontal offset r·cos θ equals the
   *    circle point's, so a straight-up connector ties the two — the cosine
   *    mirror of the sine trace's same-height connector.
   */
  private addCosineTrace(
    s: Extract<Shape, { kind: "unitCircle" }>,
    lit: boolean,
    placement: CosinePlacement,
  ): void {
    if (s.angle <= 1e-6) return;
    const samples = Math.max(2, Math.ceil(s.angle * 16));
    const width = lit ? STROKE + 1 : STROKE;
    const waveMat = this.mat(TRIG_COLORS.cos, lit ? 0.95 : 0.8);

    if (placement === "above") {
      const startY = s.center.y + s.radius; // axis begins at the 12-o'clock point
      const pts: Point[] = [];
      for (let i = 0; i <= samples; i++) {
        const t = (s.angle * i) / samples;
        pts.push({ x: s.center.x + s.radius * Math.cos(t), y: startY + t });
      }
      const wave = pts.map((q) => this.toWorld(q));
      this.addPolyline(wave, width, waveMat);
      const tipW = wave[wave.length - 1];
      // The circle's point straight up to the wave tip — both at x = cx + r·cos θ.
      this.addSegment(
        this.toWorld(unitCirclePoint(s)),
        tipW,
        1.5,
        this.mat(0xffffff, lit ? 0.5 : 0.3),
      );
      this.addDot(tipW, 4, this.mat(TRIG_COLORS.cos, 0.95));
      return;
    }

    // Horizontal unroll: overlaid on the sine axis ("onSine"), or in its own
    // panel just past the sine's current tip at the same height ("right").
    const baseY = s.center.y;
    const startX =
      placement === "right"
        ? s.center.x + s.radius + s.angle + 0.8
        : s.center.x + s.radius;
    if (placement === "right") {
      // Faint baseline so the floating panel reads as an axis.
      this.addSegment(
        this.toWorld({ x: startX, y: baseY }),
        this.toWorld({ x: startX + s.angle, y: baseY }),
        1,
        this.mat(0xffffff, lit ? 0.35 : 0.2),
      );
    }
    const pts: Point[] = [];
    for (let i = 0; i <= samples; i++) {
      const t = (s.angle * i) / samples;
      pts.push({ x: startX + t, y: baseY + s.radius * Math.cos(t) });
    }
    const wave = pts.map((q) => this.toWorld(q));
    this.addPolyline(wave, width, waveMat);
    this.addDot(wave[wave.length - 1], 4, this.mat(TRIG_COLORS.cos, 0.95));
  }

  /**
   * A fraction pie: `divisions` equal sectors with `filled` of them shaded in
   * translucent color. The shaded region is ONE wedge spanning [0, filled·step]
   * (counter-clockwise from the +x axis, like the math); spokes mark every
   * sector boundary. The rim knob that sweeps the shaded count is drawn by the
   * generic handle pass when lit.
   */
  private addFractionCircle(
    s: Extract<Shape, { kind: "fractionCircle" }>,
    color: number,
    lit: boolean,
  ): void {
    const cW = this.toWorld(s.center);
    const r = s.radius * this.cs.pixelsPerUnit;
    if (r <= 0) {
      this.addDot(cW, 4, this.mat(color, 1));
      return;
    }
    const step = (2 * Math.PI) / s.divisions;

    // Shaded sectors as a single translucent wedge (no fill when none shaded).
    if (s.filled > 0) {
      const wedge = new THREE.Mesh(
        new THREE.CircleGeometry(r, 64, 0, s.filled * step),
        this.mat(color, lit ? 0.34 : 0.26),
      );
      wedge.position.set(cW.x, cW.y, Z_FILL);
      this.group.add(wedge);
    }

    // Spokes dividing the disk into equal sectors (faint, so the fill reads).
    const spokeMat = this.mat(color, lit ? 0.5 : 0.35);
    for (let i = 0; i < s.divisions; i++) {
      const a = i * step;
      const rim = this.toWorld({
        x: s.center.x + s.radius * Math.cos(a),
        y: s.center.y + s.radius * Math.sin(a),
      });
      this.addSegment(cW, rim, 1.5, spokeMat);
    }

    // The rim itself.
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(Math.max(0, r - STROKE / 2), r + STROKE / 2, 64),
      this.mat(color, lit ? 0.9 : 0.7),
    );
    ring.position.set(cW.x, cW.y, Z_BODY);
    this.group.add(ring);
    this.addDot(cW, 4, this.mat(color, 0.95));
  }

  /**
   * A square: the filled body, four edges, and — when the scene toggles are on
   * — its diagonal (corner→opposite corner) and half-diagonal (center→corner).
   * Drawing the half-diagonal AFTER the diagonal lays it on top of the diagonal's
   * inner half, so the picture reads "the half-diagonal is half of the diagonal."
   */
  private addSquare(
    s: Extract<Shape, { kind: "square" }>,
    color: number,
    lit: boolean,
  ): void {
    const corners = squareCorners(s);
    const cw = corners.map((p) => this.toWorld(p));

    const outline = new THREE.Shape();
    outline.moveTo(cw[0].x, cw[0].y);
    for (let i = 1; i < cw.length; i++) outline.lineTo(cw[i].x, cw[i].y);
    outline.closePath();
    const fill = new THREE.Mesh(
      new THREE.ShapeGeometry(outline),
      this.mat(color, lit ? 0.18 : 0.1),
    );
    fill.position.z = Z_FILL;
    this.group.add(fill);

    const edgeMat = this.mat(color, lit ? 1 : 0.85);
    const t = lit ? STROKE + 1 : STROKE;
    for (let i = 0; i < cw.length; i++) {
      this.addSegment(cw[i], cw[(i + 1) % cw.length], t, edgeMat);
    }

    if (this.showDiagonal) {
      this.addSegment(cw[0], cw[2], t, this.mat(SQUARE_DIAGONAL_COLOR, lit ? 1 : 0.9));
    }
    if (this.showHalfDiagonal) {
      const centerW = this.toWorld(s.center);
      this.addSegment(centerW, cw[0], t + 1, this.mat(SQUARE_HALF_DIAGONAL_COLOR, 1));
      this.addDot(centerW, 4, this.mat(SQUARE_HALF_DIAGONAL_COLOR, 1));
    }
  }

  private addTriangleShape(
    a: Point,
    b: Point,
    c: Point,
    color: number,
    lit: boolean,
  ): void {
    const aW = this.toWorld(a);
    const bW = this.toWorld(b);
    const cW = this.toWorld(c);

    const outline = new THREE.Shape();
    outline.moveTo(aW.x, aW.y);
    outline.lineTo(bW.x, bW.y);
    outline.lineTo(cW.x, cW.y);
    outline.closePath();
    const fill = new THREE.Mesh(
      new THREE.ShapeGeometry(outline),
      this.mat(color, lit ? 0.18 : 0.1),
    );
    fill.position.z = Z_FILL;
    this.group.add(fill);

    // Edges as rectangle meshes, same reason as the plane's axes: WebGL lines
    // clamp to 1px, so anything with visible thickness must be a mesh.
    const edgeMat = this.mat(color, lit ? 1 : 0.85);
    const t = lit ? STROKE + 1 : STROKE;
    this.addSegment(aW, bW, t, edgeMat);
    this.addSegment(bW, cW, t, edgeMat);
    this.addSegment(cW, aW, t, edgeMat);
  }

  /** Sample the function across the visible domain and draw it as a ribbon. */
  private addGraph(g: FnGraphs.FunctionGraph, color: number, lit: boolean): void {
    const { minX, maxX, minY, maxY } = this.cs.mathBounds();
    // A sample outside this generous window (a steep parabola or a tangent
    // shooting toward an asymptote) ends the current run, so the ribbon
    // breaks at discontinuities instead of streaking vertically across them.
    const yLo = minY * 3;
    const yHi = maxY * 3;
    const material = this.mat(color, lit ? 1 : 0.85);
    material.side = THREE.DoubleSide;
    const thickness = lit ? STROKE + 1 : STROKE;
    let run: { x: number; y: number }[] = [];
    const flush = (): void => {
      this.addPolyline(run, thickness, material);
      run = [];
    };
    for (let i = 0; i <= GRAPH_SAMPLES; i++) {
      const x = minX + ((maxX - minX) * i) / GRAPH_SAMPLES;
      const y = FnGraphs.evaluate(g, x);
      if (!Number.isFinite(y) || y < yLo || y > yHi) {
        flush();
        continue;
      }
      run.push(this.toWorld({ x, y }));
    }
    flush();
  }

  /**
   * One mesh for a whole polyline: a triangle strip extruded sideways from
   * the sample points. Per-sample rectangle meshes would churn hundreds of
   * geometries on every drag-frame rebuild; this is a single buffer.
   */
  private addPolyline(
    pts: readonly { x: number; y: number }[],
    thickness: number,
    material: THREE.MeshBasicMaterial,
  ): void {
    if (pts.length < 2) return;
    const half = thickness / 2;
    const positions: number[] = [];
    const indices: number[] = [];
    for (let i = 0; i < pts.length; i++) {
      const prev = pts[Math.max(0, i - 1)];
      const next = pts[Math.min(pts.length - 1, i + 1)];
      const dx = next.x - prev.x;
      const dy = next.y - prev.y;
      const len = Math.hypot(dx, dy) || 1;
      const nx = (-dy / len) * half;
      const ny = (dx / len) * half;
      positions.push(
        pts[i].x + nx, pts[i].y + ny, Z_BODY,
        pts[i].x - nx, pts[i].y - ny, Z_BODY,
      );
      if (i > 0) {
        const a = 2 * (i - 1);
        indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
      }
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geom.setIndex(indices);
    this.group.add(new THREE.Mesh(geom, material));
  }

  private addHandle(p: Point): void {
    const w = this.toWorld(p);
    const rim = new THREE.Mesh(
      new THREE.RingGeometry(4, 6, 20),
      this.mat(0x000000, 0.55),
    );
    rim.position.set(w.x, w.y, Z_HANDLE);
    this.group.add(rim);
    this.addDot(w, 4, this.mat(0xffffff, 0.95), Z_HANDLE + 1);
  }

  private addDot(
    w: { x: number; y: number },
    radius: number,
    material: THREE.MeshBasicMaterial,
    z = Z_BODY,
  ): void {
    const dot = new THREE.Mesh(new THREE.CircleGeometry(radius, 24), material);
    dot.position.set(w.x, w.y, z);
    this.group.add(dot);
  }

  private addSegment(
    a: { x: number; y: number },
    b: { x: number; y: number },
    thickness: number,
    material: THREE.MeshBasicMaterial,
  ): void {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = Math.hypot(dx, dy);
    if (len === 0) return;
    const seg = new THREE.Mesh(new THREE.PlaneGeometry(len, thickness), material);
    seg.position.set((a.x + b.x) / 2, (a.y + b.y) / 2, Z_BODY);
    seg.rotation.z = Math.atan2(dy, dx);
    this.group.add(seg);
  }

  private toWorld(p: Point): { x: number; y: number } {
    return this.cs.mathToWorld(mathVec(p.x, p.y));
  }

  private mat(color: number, opacity: number): THREE.MeshBasicMaterial {
    return new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: Math.min(1, opacity * this.bodyAlpha),
    });
  }

  /** Unlike the plane, nothing here is cached or shared: dispose everything. */
  private clearGroup(): void {
    for (const child of [...this.group.children]) {
      this.group.remove(child);
      const mesh = child as THREE.Mesh;
      mesh.geometry.dispose();
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      for (const m of mats) m.dispose();
    }
  }
}
