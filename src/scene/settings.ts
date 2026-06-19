import type { PlaneConfig, DisplayMode } from "../core/config.ts";
import type { GraphFamily } from "../core/algebra/graphs.ts";
import type { Shape } from "../core/shapes.ts";
import type { CosinePlacement } from "./shapeLayer.ts";

/**
 * Wires the settings popup DOM to the config. Calls `onChange` whenever any
 * control changes, with the updated config. Gear-button-only — no keyboard
 * shortcuts, per the original design constraint.
 */
export function initSettings(config: PlaneConfig, onChange: () => void): void {
  const toggle = byId<HTMLButtonElement>("settings-toggle");
  const popup = byId<HTMLDivElement>("settings-popup");
  toggle.addEventListener("click", () => {
    popup.hidden = !popup.hidden;
  });

  const mode = byId<HTMLSelectElement>("display-mode");
  mode.value = config.displayMode;
  mode.addEventListener("change", () => {
    config.displayMode = mode.value as DisplayMode;
    onChange();
  });

  bindNumber("grid-step", (v) => {
    if (v > 0) {
      config.step = v;
      onChange();
    }
  });

  bindNumber("pixels-per-unit", (v) => {
    if (v >= 4) {
      config.pixelsPerUnit = v;
      onChange();
    }
  });

  bindCheckbox("show-grid", (v) => {
    config.showGrid = v;
    onChange();
  });

  bindCheckbox("show-labels", (v) => {
    config.showLabels = v;
    onChange();
  });
}

/**
 * Wire the bottom-left controls panel's collapse toggle. Clicking the header
 * folds the body away (chevron rotates); the panel stays a fixed corner widget.
 */
export function initControls(): void {
  const panel = byId<HTMLDivElement>("controls-panel");
  const header = byId<HTMLButtonElement>("controls-header");
  header.addEventListener("click", () => {
    const collapsed = panel.classList.toggle("collapsed");
    header.setAttribute("aria-expanded", String(!collapsed));
  });
}

/**
 * Wire the "Visible shapes" checkboxes (each carrying a `data-kind`) to
 * `onToggle`. Separate from plane config: visibility is a shape-layer concern,
 * so main.ts hands in a setter that hides/shows a kind and refreshes the panel.
 * The unit circle carries NESTED toggles, disabled while it's off: the sine
 * trace (`onTrace`), the cosine trace (`onCosTrace`), and the cosine's position
 * selector (`onCosPlacement`, further disabled until the cosine trace is on).
 * The function graph's per-family toggles (`onGraph`) — sine/cosine/tangent/
 * quadratic/linear — are each shown alone or in any combination once "Function
 * graphs" is on.
 */
