# Embodied Math — working context

Manipulate school-math objects (geometry shapes + function graphs) over a
webcam feed; mouse, touch, and hand-pinch (MediaPipe) all drive the same
interaction layer. README.md has the full file map; TODO.md has the roadmap.

**Current state (2026-06-13):** geometry types, hand tracking, the facts
(curriculum) layer, algebra phases 1–2 (AST/parser/evaluator/graph backend
with parameter handles), and phase 3 — the rewrite engine
(`docs/algebra-rewrite-spec.md`) — are done and verified: exact rationals
(`rational.ts`, AST `rat` node), structure views (`structure.ts`), rule
engine + step recorder (`rewrite.ts`), ~26-rule catalog with
simplify/expand/factor drivers (`rules.ts`), equations + linear solver
(`equation.ts`), engine-derived quadratic show-your-work in `facts.ts`.
Phase 4 — the solver layer (`solve.ts`) — is done and verified
(~19k random cases): `solveQuadratic` by all 4 school methods
(square-root/factoring/complete-square/formula, exact `p ± m·√r` roots,
honest "does-not-apply" when a method's precondition fails) and
`solveSystem` for 2×2 linears (substitution/elimination); facts.ts gains a
"solving y = 0" group. A `SolveStep` can hold several equations per line
(`join`: "or" for ± branches, "and" for systems).
Gotcha: `factor()` traverses OUTERMOST-first (innermost lets factor-gcf eat
partial sums like the x²−x inside (x²−x)−2); simplify/expand are innermost.
`solve.ts toStandard()` EXPANDS both sides (so (x−3)²=16 reads as a poly);
the square-root method skips it on purpose to keep the square intact.
Trig waves (sin/cos/tan) are done: one `trig` FunctionGraph form
`a·fn(b(x−h))+k` in `graphs.ts` (3 handles: anchor h,k / amplitude a /
period b), per-fn colors + discontinuity-split ribbon in `shapeLayer.ts`
(tangent asymptotes break the polyline instead of streaking), and
amplitude/period/phase/midline + unit-circle key-value facts in `facts.ts`.
A new graph FORM (not a Shape kind) means updating the 5 `g.form` switches
in graphs.ts + the facts dispatch + the `GRAPH_COLORS` Record (only that
Record is TS-flow-checked).
The `unitCircle` Shape kind (center/radius/angle) is also done: polar rim
handle (drag-angle sets θ, drag-distance sets r), a reference-triangle
render whose cos leg is magenta and sin leg is blue (matching the wave
colors), and sin/cos/tan + Pythagorean-identity facts. It's a new SHAPE kind
— per the recipe that's the 5 switches in shapes.ts (handles, moveHandle,
translateShape, hitTestBody, + the facts dispatch) and the `SHAPE_COLORS`
Record (the one TS-flow-checked site).
The unit circle also carries a live sine TRACER (`shapeLayer.addSineTrace`):
dragging θ unrolls y = k + r·sin t for t∈[0,θ] to the circle's right, with a
faint connector to the wave tip. It's manipulation-driven, not auto-animated
(fits the embodied model) — gated by `ShapeLayer.showTrace`/`setTraceVisible`.
Gear dropdown has per-kind visibility toggles: `ShapeLayer.setKindVisible`
hides a kind from both render AND the `shapes` getter (so hidden = unpickable);
HTML checkboxes carry `data-kind`, wired by `settings.ts initShapeVisibility`,
which also wires the NESTED `#trace-sine` toggle (disabled when its parent
Unit-circle box is unchecked). DEFAULT (2026-06-13): every `data-kind` box ships
UNCHECKED, and `initShapeVisibility` applies each box's initial state on load
(`sync()` per box), so the canvas starts empty — a kind only appears when its
box is checked. `setKindChecked(kind, on)` flips a box + fires its change event
(checkbox stays the source of truth); the fraction-circle Add button calls it so
a spawn reveals its kind even when toggled off.
The `fractionCircle` Shape kind (center/radius/divisions/filled) teaches
fractions: a pie cut into N equal sectors with M shaded translucent. Handles are
[center, resize grip, fill knob] (3): the fill KNOB (`shapes.ts fractionKnob`,
index 2) is an angular slider — angle sets filled = round(θ/(2π/N)) SNAPPED to
whole sectors, distance IGNORED so shading never resizes; the RESIZE grip
(`fractionResizeHandle`, index 1) sits at the bottom of the rim and its distance
sets the radius (added 2026-06-14 — fill is LAST so it wins a pick tie if the two
rim handles coincide). render `addFractionCircle` (one `CircleGeometry` wedge
[0, M·step] + per-boundary spokes + rim), facts `fractionCircleFacts(n,m,radius)`
(M⁄N, reduced via `rational.ts R.rational`, decimal/percent, shaded-arc degrees,
M⁄N+(N−M)⁄N=1, plus Radius). New SHAPE kind = the same 5
switches + the `SHAPE_COLORS` Record. NEW: instances are SPAWNED AT RUNTIME from
the gear popup (`#fraction-circles`: divisions input + Add button, wired by
`settings.ts initFractionCircles`) via the new public `ShapeLayer.addShape(shape)`
(monotonic `nextId`; the old private render dispatcher was renamed `drawShape`) —
the first dynamic-creation path. `demoShapes` seeds one (N=4, 1⁄4).
Per-shape COLOR (2026-06-13): every shape can be recolored from a swatch row at
the top-right of its fact box (`factsPanel.ts` `ColorControl` + `PALETTE` + a
native custom picker). The override is stored PER-ENTRY in `shapeLayer.ts`
(`ShapeEntry.color`, id-keyed; `colorOf`/`setColor`, `resolveColor` falls back
to the kind/graph default) — color stays a scene concern, never added to the
pure core `Shape`. `drawShape` now takes the resolved color as a param.
Per-shape SIZE LOCK (2026-06-14): the fact-sheet header also carries a lock
button (`factsPanel.ts` `LockControl`, in a shared `.sheet-header` with the
color picker; shown only when `shapes.ts isResizable`). Lock is PER-ENTRY
(`ShapeEntry.sizeLocked`, `isSizeLocked`/`setSizeLocked` — scene concern like
color); the driver pins size on handle drags via pure
`constrainSize(before, after)`: circle/unitCircle/fractionCircle keep radius
(other handle effects intact — center moves, angle sweeps), segment keeps
length, vector keeps magnitude (still rotates), triangle FREEZES the dragged
vertex (size inseparable from shape — move it by its interior). `sizeOf` gives
the scalar size; point/graph have none (no lock button). fractionCircle joined
`isResizable` on 2026-06-14 once its resize grip landed (lock pins radius; the
fill knob still works while locked, since `constrainSize` only touches radius).
Per-shape OPACITY (2026-06-14): the color selector gained an Opacity slider
(`factsPanel.ts AlphaControl`) setting a per-ENTRY body-opacity multiplier
(`ShapeEntry.alpha`, `alphaOf`/`setAlpha`) that `mat()` applies to all shape
materials (handles EXEMPT — `bodyAlpha` is reset to 1 before the handle loop),
clamped ≤1. `DEFAULT_ALPHA = 2` — resting opacity is now DOUBLE the old hardcoded
values (translucent fills stand out; ~opaque strokes just clamp). The slider's
onChange must NOT re-render the panel (a range fires continuously; re-render
would replace the slider mid-drag) — main.ts calls only `setAlpha`, while color
swatches / the lock still refresh. Slider range 0–3, default 2.
Per-shape POSITION LOCK (2026-06-14): a SECOND header lock button, INDEPENDENT
of the size lock — pins WHERE a shape sits while handle drags still resize/
rotate/sweep it. Both `LockControl`s now share a `.lock-group` column in the
header (`factsPanel.ts lockButton(lock, "size"|"position")`); shown when
`shapes.ts isMovable` (everything but graph — a line has no single anchor).
PER-ENTRY (`ShapeEntry.positionLocked`, `isPositionLocked`/`setPositionLocked`).
Pure `constrainPosition(before, after)` re-pins the shape's ANCHOR via
`translateShape(after, displacement(anchor(after), anchor(before)))` — anchor =
center (circle/unitCircle/fractionCircle), tail (vector), midpoint (segment),
centroid (triangle), `at` (point→fully frozen). So body drags become no-ops,
rim/tip drags resize/rotate about the pinned anchor, and the anchor handle drag
itself does nothing. Driver applies it AFTER `constrainSize` (orthogonal — one
pins size, the other position; they compose). Body-drag branch is now gated
`else if (!entry.positionLocked)`.
The `square` Shape kind (center/half/angle) is also done (2026-06-16, a user
request): `half` = half the side length (the size scalar, like a circle's
radius), `angle` = rotation of the corner handle. Handles are [center, corner]
(2): the CORNER (`shapes.ts squareCorners`, index 0) is a polar grip — its
direction sets rotation (the handle corner sits 45° ahead of `angle`), its
distance sets size (corner is a half-diagonal = half·√2 from center), so one
drag rotates AND resizes. render `addSquare` (filled `ShapeGeometry` body + 4
edge segments, like the triangle), facts `squareFacts(center,half,angle)`
(side/perimeter/area + a "Diagonal & √2" group: d = s√2, half-diagonal = ½d =
center→corner, d⁄s = √2). New SHAPE kind = the same 5 switches + the
`SHAPE_COLORS` Record. The DIAGONAL (corner→opposite corner) and HALF-DIAGONAL
(center→corner) are SCENE-level display toggles (`shapeLayer.ts`
`showDiagonal`/`showHalfDiagonal`, like the unit circle's trace — NOT fields on
the pure Shape), drawn in their own hues; half-diagonal is drawn AFTER the
diagonal so it lays on the diagonal's inner half ("half is half of the whole").
Wired by `settings.ts initSquares` (Add-square button + the two nested toggles,
disabled while the Squares kind is hidden). These feed the upcoming "sacred
geometric roots" work (the diagonal is the embodied source of √2).
DOUBLING THE SQUARE (2026-06-16): pure `shapes.ts doubleSquare(sq)` returns the
next power-of-two square — concentric, rotated 45°, SIDE = the original's
DIAGONAL (so `half`×√2, AREA doubles); the original's 4 corners land on the new
square's 4 side-midpoints (the Meno construction). Exposed as a generic fact-
sheet ACTION BUTTON: `factsPanel.ts ActionControl` + `PanelControls.action`
(rendered by `actionRow` under the header, full-width `.action-btn`), shown by
main.ts ONLY when the focused shape is a square. The handler `addShape`s the
doubled square, ticks the diagonal overlay on (`settings.ts setDiagonalChecked`,
keeping the checkbox source-of-truth), and calls the new `ShapeDriver.focus(id)`
to follow the new square — so repeated clicks CLIMB the powers of two (×2, ×4,
…). squareFacts gained a "Next square (on the diagonal)" preview line.

