import { type Expr, add, call, div, neg, num, pow, sub, variable } from "./ast.ts";
import {
  type Equation,
  type EquationStep,
  equation,
  equationToText,
  solveLinear,
} from "./equation.ts";
import { toText } from "./print.ts";
import * as R from "./rational.ts";
import { expand, factor, simplify } from "./rules.ts";
import {
  literalOf,
  monomialToExpr,
  monomialsOf,
  negMonomial,
  polyOf,
  polyToExpr,
  ratExpr,
  structuralEquals,
  sumToExpr,
} from "./structure.ts";

/**
 * Solvers on top of the rewrite engine: quadratics by the four school
 * methods, and 2×2 linear systems by substitution or elimination. Like
 * solveLinear, each solver's product is the recorded work — a SolveStep is
 * one written line. Unlike linear solving, a line here can carry several
 * equations at once: the two branches of a ± ("x = 3 or x = −1") or the two
 * equations of a system ("x + y = 5 and x − y = 1"); `join` says which.
 *
 * Methods are deliberately NOT interchangeable: square roots demand the
 * square already be present in the given form (manufacturing one would be
 * completing the square), and factoring gives up when the roots aren't
 * rational — "does-not-apply" is the honest school answer, not a silent
 * fallback to another method.
 *
 * Roots are exact: rational when possible, else p ± m·√r with r square-free
 * (built directly from exact arithmetic, not floats).
 */

export interface SolveStep {
  readonly rule: string;
  readonly description: string;
  /** The line as the student writes it. */
  readonly equations: readonly Equation[];
  /** How multiple equations on one line read: ± branches "or", systems "and". */
  readonly join: "or" | "and";
}

export const solveStepToText = (s: SolveStep): string =>
  s.equations.map(equationToText).join(s.join === "or" ? "  or  " : "  and  ");

const line = (rule: string, description: string, ...equations: Equation[]): SolveStep => ({
  rule,
  description,
  equations,
  join: "or",
});

const both = (rule: string, description: string, ...equations: Equation[]): SolveStep => ({
  rule,
  description,
  equations,
  join: "and",
});

const fromLinearSteps = (steps: readonly EquationStep[]): SolveStep[] =>
  steps.map((s) => line(s.rule, s.description, s.after));

const isZeroExpr = (e: Expr): boolean => {
  const v = literalOf(e);
  return v !== null && R.isZero(v);
};

// ---------------------------------------------------------------------------
// Exact radicals: √d = m·√r with r a square-free integer
// ---------------------------------------------------------------------------

/** Split √d (d ≥ 0) into m·√r, r square-free (r = 1 ⇒ the root is rational). */
function splitRadical(d: R.Rational): { m: R.Rational; r: number } | null {
  if (R.isNegative(d)) return null;
  if (R.isZero(d)) return { m: R.ZERO, r: 1 };
  const n = d.p * d.q; // √(p/q) = √(p·q) / q
  if (!Number.isSafeInteger(n)) return null;
  let s = 1;
  let r = n;
  for (let k = Math.floor(Math.sqrt(n)); k >= 2; k--) {
    if (n % (k * k) === 0) {
      s = k;
      r = n / (k * k);
      break;
    }
  }
  return { m: R.rational(s, d.q), r };
}

/** p + m·√r in school shape: 4, √5, 2 − 3·√2, … */
function radicalSum(p: R.Rational, m: R.Rational, r: number): Expr {
  if (r === 1) return ratExpr(R.add(p, m));
  return sumToExpr([
    { coef: p, factors: [] },
    { coef: m, factors: [{ base: call("sqrt", num(r)), exp: R.ONE }] },
  ]);
}

/** The pair p ± m·√r, ascending; a single entry when the ± part is zero. */
function rootPair(p: R.Rational, m: R.Rational, r: number): Expr[] {
  const a = R.abs(m);
  if (R.isZero(a)) return [ratExpr(p)];
  if (r === 1) return [ratExpr(R.sub(p, a)), ratExpr(R.add(p, a))];
  return [radicalSum(p, R.negate(a), r), radicalSum(p, a, r)];
}

// ---------------------------------------------------------------------------
// Quadratics
// ---------------------------------------------------------------------------

export type QuadraticMethod = "square-root" | "factoring" | "complete-square" | "formula";

