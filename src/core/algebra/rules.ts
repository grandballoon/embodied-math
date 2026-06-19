import {
  type Expr,
  add,
  call,
  div,
  mul,
  neg,
  num,
  pow,
  sub,
} from "./ast.ts";
import { type Derivation, type Rule, runToFixpoint } from "./rewrite.ts";
import * as R from "./rational.ts";
import {
  type Monomial,
  compareExpr,
  literalOf,
  monomialOf,
  monomialToExpr,
  monomialsOf,
  factorKey,
  polyOf,
  polyToExpr,
  ratExpr,
  structuralEquals,
  sumToExpr,
  varsIn,
} from "./structure.ts";

/**
 * The rule catalog: every transformation school algebra performs, as named
 * TS functions. Each rule is sound under evaluation — for any bindings,
 * evaluate(before) === evaluate(after) — which the property suite checks at
 * random bindings; rules that would break it (like √(x²) → x, false for
 * negative x) are deliberately absent.
 *
 * Rules return null when they don't apply; returning a structurally equal
 * expression also counts as not applying (rewrite.ts checks), so the
 * canonicalizing rules (combine-*) rebuild freely.
 *
 * Three rule sets, because simplify and expand/factor disagree about which
 * form is "better": SIMPLIFY never multiplies out or factors; EXPAND adds
 * distribution; FACTOR adds the factoring patterns. Expand and factor are
 * inverses across the quadratic curriculum.
 */

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const lit = literalOf;
const isZeroLit = (e: Expr): boolean => {
  const v = lit(e);
  return v !== null && R.isZero(v);
};
const isOneLit = (e: Expr): boolean => {
  const v = lit(e);
  return v !== null && R.isOne(v);
};
const isSum = (e: Expr): e is Expr & { kind: "binary" } =>
  e.kind === "binary" && (e.op === "+" || e.op === "-");
/** Rational → node, refusing results that overflowed float-integer range. */
const safeRat = (r: R.Rational): Expr | null => (R.isExact(r) ? ratExpr(r) : null);

/** The single variable of an expression, or null if there isn't exactly one. */
function soleVar(e: Expr): string | null {
  const vars = [...varsIn(e)];
  return vars.length === 1 ? vars[0] : null;
}

// ---------------------------------------------------------------------------
// Arithmetic folding + identities
// ---------------------------------------------------------------------------

export const arithmetic: Rule = {
  name: "arithmetic",
  description: "compute the constant arithmetic exactly",
  apply(e) {
    if (e.kind === "neg") {
      const a = lit(e.arg);
      return a ? safeRat(R.negate(a)) : null;
    }
    if (e.kind !== "binary") return null;
    const l = lit(e.left);
    const r = lit(e.right);
    if (!l || !r) return null;
    switch (e.op) {
      case "+":
        return safeRat(R.add(l, r));
      case "-":
        return safeRat(R.sub(l, r));
      case "*":
        return safeRat(R.mul(l, r));
      case "/":
        return R.isZero(r) ? null : safeRat(R.div(l, r));
      case "^": {
        if (!R.isInteger(r)) return null;
        if (R.isZero(l) && r.p < 0) return null;
        return safeRat(R.pow(l, r.p));
      }
    }
  },
};

export const addZero: Rule = {
  name: "add zero",
  description: "adding or subtracting zero changes nothing",
  apply(e) {
    if (!isSum(e)) return null;
    if (isZeroLit(e.right)) return e.left;
    if (e.op === "+" && isZeroLit(e.left)) return e.right;
    return null;
  },
};

export const subFromZero: Rule = {
  name: "subtract from zero",
  description: "0 − x is the opposite of x",
  apply(e) {
    if (e.kind === "binary" && e.op === "-" && isZeroLit(e.left)) return neg(e.right);
    return null;
  },
};

export const mulOne: Rule = {
  name: "multiply by one",
  description: "multiplying by 1 changes nothing",
  apply(e) {
    if (e.kind !== "binary" || e.op !== "*") return null;
    if (isOneLit(e.left)) return e.right;
    if (isOneLit(e.right)) return e.left;
    return null;
  },
};

