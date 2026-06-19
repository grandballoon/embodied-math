import {
  type Circle,
  type Point,
  type Segment,
  type Vector,
  type VertexTriangle,
  Circles,
  Points,
  Segments,
  Triangles,
  Vec,
} from "./geometry/index.ts";
import type { Shape } from "./shapes.ts";
import * as FnGraphs from "./algebra/graphs.ts";
import type { TrigFn } from "./algebra/graphs.ts";
import { num } from "./algebra/ast.ts";
import { equation } from "./algebra/equation.ts";
import { toText } from "./algebra/print.ts";
import * as R from "./algebra/rational.ts";
import type { Step } from "./algebra/rewrite.ts";
import { expand, factor } from "./algebra/rules.ts";
import { type SolveStep, solveQuadratic, solveStepToText } from "./algebra/solve.ts";
import { polyOf, toExact } from "./algebra/structure.ts";

/**
 * Mathematical fact sheets for the interactive shapes: the curriculum layer.
 *
 * Each shape kind gets a builder that computes every property a middle/high-
 * school student meets for that object — Khan Academy's algebra, geometry,
 * and trig coverage is the yardstick — packaged as display-ready strings:
 * the live value, the symbolic formula, and the formula with this shape's
 * numbers substituted. Values recompute on every call, so a panel re-rendering
 * during a drag shows the math changing as the shape changes — that's the
 * point of the whole app.
 *
 * Pure presentation over pure math: the geometry modules own the VALUES
 * (area(), slope(), classifyByAngles(), ...); this module owns their human-
 * readable form. No DOM, no Three.js — any renderer (HTML panel, canvas
 * sprite, screen reader) can consume FactGroups.
 *
 * To deepen a type's coverage, extend its builder; to cover a new primitive,
 * add a case to shapeFacts (the switch is exhaustive, so TypeScript will
 * insist).
 */

export interface Fact {
  readonly label: string;
  readonly value: string;
  /** The general formula, symbolic: "A = πr²". */
  readonly formula?: string;
  /** The formula with this shape's numbers substituted. */
  readonly detail?: string;
}

export interface FactGroup {
  readonly title: string;
  readonly facts: readonly Fact[];
}

export function shapeFacts(s: Shape): FactGroup[] {
  switch (s.kind) {
    case "point":
      return pointFacts(s.at);
    case "vector":
      return vectorFacts(s.tail, s.v);
    case "circle":
      return circleFacts(s.circle);
    case "unitCircle":
      return unitCircleFacts(s.center, s.radius, s.angle);
    case "fractionCircle":
      return fractionCircleFacts(s.divisions, s.filled, s.radius);
    case "square":
      return squareFacts(s.center, s.half, s.angle);
    case "triangle":
      return triangleFacts(s.tri);
    case "segment":
      return segmentFacts(s.seg);
    case "graph":
      switch (s.graph.form) {
        case "linear":
          return linearGraphFacts(s.graph.m, s.graph.b);
        case "quadratic":
          return quadraticGraphFacts(s.graph.a, s.graph.h, s.graph.k);
        case "trig":
          return trigGraphFacts(s.graph.fn, s.graph.a, s.graph.b, s.graph.h, s.graph.k);
      }
  }
}

// ---------------------------------------------------------------------------
// Point: coordinates, quadrants, distance from origin.
// ---------------------------------------------------------------------------

function pointFacts(p: Point): FactGroup[] {
  const d = Points.distance(Points.ORIGIN, p);
  return [
    {
      title: "Point",
      facts: [
        { label: "Coordinates", value: pt(p) },
        { label: "Quadrant", value: quadrantOf(p) },
        {
          label: "Distance from origin",
          value: fmt(d),
          formula: "d = √(x² + y²)",
          detail: `√(${fmt(p.x * p.x)} + ${fmt(p.y * p.y)}) = ${fmt(d)}`,
        },
      ],
    },
  ];
}

function quadrantOf(p: Point): string {
  if (p.x === 0 && p.y === 0) return "origin";
  if (p.x === 0) return "on the y-axis";
  if (p.y === 0) return "on the x-axis";
  if (p.x > 0) return p.y > 0 ? "I" : "IV";
  return p.y > 0 ? "II" : "III";
}

// ---------------------------------------------------------------------------
// Vector: components, magnitude (Pythagoras in disguise), direction, slope.
// ---------------------------------------------------------------------------

function vectorFacts(tail: Point, v: Vector): FactGroup[] {
  const len = Vec.length(v);
  const theta = Vec.angle(v);
  const unit = Vec.normalize(v);
  const tip = Points.translate(tail, v);
  const slope = v.x === 0 ? null : v.y / v.x;
  return [
    {
      title: "Vector",
      facts: [
        { label: "Components", value: `⟨${fmt(v.x)}, ${fmt(v.y)}⟩` },
        {
          label: "Tail → tip",
          value: `${pt(tail)} → ${pt(tip)}`,
          formula: "tip = tail + v",
        },
        {
          label: "Magnitude",
          value: fmt(len),
          formula: "|v| = √(x² + y²)",
          detail: `√(${fmt(v.x * v.x)} + ${fmt(v.y * v.y)}) = ${fmt(len)}`,
        },
        {
          label: "Direction",
          value: `${deg(theta)} = ${fmt(theta)} rad`,
          formula: "θ = atan2(y, x)",
        },
        {
          label: "Slope",
          value: slope === null ? "undefined (vertical)" : fmt(slope),
          formula: "m = rise ⁄ run = y ⁄ x",
        },
        {
          label: "Unit vector",
          value: Vec.equals(unit, Vec.ZERO)
            ? "— (zero vector)"
            : `⟨${fmt(unit.x)}, ${fmt(unit.y)}⟩`,
          formula: "v̂ = v ⁄ |v|",
        },
        {
          label: "Pythagorean tie-in",
          value: `${fmt(v.x * v.x)} + ${fmt(v.y * v.y)} = ${fmt(len * len)}`,
          formula: "x² + y² = |v|²",
        },
      ],
    },
  ];
}