export const QUADRATIC_METHODS: readonly QuadraticMethod[] = [
  "square-root",
  "factoring",
  "complete-square",
  "formula",
];

export interface QuadraticSolution {
  readonly status: "solved" | "no-real-roots" | "does-not-apply" | "not-quadratic";
  /** Exact roots, ascending; a single entry is a double root. */
  readonly roots: readonly Expr[];
  readonly steps: readonly SolveStep[];
}

export function solveQuadratic(
  eq: Equation,
  varName: string,
  method: QuadraticMethod,
): QuadraticSolution {
  switch (method) {
    case "square-root":
      return bySquareRoot(eq, varName);
    case "factoring":
      return byFactoring(eq, varName);
    case "complete-square":
      return byCompletingSquare(eq, varName);
    case "formula":
      return byFormula(eq, varName);
  }
}

/** Simplify both sides with the engine, recording one line if anything moved. */
function simplifyBothSides(eq: Equation, steps: SolveStep[]): Equation {
  const next = equation(simplify(eq.lhs).result, simplify(eq.rhs).result, eq.rel);
  if (!structuralEquals(next.lhs, eq.lhs) || !structuralEquals(next.rhs, eq.rhs)) {
    steps.push(line("simplify", "simplify each side", next));
    return next;
  }
  return eq;
}

interface Standard {
  readonly a: R.Rational;
  readonly b: R.Rational;
  readonly c: R.Rational;
  /** ax² + bx + c = 0, canonical order. */
  readonly eq: Equation;
  readonly steps: SolveStep[];
}

/** Normalize to ax² + bx + c = 0 (a ≠ 0), recording the setup lines. */
function toStandard(eq: Equation, varName: string): Standard | null {
  if (eq.rel !== "=") return null;
  const steps: SolveStep[] = [];
  // Expand both sides so a bracketed form like (x − 3)² becomes a readable
  // polynomial; the square-root method, which wants the square intact, has
  // its own path and never comes through here.
  const expanded = equation(expand(eq.lhs).result, expand(eq.rhs).result);
  let current = eq;
  if (!structuralEquals(expanded.lhs, eq.lhs) || !structuralEquals(expanded.rhs, eq.rhs)) {
    steps.push(line("expand", "multiply out and combine like terms", expanded));
    current = expanded;
  }
  if (!isZeroExpr(current.rhs)) {
    const moved = equation(expand(sub(current.lhs, current.rhs)).result, num(0));
    steps.push(
      line(
        "move everything to one side",
        `subtract ${toText(current.rhs)} from both sides`,
        moved,
      ),
    );
    current = moved;
  }
  const poly = polyOf(current.lhs, varName);
  if (!poly || poly.length !== 3 || R.isZero(poly[2])) return null;
  const canonical = equation(polyToExpr(poly, varName), num(0));
  if (!structuralEquals(canonical.lhs, current.lhs)) {
    steps.push(line("standard form", "write the terms in descending degree", canonical));
    current = canonical;
  }
  return { a: poly[2], b: poly[1], c: poly[0], eq: current, steps };
}

/**
 * Square-root method: only when the given form is α·u² + constants =
 * constants with u linear — x² = 25, 2(x + 3)² − 8 = 0, a(x − h)² + k = 0.
 * An x term in the open means the square isn't there to take a root of.
 */