export const mulZero: Rule = {
  name: "multiply by zero",
  description: "anything times zero is zero",
  apply(e) {
    if (e.kind !== "binary" || e.op !== "*") return null;
    return isZeroLit(e.left) || isZeroLit(e.right) ? num(0) : null;
  },
};

export const divOne: Rule = {
  name: "divide by one",
  description: "dividing by 1 changes nothing",
  apply(e) {
    return e.kind === "binary" && e.op === "/" && isOneLit(e.right) ? e.left : null;
  },
};

export const zeroDivided: Rule = {
  name: "zero divided",
  description: "zero divided by anything (nonzero) is zero",
  apply(e) {
    if (e.kind !== "binary" || e.op !== "/") return null;
    return isZeroLit(e.left) && !isZeroLit(e.right) ? num(0) : null;
  },
};

export const powOne: Rule = {
  name: "exponent one",
  description: "x¹ is just x",
  apply(e) {
    return e.kind === "binary" && e.op === "^" && isOneLit(e.right) ? e.left : null;
  },
};

export const powZero: Rule = {
  name: "exponent zero",
  description: "anything to the zeroth power is 1",
  apply(e) {
    return e.kind === "binary" && e.op === "^" && isZeroLit(e.right) ? num(1) : null;
  },
};

export const onePow: Rule = {
  name: "power of one",
  description: "1 to any power is 1",
  apply(e) {
    return e.kind === "binary" && e.op === "^" && isOneLit(e.left) ? num(1) : null;
  },
};

export const subtractNegative: Rule = {
  name: "subtract a negative",
  description: "subtracting a negative is adding",
  apply(e) {
    if (e.kind !== "binary" || e.op !== "-") return null;
    const r = lit(e.right);
    if (!r || !R.isNegative(r)) return null;
    return add(e.left, ratExpr(R.abs(r)));
  },
};

export const addNegative: Rule = {
  name: "add a negative",
  description: "adding a negative is subtracting",
  apply(e) {
    if (e.kind !== "binary" || e.op !== "+") return null;
    const r = lit(e.right);
    if (!r || !R.isNegative(r)) return null;
    return sub(e.left, ratExpr(R.abs(r)));
  },
};

export const doubleNeg: Rule = {
  name: "double negative",
  description: "the opposite of the opposite is the original",
  apply(e) {
    return e.kind === "neg" && e.arg.kind === "neg" ? e.arg.arg : null;
  },
};

// ---------------------------------------------------------------------------
// Exponent rules
// ---------------------------------------------------------------------------

export const powerOfPower: Rule = {
  name: "power of a power",
  description: "(xᵃ)ᵇ = xᵃᵇ — multiply the exponents",
  apply(e) {
    if (e.kind !== "binary" || e.op !== "^" || e.left.kind !== "binary" || e.left.op !== "^") {
      return null;
    }
    const inner = lit(e.left.right);
    const outer = lit(e.right);
    if (!inner || !outer || !R.isInteger(inner) || !R.isInteger(outer)) return null;
    const merged = safeRat(R.mul(inner, outer));
    return merged ? pow(e.left.left, merged) : null;
  },
};

export const powerOfProduct: Rule = {
  name: "power of a product",
  description: "(xy)ⁿ = xⁿyⁿ — the exponent distributes over multiplication",
  apply(e) {
    if (e.kind !== "binary" || e.op !== "^") return null;
    const n = lit(e.right);
    if (!n || !R.isInteger(n)) return null;
    if (e.left.kind !== "binary" || (e.left.op !== "*" && e.left.op !== "/")) return null;
    const ln = pow(e.left.left, ratExpr(n));
    const rn = pow(e.left.right, ratExpr(n));
    return e.left.op === "*" ? mul(ln, rn) : div(ln, rn);
  },
};

export const productOfPowers: Rule = {
  name: "product of powers",
  description: "xᵃ·xᵇ = xᵃ⁺ᵇ — add the exponents of the repeated base",
  apply(e) {
    if (e.kind !== "binary" || e.op !== "*") return null;
    const lm = monomialOf(e.left);
    const rm = monomialOf(e.right);
    const shared = lm.factors.some((f) =>
      rm.factors.some((g) => structuralEquals(f.base, g.base)),
    );
    return shared ? monomialToExpr(monomialOf(e)) : null;
  },
};

