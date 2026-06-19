# TODO

Running task list for Embodied Math. Edit freely in VS Code. Markdown
checkboxes render as real tickboxes in VS Code's preview (Cmd/Ctrl+Shift+V)
and on GitHub.

To bring a fresh Claude chat up to speed, drag this file into the conversation.

- Extract the axis unit labels into a single component to avoid the arbitrary calculation of the box size
- Add a data structure for a unit circle [X] (2026-06-12: `unitCircle` Shape kind in core/shapes.ts — center/radius/angle, polar rim handle, reference-triangle render with cos/sin legs in the wave colors, sin/cos/tan + Pythagorean-identity facts; the embodied half of the circle→wave bridge)
- Add TypeScript data structures for:
    - circles [X]
    - squares [X] (2026-06-16: `square` Shape kind in core/shapes.ts — center/half/angle, polar corner handle that rotates AND resizes; scene-level diagonal + half-diagonal overlays in shapeLayer.ts with √2 facts. The diagonal is the embodied source of the "sacred geometric roots")
    - triangles [X]
    - points [X]
    - vectors [X]
- Add click handling functionality [X] (pointer drag/hover on shapes; see src/core/shapes.ts + src/scene/shapePointer.ts)
- Add a typescript library or dedicated util file for algebra [X] (src/core/algebra/)
    - must be able to map functions on the graph [X] (linear + quadratic plot as draggable shapes)
- Add a keyboard handler class

SMALLEST NEXT THING:
- 


SPIKES:
- What are we planning to use for hand-tracking? MediaPipe? [RESOLVED: MediaPipe HandLandmarker via @mediapipe/tasks-vision — pinch to grab shapes; see src/scene/handTracker.ts + handInput.ts]
- Our logging and undo/reverse functionality is.....?
- We should still be planning to implement gamepad functionality.
- We should still be planning to add Fun Effects (that's what ThreeJS is there for.)

POLISH:
- Where are our module boundaries? Probably "all over the place," at present.
- Do we need to add Zod or another TS library to bake out our theoretical support? What IS Zod, anyway? 
- We should be able to display an "on-hover highlight state" for:
    - X, Y points [X]
    - Line metadata like slope? [X]
    ------ ANSWERED: the data lives in src/core/facts.ts (pure "fact sheet"
    builders computed from the geometry modules), displayed by
    src/scene/factsPanel.ts for the hovered/grabbed shape. Shapes don't carry
    display state; facts are derived fresh from the geometry values each
    update.

CURRICULA
- Fractions
- Graphing lines
- Sine, cosine, tangent (as waves as functions of a circle, too.)
- Vectors 
- Full-on turtle graphics? Probably, yeah.

FUTURE:
- Are we actually going to integrate 3D vectors here, or is that nonsense? What would we need to know in order to answer this question?
- We should have a plan for contextual data—functions, graphs, or patterns from nature and history that can be interfaced with in this sandbox. 3B1B is a good source, maybe, plus Euler and the "weird YouTube Math Girl" ecosystem. There's probably some pop science books out there but they may prove insufferable. Liukas is likely to have good sources, though.


## Later

- [x] Math Core: expression AST + parser (plain text; LaTeX front-end still open)
- [x] First transformation: coefficient scrub (drag slope/intercept/vertex/width handles)
- [x] Graph backend coupled to expression state (algebra/graphs.ts ↔ shapeLayer)
- [x] Rewrite engine: exact rationals + named rules + step recorder (simplify/expand/factor) — SPEC: docs/algebra-rewrite-spec.md [DONE 2026-06-12: core/algebra/{rational,structure,rewrite,rules,equation}.ts + show-your-work groups in facts.ts; linear eq/ineq solver shipped with it]
- [x] Solvers on top of the rules: linear eqs/inequalities → quadratics (4 methods) → 2×2 systems [DONE 2026-06-12: core/algebra/solve.ts — solveQuadratic (square-root/factoring/complete-square/formula, exact p±m√r roots) + solveSystem (substitution/elimination); "solving y = 0" show-your-work group in facts.ts. Linear eq/ineq already shipped in equation.ts. Verified: /tmp/em-verify/solve-{smoke,prop}.ts, ~19k random cases]
- [x] Sine form a·sin(b(x−h))+k + the circle→wave bridge (unit circle TODO lands here) [DONE 2026-06-12: trig waves sin/cos/tan as one `trig` FunctionGraph form `a·fn(b(x−h))+k` (graphs.ts), 3 handles (anchor/amplitude/period), per-fn colors + asymptote-aware ribbon splitting in shapeLayer, amplitude/period/phase/midline + unit-circle key-values facts. PLUS the `unitCircle` Shape kind (core/shapes.ts) with polar rim handle, reference-triangle render (cos/sin legs in wave colors) + sin/cos/tan/identity facts. PLUS the live sine tracer: dragging θ unrolls y = k + r·sin t for t∈[0,θ] to the right of the circle (shapeLayer.addSineTrace), with a connector to the wave tip — hide-able via a nested "Trace sine wave" toggle under Unit circle in the gear. Verified /tmp/em-verify/{trig,unitcircle}-smoke.ts + browser screenshots. The bridge is now complete (manipulation-driven, not auto-animated — fits the app's embodied model)]
- [x] Gear-dropdown per-kind shape visibility toggles [DONE 2026-06-12: ShapeLayer.setKindVisible + #shape-visibility checkboxes wired via settings.ts initShapeVisibility; hidden kinds are unpickable]
- [ ] Exponentials/logs, rational functions (asymptote facts)
- [ ] Vector math before exponentials/logs/the rest of the bullet above this one.
- [ ] We should integrate some 10 Minute Physics problems into this repo. Maybe some from 3Blue1Brown when those are done, but not until then. It's OK to do this in text format first, if that's easiest and helps me work through the problems myself. 