**Next task:** continue "sacred geometric roots" — doubling-the-square (√2) is
in; consider the √n spiral of Theodorus / other root constructions next, per the
user. Then exponentials/logs + rational functions (asymptote facts), TODO.md
"Later".
(Squares + fraction circles were user requests, off the original roadmap.)
Confirm direction with user.

## Commands

- `npm run dev` / `npm run build` (tsc + vite). No test framework — see
  Verification below.

## Architecture invariants

- `src/core/` is pure (no DOM, no Three.js); `src/scene/` owns devices and
  rendering. Keep it that way.
- All core math is in MATH units; conversions go through
  `core/coordinates.ts` only. TWO `CoordinateSystem` instances exist:
  pointer (mirrored=false) and hands (mirrored=true) — never share them.
  `videoToCamera` owns the `object-fit: cover` crop for MediaPipe landmarks.
- Shapes are immutable; every manipulation returns a new value.
- `scene/shapeDriver.ts` is the input-agnostic drag state machine: sessions
  keyed "pointer" / "hand:Left" / "hand:Right"; sticky `focused()` feeds the
  facts panel via `onUpdate`. As of 2026-06-14 `focused()` is CLICK-driven:
  `grab()` (pointerdown / pinch) sets it; `hover()` only updates the lit
  highlight (no longer touches `focusedId`). So hovering highlights, clicking
  switches the fact sheet.