function bySquareRoot(eq: Equation, varName: string): QuadraticSolution {
  if (eq.rel !== "=") return { status: "not-quadratic", roots: [], steps: [] };
  const steps: SolveStep[] = [];
  const current = simplifyBothSides(eq, steps);
  const doesNotApply: QuadraticSolution = { status: "does-not-apply", roots: [], steps };

  const TWO = R.rational(2);
  let alpha: R.Rational | null = null;
  let u: Expr | null = null;
  let uLin: readonly R.Rational[] | null = null;
  let gamma = R.ZERO;
  const ms = [...monomialsOf(current.lhs), ...monomialsOf(current.rhs).map(negMonomial)];
  for (const m of ms) {
    if (m.factors.length === 0) {
      gamma = R.add(gamma, m.coef);
      continue;
    }
    if (alpha !== null || m.factors.length !== 1) return doesNotApply;
    const f = m.factors[0];
    if (!R.equals(f.exp, TWO)) return doesNotApply;
    const lin = polyOf(f.base, varName);
    if (!lin || lin.length !== 2) return doesNotApply;
    alpha = m.coef;
    u = f.base;
    uLin = lin;
  }
  if (alpha === null || u === null || uLin === null || R.isZero(alpha)) return doesNotApply;

  // Isolate the square: α·u² = −γ, then u² = d.
  const squared = (coef: R.Rational): Expr =>
    monomialToExpr({ coef, factors: [{ base: u!, exp: TWO }] });
  let rhsVal = R.negate(gamma);
  let iso = equation(squared(alpha), ratExpr(rhsVal));
  if (!structuralEquals(iso.lhs, current.lhs) || !structuralEquals(iso.rhs, current.rhs)) {
    steps.push(line("isolate the square", "move the constants to the other side", iso));
  }
  if (!R.isOne(alpha)) {
    rhsVal = R.div(rhsVal, alpha);
    iso = equation(squared(R.ONE), ratExpr(rhsVal));
    steps.push(line("divide both sides", `divide both sides by ${R.toString(alpha)}`, iso));
  }
  if (R.isNegative(rhsVal)) {
    steps.push(line("no real solutions", "a square is never negative", iso));
    return { status: "no-real-roots", roots: [], steps };
  }
  const sr = splitRadical(rhsVal);
  if (!sr) return doesNotApply; // overflowed exact range — refuse to guess

  const branches = R.isZero(sr.m)
    ? [equation(u, num(0))]
    : [
        equation(u, radicalSum(R.ZERO, sr.m, sr.r)),
        equation(u, radicalSum(R.ZERO, R.negate(sr.m), sr.r)),
      ];
  steps.push(
    line("take the square root", "square roots of both sides — remember the ±", ...branches),
  );

  // u = p·x + q, so x = (−q ± m√r) / p.
  const [q, p] = uLin;
  const roots = rootPair(R.div(R.negate(q), p), R.div(sr.m, p), sr.r);
  const x = variable(varName);
  if (!structuralEquals(u, x)) {
    steps.push(
      line(
        `solve for ${varName}`,
        `undo ${toText(u)} on each branch`,
        ...roots.map((rt) => equation(x, rt)),
      ),
    );
  }
  return { status: "solved", roots, steps };
}

/** Multiplicative factors, with small literal powers unrolled: (x+3)² → two. */
function productParts(e: Expr): Expr[] {
  if (e.kind === "neg") return [num(-1), ...productParts(e.arg)];
  if (e.kind === "binary" && e.op === "*") {
    return [...productParts(e.left), ...productParts(e.right)];
  }
  if (e.kind === "binary" && e.op === "^") {
    const n = literalOf(e.right);
    if (n && R.isInteger(n) && n.p >= 1 && n.p <= 3) {
      return Array<Expr>(n.p).fill(e.left);
    }
  }
  return [e];
}

/** Factoring + zero product property. Irrational roots → does-not-apply. */
function byFactoring(eq: Equation, varName: string): QuadraticSolution {
  const std = toStandard(eq, varName);
  if (!std) return { status: "not-quadratic", roots: [], steps: [] };
  const steps = [...std.steps];
  const doesNotApply: QuadraticSolution = { status: "does-not-apply", roots: [], steps };

  const der = factor(std.eq.lhs);
  if (!der.converged) return doesNotApply;
  for (const s of der.steps) {
    steps.push(line(s.rule, s.description, equation(s.after, num(0))));
  }
  const linears: Expr[] = [];
  for (const part of productParts(der.result)) {
    if (literalOf(part) !== null) continue; // a constant factor is never zero
    const lin = polyOf(part, varName);
    if (!lin || lin.length !== 2) return doesNotApply;
    linears.push(part);
  }
  if (linears.length !== 2) return doesNotApply;

  const isDouble = structuralEquals(linears[0], linears[1]);
  const factors = isDouble ? [linears[0]] : linears;
  steps.push(
    line(
      "zero product property",
      "a product is zero only when one of its factors is zero",
      ...factors.map((f) => equation(f, num(0))),
    ),
  );
  const roots: Expr[] = [];
  for (const f of factors) {
    const sol = solveLinear(equation(f, num(0)), varName);
    if (sol.status !== "solved" || !sol.result) return doesNotApply;
    roots.push(sol.result.rhs);
  }
  roots.sort((a, b) => R.compare(literalOf(a) ?? R.ZERO, literalOf(b) ?? R.ZERO));
  steps.push(
    line(
      "solve each factor",
      isDouble ? "both factors are the same — a double root" : "each branch is a little linear equation",
      ...roots.map((rt) => equation(variable(varName), rt)),
    ),
  );
  return { status: "solved", roots, steps };
}

