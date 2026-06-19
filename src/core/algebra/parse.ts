import { type Expr, type FnName, FN_NAMES, rat } from "./ast.ts";

/**
 * Recursive-descent parser from plain math text to an Expr AST.
 *
 * Reads the notation school math actually uses:
 *   - implicit multiplication: "2x", "3(x+1)", "x y" all multiply
 *   - letter runs split into single-letter names ("mx" = m·x) UNLESS the run
 *     is a function name (sin, sqrt, ...) or the constants pi / e
 *   - "^" is exponentiation, right-associative, binding tighter than unary
 *     minus: -x^2 parses as -(x²)
 *   - function application requires parentheses: sin(x)
 *
 * All letters parse as "var" nodes; promoting some to "param" is the
 * caller's call (the parser can't know which letters are coefficients).
 * LaTeX input is a planned second front-end producing the same AST.
 */

type Token =
  | { readonly t: "num"; readonly v: number; readonly frac?: { p: number; q: number } }
  | { readonly t: "ident"; readonly v: string }
  | { readonly t: "op"; readonly v: string };

export function parse(source: string): Expr {
  const tokens = lex(source);
  let pos = 0;

  const peek = (): Token | undefined => tokens[pos];
  const isOp = (v: string) => {
    const tk = peek();
    return tk?.t === "op" && tk.v === v;
  };
  const expect = (v: string): void => {
    if (!isOp(v)) throw new Error(`Expected "${v}" at position ${pos}`);
    pos++;
  };

  function parseExpr(): Expr {
    let left = parseTerm();
    while (isOp("+") || isOp("-")) {
      const op = (tokens[pos++] as { v: "+" | "-" }).v;
      left = { kind: "binary", op, left, right: parseTerm() };
    }
    return left;
  }

  const startsFactor = (tk: Token | undefined): boolean =>
    !!tk && (tk.t === "num" || tk.t === "ident" || (tk.t === "op" && tk.v === "("));

  function parseTerm(): Expr {
    let left = parseUnary();
    for (;;) {
      if (isOp("*") || isOp("/")) {
        const op = (tokens[pos++] as { v: "*" | "/" }).v;
        left = { kind: "binary", op, left, right: parseUnary() };
      } else if (startsFactor(peek())) {
        left = { kind: "binary", op: "*", left, right: parseUnary() };
      } else {
        return left;
      }
    }
  }

  function parseUnary(): Expr {
    if (isOp("-")) {
      pos++;
      return { kind: "neg", arg: parseUnary() };
    }
    return parsePower();
  }

  function parsePower(): Expr {
    const base = parseAtom();
    if (isOp("^")) {
      pos++;
      return { kind: "binary", op: "^", left: base, right: parseUnary() };
    }
    return base;
  }

  function parseAtom(): Expr {
    const tk = tokens[pos++];
    if (!tk) throw new Error("Unexpected end of input");
    if (tk.t === "num") {
      // Non-integer decimals become exact rationals (0.75 → 3/4); integers
      // stay plain "num" — the rewrite engine treats integral num as exact.
      return tk.frac ? rat(tk.frac.p, tk.frac.q) : { kind: "num", value: tk.v };
    }
    if (tk.t === "op" && tk.v === "(") {
      const e = parseExpr();
      expect(")");
      return e;
    }
    if (tk.t === "ident") {
      if (tk.v === "pi") return { kind: "const", name: "pi" };
      if (tk.v === "e") return { kind: "const", name: "e" };
      if ((FN_NAMES as readonly string[]).includes(tk.v)) {
        expect("(");
        const arg = parseExpr();
        expect(")");
        return { kind: "call", fn: tk.v as FnName, arg };
      }
      return { kind: "var", name: tk.v };
    }
    throw new Error(`Unexpected token "${tk.v}"`);
  }

  const result = parseExpr();
  if (pos !== tokens.length) {
    throw new Error(`Unexpected input after expression: "${tokens[pos].v}"`);
  }
  return result;
}

function lex(source: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < source.length) {
    const ch = source[i];
    if (/\s/.test(ch)) {
      i++;
      continue;
    }
    if (/[0-9.]/.test(ch)) {
      const m = /^[0-9]*\.?[0-9]+/.exec(source.slice(i));
      if (!m) throw new Error(`Bad number at "${source.slice(i, i + 8)}"`);
      const text = m[0];
      const dot = text.indexOf(".");
      if (dot === -1) {
        tokens.push({ t: "num", v: parseFloat(text) });
      } else {
        // Read the decimal digits exactly: "0.75" is 75/100, not a float.
        const places = text.length - dot - 1;
        const p = parseInt(text.slice(0, dot) + text.slice(dot + 1) || "0", 10);
        tokens.push({ t: "num", v: parseFloat(text), frac: { p, q: 10 ** places } });
      }
      i += text.length;
      continue;
    }
    if (/[a-zA-Z]/.test(ch)) {
      const m = /^[a-zA-Z]+/.exec(source.slice(i))!;
      const run = m[0];
      // Whole run is a known name; otherwise split per letter (mx = m·x).
      if (run === "pi" || run === "e" || (FN_NAMES as readonly string[]).includes(run)) {
        tokens.push({ t: "ident", v: run });
      } else {
        for (const letter of run) tokens.push({ t: "ident", v: letter });
      }
      i += run.length;
      continue;
    }
    if ("+-*/^()".includes(ch)) {
      tokens.push({ t: "op", v: ch });
      i++;
      continue;
    }
    throw new Error(`Unexpected character "${ch}"`);
  }
  return tokens;
}
