import { type Expr, add, div, mul, neg, num, pow, rat, sub } from "./ast.ts";
import { toText } from "./print.ts";
import * as R from "./rational.ts";

/**
 * Structure utilities: the views of the AST that rewrite rules operate on.
 *
 * Raw trees are binary and order-sensitive; school algebra is not. A rule
 * like combine-like-terms wants "the terms of this sum, each split into
 * (rational coefficient) × (sorted factor list)" — so 3x²y, y·3·x², and
 * -(-3)yx² all present as {coef: 3, factors: [x², y]}. These views are
 * lossy on purpose (they canonicalize); rules guard with structuralEquals
 * so a rebuild that changes nothing is "rule did not apply".
 *
 * Everything here is exact: coefficients are Rationals. A float that
 * isn't integral can't join a coefficient, so it rides along as an opaque
 * factor — wrong answers are worse than unsimplified ones.
 */

// ---------------------------------------------------------------------------
// Literals
// ---------------------------------------------------------------------------

/** The exact value of a literal node (integral num or rat), else null. */
export function literalOf(e: Expr): R.Rational | null {
  if (e.kind === "rat") return { p: e.p, q: e.q };
  if (e.kind === "num" && Number.isSafeInteger(e.value)) return R.rational(e.value);
  if (e.kind === "neg") {
    const inner = literalOf(e.arg);
    return inner ? R.negate(inner) : null;
  }
  return null;
}

/** Rational → AST node ("rat", collapsing integers to "num"). */
export const ratExpr = (r: R.Rational): Expr => rat(r.p, r.q);

/**
 * Replace float "num" nodes with exact rationals where a convincing one
 * exists (drag-produced 0.4000000000000003 → 2/5). Floats with no close
 * small rational stay floats and the engine simply won't fold them.
 */
export function toExact(e: Expr): Expr {
  switch (e.kind) {
    case "num": {
      if (Number.isInteger(e.value)) return e;
      const r = R.fromNumber(e.value);
      return r ? ratExpr(r) : e;
    }
    case "rat":
    case "var":
    case "param":
    case "const":
      return e;
    case "neg":
      return neg(toExact(e.arg));
    case "binary":
      return { kind: "binary", op: e.op, left: toExact(e.left), right: toExact(e.right) };
    case "call":
      return { kind: "call", fn: e.fn, arg: toExact(e.arg) };
  }
}

// ---------------------------------------------------------------------------
// Structural equality and canonical ordering
// ---------------------------------------------------------------------------

export function structuralEquals(a: Expr, b: Expr): boolean {
  if (a.kind !== b.kind) return false;
  switch (a.kind) {
    case "num":
      return a.value === (b as typeof a).value;
    case "rat": {
      const br = b as typeof a;
      return a.p === br.p && a.q === br.q;
    }
    case "var":
    case "param":
    case "const":
      return a.name === (b as typeof a).name;
    case "neg":
      return structuralEquals(a.arg, (b as typeof a).arg);
    case "binary": {
      const bb = b as typeof a;
      return a.op === bb.op && structuralEquals(a.left, bb.left) && structuralEquals(a.right, bb.right);
    }
    case "call": {
      const bc = b as typeof a;
      return a.fn === bc.fn && structuralEquals(a.arg, bc.arg);
    }
  }
}

const KIND_RANK: Record<Expr["kind"], number> = {
  num: 0,
  rat: 0,
  const: 1,
  param: 2,
  var: 3,
  call: 4,
  neg: 5,
  binary: 6,
};

/**
 * Canonical total order on expressions, so factor lists and term output are
 * deterministic and x²y unifies with yx². Ties between structurally distinct
 * nodes (num 0.5 vs rat 1/2) are harmless — this orders, equality decides.
 */
export function compareExpr(a: Expr, b: Expr): number {
  const dr = KIND_RANK[a.kind] - KIND_RANK[b.kind];
  if (dr !== 0) return dr;
  switch (a.kind) {
    case "num":
    case "rat": {
      const av = a.kind === "num" ? a.value : a.p / a.q;
      const bv = b.kind === "num" ? b.value : b.kind === "rat" ? b.p / b.q : 0;
      return av - bv;
    }
    case "var":
    case "param":
    case "const": {
      const bn = (b as typeof a).name;
      return a.name < bn ? -1 : a.name > bn ? 1 : 0;
    }
    case "call": {
      const bc = b as typeof a;
      if (a.fn !== bc.fn) return a.fn < bc.fn ? -1 : 1;
      return compareExpr(a.arg, bc.arg);
    }
    case "neg":
      return compareExpr(a.arg, (b as typeof a).arg);
    case "binary": {
      const bb = b as typeof a;
      if (a.op !== bb.op) return a.op < bb.op ? -1 : 1;
      return compareExpr(a.left, bb.left) || compareExpr(a.right, bb.right);
    }
  }
}

