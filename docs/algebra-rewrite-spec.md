# Algebra rewrite engine — spec (phase 3)

The next major piece of the algebra engine (`src/core/algebra/`). Phases 1–2
(AST, parser, evaluator, printer, graph backend with parameter handles) are
done and verified. This is the long pole everything in phases 4–6 builds on.

Build the sections below in order; each is independently testable.

## 1. Exact rationals

A `Rational` type (normalized p/q: gcd-reduced, q > 0) in
`core/algebra/rational.ts`, with add/sub/mul/div/integer-pow. Add a `rat`
node to the AST; the parser emits exact values (`0.75` → 3/4, integers stay
integers); `evaluate` maps rat → p/q at the float boundary; the printer
renders `3/4`. Floats don't disappear — graph sampling and `graphs.ts` keep
plain `num` — but everything the rewrite engine touches must be exact, or
"solve 2x + 3 = 7" produces `x = 1.9999999999999998` and the pedagogy
collapses.

Decision (made): plain `number` numerators, not bigint — school-scale values
never overflow; document a float fallback just in case.

## 2. Structure utilities (the hidden half of the work)

Rules operate on views of the tree, not raw binaries. `core/algebra/structure.ts`:

- **Flattening**: `(a+b)+c` ⇄ n-ary `[a, b, c]`; products split as
  (rational coefficient) × (sorted factor list), so `3x²y` is
  `{coef: 3, factors: [x², y]}`.
- **Structural equality** — required by combine-like-terms ("group sum terms
  by equal monomial part").
- **Term ordering** — canonical sort so output is deterministic and `x²y`
  unifies with `yx²`.
- **Polynomial view**: single-variable expression ⇄ coefficient list.
  Expand and factor both live on this.

Fiddly; this is where the debugging time goes and where tests pay off most.

## 3. Rule engine + step recorder

`core/algebra/rewrite.ts`. Named TS functions, NOT a pattern-matching DSL
(school algebra needs ~30–50 rules; TS exhaustiveness is free):

    Rule = { name, description, apply(e) -> Expr | null }

Plus: innermost-first traversal; two driving modes — apply-once (produces one
Step) and run-to-fixpoint (simplify); and a Step recorder
`{ rule, before, after, path }` where `path` locates the rewritten subterm so
a UI can highlight what changed. The derivation (`Step[]`) is the product —
"just the answer" is explicitly not the goal.

## 4. Rule catalog (incremental, in this order)

Arithmetic folding + identities (`x+0`, `x·1`, `x^1`, double neg) →
combine like terms → distribute/FOIL/binomial square → fraction rules
(common denominators, cancellation) → exponent rules → factoring (GCF,
`x²+bx+c`, `ax²+bx+c`, difference of squares, perfect squares) → radicals
(`√(a²b) = a√b`, rationalizing).

## 5. Equation type

`core/algebra/equation.ts`: `Equation { lhs, rhs }` plus an inequality
variant carrying `<, ≤, >, ≥`, and both-sides rules (add/sub/mul/div both
sides, inequality flip on negative multiplication). "Solve 2x + 3 = 7" is
then a rule sequence and the recorded steps are the classic two-column work.
Ship the linear solver WITH this phase as its first golden test (~3 rules deep).

## 6. Surfacing

Steps map onto the existing `FactGroup` schema (label = rule name, value =
resulting expression, detail = justification), so `FactsPanel` renders
derivations unchanged. First visible win: the quadratic sheet's
"standard form" / "factored form" lines in `core/facts.ts` (currently ad-hoc
string math) become engine-derived with show-your-work underneath.

## Deliberately out of scope

LaTeX parsing, equation-input UI (engine lands headless behind tests),
multivariate factoring, trig identities / log rules (later catalog entries,
not engine changes).

## Definition of done

- Property test: for every rule, `evaluate(before) === evaluate(after)` at
  random bindings — the one invariant no rule may break.
- Golden derivations: `simplify(2x + 3x) → 5x` in one named step;
  `expand((x+1)(x−2))` and `factor(x² − x − 2)` as inverses;
  `solve(2x + 3 = 7) → x = 2` with two-column steps.
- Simplify is idempotent.
- The existing algebra smoke suite still passes (AST gains a node kind).

## After this phase (staged in TODO.md "Later")

Solvers (linear ineqs → quadratics by all 4 school methods → 2×2 systems) →
sine form `a·sin(b(x−h))+k` + circle→wave bridge → exponentials/logs/rationals.