/** Completing the square: manufacture the square the square-root method wants. */
function byCompletingSquare(eq: Equation, varName: string): QuadraticSolution {
  const std = toStandard(eq, varName);
  if (!std) return { status: "not-quadratic", roots: [], steps: [] };
  const steps = [...std.steps];
  const { a, b, c } = std;

  let rhsVal = R.negate(c);
  if (!R.isZero(c)) {
    const op = R.isNegative(c) ? "add" : "subtract";
    steps.push(
      line(
        "move the constant",
        `${op} ${R.toString(R.abs(c))} ${op === "add" ? "to" : "from"} both sides`,
        equation(polyToExpr([R.ZERO, b, a], varName), ratExpr(rhsVal)),
      ),
    );
  }
  let B = b;
  if (!R.isOne(a)) {
    B = R.div(b, a);
    rhsVal = R.div(rhsVal, a);
    steps.push(
      line(
        "divide both sides",
        `divide both sides by ${R.toString(a)} so the squared term is bare`,
        equation(polyToExpr([R.ZERO, B, R.ONE], varName), ratExpr(rhsVal)),
      ),
    );
  }
  const half = R.div(B, R.rational(2));
  const sq = R.mul(half, half);
  const d = R.add(rhsVal, sq);
  const square = pow(polyToExpr([half, R.ONE], varName), num(2));
  if (!R.isZero(B)) {
    steps.push(
      line(
        "complete the square",
        `add (${R.toString(half)})² = ${R.toString(sq)} — half the ${varName}-coefficient, squared — to both sides`,
        equation(polyToExpr([sq, B, R.ONE], varName), ratExpr(d)),
      ),
    );
    steps.push(
      line(
        "write as a square",
        "the left side is now a perfect square trinomial",
        equation(square, ratExpr(d)),
      ),
    );
  }
  if (R.isNegative(d)) {
    steps.push(
      line("no real solutions", "a square is never negative", equation(square, ratExpr(d))),
    );
    return { status: "no-real-roots", roots: [], steps };
  }
  const sr = splitRadical(d);
  if (!sr) return { status: "does-not-apply", roots: [], steps };

  const inner = polyToExpr([half, R.ONE], varName);
  const branches = R.isZero(sr.m)
    ? [equation(inner, num(0))]
    : [
        equation(inner, radicalSum(R.ZERO, sr.m, sr.r)),
        equation(inner, radicalSum(R.ZERO, R.negate(sr.m), sr.r)),
      ];
  steps.push(
    line("take the square root", "square roots of both sides — remember the ±", ...branches),
  );
  const roots = rootPair(R.negate(half), sr.m, sr.r);
  if (!R.isZero(half)) {
    const op = R.isNegative(half) ? "add" : "subtract";
    steps.push(
      line(
        `solve for ${varName}`,
        `${op} ${R.toString(R.abs(half))} on each branch`,
        ...roots.map((rt) => equation(variable(varName), rt)),
      ),
    );
  }
  return { status: "solved", roots, steps };
}