- `scene/shapeLayer.ts` fully rebuilds + disposes on every change (fine at
  this scale); highlight state is a lit-id SET (multi-source).
- `core/facts.ts` is presentation over pure math: geometry/algebra modules
  own values, facts owns human-readable form (FactGroups; rendered by
  `scene/factsPanel.ts`).

## Adding a new primitive (recipe)

geometry or algebra module → `Shape` variant in `core/shapes.ts` →
`shapeLayer` render case → `facts.ts` builder → demo in `main.ts`.
CAUTION: the switches in `core/shapes.ts` and `facts.ts` are NOT
flow-checked by TS (no `noImplicitReturns`); only the `SHAPE_COLORS` Record
errors on a missing kind. Update all five switch sites.

## Verification recipe (hard-won, no test runner)

- **Pure smoke tests:** write a `.ts` file importing `src/...` via absolute
  paths, bundle with `node_modules/.bin/esbuild file.ts --bundle
  --platform=node --outfile=file.cjs`, run with node. Existing suites in
  `/tmp/em-verify/*.ts` (smoke, facts-smoke, algebra-smoke — /tmp may be
  wiped; recreate from this pattern).
- **Browser:** headless Brave via playwright-core (`/tmp/em-verify`:
  `npm i playwright-core`), `executablePath:
  "/Applications/Brave.app/Contents/MacOS/Brave Browser"`, args
  `--use-fake-ui-for-media-stream --use-fake-device-for-media-stream
  --no-sandbox`. Dev server: `npm --prefix <repo> run dev -- --port 5180`
  (background shells lose cwd; always use --prefix). At 1280×720 viewport
  with default ppu 60, screen = (640 + 60·mathX, 360 − 60·mathY) — assert
  positions exactly.
- The fake webcam has no hands: the hand pipeline is verified via pure tests
  (pinch hysteresis, cover-crop, mirror) plus the tracker-init console line
  "Hand tracking ready". Real pinch-grabs need a human; pinch thresholds
  live in `core/pinch.ts`, hand tolerances in `scene/shapeDriver.ts`.