// ---------------------------------------------------------------------------
// Monomial view: product → (rational coefficient) × (sorted factor list)
// ---------------------------------------------------------------------------

export interface Factor {
  readonly base: Expr;
  readonly exp: R.Rational;
}

export interface Monomial {
  readonly coef: R.Rational;
  readonly factors: readonly Factor[];
}

export const negMonomial = (m: Monomial): Monomial => ({ coef: R.negate(m.coef), factors: m.factors });

/** Merge two factor lists, adding exponents on structurally equal bases. */
function mergeFactors(a: readonly Factor[], b: readonly Factor[]): Factor[] {
  const out: Factor[] = [...a];
  for (const f of b) {
    const i = out.findIndex((g) => structuralEquals(g.base, f.base));
    if (i === -1) out.push(f);
    else out[i] = { base: out[i].base, exp: R.add(out[i].exp, f.exp) };
  }
  return out.filter((f) => !R.isZero(f.exp)).sort((x, y) => compareExpr(x.base, y.base));
}

function mulMonomials(a: Monomial, b: Monomial): Monomial {
  return { coef: R.mul(a.coef, b.coef), factors: mergeFactors(a.factors, b.factors) };
}

function invMonomial(m: Monomial): Monomial | null {
  if (R.isZero(m.coef)) return null;
  return {
    coef: R.div(R.ONE, m.coef),
    factors: m.factors.map((f) => ({ base: f.base, exp: R.negate(f.exp) })),
  };
}

/**
 * View any expression as a monomial. Sums, calls, floats, and powers with
 * non-literal exponents become opaque single factors; the view never fails,
 * it just gets coarser.
 */
export function monomialOf(e: Expr): Monomial {
  const lit = literalOf(e);
  if (lit) return { coef: lit, factors: [] };
  switch (e.kind) {
    case "neg":
      return negMonomial(monomialOf(e.arg));
    case "binary":
      switch (e.op) {
        case "*":
          return mulMonomials(monomialOf(e.left), monomialOf(e.right));
        case "/": {
          const inv = invMonomial(monomialOf(e.right));
          if (!inv) break; // literal zero denominator: leave opaque
          return mulMonomials(monomialOf(e.left), inv);
        }
        case "^": {
          const n = literalOf(e.right);
          if (n && R.isInteger(n)) {
            const base = monomialOf(e.left);
            // Raising a monomial to an integer power scales every exponent;
            // negative powers invert, so the coefficient must be nonzero.
            if (n.p >= 0 || !R.isZero(base.coef)) {
              return {
                coef: R.pow(base.coef, n.p),
                factors: base.factors.map((f) => ({ base: f.base, exp: R.mul(f.exp, n) })),
              };
            }
          }
          break;
        }
      }
      break;
    default:
      break;
  }
  return { coef: R.ONE, factors: [{ base: e, exp: R.ONE }] };
}

/**
 * Canonical rebuild: coefficient first, factors sorted, negative exponents
 * → division (with the coefficient's denominator joining the bottom, so
 * {1/2, [x⁻¹]} builds 1/(2x), not (1/2)/x). Left-assoc products throughout,
 * so rules that assemble coefficient-times-rest by hand match this shape.
 */
export function monomialToExpr(m: Monomial): Expr {
  if (R.isZero(m.coef)) return num(0);
  if (m.factors.length === 0) return ratExpr(m.coef);
  const top: Expr[] = [];
  const bottom: Expr[] = [];
  for (const f of [...m.factors].sort((x, y) => compareExpr(x.base, y.base))) {
    const e = R.isNegative(f.exp) ? { base: f.base, exp: R.negate(f.exp) } : f;
    const built = R.isOne(e.exp) ? e.base : pow(e.base, ratExpr(e.exp));
    (R.isNegative(f.exp) ? bottom : top).push(built);
  }
  const coefAbs = R.abs(m.coef);
  if (bottom.length > 0) {
    if (coefAbs.p !== 1) top.unshift(num(coefAbs.p));
    if (coefAbs.q !== 1) bottom.unshift(num(coefAbs.q));
  } else if (!R.isOne(coefAbs)) {
    top.unshift(ratExpr(coefAbs));
  }
  const product = (parts: Expr[]): Expr =>
    parts.length === 0 ? num(1) : parts.reduce((acc, p) => mul(acc, p));
  const body = bottom.length > 0 ? div(product(top), product(bottom)) : product(top);
  return R.isNegative(m.coef) ? neg(body) : body;
}