export function initShapeVisibility(
  onToggle: (kind: Shape["kind"], visible: boolean) => void,
  onTrace: (visible: boolean) => void,
  onGraph: (family: GraphFamily, visible: boolean) => void,
  onCosTrace: (visible: boolean) => void,
  onCosPlacement: (placement: CosinePlacement) => void,
): void {
  const trace = document.getElementById("trace-sine") as HTMLInputElement | null;
  const cosTrace = document.getElementById("trace-cosine") as HTMLInputElement | null;
  const cosPlace = document.getElementById("cosine-placement") as HTMLSelectElement | null;
  const unitBox = document.querySelector<HTMLInputElement>(
    '#shape-visibility input[data-kind="unitCircle"]',
  );
  // The position selector is live only when the unit circle AND its cosine
  // trace are both on.
  const syncCosPlaceDisabled = () => {
    if (cosPlace) cosPlace.disabled = !unitBox?.checked || !cosTrace?.checked;
  };
  const graphBoxes = document.querySelectorAll<HTMLInputElement>(
    "#shape-visibility input[data-graph]",
  );
  const boxes = document.querySelectorAll<HTMLInputElement>(
    "#shape-visibility input[data-kind]",
  );
  for (const box of boxes) {
    const kind = box.dataset.kind as Shape["kind"];
    const sync = () => {
      onToggle(kind, box.checked);
      // Nested toggles are meaningless while their parent kind is hidden.
      if (kind === "unitCircle") {
        if (trace) trace.disabled = !box.checked;
        if (cosTrace) cosTrace.disabled = !box.checked;
        syncCosPlaceDisabled();
      }
      if (kind === "graph") {
        for (const g of graphBoxes) g.disabled = !box.checked;
      }
    };
    box.addEventListener("change", sync);
    sync(); // apply the checkbox's initial state to the canvas on load
  }
  for (const box of graphBoxes) {
    const family = box.dataset.graph as GraphFamily;
    const sync = () => onGraph(family, box.checked);
    box.addEventListener("change", sync);
    sync();
  }
  if (trace) {
    trace.addEventListener("change", () => onTrace(trace.checked));
    onTrace(trace.checked);
  }
  if (cosTrace) {
    cosTrace.addEventListener("change", () => {
      onCosTrace(cosTrace.checked);
      syncCosPlaceDisabled();
    });
    onCosTrace(cosTrace.checked);
  }
  if (cosPlace) {
    cosPlace.addEventListener("change", () =>
      onCosPlacement(cosPlace.value as CosinePlacement),
    );
    onCosPlacement(cosPlace.value as CosinePlacement);
  }
}

/**
 * Wire the "Camera view" checkbox in the controls panel. ON by default (the box
 * ships checked): unchecking toggles a `no-camera` class on <body> that hides
 * the webcam feed and reveals a mid-tone blue background behind the transparent
 * scene canvas. `onToggle` fires with the box's initial state on load and on
 * every change so the body class matches the box.
 */
export function initCameraView(onToggle: (cameraOn: boolean) => void): void {
  const box = byId<HTMLInputElement>("camera-view");
  box.addEventListener("change", () => onToggle(box.checked));
  onToggle(box.checked);
}

/**
 * Wire the "Hand tracking" checkbox. Hand tracking is OFF by default (the box
 * ships unchecked): the MediaPipe model only loads, and the webcam pinch loop
 * only runs, once the user opts in. `onToggle` fires with the box's initial
 * state on load (so the disabled default is applied) and on every change.
 */
export function initHandTracking(onToggle: (enabled: boolean) => void): void {
  const box = byId<HTMLInputElement>("hand-tracking");
  box.addEventListener("change", () => onToggle(box.checked));
  onToggle(box.checked);
}

/**
 * Tick (or untick) a kind's visibility checkbox and fire its change handler, so
 * a programmatic reveal (e.g. spawning a fraction circle while its kind is
 * hidden) flows through the same path as a user click — the checkbox stays the
 * single source of truth for what's on the canvas.
 */
export function setKindChecked(kind: Shape["kind"], checked: boolean): void {
  const box = document.querySelector<HTMLInputElement>(
    `#shape-visibility input[data-kind="${kind}"]`,
  );
  if (box && box.checked !== checked) {
    box.checked = checked;
    box.dispatchEvent(new Event("change"));
  }
}

/**
 * Wire the "Add fraction circle" control: the divisions input + button. On
 * click, validate (a whole number ≥ 2) and hand the count to `onAdd`, which
 * spawns one fresh fraction circle on the plane. Creation-time only — each
 * circle keeps the N it was born with.
 */
export function initFractionCircles(onAdd: (divisions: number) => void): void {
  const input = byId<HTMLInputElement>("fc-divisions");
  const button = byId<HTMLButtonElement>("fc-add");
  button.addEventListener("click", () => {
    const n = Math.round(parseFloat(input.value));
    if (Number.isFinite(n) && n >= 2) onAdd(n);
  });
}

/**
 * Wire the "Vectors" controls: the "Add vector" button plus the nested "Show
 * projection" toggle. Creation is click-time (like the fraction-circle / square
 * Add buttons — each vector is then dragged by its tail/tip handles). The
 * projection toggle is scene-level (it applies to the focused/partner vector
 * pair, set live from main.ts), so like the square's diagonal it's disabled
 * while the Vectors kind itself is hidden. `onProjection` fires with the box's
 * initial state on load.
 */