/** The quadratic formula, discriminant first — it always settles the matter. */
function byFormula(eq: Equation, varName: string): QuadraticSolution {
  const std = toStandard(eq, varName);
  if (!std) return { status: "not-quadratic", roots: [], steps: [] };
  const steps = [...std.steps];
  const { a, b, c } = std;

  steps.push(
    line(
      "identify the coefficients",
      `a = ${R.toString(a)}, b = ${R.toString(b)}, c = ${R.toString(c)}`,
      std.eq,
    ),
  );
  const D = R.sub(R.mul(b, b), R.mul(R.rational(4), R.mul(a, c)));
  steps.push(
    line(
      "compute the discriminant",
      `D = b² − 4ac = (${R.toString(b)})² − 4·(${R.toString(a)})·(${R.toString(c)}) = ${R.toString(D)}`,
      equation(variable("D"), ratExpr(D)),
    ),
  );
  if (R.isNegative(D)) {
    steps.push(
      line(
        "no real solutions",
        "the discriminant is negative — the square root has no real value",
        equation(variable("D"), ratExpr(D)),
      ),
    );
    return { status: "no-real-roots", roots: [], steps };
  }
  const x = variable(varName);
  const negB = ratExpr(R.negate(b));
  const twoA = ratExpr(R.mul(R.rational(2), a));
  const sqrtD = call("sqrt", ratExpr(D));
  const raw = R.isZero(D)
    ? [equation(x, div(negB, twoA))]
    : [equation(x, div(add(negB, sqrtD), twoA)), equation(x, div(sub(negB, sqrtD), twoA))];
  steps.push(line("apply the quadratic formula", "x = (−b ± √D) ⁄ 2a", ...raw));

  const sr = splitRadical(D);
  if (!sr) return { status: "does-not-apply", roots: [], steps };
  const roots = rootPair(
    R.div(R.negate(b), R.mul(R.rational(2), a)),
    R.div(sr.m, R.mul(R.rational(2), a)),
    sr.r,
  );
  const final = roots.map((rt) => equation(x, rt));
  const alreadySimple =
    final.length === raw.length &&
    final.every((f, i) => structuralEquals(f.rhs, raw[i].rhs));
  if (!alreadySimple) {
    steps.push(
      line(
        "simplify",
        R.isZero(D) ? "D = 0 — the two branches agree: a double root" : "work out the root and the fraction",
        ...final,
      ),
    );
  }
  return { status: "solved", roots, steps };
}

// ---------------------------------------------------------------------------
// 2×2 linear systems
// ---------------------------------------------------------------------------

export type SystemMethod = "substitution" | "elimination";

export interface SystemSolution {
  readonly status: "solved" | "no-solution" | "infinitely-many" | "not-linear";
  /** Variable name → exact value when solved. */
  readonly values: Readonly<Record<string, Expr>> | null;
  readonly steps: readonly SolveStep[];
}

/** One equation as a·x + b·y = k. */
interface Lin2 {
  readonly a: R.Rational;
  readonly b: R.Rational;
  readonly k: R.Rational;
}

function lin2Of(eq: Equation, x: string, y: string): Lin2 | null {
  if (eq.rel !== "=") return null;
  let a = R.ZERO;
  let b = R.ZERO;
  let k = R.ZERO;
  const ms = [...monomialsOf(eq.lhs), ...monomialsOf(eq.rhs).map(negMonomial)];
  for (const m of ms) {
    if (m.factors.length === 0) {
      k = R.sub(k, m.coef); // constants belong on the right
      continue;
    }
    if (m.factors.length !== 1) return null;
    const f = m.factors[0];
    if (f.base.kind !== "var" || !R.isOne(f.exp)) return null;
    if (f.base.name === x) a = R.add(a, m.coef);
    else if (f.base.name === y) b = R.add(b, m.coef);
    else return null;
  }
  return { a, b, k };
}

function lin2ToEquation(l: Lin2, x: string, y: string): Equation {
  const lhs = sumToExpr([
    { coef: l.a, factors: [{ base: variable(x), exp: R.ONE }] },
    { coef: l.b, factors: [{ base: variable(y), exp: R.ONE }] },
  ]);
  return equation(lhs, ratExpr(l.k));
}

/** Replace every occurrence of a variable with an expression. */
function substitute(e: Expr, name: string, value: Expr): Expr {
  switch (e.kind) {
    case "var":
      return e.name === name ? value : e;
    case "neg":
      return neg(substitute(e.arg, name, value));
    case "call":
      return call(e.fn, substitute(e.arg, name, value));
    case "binary":
      return {
        kind: "binary",
        op: e.op,
        left: substitute(e.left, name, value),
        right: substitute(e.right, name, value),
      };
    default:
      return e;
  }
}

const lcmInt = (a: number, b: number): number => {
  let x = Math.abs(a);
  let y = Math.abs(b);
  const m = x * y;
  while (y !== 0) [x, y] = [y, x % y];
  return m / x;
};