export const combineFactors: Rule = {
  name: "combine factors",
  description: "rewrite the product in standard order, constants first",
  apply(e) {
    if (e.kind !== "binary" || e.op !== "*") return null;
    return monomialToExpr(monomialOf(e));
  },
};

// ---------------------------------------------------------------------------
// Combine like terms
// ---------------------------------------------------------------------------

export const combineLikeTerms: Rule = {
  name: "combine like terms",
  description: "add the coefficients of terms with the same variable part",
  apply(e) {
    if (!isSum(e)) return null;
    const ms = monomialsOf(e);
    const groups = new Map<string, Monomial[]>();
    for (const m of ms) {
      const key = factorKey(m.factors);
      const group = groups.get(key);
      if (group) group.push(m);
      else groups.set(key, [m]);
    }
    const combinable =
      [...groups.values()].some((g) => g.length > 1) || ms.some((m) => R.isZero(m.coef));
    if (!combinable) return null;
    const terms = [...groups.values()].map((g) =>
      g.reduce((a, b) => ({ coef: R.add(a.coef, b.coef), factors: a.factors })),
    );
    return sumToExpr(terms);
  },
};

// ---------------------------------------------------------------------------
// Fractions
// ---------------------------------------------------------------------------

export const addFractions: Rule = {
  name: "add fractions",
  description: "put both fractions over a common denominator",
  apply(e) {
    if (!isSum(e)) return null;
    const l = e.left;
    const r = e.right;
    if (l.kind !== "binary" || l.op !== "/" || r.kind !== "binary" || r.op !== "/") return null;
    const combineTops = e.op === "+" ? add : sub;
    if (structuralEquals(l.right, r.right)) {
      return div(combineTops(l.left, r.left), l.right);
    }
    return div(
      combineTops(mul(l.left, r.right), mul(r.left, l.right)),
      mul(l.right, r.right),
    );
  },
};

export const cancelFraction: Rule = {
  name: "cancel common factors",
  description: "divide the numerator and denominator by their common factor",
  apply(e) {
    if (e.kind !== "binary" || e.op !== "/") return null;
    const den = monomialOf(e.right);
    if (den.factors.length === 0 || R.isZero(den.coef)) return null;
    return monomialToExpr(monomialOf(e));
  },
};

// ---------------------------------------------------------------------------
// Distribution (EXPAND only)
// ---------------------------------------------------------------------------

export const binomialSquare: Rule = {
  name: "binomial square",
  description: "(a ± b)² = a² ± 2ab + b²",
  apply(e) {
    if (e.kind !== "binary" || e.op !== "^") return null;
    const n = lit(e.right);
    if (!n || !R.equals(n, R.rational(2)) || !isSum(e.left)) return null;
    const { left: a, op, right: b } = e.left;
    const a2 = pow(a, num(2));
    const b2 = pow(b, num(2));
    const twoAB = mul(mul(num(2), a), b);
    return op === "+" ? add(add(a2, twoAB), b2) : add(sub(a2, twoAB), b2);
  },
};

export const expandPower: Rule = {
  name: "expand the power",
  description: "(a + b)ⁿ = (a + b)·(a + b)ⁿ⁻¹",
  apply(e) {
    if (e.kind !== "binary" || e.op !== "^" || !isSum(e.left)) return null;
    const n = lit(e.right);
    if (!n || !R.isInteger(n) || n.p < 3) return null;
    return mul(e.left, pow(e.left, num(n.p - 1)));
  },
};

export const distribute: Rule = {
  name: "distribute",
  description: "multiply each term inside the parentheses",
  apply(e) {
    if (e.kind !== "binary" || e.op !== "*") return null;
    if (isSum(e.right)) {
      const { left: b, op, right: c } = e.right;
      const join = op === "+" ? add : sub;
      return join(mul(e.left, b), mul(e.left, c));
    }
    if (isSum(e.left)) {
      const { left: a, op, right: b } = e.left;
      const join = op === "+" ? add : sub;
      return join(mul(a, e.right), mul(b, e.right));
    }
    return null;
  },
};

// ---------------------------------------------------------------------------
// Factoring (FACTOR only)
// ---------------------------------------------------------------------------

