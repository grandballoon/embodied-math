import "./style.css";
import { DEFAULT_CONFIG } from "./core/config.ts";
import { CoordinateSystem, type ViewportSize } from "./core/coordinates.ts";
import { Circles, Points, Segments, Triangles, Vec } from "./core/geometry/index.ts";
import { type Shape, doubleSquare, isResizable, isMovable } from "./core/shapes.ts";
import { shapeFacts, dotProductFacts } from "./core/facts.ts";
import { startWebcam } from "./scene/webcam.ts";
import { SceneRenderer } from "./scene/renderer.ts";
import { CartesianPlane } from "./scene/plane.ts";
import { ShapeLayer } from "./scene/shapeLayer.ts";
import { ShapeDriver } from "./scene/shapeDriver.ts";
import { attachShapePointer } from "./scene/shapePointer.ts";
import { HandTracker } from "./scene/handTracker.ts";
import { HandInput } from "./scene/handInput.ts";
import { HandCursorLayer } from "./scene/handCursors.ts";
import { FactsPanel } from "./scene/factsPanel.ts";
import type { ActionControl } from "./scene/factsPanel.ts";
import {
  initCameraView,
  initControls,
  initFractionCircles,
  initHandTracking,
  initSettings,
  initShapeVisibility,
  initSnapping,
  initSquares,
  initVectors,
  setDiagonalChecked,
  setKindChecked,
} from "./scene/settings.ts";

function viewport(): ViewportSize {
  return { width: window.innerWidth, height: window.innerHeight };
}

/**
 * One interactive instance of each data type, in math units. The triangle
 * exercises the SideAngleTriangle bridge (solved from sides via fromSSS,
 * realized as vertices); the two function graphs exercise the algebra
 * engine's parameter handles (drag the y-intercept/slope of the line, the
 * vertex/width of the parabola).
 */
function demoShapes(): Shape[] {
  return [
    { kind: "graph", graph: { form: "linear", m: 0.5, b: 2.5 } },
    { kind: "graph", graph: { form: "quadratic", a: 0.4, h: -1.5, k: -3.5 } },
    { kind: "graph", graph: { form: "trig", fn: "sin", a: 2, b: 1, h: 0, k: 0 } },
    { kind: "graph", graph: { form: "trig", fn: "cos", a: 1.5, b: 0.5, h: 0, k: 1 } },
    { kind: "graph", graph: { form: "trig", fn: "tan", a: 1, b: 1, h: 0, k: 0 } },
    { kind: "unitCircle", center: Points.point(-7, -3), radius: 1.6, angle: Math.PI / 4 },
    { kind: "fractionCircle", center: Points.point(6.5, 2.8), radius: 1.6, divisions: 4, filled: 1 },
    { kind: "square", center: Points.point(-7, 3), half: 1.3, angle: 0 },
    { kind: "circle", circle: Circles.circle(Points.point(-3, 1.5), 1.25) },
    {
      kind: "triangle",
      tri: Triangles.toVertices(Triangles.fromSSS(1.5, 2, 2.5), Points.point(0.5, -3)),
    },
    { kind: "vector", tail: Points.point(-4.5, -2), v: Vec.vector(2, 1.5) },
    { kind: "point", at: Points.point(2.5, 2) },
    {
      kind: "segment",
      seg: Segments.segment(Points.point(3.5, -1.5), Points.point(6, 0)),
    },
  ];
}