// ---------------------------------------------------------------------------
// Dot product: a BINARY relationship between two vectors, so it lives outside
// the single-shape vectorFacts. main.ts appends this group to the focused
// vector's sheet when a second (previously-focused) vector is on the canvas.
// `a` is v₁ (the remembered partner), `b` is v₂ (the one in focus).
// ---------------------------------------------------------------------------

export function dotProductFacts(a: Vector, b: Vector): FactGroup {
  const d = Vec.dot(a, b);
  const la = Vec.length(a);
  const lb = Vec.length(b);
  const ang = Math.abs(Vec.angleBetween(a, b)); // unsigned angle between
  const cos = la === 0 || lb === 0 ? null : d / (la * lb);
  const scalarProj = la === 0 ? null : d / la; // component of v₂ along v₁
  const relationship =
    la === 0 || lb === 0
      ? "— (zero vector)"
      : Math.abs(d) < 1e-9
        ? "perpendicular (v₁ · v₂ = 0)"
        : d > 0
          ? "acute angle (v₁ · v₂ > 0)"
          : "obtuse angle (v₁ · v₂ < 0)";
  return {
    title: "Dot product (v₁ · v₂)",
    facts: [
      {
        label: "v₁ · v₂",
        value: fmt(d),
        formula: "a · b = aₓbₓ + aᵧbᵧ",
        detail: `(${fmt(a.x)})(${fmt(b.x)}) + (${fmt(a.y)})(${fmt(b.y)}) = ${fmt(d)}`,
      },
      {
        label: "Geometric form",
        value: fmt(d),
        formula: "a · b = |a| |b| cos θ",
        detail: `${fmt(la)} · ${fmt(lb)} · cos ${deg(ang)} = ${fmt(d)}`,
      },
      {
        label: "Angle between",
        value: cos === null ? "—" : `${deg(ang)} = ${fmt(ang)} rad`,
        formula: "cos θ = (a · b) ⁄ (|a| |b|)",
        detail:
          cos === null ? undefined : `cos θ = ${fmt(d)} ⁄ ${fmt(la * lb)} = ${fmt(cos)}`,
      },
      { label: "Relationship", value: relationship },
      {
        label: "Scalar projection of v₂ onto v₁",
        value: scalarProj === null ? "—" : fmt(scalarProj),
        formula: "comp₍ᵥ₁₎ v₂ = (a · b) ⁄ |a|",
      },
    ],
  };
}

// ---------------------------------------------------------------------------
// Circle: r/d/C/A, the standard-form equation, π itself, radians and arcs.
// ---------------------------------------------------------------------------

function circleFacts(c: Circle): FactGroup[] {
  const r = c.radius;
  const d = Circles.diameter(c);
  const circ = Circles.circumference(c);
  const area = Circles.area(c);
  return [
    {
      title: "Circle",
      facts: [
        { label: "Center", value: pt(c.center) },
        { label: "Radius", value: fmt(r) },
        { label: "Diameter", value: fmt(d), formula: "d = 2r" },
        {
          label: "Circumference",
          value: fmt(circ),
          formula: "C = 2πr = πd",
          detail: `2π·${fmt(r)} = ${fmt(circ)}`,
        },
        {
          label: "Area",
          value: fmt(area),
          formula: "A = πr²",
          detail: `π·${fmt(r)}² = ${fmt(area)}`,
        },
        {
          label: "π, always",
          value: d === 0 ? "—" : fmt(circ / d, 5),
          formula: "π = C ⁄ d",
        },
        {
          label: "Equation",
          value: circleEquation(c),
          formula: "(x − h)² + (y − k)² = r²",
        },
      ],
    },
    {
      title: "Radians & arcs",
      facts: [
        { label: "Full turn", value: "360° = 2π rad ≈ 6.283" },
        {
          label: "Arc of 1 radian",
          value: fmt(Circles.arcLength(c, 1)),
          formula: "s = rθ — one radian's arc is one radius",
        },
        {
          label: "Quarter turn (90° = π⁄2)",
          value: `arc ${fmt(Circles.arcLength(c, Math.PI / 2))}`,
          formula: "s = rθ",
        },
        {
          label: "Quarter sector area",
          value: fmt(Circles.sectorArea(c, Math.PI / 2)),
          formula: "A = ½r²θ",
        },
      ],
    },
  ];
}

// ---------------------------------------------------------------------------
// Unit circle: the angle θ and its coordinates — sin/cos/tan made geometric.
// ---------------------------------------------------------------------------