const equationEquals = (a: Equation, b: Equation): boolean =>
  a.rel === b.rel && structuralEquals(a.lhs, b.lhs) && structuralEquals(a.rhs, b.rhs);

export function solveSystem(
  eq1: Equation,
  eq2: Equation,
  vars: readonly [string, string],
  method: SystemMethod,
): SystemSolution {
  const [x, y] = vars;
  const steps: SolveStep[] = [];
  const l1 = lin2Of(eq1, x, y);
  const l2 = lin2Of(eq2, x, y);
  if (!l1 || !l2) return { status: "not-linear", values: null, steps };

  const std1 = lin2ToEquation(l1, x, y);
  const std2 = lin2ToEquation(l2, x, y);
  if (!equationEquals(std1, eq1) || !equationEquals(std2, eq2)) {
    steps.push(
      both("standard form", "variables on the left, constants on the right", std1, std2),
    );
  }

  // A row with no variables at all is either vacuous (0 = 0) or impossible.
  const degenerate = (l: Lin2): boolean => R.isZero(l.a) && R.isZero(l.b);
  if (degenerate(l1) || degenerate(l2)) {
    const impossible = [l1, l2].some((l) => degenerate(l) && !R.isZero(l.k));
    return {
      status: impossible ? "no-solution" : "infinitely-many",
      values: null,
      steps,
    };
  }

  const det = R.sub(R.mul(l1.a, l2.b), R.mul(l2.a, l1.b));
  if (R.isZero(det)) {
    // Left sides proportional: the same line, or parallel lines.
    const t = R.isZero(l1.a) ? R.div(l2.b, l1.b) : R.div(l2.a, l1.a);
    const resid = R.sub(l2.k, R.mul(t, l1.k));
    const same = R.isZero(resid);
    steps.push(
      line(
        "compare the lines",
        `equation 2 is ${R.toString(t)} × equation 1 on the left — subtracting leaves ${
          same ? "0 = 0: the same line twice" : "an impossible equation: parallel lines"
        }`,
        equation(num(0), ratExpr(resid)),
      ),
    );
    return { status: same ? "infinitely-many" : "no-solution", values: null, steps };
  }

  return method === "elimination"
    ? byElimination(l1, l2, x, y, steps)
    : bySubstitution(l1, l2, x, y, steps);
}

function byElimination(
  l1: Lin2,
  l2: Lin2,
  x: string,
  y: string,
  steps: SolveStep[],
): SystemSolution {
  // Reduce to one equation in y: either an original is already x-free, or
  // scale both to matching x-coefficients and subtract.
  let yCoef: R.Rational;
  let yK: R.Rational;
  if (R.isZero(l1.a) || R.isZero(l2.a)) {
    const free = R.isZero(l1.a) ? l1 : l2;
    const which = free === l1 ? 1 : 2;
    yCoef = free.b;
    yK = free.k;
    steps.push(
      line(
        "one equation is ready",
        `equation ${which} has no ${x} term`,
        lin2ToEquation(free, x, y),
      ),
    );
  } else {
    const target =
      R.isInteger(l1.a) && R.isInteger(l2.a)
        ? R.rational(lcmInt(l1.a.p, l2.a.p))
        : R.ONE;
    const scaled: Lin2[] = [];
    [l1, l2].forEach((l, i) => {
      const m = R.div(target, l.a);
      const s: Lin2 = { a: R.mul(l.a, m), b: R.mul(l.b, m), k: R.mul(l.k, m) };
      scaled.push(s);
      if (!R.isOne(m)) {
        steps.push(
          line(
            `scale equation ${i + 1}`,
            `multiply equation ${i + 1} by ${R.toString(m)} to match the ${x} terms`,
            lin2ToEquation(s, x, y),
          ),
        );
      }
    });
    yCoef = R.sub(scaled[0].b, scaled[1].b);
    yK = R.sub(scaled[0].k, scaled[1].k);
    steps.push(
      line(
        "subtract the equations",
        `the ${x} terms cancel`,
        lin2ToEquation({ a: R.ZERO, b: yCoef, k: yK }, x, y),
      ),
    );
  }
  const y0 = R.div(yK, yCoef); // det ≠ 0 guarantees yCoef ≠ 0
  if (!R.isOne(yCoef)) {
    steps.push(
      line(
        "divide",
        `divide both sides by ${R.toString(yCoef)}`,
        equation(variable(y), ratExpr(y0)),
      ),
    );
  }

  const host = R.isZero(l1.a) ? { l: l2, n: 2 } : { l: l1, n: 1 };
  const hostEq = lin2ToEquation(host.l, x, y);
  const substituted = equation(substitute(hostEq.lhs, y, ratExpr(y0)), hostEq.rhs);
  steps.push(
    line(
      "substitute back",
      `put ${y} = ${R.toString(y0)} into equation ${host.n}`,
      substituted,
    ),
  );
  const solX = solveLinear(substituted, x);
  if (solX.status !== "solved" || !solX.result) {
    return { status: "not-linear", values: null, steps };
  }
  steps.push(...fromLinearSteps(solX.steps));
  const x0 = solX.result.rhs;
  steps.push(
    both(
      "solution",
      "the lines cross at exactly one point",
      equation(variable(x), x0),
      equation(variable(y), ratExpr(y0)),
    ),
  );
  return { status: "solved", values: { [x]: x0, [y]: ratExpr(y0) }, steps };
}

