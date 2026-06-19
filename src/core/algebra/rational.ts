/**
 * Exact rational arithmetic for the rewrite engine.
 *
 * Every Rational is normalized: gcd(|p|, q) = 1 and q > 0, so two equal
 * values are structurally equal objects and the sign lives on the numerator.
 *
 * Numerators/denominators are plain `number`s, not bigint: school-scale
 * values never approach 2^53, and plain numbers keep the engine trivially
 * interoperable with the float world. The documented fallback if a chain of
 * operations ever overflows MAX_SAFE_INTEGER: `isExact` returns false and
 * callers should bail out of exact rewriting for that expression (rules in
 * rules.ts decline to fold non-exact values rather than fold them wrongly).
 */

export interface Rational {
  readonly p: number;
  readonly q: number;
}

export const ZERO: Rational = { p: 0, q: 1 };
export const ONE: Rational = { p: 1, q: 1 };

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) [a, b] = [b, a % b];
  return a;
}

/** Build a normalized rational. Throws on q = 0 or non-integer inputs. */
export function rational(p: number, q = 1): Rational {
  if (q === 0) throw new Error("Rational with zero denominator");
  if (!Number.isInteger(p) || !Number.isInteger(q)) {
    throw new Error(`Rational parts must be integers: ${p}/${q}`);
  }
  if (q < 0) {
    p = -p;
    q = -q;
  }
  const g = gcd(p, q) || 1;
  return { p: p / g, q: q / g };
}

export const add = (a: Rational, b: Rational): Rational =>
  rational(a.p * b.q + b.p * a.q, a.q * b.q);
export const sub = (a: Rational, b: Rational): Rational =>
  rational(a.p * b.q - b.p * a.q, a.q * b.q);
export const mul = (a: Rational, b: Rational): Rational =>
  rational(a.p * b.p, a.q * b.q);
export const div = (a: Rational, b: Rational): Rational => {
  if (b.p === 0) throw new Error("Rational division by zero");
  return rational(a.p * b.q, a.q * b.p);
};
export const negate = (a: Rational): Rational => ({ p: -a.p, q: a.q });
export const abs = (a: Rational): Rational => (a.p < 0 ? negate(a) : a);

/** Integer power; negative exponents invert (throws on 0^negative). */
export function pow(a: Rational, n: number): Rational {
  if (!Number.isInteger(n)) throw new Error(`Rational pow needs integer exponent: ${n}`);
  if (n < 0) return div(ONE, pow(a, -n));
  let out = ONE;
  for (let i = 0; i < n; i++) out = mul(out, a);
  return out;
}

export const isZero = (a: Rational): boolean => a.p === 0;
export const isOne = (a: Rational): boolean => a.p === 1 && a.q === 1;
export const isInteger = (a: Rational): boolean => a.q === 1;
export const isNegative = (a: Rational): boolean => a.p < 0;
export const equals = (a: Rational, b: Rational): boolean => a.p === b.p && a.q === b.q;
export const compare = (a: Rational, b: Rational): number => a.p * b.q - b.p * a.q;

/** True while both parts are safely inside float-integer range. */
export const isExact = (a: Rational): boolean =>
  Number.isSafeInteger(a.p) && Number.isSafeInteger(a.q);

export const toNumber = (a: Rational): number => a.p / a.q;

/** "3/4", or just "3" for integers. */
export const toString = (a: Rational): string =>
  a.q === 1 ? String(a.p) : `${a.p}/${a.q}`;

/**
 * Exact square root when one exists (perfect-square p and q), else null.
 * The radical rules use this to decide whether √(rational) folds.
 */
export function sqrtExact(a: Rational): Rational | null {
  if (a.p < 0) return null;
  const sp = Math.round(Math.sqrt(a.p));
  const sq = Math.round(Math.sqrt(a.q));
  return sp * sp === a.p && sq * sq === a.q ? rational(sp, sq) : null;
}

/**
 * Convert a float to a Rational.
 *
 * Integers convert exactly. Everything else goes through a continued-
 * fraction search bounded by `maxDenominator`, accepting the first
 * convergent within `tolerance` — right for drag-produced parameter values
 * (0.4000000000000003 → 2/5), the one place floats enter the engine.
 * Returns null when nothing close enough exists (caller keeps the float
 * and the engine treats that expression as non-exact).
 */
export function fromNumber(
  x: number,
  tolerance = 1e-9,
  maxDenominator = 1e6,
): Rational | null {
  if (!Number.isFinite(x)) return null;
  if (Number.isInteger(x)) {
    return Number.isSafeInteger(x) ? rational(x) : null;
  }
  const sign = x < 0 ? -1 : 1;
  let rest = Math.abs(x);
  // Continued fraction convergents: h/k.
  let h0 = 0, h1 = 1, k0 = 1, k1 = 0;
  for (let i = 0; i < 64; i++) {
    const a = Math.floor(rest);
    const h2 = a * h1 + h0;
    const k2 = a * k1 + k0;
    if (k2 > maxDenominator) return null;
    if (Math.abs(h2 / k2 - Math.abs(x)) <= tolerance) {
      return rational(sign * h2, k2);
    }
    const frac = rest - a;
    if (frac === 0) return null;
    rest = 1 / frac;
    [h0, h1, k0, k1] = [h1, h2, k1, k2];
  }
  return null;
}