function unitCircleFacts(center: Point, radius: number, angle: number): FactGroup[] {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const onAxis = Math.abs(cos) < 1e-12;
  const px = center.x + radius * cos;
  const py = center.y + radius * sin;

  return [
    {
      title: "Angle on the circle",
      facts: [
        { label: "Center", value: pt(center) },
        { label: "Radius", value: fmt(radius) },
        {
          label: "Angle θ",
          value: `${fmtPi(angle)} rad = ${deg(angle)}`,
          formula: "measured counter-clockwise from the positive x-axis",
        },
        { label: "Quadrant", value: angleQuadrant(angle) },
        {
          label: "Point",
          value: pt(Points.point(px, py)),
          formula: "(h + r·cos θ, k + r·sin θ)",
        },
      ],
    },
    {
      title: "Trig from the triangle",
      facts: [
        {
          label: "cos θ",
          value: exactTrig(cos),
          formula: "cos θ = x ⁄ r — the horizontal leg",
          detail: `${fmt(px - center.x)} ⁄ ${fmt(radius)} = ${fmt(cos)}`,
        },
        {
          label: "sin θ",
          value: exactTrig(sin),
          formula: "sin θ = y ⁄ r — the vertical leg",
          detail: `${fmt(py - center.y)} ⁄ ${fmt(radius)} = ${fmt(sin)}`,
        },
        {
          label: "tan θ",
          value: onAxis ? "undefined" : exactTrig(sin / cos),
          formula: "tan θ = sin θ ⁄ cos θ — the slope of the radius",
          detail: onAxis ? "cos θ = 0: the radius is vertical" : `${fmt(sin)} ⁄ ${fmt(cos)} = ${fmt(sin / cos)}`,
        },
        {
          label: "Pythagorean identity",
          value: "sin²θ + cos²θ = 1",
          formula: "the radius is the hypotenuse of the cos–sin triangle",
          detail: `${fmt(sin * sin)} + ${fmt(cos * cos)} = ${fmt(sin * sin + cos * cos)}`,
        },
        {
          label: "Bridge to the wave",
          value: "sin θ is the point's height",
          formula: "sweep θ steadily and that height traces y = sin θ",
        },
      ],
    },
  ];
}

// ---------------------------------------------------------------------------
// Fraction circle: a pie cut into N equal sectors with M shaded — the
// part-of-a-whole picture of a fraction. The reduced form reuses the rational
// normalizer (gcd = 1), and the shaded arc ties the fraction to degrees.
// ---------------------------------------------------------------------------

function fractionCircleFacts(n: number, m: number, radius: number): FactGroup[] {
  const reduced = R.rational(m, n); // normalized: gcd(|p|, q) = 1, q > 0
  const reduces = m !== 0 && reduced.q !== n;
  const arc = (m / n) * 2 * Math.PI;
  return [
    {
      title: "Fraction shaded",
      facts: [
        {
          label: "Shaded",
          value: fracStr(m, n),
          formula: "shaded sectors ⁄ total sectors",
          detail: `${m} of ${n} equal parts`,
        },
        {
          label: "Each sector",
          value: fracStr(1, n),
          formula: "the whole circle is N equal parts",
        },
        {
          label: "Simplified",
          value: fracStr(reduced.p, reduced.q),
          formula: reduces ? "divide top and bottom by their GCF" : undefined,
          detail: reduces ? `${fracStr(m, n)} = ${fracStr(reduced.p, reduced.q)}` : undefined,
        },
        { label: "As a decimal", value: fmt(m / n) },
        { label: "As a percent", value: `${fmt((100 * m) / n, 1)}%` },
      ],
    },
    {
      title: "On the circle",
      facts: [
        { label: "Radius", value: fmt(radius), formula: "drag the bottom grip to resize" },
        { label: "Sectors shaded", value: `${m} of ${n}` },
        {
          label: "Arc angle",
          value: `${fmtPi(arc)} rad = ${deg(arc)}`,
          formula: "(shaded ⁄ whole) × 360°",
          detail: `${fracStr(m, n)} × 360° = ${deg(arc)}`,
        },
        {
          label: "Shaded + unshaded",
          value: `${fracStr(m, n)} + ${fracStr(n - m, n)} = 1`,
          formula: "the parts make one whole",
        },
      ],
    },
  ];
}

// ---------------------------------------------------------------------------
// Square: side/perimeter/area, and the diagonal as the embodied source of √2
// (the "sacred geometric root": the side and its diagonal stand in ratio √2).
// ---------------------------------------------------------------------------