function bySubstitution(
  l1: Lin2,
  l2: Lin2,
  x: string,
  y: string,
  steps: SolveStep[],
): SystemSolution {
  // Solve for the friendliest coefficient: ±1 beats other integers beats fractions.
  const options = [
    { l: l1, n: 1, v: x, vCoef: l1.a, o: y, oCoef: l1.b },
    { l: l1, n: 1, v: y, vCoef: l1.b, o: x, oCoef: l1.a },
    { l: l2, n: 2, v: x, vCoef: l2.a, o: y, oCoef: l2.b },
    { l: l2, n: 2, v: y, vCoef: l2.b, o: x, oCoef: l2.a },
  ].filter((c) => !R.isZero(c.vCoef));
  const score = (c: (typeof options)[number]): number =>
    R.isOne(R.abs(c.vCoef)) ? 0 : R.isInteger(c.vCoef) ? 1 : 2;
  options.sort((p, q) => score(p) - score(q));
  const pick = options[0];

  const constPart = R.div(pick.l.k, pick.vCoef);
  const otherCoef = R.negate(R.div(pick.oCoef, pick.vCoef));
  const expr = sumToExpr([
    { coef: constPart, factors: [] },
    { coef: otherCoef, factors: [{ base: variable(pick.o), exp: R.ONE }] },
  ]);
  steps.push(
    line(
      `solve equation ${pick.n} for ${pick.v}`,
      `isolate ${pick.v}`,
      equation(variable(pick.v), expr),
    ),
  );

  const other = pick.l === l1 ? { l: l2, n: 2 } : { l: l1, n: 1 };
  const otherEq = lin2ToEquation(other.l, x, y);
  const raw = substitute(otherEq.lhs, pick.v, expr);
  steps.push(
    line(
      "substitute",
      `replace ${pick.v} in equation ${other.n}`,
      equation(raw, otherEq.rhs),
    ),
  );
  const expanded = expand(raw).result;
  let work = equation(expanded, otherEq.rhs);
  if (!structuralEquals(expanded, raw)) {
    steps.push(line("expand", "distribute and combine like terms", work));
  }
  const sol = solveLinear(work, pick.o);
  if (sol.status === "identity") return { status: "infinitely-many", values: null, steps };
  if (sol.status === "contradiction") return { status: "no-solution", values: null, steps };
  if (sol.status !== "solved" || !sol.result) {
    return { status: "not-linear", values: null, steps };
  }
  steps.push(...fromLinearSteps(sol.steps));
  const w0 = literalOf(sol.result.rhs) ?? R.ZERO;

  const backVal = R.add(constPart, R.mul(otherCoef, w0));
  steps.push(
    line(
      "back-substitute",
      `put ${pick.o} = ${R.toString(w0)} back into ${pick.v} = ${toText(expr)}`,
      equation(variable(pick.v), ratExpr(backVal)),
    ),
  );
  const values = { [pick.v]: ratExpr(backVal), [pick.o]: ratExpr(w0) };
  steps.push(
    both(
      "solution",
      "the lines cross at exactly one point",
      equation(variable(x), values[x]),
      equation(variable(y), values[y]),
    ),
  );
  return { status: "solved", values, steps };
}
