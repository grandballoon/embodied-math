/**
 * Expression AST: the data type the algebra engine operates on.
 *
 * Two name-bearing node kinds, deliberately distinct:
 *   - "var"   — an independent variable (x): what a graph sweeps over.
 *   - "param" — a tunable coefficient (m, b, a, h, k): what a grab handle
 *               drags. Same evaluation rule, different role in interaction.
 *
 * Numbers come in two kinds:
 *   - "num" — a plain float. The graph layer's native currency (sampling,
 *             dragged parameter values).
 *   - "rat" — an exact rational p/q (normalized: gcd-reduced, q > 0). What
 *             the rewrite engine computes with, so "solve 2x + 3 = 7" gives
 *             x = 2, never 1.9999999999999998. The parser emits "rat" for
 *             non-integer decimals (0.75 → 3/4); integers stay "num" with
 *             integral value, which the engine also treats as exact.
 *
 * Forms are content: nothing in this module canonicalizes. (x−2)(x+3) and
 * x²+x−6 are different trees on purpose — converting between forms is
 * curriculum, performed explicitly, never silently.
 */

export const FN_NAMES = [
  "sin",
  "cos",
  "tan",
  "asin",
  "acos",
  "atan",
  "sqrt",
  "abs",
  "ln",
  "log",
  "exp",
] as const;
export type FnName = (typeof FN_NAMES)[number];

export type BinaryOp = "+" | "-" | "*" | "/" | "^";

export type Expr =
  | { readonly kind: "num"; readonly value: number }
  | { readonly kind: "rat"; readonly p: number; readonly q: number }
  | { readonly kind: "var"; readonly name: string }
  | { readonly kind: "param"; readonly name: string }
  | { readonly kind: "const"; readonly name: "pi" | "e" }
  | { readonly kind: "neg"; readonly arg: Expr }
  | {
      readonly kind: "binary";
      readonly op: BinaryOp;
      readonly left: Expr;
      readonly right: Expr;
    }
  | { readonly kind: "call"; readonly fn: FnName; readonly arg: Expr };

// Constructor helpers, so building trees by hand reads like math.

export const num = (value: number): Expr => ({ kind: "num", value });
/** Exact rational node; integral values collapse to "num" so x − 2 never prints as x − 2/1. */
export const rat = (p: number, q = 1): Expr => {
  if (q === 0) throw new Error("rat with zero denominator");
  if (q < 0) [p, q] = [-p, -q];
  const g = gcdInt(p, q) || 1;
  p /= g;
  q /= g;
  return q === 1 ? { kind: "num", value: p } : { kind: "rat", p, q };
};
const gcdInt = (a: number, b: number): number => {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) [a, b] = [b, a % b];
  return a;
};
export const variable = (name: string): Expr => ({ kind: "var", name });
export const parameter = (name: string): Expr => ({ kind: "param", name });
export const constant = (name: "pi" | "e"): Expr => ({ kind: "const", name });
export const neg = (arg: Expr): Expr => ({ kind: "neg", arg });
export const call = (fn: FnName, arg: Expr): Expr => ({ kind: "call", fn, arg });

const bin =
  (op: BinaryOp) =>
  (left: Expr, right: Expr): Expr => ({ kind: "binary", op, left, right });
export const add = bin("+");
export const sub = bin("-");
export const mul = bin("*");
export const div = bin("/");
export const pow = bin("^");