export const factorGcf: Rule = {
  name: "factor out the GCF",
  description: "pull the greatest common factor out of every term",
  apply(e) {
    if (!isSum(e)) return null;
    const ms = monomialsOf(e);
    if (ms.length < 2) return null;
    if (!ms.every((m) => R.isInteger(m.coef) && !R.isZero(m.coef))) return null;
    let g = Math.abs(ms[0].coef.p);
    for (const m of ms.slice(1)) {
      let b = Math.abs(m.coef.p);
      while (b !== 0) [g, b] = [b, g % b];
    }
    // Common symbolic factors: minimum positive exponent per shared base.
    let common = ms[0].factors.filter((f) => R.isInteger(f.exp) && f.exp.p > 0);
    for (const m of ms.slice(1)) {
      common = common.flatMap((f) => {
        const match = m.factors.find(
          (h) => structuralEquals(h.base, f.base) && R.isInteger(h.exp) && h.exp.p > 0,
        );
        if (!match) return [];
        return [{ base: f.base, exp: R.compare(match.exp, f.exp) < 0 ? match.exp : f.exp }];
      });
    }
    if (g <= 1 && common.length === 0) return null;
    const gcf: Monomial = { coef: R.rational(g), factors: common };
    const divided = ms.map((m) => ({
      coef: R.div(m.coef, gcf.coef),
      factors: m.factors
        .map((f) => {
          const shared = common.find((c) => structuralEquals(c.base, f.base));
          return shared ? { base: f.base, exp: R.sub(f.exp, shared.exp) } : f;
        })
        .filter((f) => !R.isZero(f.exp)),
    }));
    return mul(monomialToExpr(gcf), sumToExpr(divided));
  },
};

/** A monomial that is a perfect square, halved: 9x² → 3x. Null otherwise. */
function sqrtMonomial(m: Monomial): Monomial | null {
  const c = R.sqrtExact(m.coef);
  if (!c) return null;
  const halved: { base: Expr; exp: R.Rational }[] = [];
  for (const f of m.factors) {
    if (!R.isInteger(f.exp) || f.exp.p <= 0 || f.exp.p % 2 !== 0) return null;
    halved.push({ base: f.base, exp: R.rational(f.exp.p / 2) });
  }
  return { coef: c, factors: halved };
}

export const differenceOfSquares: Rule = {
  name: "difference of squares",
  description: "a² − b² = (a − b)(a + b)",
  apply(e) {
    if (!isSum(e)) return null;
    const ms = monomialsOf(e);
    if (ms.length !== 2) return null;
    const pos = ms.find((m) => R.compare(m.coef, R.ZERO) > 0);
    const negTerm = ms.find((m) => R.compare(m.coef, R.ZERO) < 0);
    if (!pos || !negTerm) return null;
    const a = sqrtMonomial(pos);
    const b = sqrtMonomial({ coef: R.negate(negTerm.coef), factors: negTerm.factors });
    if (!a || !b) return null;
    const aE = monomialToExpr(a);
    const bE = monomialToExpr(b);
    return mul(sub(aE, bE), add(aE, bE));
  },
};

export const perfectSquareTrinomial: Rule = {
  name: "perfect square trinomial",
  description: "a² ± 2ab + b² = (a ± b)²",
  apply(e) {
    if (!isSum(e)) return null;
    const v = soleVar(e);
    if (!v) return null;
    const poly = polyOf(e, v);
    if (!poly || poly.length !== 3) return null;
    const [c, b, a] = poly;
    if (!R.equals(R.mul(b, b), R.mul(R.rational(4), R.mul(a, c)))) return null;
    const sa = R.sqrtExact(a);
    const sc = R.sqrtExact(c);
    if (!sa || !sc) return null;
    const x: Expr = { kind: "var", name: v };
    const signedC = R.compare(b, R.ZERO) < 0 ? R.negate(sc) : sc;
    const inner = sumToExpr([
      { coef: sa, factors: [{ base: x, exp: R.ONE }] },
      { coef: signedC, factors: [] },
    ]);
    return pow(inner, num(2));
  },
};

