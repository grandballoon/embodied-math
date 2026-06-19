import type { Expr } from "./ast.ts";
import { structuralEquals } from "./structure.ts";

/**
 * The rewrite engine: named rules applied innermost-first, every application
 * recorded as a Step. The derivation (Step[]) is the product — a UI replays
 * it as show-your-work; "just the answer" is explicitly not the goal.
 *
 * Rules are plain TS functions, not a pattern DSL: school algebra needs a
 * few dozen rules and TypeScript exhaustiveness checking is free. A rule
 * returns the rewritten expression or null; returning something structurally
 * equal to the input also counts as "did not apply" (the engine checks), so
 * canonicalizing rules can rebuild unconditionally without looping.
 */

export interface Rule {
  readonly name: string;
  /** Human justification, e.g. "anything times zero is zero". */
  readonly description: string;
  readonly apply: (e: Expr) => Expr | null;
}

/** Child indices from the root: neg/call arg = 0, binary left = 0, right = 1. */
export type Path = readonly number[];

export interface Step {
  readonly rule: string;
  readonly description: string;
  /** Whole expression before/after; `path` locates the rewritten subterm. */
  readonly before: Expr;
  readonly after: Expr;
  readonly path: Path;
}

function childrenOf(e: Expr): readonly Expr[] {
  switch (e.kind) {
    case "neg":
    case "call":
      return [e.arg];
    case "binary":
      return [e.left, e.right];
    default:
      return [];
  }
}

function withChild(e: Expr, i: number, c: Expr): Expr {
  switch (e.kind) {
    case "neg":
      return { kind: "neg", arg: c };
    case "call":
      return { kind: "call", fn: e.fn, arg: c };
    case "binary":
      return i === 0
        ? { kind: "binary", op: e.op, left: c, right: e.right }
        : { kind: "binary", op: e.op, left: e.left, right: c };
    default:
      throw new Error(`No child ${i} on ${e.kind}`);
  }
}

function replaceAt(root: Expr, path: Path, replacement: Expr): Expr {
  if (path.length === 0) return replacement;
  const [i, ...rest] = path;
  return withChild(root, i, replaceAt(childrenOf(root)[i], rest, replacement));
}

interface Hit {
  readonly rewritten: Expr;
  readonly rule: Rule;
  readonly path: Path;
}

/**
 * Traversal order. "innermost" (post-order: children before parents) is the
 * default — simplification folds leaves upward. "outermost" tries each node
 * before its children: what factoring needs, since a flattened-view rule at
 * a partial sum would steal the show (gcf turning the x² − x inside
 * (x² − x) − 2 into x(x − 1) before factor-quadratic sees the trinomial).
 */
export type Order = "innermost" | "outermost";

function findRewrite(rules: readonly Rule[], e: Expr, path: Path, order: Order): Hit | null {
  const here = (): Hit | null => {
    for (const rule of rules) {
      const out = rule.apply(e);
      if (out !== null && !structuralEquals(out, e)) {
        return { rewritten: out, rule, path };
      }
    }
    return null;
  };
  if (order === "outermost") {
    const hit = here();
    if (hit) return hit;
  }
  const kids = childrenOf(e);
  for (let i = 0; i < kids.length; i++) {
    const hit = findRewrite(rules, kids[i], [...path, i], order);
    if (hit) return hit;
  }
  return order === "outermost" ? null : here();
}

/** Driving mode 1: perform exactly one rewrite, or report none applies. */
export function applyOnce(rules: readonly Rule[], e: Expr, order: Order = "innermost"): Step | null {
  const hit = findRewrite(rules, e, [], order);
  if (!hit) return null;
  return {
    rule: hit.rule.name,
    description: hit.rule.description,
    before: e,
    after: replaceAt(e, hit.path, hit.rewritten),
    path: hit.path,
  };
}

export interface Derivation {
  readonly result: Expr;
  readonly steps: readonly Step[];
  /** False if the step cap was hit — a rule pair is fighting; file a bug. */
  readonly converged: boolean;
}

/** Driving mode 2: run to fixpoint. Non-throwing so a UI never dies mid-drag. */
export function runToFixpoint(
  rules: readonly Rule[],
  e: Expr,
  order: Order = "innermost",
  maxSteps = 300,
): Derivation {
  const steps: Step[] = [];
  let current = e;
  for (let i = 0; i < maxSteps; i++) {
    const step = applyOnce(rules, current, order);
    if (!step) return { result: current, steps, converged: true };
    steps.push(step);
    current = step.after;
  }
  return { result: current, steps, converged: false };
}