/** Stable grouping key: two monomials with equal keys are like terms. */
export const factorKey = (factors: readonly Factor[]): string =>
  toText(monomialToExpr({ coef: R.ONE, factors }));

// ---------------------------------------------------------------------------
// Sum view: expression ⇄ flat term list
// ---------------------------------------------------------------------------

/** Flatten +/− (and negation of sums) into a list of monomials. */
export function monomialsOf(e: Expr): Monomial[] {
  switch (e.kind) {
    case "neg":
      return monomialsOf(e.arg).map(negMonomial);
    case "binary":
      if (e.op === "+") return [...monomialsOf(e.left), ...monomialsOf(e.right)];
      if (e.op === "-") return [...monomialsOf(e.left), ...monomialsOf(e.right).map(negMonomial)];
      break;
    default:
      break;
  }
  return [monomialOf(e)];
}

/** Total degree in "var" factors — what school sorts polynomials by. */
export function degreeOf(m: Monomial): number {
  let d = 0;
  for (const f of m.factors) {
    if (f.base.kind === "var") d += R.toNumber(f.exp);
  }
  return d;
}

function compareTerms(a: Monomial, b: Monomial): number {
  const dd = degreeOf(b) - degreeOf(a); // descending degree
  if (dd !== 0) return dd;
  const ka = factorKey(a.factors);
  const kb = factorKey(b.factors);
  if (ka !== kb) return ka < kb ? -1 : 1;
  return R.compare(b.coef, a.coef);
}

/**
 * Rebuild a sum in canonical school order (descending degree), rendering
 * negative-coefficient terms with binary minus: x² − x − 2, not x² + -x + -2.
 */
export function sumToExpr(terms: readonly Monomial[]): Expr {
  const live = terms.filter((t) => !R.isZero(t.coef)).sort(compareTerms);
  if (live.length === 0) return num(0);
  let out = monomialToExpr(live[0]);
  for (const t of live.slice(1)) {
    out = R.isNegative(t.coef)
      ? sub(out, monomialToExpr(negMonomial(t)))
      : add(out, monomialToExpr(t));
  }
  return out;
}

// ---------------------------------------------------------------------------
// Polynomial view: single-variable expression ⇄ coefficient list
// ---------------------------------------------------------------------------

/**
 * Coefficient list for a polynomial in `varName` (index = degree), or null
 * when the expression isn't one (other factors, negative/fractional powers).
 * Expand and factor both live on this view.
 */
export function polyOf(e: Expr, varName: string): R.Rational[] | null {
  const coeffs: R.Rational[] = [];
  for (const m of monomialsOf(e)) {
    let deg = 0;
    if (m.factors.length === 1) {
      const f = m.factors[0];
      if (f.base.kind !== "var" || f.base.name !== varName) return null;
      if (!R.isInteger(f.exp) || f.exp.p < 0) return null;
      deg = f.exp.p;
    } else if (m.factors.length > 1) {
      return null;
    }
    while (coeffs.length <= deg) coeffs.push(R.ZERO);
    coeffs[deg] = R.add(coeffs[deg], m.coef);
  }
  while (coeffs.length > 1 && R.isZero(coeffs[coeffs.length - 1])) coeffs.pop();
  return coeffs.length === 0 ? [R.ZERO] : coeffs;
}

export function polyToExpr(coeffs: readonly R.Rational[], varName: string): Expr {
  const x: Expr = { kind: "var", name: varName };
  const terms: Monomial[] = coeffs.map((c, i) => ({
    coef: c,
    factors: i === 0 ? [] : [{ base: x, exp: R.rational(i) }],
  }));
  return sumToExpr(terms);
}

/** All "var" names appearing in an expression (factoring needs exactly one). */
export function varsIn(e: Expr, into = new Set<string>()): Set<string> {
  switch (e.kind) {
    case "var":
      into.add(e.name);
      return into;
    case "neg":
      return varsIn(e.arg, into);
    case "call":
      return varsIn(e.arg, into);
    case "binary":
      varsIn(e.left, into);
      return varsIn(e.right, into);
    default:
      return into;
  }
}
