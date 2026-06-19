import type { Expr } from "./ast.ts";

/**
 * Plain-text printer for expressions, with minimal parenthesization by
 * precedence. Output is re-parseable by parse.ts (modulo whitespace), which
 * the tests rely on. Pretty unicode rendering (², −, ⁄) is the fact layer's
 * job; this printer is for round-trips and debugging.
 */

// Precedence: + - (1), * / (2), unary minus (2), ^ (3), atoms (4).
export function toText(e: Expr): string {
  return walk(e, 0);
}

function walk(e: Expr, parentPrec: number): string {
  switch (e.kind) {
    case "num":
      return e.value < 0 ? wrap(String(e.value), 0, parentPrec) : String(e.value);
    case "rat":
      // Re-parses as a num/num division — same value, evaluation-identical.
      return wrap(`${e.p}/${e.q}`, e.p < 0 ? 0 : 2, parentPrec);
    case "var":
    case "param":
      return e.name;
    case "const":
      return e.name;
    case "neg":
      return wrap(`-${walk(e.arg, 3)}`, 2, parentPrec);
    case "binary": {
      const prec = e.op === "+" || e.op === "-" ? 1 : e.op === "^" ? 3 : 2;
      // Left-associative ops give the right child higher required precedence;
      // ^ is right-associative, so it's the left child that needs it.
      const left = walk(e.left, e.op === "^" ? prec + 1 : prec);
      const right = walk(e.right, e.op === "^" ? prec : prec + 1);
      return wrap(`${left} ${e.op} ${right}`, prec, parentPrec);
    }
    case "call":
      return `${e.fn}(${walk(e.arg, 0)})`;
  }
}

function wrap(s: string, prec: number, parentPrec: number): string {
  return prec < parentPrec ? `(${s})` : s;
}