function squareFacts(center: Point, half: number, angle: number): FactGroup[] {
  const side = 2 * half;
  const perim = 4 * side;
  const area = side * side;
  const diag = side * Math.SQRT2;
  const halfDiag = diag / 2; // = center-to-corner = half·√2
  return [
    {
      title: "Square",
      facts: [
        { label: "Center", value: pt(center) },
        { label: "Side", value: fmt(side), formula: "s — all four sides equal" },
        {
          label: "Perimeter",
          value: fmt(perim),
          formula: "P = 4s",
          detail: `4·${fmt(side)} = ${fmt(perim)}`,
        },
        {
          label: "Area",
          value: fmt(area),
          formula: "A = s²",
          detail: `${fmt(side)}² = ${fmt(area)}`,
        },
        {
          label: "Rotation",
          value: `${fmtPi(angle)} rad = ${deg(angle)}`,
          formula: "of the corner handle, counter-clockwise from the +x axis",
        },
      ],
    },
    {
      title: "Diagonal & √2",
      facts: [
        {
          label: "Diagonal",
          value: fmt(diag),
          formula: "d = s√2",
          detail: `${fmt(side)}·√2 = ${fmt(diag)}`,
        },
        {
          label: "Half-diagonal",
          value: fmt(halfDiag),
          formula: "½d = center → corner",
          detail: `${fmt(diag)} ⁄ 2 = ${fmt(halfDiag)}`,
        },
        {
          label: "Diagonal ⁄ side",
          value: side === 0 ? "—" : fmt(diag / side, 5),
          formula: "d ⁄ s = √2",
        },
        {
          label: "√2",
          value: fmt(Math.SQRT2, 5),
          formula: "the diagonal makes √2 out of the side — drag a corner; the ratio holds",
        },
        {
          label: "Next square (on the diagonal)",
          value: `side ${fmt(diag)}, area ${fmt(2 * area)}`,
          formula: "build a square on the diagonal → area doubles (×2)",
          detail: `${fmt(area)} → ${fmt(2 * area)}`,
        },
      ],
    },
  ];
}

/** A fraction as display text: "3⁄8", or just the integer when whole. */
function fracStr(p: number, q: number): string {
  return q === 1 ? String(p) : `${p}⁄${q}`;
}