export const factorQuadratic: Rule = {
  name: "factor the quadratic",
  description: "find two roots and write a(x − r₁)(x − r₂)",
  apply(e) {
    if (!isSum(e)) return null;
    const v = soleVar(e);
    if (!v) return null;
    const poly = polyOf(e, v);
    if (!poly || poly.length !== 3 || R.isZero(poly[2])) return null;
    const [c, b, a] = poly;
    const disc = R.sub(R.mul(b, b), R.mul(R.rational(4), R.mul(a, c)));
    const sd = R.sqrtExact(disc);
    if (!sd) return null;
    const twoA = R.mul(R.rational(2), a);
    const roots = [R.div(R.sub(R.negate(b), sd), twoA), R.div(R.add(R.negate(b), sd), twoA)];
    // Each root p/q contributes the integer binomial (qx − p).
    const binomials = roots.map((r) =>
      polyToExpr([R.rational(-r.p), R.rational(r.q)], v),
    );
    // Sort the factor pair the way combineFactors' canonical order would,
    // so factoring output doesn't get cosmetically reordered afterwards.
    binomials.sort(compareExpr);
    const leftover = R.div(a, R.rational(roots[0].q * roots[1].q));
    const parts = R.isOne(leftover) ? binomials : [ratExpr(leftover), ...binomials];
    return parts.reduce((acc, p) => mul(acc, p));
  },
};

// ---------------------------------------------------------------------------
// Radicals
// ---------------------------------------------------------------------------

export const simplifyRadical: Rule = {
  name: "simplify the radical",
  description: "√(a²b) = a√b — pull perfect squares out of the root",
  apply(e) {
    if (e.kind !== "call" || e.fn !== "sqrt") return null;
    const n = lit(e.arg);
    if (!n || R.isNegative(n)) return null;
    const exact = R.sqrtExact(n);
    if (exact) return ratExpr(exact);
    if (!R.isInteger(n)) return null;
    const value = n.p;
    for (let s = Math.floor(Math.sqrt(value)); s >= 2; s--) {
      if (value % (s * s) === 0) {
        return mul(num(s), call("sqrt", num(value / (s * s))));
      }
    }
    return null;
  },
};

export const rationalizeDenominator: Rule = {
  name: "rationalize the denominator",
  description: "multiply top and bottom by the root to clear it below",
  apply(e) {
    if (e.kind !== "binary" || e.op !== "/") return null;
    const d = e.right;
    if (d.kind !== "call" || d.fn !== "sqrt") return null;
    const n = lit(d.arg);
    if (!n || R.compare(n, R.ZERO) <= 0) return null;
    return div(mul(e.left, d), ratExpr(n));
  },
};

// ---------------------------------------------------------------------------
// Rule sets + drivers
// ---------------------------------------------------------------------------

const FOLD_AND_IDENTITIES: readonly Rule[] = [
  arithmetic,
  addZero,
  subFromZero,
  mulOne,
  mulZero,
  divOne,
  zeroDivided,
  powOne,
  powZero,
  onePow,
  subtractNegative,
  addNegative,
  doubleNeg,
];

export const SIMPLIFY_RULES: readonly Rule[] = [
  ...FOLD_AND_IDENTITIES,
  powerOfPower,
  powerOfProduct,
  productOfPowers,
  combineLikeTerms,
  addFractions,
  cancelFraction,
  combineFactors,
  simplifyRadical,
  rationalizeDenominator,
];

export const EXPAND_RULES: readonly Rule[] = [
  binomialSquare,
  expandPower,
  distribute,
  ...SIMPLIFY_RULES,
];

export const FACTOR_RULES: readonly Rule[] = [
  ...SIMPLIFY_RULES,
  factorGcf,
  differenceOfSquares,
  perfectSquareTrinomial,
  factorQuadratic,
];

/** Every rule once, for the property suite. */
export const ALL_RULES: readonly Rule[] = [
  ...new Set([...EXPAND_RULES, ...FACTOR_RULES]),
];

export const simplify = (e: Expr): Derivation => runToFixpoint(SIMPLIFY_RULES, e);
export const expand = (e: Expr): Derivation => runToFixpoint(EXPAND_RULES, e);
// Outermost: factoring decides at the whole sum, never at a partial one.
export const factor = (e: Expr): Derivation => runToFixpoint(FACTOR_RULES, e, "outermost");