export function initVectors(
  onAdd: () => void,
  onProjection: (visible: boolean) => void,
): void {
  const button = byId<HTMLButtonElement>("vector-add");
  button.addEventListener("click", () => onAdd());

  const proj = document.getElementById("vector-projection") as HTMLInputElement | null;
  const vectorBox = document.querySelector<HTMLInputElement>(
    '#shape-visibility input[data-kind="vector"]',
  );
  const syncDisabled = () => {
    if (proj) proj.disabled = !vectorBox?.checked;
  };
  if (proj) {
    proj.addEventListener("change", () => onProjection(proj.checked));
    onProjection(proj.checked);
  }
  if (vectorBox) vectorBox.addEventListener("change", syncDisabled);
  syncDisabled();
}

/**
 * Tick (or untick) the square "Draw diagonal" checkbox and fire its change
 * handler, so a programmatic reveal (e.g. generating the next power-of-two
 * square, whose side IS this diagonal) flows through the same path as a click —
 * the checkbox stays the single source of truth for the overlay.
 */
export function setDiagonalChecked(checked: boolean): void {
  const box = document.getElementById("square-diagonal") as HTMLInputElement | null;
  if (box && !box.disabled && box.checked !== checked) {
    box.checked = checked;
    box.dispatchEvent(new Event("change"));
  }
}

/**
 * Wire the "Squares" controls: the "Add square" button plus the two display
 * toggles (draw diagonal / draw half-diagonal). The toggles are scene-level
 * (they apply to every square, like the unit circle's trace), so they're
 * disabled while the Squares kind itself is hidden — kept in sync by listening
 * to that visibility box. Each `onX` fires with its box's initial state on load.
 */
export function initSquares(
  onAdd: () => void,
  onDiagonal: (visible: boolean) => void,
  onHalfDiagonal: (visible: boolean) => void,
): void {
  const add = byId<HTMLButtonElement>("square-add");
  add.addEventListener("click", () => onAdd());

  const diag = document.getElementById("square-diagonal") as HTMLInputElement | null;
  const half = document.getElementById("square-half-diagonal") as HTMLInputElement | null;
  const squareBox = document.querySelector<HTMLInputElement>(
    '#shape-visibility input[data-kind="square"]',
  );
  const syncDisabled = () => {
    const off = !squareBox?.checked;
    if (diag) diag.disabled = off;
    if (half) half.disabled = off;
  };
  if (diag) {
    diag.addEventListener("change", () => onDiagonal(diag.checked));
    onDiagonal(diag.checked);
  }
  if (half) {
    half.addEventListener("change", () => onHalfDiagonal(half.checked));
    onHalfDiagonal(half.checked);
  }
  if (squareBox) squareBox.addEventListener("change", syncDisabled);
  syncDisabled();
}

/**
 * Wire the "Snap to grid points" checkbox in the controls panel. OFF by default
 * (the box ships unchecked): `onToggle` fires with the box's initial state on
 * load and on every change.
 */
export function initSnapping(onToggle: (enabled: boolean) => void): void {
  const box = byId<HTMLInputElement>("snap-grid");
  box.addEventListener("change", () => onToggle(box.checked));
  onToggle(box.checked);
}

function byId<T extends HTMLElement>(id: string): T {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Missing element #${id}`);
  return el as T;
}

function bindNumber(id: string, cb: (v: number) => void): void {
  const el = byId<HTMLInputElement>(id);
  el.addEventListener("input", () => {
    const v = parseFloat(el.value);
    if (!Number.isNaN(v)) cb(v);
  });
}

function bindCheckbox(id: string, cb: (v: boolean) => void): void {
  const el = byId<HTMLInputElement>(id);
  el.addEventListener("change", () => cb(el.checked));
}