/** Which quadrant (or axis) an angle in [0, 2π) lands in. */
function angleQuadrant(angle: number): string {
  const a = ((angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  const eps = 1e-9;
  if (Math.abs(a) < eps) return "on the positive x-axis";
  if (Math.abs(a - Math.PI / 2) < eps) return "on the positive y-axis";
  if (Math.abs(a - Math.PI) < eps) return "on the negative x-axis";
  if (Math.abs(a - 3 * Math.PI / 2) < eps) return "on the negative y-axis";
  if (a < Math.PI / 2) return "I (x > 0, y > 0)";
  if (a < Math.PI) return "II (x < 0, y > 0)";
  if (a < 3 * Math.PI / 2) return "III (x < 0, y < 0)";
  return "IV (x > 0, y < 0)";
}

function circleEquation(c: Circle): string {
  const term = (axis: string, k: number) =>
    Math.abs(k) < 1e-9
      ? `${axis}²`
      : `(${axis} ${k > 0 ? "−" : "+"} ${fmt(Math.abs(k))})²`;
  return `${term("x", c.center.x)} + ${term("y", c.center.y)} = ${fmt(c.radius * c.radius)}`;
}

// ---------------------------------------------------------------------------
// Triangle: sides/angles, classification, Pythagoras (theorem AND converse
// inequality), Heron, law of sines/cosines, SOH-CAH-TOA when right.
// ---------------------------------------------------------------------------

function triangleFacts(t: VertexTriangle): FactGroup[] {
  const [a, b, c] = Triangles.sides(t);
  const [A, B, C] = Triangles.angles(t);
  const area = Triangles.vertexArea(t);
  const perim = Triangles.perimeter(t);
  const semi = perim / 2;
  const heron = Math.sqrt(
    Math.max(0, semi * (semi - a) * (semi - b) * (semi - c)),
  );
  const byAngles = Triangles.classifyByAngles(t);
  const angleSum = A + B + C;

  const groups: FactGroup[] = [
    {
      title: "Triangle",
      facts: [
        { label: "Vertices", value: `A${pt(t.a)} B${pt(t.b)} C${pt(t.c)}` },
        {
          label: "Sides",
          value: `a=${fmt(a)} b=${fmt(b)} c=${fmt(c)}`,
          formula: "each side opposite its same-letter angle",
        },
        {
          label: "Angles",
          value: `∠A=${deg(A)} ∠B=${deg(B)} ∠C=${deg(C)}`,
        },
        {
          label: "Angle sum",
          value:
            Math.abs(angleSum - Math.PI) < 1e-9
              ? "180° ✓"
              : `${deg(angleSum)} (degenerate)`,
          formula: "∠A + ∠B + ∠C = 180°",
        },
        {
          label: "Type",
          value: `${Triangles.classifyBySides(t)}, ${byAngles}`,
        },
        { label: "Perimeter", value: fmt(perim), formula: "P = a + b + c" },
        {
          label: "Area",
          value: fmt(area),
          formula: "Heron: A = √(s(s−a)(s−b)(s−c))",
          detail: `s = ${fmt(semi)} → √(…) = ${fmt(heron)}`,
        },
        pythagoreanFact([a, b, c]),
      ],
    },
    {
      title: "Trig laws",
      facts: [
        lawOfSinesFact(t, a, A),
        {
          label: "Law of cosines",
          value: `${fmt(c * c)} ✓`,
          formula: "c² = a² + b² − 2ab·cos C",
          detail: `${fmt(a * a)} + ${fmt(b * b)} − ${fmt(2 * a * b)}·cos ${deg(C)} = ${fmt(
            a * a + b * b - 2 * a * b * Math.cos(C),
          )}`,
        },
      ],
    },
  ];
  if (byAngles === "right") {
    groups.push(sohCahToa([a, b, c], [A, B, C]));
  }
  return groups;
}

/**
 * The Pythagorean theorem when the triangle is right, and the converse
 * inequality (Khan's "is it acute or obtuse?" test) when it isn't.
 */
function pythagoreanFact(sideLengths: [number, number, number]): Fact {
  const [p, q, h] = [...sideLengths].sort((x, y) => x - y);
  const legs = p * p + q * q;
  const hyp = h * h;
  const detail = `${fmt(p)}² + ${fmt(q)}² = ${fmt(legs)} vs ${fmt(h)}² = ${fmt(hyp)}`;
  if (hyp > 0 && Math.abs(legs - hyp) <= 0.02 * hyp) {
    return {
      label: "Pythagorean theorem",
      value: `${fmt(legs)} = ${fmt(hyp)} ✓ right`,
      formula: "leg² + leg² = hyp²",
      detail,
    };
  }
  return {
    label: "Pythagorean inequality",
    value:
      legs > hyp
        ? `${fmt(legs)} > ${fmt(hyp)} → acute`
        : `${fmt(legs)} < ${fmt(hyp)} → obtuse`,
    formula: "p² + q² vs h² (h = longest side)",
    detail,
  };
}

function lawOfSinesFact(t: VertexTriangle, a: number, A: number): Fact {
  const sinA = Math.sin(A);
  if (sinA === 0) {
    return { label: "Law of sines", value: "— (degenerate)" };
  }
  return {
    label: "Law of sines",
    value: fmt(a / sinA),
    formula: "a⁄sin A = b⁄sin B = c⁄sin C = 2R",
    detail: `2R = ${fmt(2 * Triangles.circumradius(t))} (R: circumradius)`,
  };
}

/** Right triangles only: the trig-ratio definitions at one acute angle. */
function sohCahToa(
  sideLengths: [number, number, number],
  angleValues: [number, number, number],
): FactGroup {
  const names = ["A", "B", "C"];
  const ri = angleValues.indexOf(Math.max(...angleValues));
  const [i, j] = [0, 1, 2].filter((k) => k !== ri);
  const theta = angleValues[i];
  const opp = sideLengths[i];
  const adj = sideLengths[j];
  const hyp = sideLengths[ri];
  return {
    title: `SOH-CAH-TOA at ∠${names[i]}`,
    facts: [
      {
        label: `sin ${names[i]}`,
        value: fmt(Math.sin(theta)),
        formula: "opposite ⁄ hypotenuse",
        detail: `${fmt(opp)} ⁄ ${fmt(hyp)} = ${fmt(opp / hyp)}`,
      },
      {
        label: `cos ${names[i]}`,
        value: fmt(Math.cos(theta)),
        formula: "adjacent ⁄ hypotenuse",
        detail: `${fmt(adj)} ⁄ ${fmt(hyp)} = ${fmt(adj / hyp)}`,
      },
      {
        label: `tan ${names[i]}`,
        value: fmt(Math.tan(theta)),
        formula: "opposite ⁄ adjacent",
        detail: `${fmt(opp)} ⁄ ${fmt(adj)} = ${fmt(opp / adj)}`,
      },
    ],
  };
}

// ---------------------------------------------------------------------------
// Segment: rise/run, slope, distance & midpoint formulas, y = mx + b.
// ---------------------------------------------------------------------------

function segmentFacts(seg: Segment): FactGroup[] {
  const { dx, dy } = Segments.deltas(seg);
  const len = Segments.length(seg);
  const mid = Segments.midpoint(seg);
  const m = Segments.slope(seg);
  return [
    {
      title: "Segment",
      facts: [
        { label: "Endpoints", value: `${pt(seg.a)} → ${pt(seg.b)}` },
        { label: "Rise ⁄ run", value: `Δy = ${fmt(dy)}, Δx = ${fmt(dx)}` },
        {
          label: "Slope",
          value: m === null ? "undefined (vertical)" : fmt(m),
          formula: "m = Δy ⁄ Δx",
          detail: m === null ? undefined : `${fmt(dy)} ⁄ ${fmt(dx)} = ${fmt(m)}`,
        },
        {
          label: "Length",
          value: fmt(len),
          formula: "d = √(Δx² + Δy²)",
          detail: `√(${fmt(dx * dx)} + ${fmt(dy * dy)}) = ${fmt(len)}`,
        },
        {
          label: "Midpoint",
          value: pt(mid),
          formula: "((x₁+x₂)⁄2, (y₁+y₂)⁄2)",
        },
        {
          label: "Line equation",
          value: lineEquation(seg),
          formula: "y = mx + b",
        },
      ],
    },
  ];
}

function lineEquation(seg: Segment): string {
  const m = Segments.slope(seg);
  if (m === null) return `x = ${fmt(seg.a.x)}`;
  return slopeInterceptString(m, Segments.yIntercept(seg) ?? 0);
}

function slopeInterceptString(m: number, b: number): string {
  if (m === 0) return `y = ${fmt(b)}`;
  const mTerm = m === 1 ? "x" : m === -1 ? "−x" : `${fmt(m)}x`;
  if (Math.abs(b) < 1e-9) return `y = ${mTerm}`;
  return `y = ${mTerm} ${b > 0 ? "+" : "−"} ${fmt(Math.abs(b))}`;
}

// ---------------------------------------------------------------------------
// Function graphs: the algebra curriculum — forms, intercepts, roots,
// vertex/axis, discriminant. Parameters are live, so dragging a handle shows
// every derived quantity move.
// ---------------------------------------------------------------------------

function linearGraphFacts(m: number, b: number): FactGroup[] {
  const xIntercept =
    m === 0
      ? Math.abs(b) < 1e-9
        ? "every x (the line IS the axis)"
        : "none (parallel to the x-axis)"
      : `(${fmt(-b / m)}, 0)`;
  return [
    {
      title: "Linear function",
      facts: [
        { label: "Equation", value: slopeInterceptString(m, b), formula: "y = mx + b" },
        {
          label: "Slope (rate of change)",
          value: fmt(m),
          formula: "m = Δy per 1 of Δx",
          detail: `from any point: 1 right, ${fmt(m)} up`,
        },
        { label: "y-intercept", value: `(0, ${fmt(b)})`, formula: "f(0) = b" },
        {
          label: "x-intercept (root)",
          value: xIntercept,
          formula: "solve 0 = mx + b → x = −b ⁄ m",
        },
        {
          label: "Behavior",
          value: m > 0 ? "increasing" : m < 0 ? "decreasing" : "constant",
        },
      ],
    },
  ];
}

function quadraticGraphFacts(a: number, h: number, k: number): FactGroup[] {
  // The rewrite engine expands vertex form exactly and records every step;
  // ad-hoc float expansion remains as the fallback for parameter values
  // with no convincing rational form.
  const work = quadraticEngineWork(a, h, k);
  const bStd = work ? work.b : -2 * a * h;
  const cStd = work ? work.c : a * h * h + k;
  const discriminant = bStd * bStd - 4 * a * cStd; // simplifies to −4ak
  const rootFacts: Fact[] = [];
  if (a !== 0) {
    const radicand = -k / a;
    if (Math.abs(k) < 1e-9) {
      rootFacts.push({
        label: "Root",
        value: `x = ${fmt(h)} (double)`,
        formula: "vertex sits ON the x-axis",
      });
    } else if (radicand > 0) {
      const spread = Math.sqrt(radicand);
      const r1 = h - spread;
      const r2 = h + spread;
      rootFacts.push(
        {
          label: "Roots",
          value: `x = ${fmt(r1)}, x = ${fmt(r2)}`,
          formula: "0 = a(x−h)² + k → x = h ± √(−k ⁄ a)",
          detail: `${fmt(h)} ± √(${fmt(radicand)}) = ${fmt(h)} ± ${fmt(spread)}`,
        },
        {
          label: "Factored form",
          value: `y = ${coefString(a)}(x ${signTerm(-r1)})(x ${signTerm(-r2)})`,
          formula: "y = a(x − r₁)(x − r₂)",
        },
      );
    } else {
      rootFacts.push({
        label: "Roots",
        value: "none (no real solutions)",
        formula: `vertex is ${k > 0 ? "above" : "below"} the x-axis and the parabola opens ${a > 0 ? "up" : "down"}, away from it`,
      });
    }
  }
  return [
    {
      title: "Quadratic function",
      facts: [
        {
          label: "Vertex form",
          value: vertexFormString(a, h, k),
          formula: "y = a(x − h)² + k",
        },
        {
          label: "Standard form",
          value: `y = ${polyString(a, bStd, cStd)}`,
          formula: "expand the square: b = −2ah, c = ah² + k",
        },
        {
          label: "Vertex",
          value: `(${fmt(h)}, ${fmt(k)}) — ${a > 0 ? "minimum" : a < 0 ? "maximum" : "—"}`,
        },
        { label: "Axis of symmetry", value: `x = ${fmt(h)}` },
        {
          label: "Opens",
          value:
            a === 0
              ? "degenerate (a = 0: it's a line)"
              : `${a > 0 ? "upward" : "downward"}, ${Math.abs(a) === 1 ? "same width as" : Math.abs(a) > 1 ? "narrower than" : "wider than"} y = x²`,
          formula: "sign of a; |a| vs 1",
        },
        { label: "y-intercept", value: `(0, ${fmt(cStd)})`, formula: "f(0) = c" },
      ],
    },
    {
      title: "Roots & discriminant",
      facts: [
        {
          label: "Discriminant",
          value: `${fmt(discriminant)} → ${discriminant > 1e-9 ? "2 real roots" : discriminant < -1e-9 ? "no real roots" : "1 double root"}`,
          formula: "D = b² − 4ac",
          detail: `${fmt(bStd)}² − 4·${fmt(a)}·${fmt(cStd)} = ${fmt(discriminant)}`,
        },
        ...rootFacts,
      ],
    },
    ...(work ? work.groups : []),
  ];
}

/**
 * Engine-derived quadratic work: expand the exact vertex form to standard
 * form (the source of truth for b and c), factor it back when it factors,
 * and package every recorded rewrite step as show-your-work facts.
 */
function quadraticEngineWork(
  a: number,
  h: number,
  k: number,
): { b: number; c: number; groups: FactGroup[] } | null {
  const vertexExpr = toExact(FnGraphs.toExpression({ form: "quadratic", a, h, k }));
  const expanded = expand(vertexExpr);
  const poly = expanded.converged ? polyOf(expanded.result, "x") : null;
  if (!poly || poly.length !== 3) return null;
  const groups: FactGroup[] = [];
  if (expanded.steps.length > 0) {
    groups.push(stepsGroup("Show your work: vertex → standard", expanded.steps));
  }
  const factored = factor(expanded.result);
  const isProduct =
    factored.result.kind === "binary" &&
    (factored.result.op === "*" || factored.result.op === "^");
  if (factored.converged && isProduct && factored.steps.length > 0) {
    groups.push(stepsGroup("Show your work: standard → factored", factored.steps));
  }
  // The quadratic formula always settles y = 0; it's the one method that
  // applies to every quadratic, so it's the honest universal show-your-work.
  const solved = solveQuadratic(equation(expanded.result, num(0)), "x", "formula");
  if ((solved.status === "solved" || solved.status === "no-real-roots") && solved.steps.length > 0) {
    groups.push(solveStepsGroup("Show your work: solving y = 0", solved.steps));
  }
  return { b: R.toNumber(poly[1]), c: R.toNumber(poly[0]), groups };
}

/** Solve steps → facts: label = rule, value = the written line(s), detail = why. */
function solveStepsGroup(title: string, steps: readonly SolveStep[]): FactGroup {
  return {
    title,
    facts: steps.map((s) => ({
      label: s.rule,
      value: prettyAlgebra(solveStepToText(s)),
      detail: s.description,
    })),
  };
}

/** Steps → facts: label = rule name, value = result, detail = justification. */
function stepsGroup(title: string, steps: readonly Step[]): FactGroup {
  return {
    title,
    facts: steps.map((s) => ({
      label: s.rule,
      value: prettyAlgebra(toText(s.after)),
      detail: s.description,
    })),
  };
}

/** Light prettifying of the plain printer's output for panel display. */
function prettyAlgebra(s: string): string {
  return s.replace(/\^2/g, "²").replace(/\^3/g, "³").replace(/ \* /g, " · ");
}

function vertexFormString(a: number, h: number, k: number): string {
  const xTerm =
    Math.abs(h) < 1e-9
      ? "x²"
      : `(x ${h > 0 ? "−" : "+"} ${fmt(Math.abs(h))})²`;
  const kTerm = Math.abs(k) < 1e-9 ? "" : ` ${k > 0 ? "+" : "−"} ${fmt(Math.abs(k))}`;
  return `y = ${coefString(a)}${xTerm}${kTerm}`;
}

/** "ax² + bx + c" with school conventions: skip zero terms, elide 1s. */
function polyString(a: number, b: number, c: number): string {
  const parts: string[] = [];
  if (a !== 0) parts.push(`${coefString(a)}x²`);
  if (b !== 0) {
    parts.push(parts.length === 0 ? `${coefString(b)}x` : `${b > 0 ? "+" : "−"} ${coefString(Math.abs(b))}x`);
  }
  if (c !== 0 || parts.length === 0) {
    parts.push(parts.length === 0 ? fmt(c) : `${c > 0 ? "+" : "−"} ${fmt(Math.abs(c))}`);
  }
  return parts.join(" ");
}

/** Coefficient prefix: 1 vanishes, −1 becomes a bare minus. */
function coefString(n: number): string {
  if (n === 1) return "";
  if (n === -1) return "−";
  return fmt(n);
}

/** "± value" half of a binomial like (x − r): pass −r. */
function signTerm(n: number): string {
  return `${n >= 0 ? "+" : "−"} ${fmt(Math.abs(n))}`;
}

// ---------------------------------------------------------------------------
// Trig waves: amplitude/period/phase/midline, and the unit-circle bridge.
// ---------------------------------------------------------------------------

function trigGraphFacts(fn: TrigFn, a: number, b: number, h: number, k: number): FactGroup[] {
  const name = fn === "sin" ? "Sine" : fn === "cos" ? "Cosine" : "Tangent";
  const isTan = fn === "tan";
  const amp = Math.abs(a);
  const period = FnGraphs.trigPeriod(fn, b);
  const periodSym = isTan ? "π ⁄ |b|" : "2π ⁄ |b|";

  const shape: Fact[] = [
    {
      label: `${name} wave`,
      value: trigFormString(fn, a, b, h, k),
      formula: `y = a·${fn}(b(x − h)) + k`,
    },
  ];
  if (isTan) {
    shape.push({
      label: "Vertical stretch",
      value: fmt(amp),
      formula: "|a| — tangent is unbounded, so it has no amplitude",
    });
  } else {
    shape.push({
      label: "Amplitude",
      value: fmt(amp),
      formula: "|a| — half the peak-to-trough height",
      detail: `peak at y = ${fmt(k + amp)}, trough at y = ${fmt(k - amp)}`,
    });
  }
  shape.push(
    {
      label: "Period",
      value: fmtPi(period),
      formula: periodSym,
      detail: `${isTan ? "π" : "2π"} ⁄ ${fmt(Math.abs(b))} = ${fmtPi(period)}`,
    },
    {
      label: "Frequency",
      value: `${fmt(1 / period)} per unit`,
      formula: "1 ⁄ period — cycles in each unit of x",
    },
    {
      label: "Phase shift",
      value: h === 0 ? "none" : `${fmt(Math.abs(h))} ${h > 0 ? "right" : "left"}`,
      formula: "x − h = 0 → x = h",
    },
    { label: "Midline", value: `y = ${fmt(k)}`, formula: "the vertical center k" },
  );
  if (isTan) {
    shape.push({
      label: "Asymptotes",
      value: `x = ${fmt(h)} + ${fmtPi(period)}·(n + ½)`,
      formula: "where b(x − h) = π⁄2 + πn — cos hits 0 and tan blows up",
    });
  } else {
    shape.push({
      label: "Range",
      value: `[${fmt(k - amp)}, ${fmt(k + amp)}]`,
      formula: "[k − |a|, k + |a|]",
    });
  }

  return [{ title: `${name} function`, facts: shape }, unitCircleGroup(fn)];
}

/** The circle → wave bridge: what the function IS on the unit circle. */
function unitCircleGroup(fn: TrigFn): FactGroup {
  const identity: Fact =
    fn === "sin"
      ? {
          label: "Definition",
          value: "sin θ = y-coordinate",
          formula: "the height of the point at angle θ on the unit circle",
        }
      : fn === "cos"
        ? {
            label: "Definition",
            value: "cos θ = x-coordinate",
            formula: "the horizontal position of the point at angle θ",
          }
        : {
            label: "Definition",
            value: "tan θ = sin θ ⁄ cos θ",
            formula: "the slope of the radius at angle θ (rise ⁄ run)",
          };
  // Key angles from the first quadrant — what every student memorizes.
  const angles: [string, number][] = [
    ["0", 0],
    ["π⁄6", Math.PI / 6],
    ["π⁄4", Math.PI / 4],
    ["π⁄3", Math.PI / 3],
    ["π⁄2", Math.PI / 2],
  ];
  const f = fn === "sin" ? Math.sin : fn === "cos" ? Math.cos : Math.tan;
  const keyValues = angles
    .map(([sym, rad]) => {
      const v = f(rad);
      const shown = Math.abs(v) > 1e6 ? "undefined" : exactTrig(v);
      return `${fn}(${sym}) = ${shown}`;
    })
    .join(",  ");
  return {
    title: "From the unit circle",
    facts: [
      identity,
      { label: "Key values", value: keyValues, formula: "θ swept through the first quadrant" },
    ],
  };
}

/** Recognize the handful of exact trig values (√-forms) the unit circle gives. */
function exactTrig(v: number): string {
  const table: [number, string][] = [
    [0, "0"],
    [0.5, "1⁄2"],
    [Math.SQRT1_2, "√2⁄2"],
    [Math.sqrt(3) / 2, "√3⁄2"],
    [1, "1"],
    [Math.sqrt(3), "√3"],
    [1 / Math.sqrt(3), "√3⁄3"],
  ];
  for (const [val, sym] of table) {
    if (Math.abs(v - val) < 1e-9) return sym;
    if (Math.abs(v + val) < 1e-9) return `−${sym}`;
  }
  return fmt(v);
}

/** "y = a·sin(b(x − h)) + k" with school conventions: elide 1s and 0s. */
function trigFormString(fn: TrigFn, a: number, b: number, h: number, k: number): string {
  const xPart =
    Math.abs(h) < 1e-9 ? "x" : `(x ${h > 0 ? "−" : "+"} ${fmt(Math.abs(h))})`;
  const inner =
    Math.abs(b - 1) < 1e-9 ? xPart : Math.abs(b + 1) < 1e-9 ? `−${xPart}` : `${fmt(b)}${xPart}`;
  const body = `${coefString(a)}${fn}(${inner})`;
  const kPart = Math.abs(k) < 1e-9 ? "" : ` ${k > 0 ? "+" : "−"} ${fmt(Math.abs(k))}`;
  return `y = ${body}${kPart}`;
}

/** Render a value as a tidy multiple of π when it is one, else a decimal. */
function fmtPi(v: number): string {
  if (Math.abs(v) < 1e-9) return "0";
  const r = v / Math.PI;
  for (const q of [1, 2, 3, 4, 6, 8, 12]) {
    const p = Math.round(r * q);
    if (p !== 0 && Math.abs(r - p / q) < 1e-6) {
      const sign = p < 0 ? "−" : "";
      const ap = Math.abs(p);
      const top = ap === 1 ? "π" : `${ap}π`;
      return q === 1 ? `${sign}${top}` : `${sign}${top}⁄${q}`;
    }
  }
  return fmt(v);
}

// ---------------------------------------------------------------------------

function fmt(n: number, dp = 3): string {
  if (Number.isNaN(n)) return "—";
  if (!Number.isFinite(n)) return "∞";
  const r = Number(n.toFixed(dp));
  return Object.is(r, -0) ? "0" : String(r);
}

function deg(rad: number): string {
  return `${fmt(Triangles.toDegrees(rad), 1)}°`;
}

function pt(p: Point): string {
  return `(${fmt(p.x)}, ${fmt(p.y)})`;
}