async function main(): Promise<void> {
  const video = document.getElementById("webcam") as HTMLVideoElement;
  const canvas = document.getElementById("scene") as HTMLCanvasElement;

  try {
    await startWebcam(video);
  } catch (err) {
    // Plane still renders without the feed; surface the reason in the console.
    console.error("Webcam unavailable:", err);
  }

  const config = { ...DEFAULT_CONFIG };
  const renderer = new SceneRenderer(canvas, viewport());
  const plane = new CartesianPlane();
  renderer.scene.add(plane.group);

  // Two coordinate systems, same conversions, different mirror flag:
  // pointer events arrive in unmirrored screen pixels (mirrored=false), while
  // hand positions come from the webcam feed, whose display is mirrored
  // (mirrored=true) so the user's right hand lands on the right of the plane.
  const pointerCoords = new CoordinateSystem(viewport(), config.pixelsPerUnit, false);
  const handCoords = new CoordinateSystem(viewport(), config.pixelsPerUnit, true);

  const shapes = new ShapeLayer(pointerCoords);
  shapes.setShapes(demoShapes());
  renderer.scene.add(shapes.group);

  const cursors = new HandCursorLayer();
  renderer.scene.add(cursors.group);

  const rebuild = () => {
    for (const cs of [pointerCoords, handCoords]) {
      cs.setViewport(viewport());
      cs.pixelsPerUnit = config.pixelsPerUnit;
    }
    plane.rebuild(viewport(), config);
    shapes.rebuild();
  };
  rebuild();

  initSettings(config, rebuild);
  initControls();

  const driver = new ShapeDriver(shapes, pointerCoords);
  attachShapePointer(canvas, pointerCoords, driver);
  const handInput = new HandInput(handCoords, driver, cursors);

  // Grid snapping toggle (controls panel): circle center snaps on move, rim
  // snaps the circumference on resize. Driver-wide, shared by pointer + hands.
  initSnapping((enabled) => driver.setSnapEnabled(enabled));

  // Camera view toggle (controls panel): off swaps the webcam feed for a
  // mid-tone blue background behind the plane.
  initCameraView((cameraOn) => {
    document.body.classList.toggle("no-camera", !cameraOn);
  });

  // Two-vector selection memory for vector addition: as you click vectors, we
  // remember the current and the previous DISTINCT vector, so focusing a second
  // one offers "add these two". A non-vector focus doesn't disturb the pair.
  const vectorById = (id: number | null): Extract<Shape, { kind: "vector" }> | null => {
    if (id === null) return null;
    const e = shapes.shapes.find((s) => s.id === id);
    return e && e.shape.kind === "vector" ? e.shape : null;
  };
  let lastVectorId: number | null = null;
  let prevVectorId: number | null = null;

  // The action buttons for the focused shape: square doubling; for a vector,
  // negate (−v), scalar multiply (s·v), remove, and — when a second distinct
  // vector is in focus — vector addition/subtraction.
  const shapeActions = (focused: { id: number; shape: Shape }): ActionControl[] => {
    const actions: ActionControl[] = [];
    if (focused.shape.kind === "square") {
      const sq = focused.shape;
      actions.push({
        label: "Double the square (×2 area)",
        title:
          "Build the next square on this one's diagonal — area doubles, rotated 45°",
        onClick: () => {
          const id = shapes.addShape(doubleSquare(sq));
          setKindChecked("square", true); // keep the kind visible
          setDiagonalChecked(true); // show the seed diagonal = new side
          driver.focus(id); // follow the new square (refreshes the panel)
        },
      });
    }
    if (focused.shape.kind === "vector") {
      // Vector addition: the previously-focused vector (first operand) plus the
      // one in focus (second). Resultant is the triangle-rule diagonal — anchored
      // at the first's tail, displacement = the two summed (v₁ + v₂).
      const first = vectorById(prevVectorId);
      const second = focused.shape;
      if (first && prevVectorId !== focused.id) {
        const firstId = prevVectorId;
        actions.push({
          label: "Add these two vectors (→ resultant)",
          title: "Create v₁ + v₂: the diagonal from the first vector's tail",
          onClick: () => {
            const a = vectorById(firstId);
            if (!a) return; // first vector was deleted meanwhile
            const id = shapes.addShape({
              kind: "vector",
              tail: a.tail,
              v: Vec.add(a.v, second.v),
            });
            setKindChecked("vector", true);
            driver.focus(id); // follow the resultant
          },
        });
        actions.push({
          label: "Subtract these two vectors (→ resultant)",
          title: "Create v₁ − v₂: anchored at the first vector's tail",
          onClick: () => {
            const a = vectorById(firstId);
            if (!a) return; // first vector was deleted meanwhile
            const id = shapes.addShape({
              kind: "vector",
              tail: a.tail,
              v: Vec.subtract(a.v, second.v),
            });
            setKindChecked("vector", true);
            driver.focus(id); // follow the resultant
          },
        });
        // Projection: drop v₂ onto v₁'s line — the embodied picture behind the
        // dot product (a·b = |a| · comp of b along a). New vector at v₁'s tail,
        // along v₁'s direction; ZERO if v₁ is degenerate (Vec.project guards it).
        actions.push({
          label: "Project v₂ onto v₁ (→ vector)",
          title: "Create projᵥ₁ v₂: the shadow of v₂ along v₁'s direction",
          onClick: () => {
            const a = vectorById(firstId);
            if (!a) return; // first vector was deleted meanwhile
            const id = shapes.addShape({
              kind: "vector",
              tail: a.tail,
              v: Vec.project(second.v, a.v),
            });
            setKindChecked("vector", true);
            driver.focus(id); // follow the projection
          },
        });
      }
      // Negate: a new vector −v at the same tail, pointing the opposite way.
      actions.push({
        label: "Negate (−v)",
        title: "Create −v: same tail, reversed direction",
        onClick: () => {
          const id = shapes.addShape({
            kind: "vector",
            tail: second.tail,
            v: Vec.negate(second.v),
          });
          setKindChecked("vector", true);
          driver.focus(id); // follow the negation
        },
      });
      // Scalar multiple: a new vector s·v at the same tail (s from the input).
      actions.push({
        label: "Multiply by scalar (s·v)",
        title: "Create s·v: same tail, length scaled by s (negative s flips it)",
        input: { value: 2, step: 0.5, title: "Scalar s" },
        onClick: (s) => {
          if (!Number.isFinite(s)) return; // empty / non-numeric input
          const id = shapes.addShape({
            kind: "vector",
            tail: second.tail,
            v: Vec.scale(second.v, s),
          });
          setKindChecked("vector", true);
          driver.focus(id); // follow the scaled vector
        },
      });
      actions.push({
        label: "Remove vector",
        title: "Delete this vector from the canvas",
        onClick: () => {
          shapes.removeShape(focused.id);
          driver.blur(focused.id); // clear the fact sheet (refreshes)
        },
      });
    }
    return actions;
  };

  // Fact sheet for the focused shape, recomputed live as values change.
  const panel = new FactsPanel();
  const refreshPanel = () => {
    const focused = driver.focused();
    if (!focused) {
      panel.render(null);
      return;
    }
    // Shift the remembered pair when the focused vector actually changes (this
    // fires on every drag/edit, so guard on a real id change).
    if (focused.shape.kind === "vector" && focused.id !== lastVectorId) {
      prevVectorId = lastVectorId;
      lastVectorId = focused.id;
    }
    const color = shapes.colorOf(focused.id);
    const alpha = shapes.alphaOf(focused.id);
    // When a vector is focused and a distinct partner vector is remembered,
    // append the binary dot-product group (v₁ = partner, v₂ = focused) and
    // point the projection overlay at the same pair (onto = v₁, from = v₂).
    let groups = shapeFacts(focused.shape);
    const partner =
      focused.shape.kind === "vector" && prevVectorId !== focused.id
        ? vectorById(prevVectorId)
        : null;
    if (partner && focused.shape.kind === "vector") {
      groups = [...groups, dotProductFacts(partner.v, focused.shape.v)];
    }
    shapes.setProjectionPair(partner ? prevVectorId : null, partner ? focused.id : null);
    panel.render(groups, {
      color:
        color === null
          ? undefined
          : {
              color,
              onChange: (c) => {
                shapes.setColor(focused.id, c);
                refreshPanel(); // reflect the newly active swatch
              },
            },
      alpha:
        alpha === null
          ? undefined
          : {
              alpha,
              min: 0,
              max: 3,
              // No refreshPanel: the range fires continuously while dragging,
              // and re-rendering would replace the slider mid-drag.
              onChange: (a) => shapes.setAlpha(focused.id, a),
            },
      lock: !isResizable(focused.shape)
        ? undefined
        : {
            locked: shapes.isSizeLocked(focused.id),
            onToggle: (on) => {
              shapes.setSizeLocked(focused.id, on);
              refreshPanel(); // reflect the new lock state
            },
          },
      positionLock: !isMovable(focused.shape)
        ? undefined
        : {
            locked: shapes.isPositionLocked(focused.id),
            onToggle: (on) => {
              shapes.setPositionLocked(focused.id, on);
              refreshPanel(); // reflect the new lock state
            },
          },
      // Squares can spawn the next power-of-two square ON their diagonal:
      // concentric, rotated 45°, double the area. Focusing the new one lets
      // repeated clicks climb the powers of two (×2, ×4, ×8, …).
      actions: shapeActions(focused),
    });
  };
  driver.onUpdate = refreshPanel;

  // Gear-dropdown checkboxes that hide/show shapes by kind. Refreshing the
  // panel afterward clears it if the focused shape was the one just hidden.
  initShapeVisibility(
    (kind, visible) => {
      shapes.setKindVisible(kind, visible);
      refreshPanel();
    },
    (visible) => shapes.setTraceVisible(visible),
    (family, visible) => {
      shapes.setGraphVisible(family, visible);
      refreshPanel();
    },
    (visible) => shapes.setCosTraceVisible(visible),
    (placement) => shapes.setCosPlacement(placement),
  );

  // "Add fraction circle" spawns a fresh pie at runtime, with the N typed in
  // the popup. New circles stagger across a small grid so they don't stack
  // exactly on each other; each starts unshaded — sweep the rim knob to fill.
  let fcSpawned = 0;
  const nextFractionCenter = () => {
    const col = fcSpawned % 3;
    const row = Math.floor(fcSpawned / 3);
    fcSpawned++;
    return Points.point(-4 + col * 4, 3 - row * 4);
  };
  initFractionCircles((divisions) => {
    shapes.addShape({
      kind: "fractionCircle",
      center: nextFractionCenter(),
      radius: 1.8,
      divisions,
      filled: 0,
    });
    // Shapes are hidden by default; adding one implies wanting to see it, so
    // reveal the kind (and tick its box) if it's currently toggled off.
    setKindChecked("fractionCircle", true);
  });

  // "Add square" spawns a fresh unit-ish square; the two toggles draw the
  // diagonal / half-diagonal across every square (the √2 demonstration).
  let sqSpawned = 0;
  const nextSquareCenter = () => {
    const col = sqSpawned % 3;
    const row = Math.floor(sqSpawned / 3);
    sqSpawned++;
    return Points.point(-6 + col * 4, -3 - row * 3.5);
  };
  initSquares(
    () => {
      shapes.addShape({
        kind: "square",
        center: nextSquareCenter(),
        half: 1.3,
        angle: 0,
      });
      setKindChecked("square", true);
    },
    (visible) => shapes.setDiagonalVisible(visible),
    (visible) => shapes.setHalfDiagonalVisible(visible),
  );

  // "Add vector" spawns a fresh arrow at runtime; new ones stagger across a
  // small grid so they don't stack exactly. Drag the tail/tip handles to aim.
  let vecSpawned = 0;
  initVectors(
    () => {
      const col = vecSpawned % 3;
      const row = Math.floor(vecSpawned / 3);
      vecSpawned++;
      shapes.addShape({
        kind: "vector",
        tail: Points.point(-4 + col * 4, 1 - row * 3),
        v: Vec.vector(2, 1.5),
      });
      setKindChecked("vector", true);
    },
    (visible) => shapes.setProjectionVisible(visible),
  );

  // Hand tracking is OFF by default and opt-in via the settings checkbox: it
  // loads its model async (and is optional anyway — if the CDN or webcam is
  // unavailable the app stays fully usable with the pointer). The model is
  // created lazily on first enable, then kept; `handsEnabled` gates the loop.
  let tracker: HandTracker | null = null;
  let trackerLoading = false;
  let handsEnabled = false;
  initHandTracking((enabled) => {
    handsEnabled = enabled;
    if (enabled && !tracker && !trackerLoading) {
      trackerLoading = true;
      HandTracker.create(handCoords)
        .then((t) => {
          tracker = t;
          console.info("Hand tracking ready: pinch (thumb+index) to grab shapes.");
        })
        .catch((err) => console.error("Hand tracking unavailable:", err))
        .finally(() => (trackerLoading = false));
    }
  });

  window.addEventListener("resize", () => {
    renderer.resize(viewport());
    rebuild();
  });

  const loop = () => {
    const now = performance.now();
    if (handsEnabled && tracker) {
      handInput.update(tracker.detect(video, now), now);
    } else {
      // Disabled (or still loading): drain any in-flight grabs and hide cursors.
      handInput.update([], now);
    }
    renderer.render();
    requestAnimationFrame(loop);
  };
  loop();
}

main();
