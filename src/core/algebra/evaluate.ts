import type { Expr, FnName } from "./ast.ts";

/**
 * Numeric evaluation of an expression against an environment binding names
 * (both variables and parameters) to numbers. This is the float boundary of
 * the engine: graph sampling lives on top of it. Unbound names throw — a
 * missing binding is a caller bug, not a math result. Division by zero and
 * domain errors follow IEEE float semantics (Infinity/NaN), which the graph
 * layer treats as "no point here".
 */

const FNS: Record<FnName, (x: number) => number> = {
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  asin: Math.asin,
  acos: Math.acos,
  atan: Math.atan,
  sqrt: Math.sqrt,
  abs: Math.abs,
  ln: Math.log,
  log: Math.log10,
  exp: Math.exp,
};

export function evaluate(e: Expr, env: Record<string, number> = {}): number {
  switch (e.kind) {
    case "num":
      return e.value;
    case "rat":
      return e.p / e.q;
    case "var":
    case "param": {
      const v = env[e.name];
      if (v === undefined) throw new Error(`Unbound name: ${e.name}`);
      return v;
    }
    case "const":
      return e.name === "pi" ? Math.PI : Math.E;
    case "neg":
      return -evaluate(e.arg, env);
    case "binary": {
      const l = evaluate(e.left, env);
      const r = evaluate(e.right, env);
      switch (e.op) {
        case "+":
          return l + r;
        case "-":
          return l - r;
        case "*":
          return l * r;
        case "/":
          return l / r;
        case "^":
          return Math.pow(l, r);
      }
    }
    case "call":
      return FNS[e.fn](evaluate(e.arg, env));
  }
}
