import { type Point, type Vector, Points } from "../geometry/index.ts";
import { type Expr, add, call, mul, num, pow, sub, variable } from "./ast.ts";

/**
 * Function graphs: parameterized curves coupled to expression state — the
 * "graph backend" from the project TODO. Each form stores its parameters in
 * the shape school math names them (slope-intercept m/b, vertex-form a/h/k),
 * because the FORM is the curriculum: converting linear standard↔slope-
 * intercept or quadratic vertex↔standard is an explicit fact, not a
 * canonicalization.
 *
 * The embodied part is the handle contract (mirroring core/shapes.ts):
 *
 *   linear:    [y-intercept (0, b), slope handle]
 *              Dragging the slope handle re-aims the line THROUGH the
 *              intercept at the cursor: m = (p.y − b) ⁄ p.x. Rise over run,
 *              performed by hand.
 *   quadratic: [vertex (h, k), width handle]
 *              Dragging the width handle bends the parabola through the
 *              cursor: a = (p.y − k) ⁄ (p.x − h)². Solving for a parameter
 *              from a point is the closed-form inverse — vertex form exists
 *              in school math precisely because these inverses are easy.
 *   trig:      [anchor (h, k), amplitude handle, period handle]
 *              y = a·fn(b(x − h)) + k for fn ∈ {sin, cos, tan}. The anchor
 *              sets phase h and midline k; the amplitude handle's height
 *              above the midline is a; the period handle's distance from the
 *              anchor is one whole period, so b = (2π or π) ⁄ period. Each is
 *              a single-parameter closed-form inverse, like the others.
 *
 * New forms (exponential, rational, ...) follow the same recipe: parameters
 * + evaluate + handles + closed-form moveHandle.
 */

export type TrigFn = "sin" | "cos" | "tan";

export type FunctionGraph =
  | { readonly form: "linear"; readonly m: number; readonly b: number }
  | {
      readonly form: "quadratic";
      readonly a: number;
      readonly h: number;
      readonly k: number;
    }
  | {
      readonly form: "trig";
      readonly fn: TrigFn;
      readonly a: number;
      readonly b: number;
      readonly h: number;
      readonly k: number;
    };

/**
 * One function family, finer-grained than `form`: the three trig waves split out
 * by `fn`, so the UI can toggle sine / cosine / tangent / quadratic / linear
 * each on its own. (`form` lumps all trig together; this doesn't.)
 */
export type GraphFamily = "linear" | "quadratic" | TrigFn;

/** Which family a graph belongs to (trig splits by its `fn`). */
export function family(g: FunctionGraph): GraphFamily {
  return g.form === "trig" ? g.fn : g.form;
}

/** Smallest run/offset used when a drag would make an inverse blow up. */
const MIN_RUN = 0.05;

/** Period of a·fn(b(x−h))+k: 2π⁄|b| for sin/cos, π⁄|b| for tangent. */
export function trigPeriod(fn: TrigFn, b: number): number {
  const base = fn === "tan" ? Math.PI : 2 * Math.PI;
  return base / Math.abs(b || MIN_RUN);
}

export function evaluate(g: FunctionGraph, x: number): number {
  switch (g.form) {
    case "linear":
      return g.m * x + g.b;
    case "quadratic": {
      const d = x - g.h;
      return g.a * d * d + g.k;
    }
    case "trig": {
      const inner = g.b * (x - g.h);
      const f = g.fn === "sin" ? Math.sin(inner) : g.fn === "cos" ? Math.cos(inner) : Math.tan(inner);
      return g.a * f + g.k;
    }
  }
}

/** The graph as a concrete expression in x (current parameter values). */
export function toExpression(g: FunctionGraph): Expr {
  const x = variable("x");
  switch (g.form) {
    case "linear":
      return add(mul(num(g.m), x), num(g.b));
    case "quadratic":
      return add(mul(num(g.a), pow(sub(x, num(g.h)), num(2))), num(g.k));
    case "trig":
      return add(mul(num(g.a), call(g.fn, mul(num(g.b), sub(x, num(g.h))))), num(g.k));
  }
}

export function handles(g: FunctionGraph): readonly Point[] {
  switch (g.form) {
    case "linear":
      return [Points.point(0, g.b), Points.point(1, g.m + g.b)];
    case "quadratic":
      return [Points.point(g.h, g.k), Points.point(g.h + 1, g.k + g.a)];
    case "trig": {
      const period = trigPeriod(g.fn, g.b);
      // The amplitude handle rides the first crest: at x = h for cosine
      // (which peaks at the anchor), a quarter-period along otherwise.
      const ampX = g.fn === "cos" ? g.h : g.h + period / 4;
      return [
        Points.point(g.h, g.k),
        Points.point(ampX, g.k + g.a),
        Points.point(g.h + period, g.k),
      ];
    }
  }
}

export function moveHandle(
  g: FunctionGraph,
  index: number,
  p: Point,
): FunctionGraph {
  switch (g.form) {
    case "linear": {
      if (index === 0) return { ...g, b: p.y };
      const run = clampAwayFromZero(p.x);
      return { ...g, m: (p.y - g.b) / run };
    }
    case "quadratic": {
      if (index === 0) return { ...g, h: p.x, k: p.y };
      const dx = clampAwayFromZero(p.x - g.h);
      return { ...g, a: (p.y - g.k) / (dx * dx) };
    }
    case "trig": {
      if (index === 0) return { ...g, h: p.x, k: p.y };
      // Amplitude: signed height above the midline (horizontal drag ignored).
      if (index === 1) return { ...g, a: p.y - g.k };
      // Period: the anchor-to-cursor run is one whole period; invert for b,
      // keeping b's sign so the wave doesn't mirror as it's stretched.
      const period = Math.abs(clampAwayFromZero(p.x - g.h));
      const base = g.fn === "tan" ? Math.PI : 2 * Math.PI;
      const mag = base / period;
      return { ...g, b: g.b < 0 ? -mag : mag };
    }
  }
}

/** Rigid translation: shift the graph so f'(x) = f(x − dx) + dy. */
export function translate(g: FunctionGraph, by: Vector): FunctionGraph {
  switch (g.form) {
    case "linear":
      return { ...g, b: g.b + by.y - g.m * by.x };
    case "quadratic":
      return { ...g, h: g.h + by.x, k: g.k + by.y };
    case "trig":
      return { ...g, h: g.h + by.x, k: g.k + by.y };
  }
}

function clampAwayFromZero(v: number): number {
  if (Math.abs(v) >= MIN_RUN) return v;
  return v < 0 ? -MIN_RUN : MIN_RUN;
}
