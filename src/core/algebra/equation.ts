import { type Expr, add, div, mul, sub } from "./ast.ts";
import { toText } from "./print.ts";
import * as R from "./rational.ts";
import { simplify } from "./rules.ts";
import { literalOf, polyOf, polyToExpr, ratExpr, structuralEquals } from "./structure.ts";

/**
 * Equations and inequalities: a relation between two expressions, plus the
 * both-sides moves that preserve it. Solving is a rule sequence and the
 * recorded steps are the classic two-column work — each EquationStep is one
 * line, its description the justification written in the margin.
 */

export type Relation = "=" | "<" | "<=" | ">" | ">=";

export interface Equation {
  readonly lhs: Expr;
  readonly rhs: Expr;
  readonly rel: Relation;
}

export const equation = (lhs: Expr, rhs: Expr, rel: Relation = "="): Equation => ({
  lhs,
  rhs,
  rel,
});

const FLIP: Record<Relation, Relation> = { "=": "=", "<": ">", "<=": ">=", ">": "<", ">=": "<=" };
const REL_TEXT: Record<Relation, string> = { "=": "=", "<": "<", "<=": "≤", ">": ">", ">=": "≥" };

export const equationToText = (eq: Equation): string =>
  `${toText(eq.lhs)} ${REL_TEXT[eq.rel]} ${toText(eq.rhs)}`;

export interface EquationStep {
  readonly rule: string;
  readonly description: string;
  readonly before: Equation;
  readonly after: Equation;
}

// ---------------------------------------------------------------------------
// Both-sides rules
// ---------------------------------------------------------------------------

export const addBothSides = (eq: Equation, t: Expr): Equation =>
  equation(add(eq.lhs, t), add(eq.rhs, t), eq.rel);

export const subBothSides = (eq: Equation, t: Expr): Equation =>
  equation(sub(eq.lhs, t), sub(eq.rhs, t), eq.rel);

/** True when the multiplier forces an inequality to flip. */
const flipsRelation = (eq: Equation, t: Expr): boolean => {
  if (eq.rel === "=") return false;
  const v = literalOf(t);
  return v !== null && R.isNegative(v);
};

/**
 * Multiplying or dividing both sides by a negative reverses an inequality.
 * Non-literal multipliers of unknown sign are the caller's responsibility —
 * school solving only ever scales by known constants.
 */
export const mulBothSides = (eq: Equation, t: Expr): Equation =>
  equation(mul(eq.lhs, t), mul(eq.rhs, t), flipsRelation(eq, t) ? FLIP[eq.rel] : eq.rel);

export const divBothSides = (eq: Equation, t: Expr): Equation =>
  equation(div(eq.lhs, t), div(eq.rhs, t), flipsRelation(eq, t) ? FLIP[eq.rel] : eq.rel);

// ---------------------------------------------------------------------------
// Linear solver — the first golden consumer of the rewrite engine
// ---------------------------------------------------------------------------

export interface Solution {
  readonly status: "solved" | "identity" | "contradiction" | "not-linear";
  /** x = value (or x < value, ...) when solved. */
  readonly result: Equation | null;
  readonly steps: readonly EquationStep[];
}

/**
 * Solve a linear equation or inequality in `varName`, recording two-column
 * steps. Each step's `after` shows the line as a student would write it
 * (the both-sides operation already simplified).
 */
export function solveLinear(eq: Equation, varName: string): Solution {
  const steps: EquationStep[] = [];
  const record = (rule: string, description: string, before: Equation, after: Equation) => {
    steps.push({ rule, description, before, after });
  };

  // 1. Simplify each side with the rewrite engine.
  let current = eq;
  const simpler = equation(simplify(eq.lhs).result, simplify(eq.rhs).result, eq.rel);
  if (!structuralEquals(simpler.lhs, current.lhs) || !structuralEquals(simpler.rhs, current.rhs)) {
    record("simplify", "combine like terms on each side", current, simpler);
    current = simpler;
  }

  const lp = polyOf(current.lhs, varName);
  const rp = polyOf(current.rhs, varName);
  if (!lp || !rp || lp.length > 2 || rp.length > 2) {
    return { status: "not-linear", result: null, steps };
  }
  let a1 = lp[1] ?? R.ZERO;
  let b1 = lp[0];
  const a2 = rp[1] ?? R.ZERO;
  let b2 = rp[0];

  const sides = (l: readonly R.Rational[], r: readonly R.Rational[]): Equation =>
    equation(polyToExpr(l, varName), polyToExpr(r, varName), current.rel);

  // 2. Move the variable terms to the left.
  if (!R.isZero(a2)) {
    const t = polyToExpr([R.ZERO, a2], varName);
    const next = sides([b1, R.sub(a1, a2)], [b2]);
    record("subtract from both sides", `subtract ${toText(t)} from both sides`, current, next);
    current = next;
    a1 = R.sub(a1, a2);
  }

  if (R.isZero(a1)) {
    // The variable vanished: every value works, or none does.
    const holds = relationHolds(current.rel, R.compare(b1, b2));
    return { status: holds ? "identity" : "contradiction", result: null, steps };
  }

  // 3. Move the constants to the right.
  if (!R.isZero(b1)) {
    const op = R.isNegative(b1) ? "add" : "subtract";
    const t = ratExpr(R.abs(b1));
    const next = sides([R.ZERO, a1], [R.sub(b2, b1)]);
    record(
      `${op} on both sides`,
      `${op} ${toText(t)} ${op === "add" ? "to" : "from"} both sides`,
      current,
      next,
    );
    current = next;
    b2 = R.sub(b2, b1);
  }

  // 4. Divide by the coefficient (flipping an inequality if it's negative).
  if (!R.isOne(a1)) {
    const rel = R.isNegative(a1) && current.rel !== "=" ? FLIP[current.rel] : current.rel;
    const next: Equation = {
      lhs: polyToExpr([R.ZERO, R.ONE], varName),
      rhs: ratExpr(R.div(b2, a1)),
      rel,
    };
    record(
      "divide both sides",
      `divide both sides by ${R.toString(a1)}${rel !== current.rel ? " (negative: flip the inequality)" : ""}`,
      current,
      next,
    );
    current = next;
  }

  return { status: "solved", result: current, steps };
}

function relationHolds(rel: Relation, cmp: number): boolean {
  switch (rel) {
    case "=":
      return cmp === 0;
    case "<":
      return cmp < 0;
    case "<=":
      return cmp <= 0;
    case ">":
      return cmp > 0;
    case ">=":
      return cmp >= 0;
  }
}
