import { type CoordinateSystem, cameraVec } from "../core/coordinates.ts";
import { type Point, Points } from "../core/geometry/index.ts";
import { POINTER_TOLERANCE, type ShapeDriver } from "./shapeDriver.ts";

/**
 * Pointer (mouse/touch/pen) front-end for the ShapeDriver: translates DOM
 * pointer events into grab/move/release/hover calls under the "pointer"
 * session key. All drag semantics live in the driver; this file only owns
 * the event plumbing and cursor styling.
 *
 * Every event goes screen pixels -> world -> math through the passed
 * CoordinateSystem. IMPORTANT: it must be constructed with mirrored=false —
 * pointer events are already in unmirrored screen space; the mirror flip is
 * only for positions derived from the webcam feed (see handInput.ts).
 */

const SOURCE = "pointer";

export function attachShapePointer(
  canvas: HTMLCanvasElement,
  cs: CoordinateSystem,
  driver: ShapeDriver,
): void {
  let dragging = false;

  const toMath = (e: PointerEvent): Point => {
    const m = cs.worldToMath(cs.cameraToWorld(cameraVec(e.clientX, e.clientY)));
    return Points.point(m.x, m.y);
  };

  canvas.addEventListener("pointerdown", (e) => {
    if (e.button !== 0) return;
    if (!driver.grab(SOURCE, toMath(e), POINTER_TOLERANCE)) return;
    dragging = true;
    canvas.setPointerCapture(e.pointerId);
    canvas.style.cursor = "grabbing";
    e.preventDefault();
  });

  canvas.addEventListener("pointermove", (e) => {
    const p = toMath(e);
    if (dragging) {
      driver.move(SOURCE, p);
      return;
    }
    const over = driver.hover(SOURCE, p, POINTER_TOLERANCE);
    canvas.style.cursor = over ? "grab" : "default";
  });

  const endDrag = (e: PointerEvent) => {
    if (!dragging) return;
    dragging = false;
    driver.release(SOURCE);
    if (canvas.hasPointerCapture(e.pointerId)) {
      canvas.releasePointerCapture(e.pointerId);
    }
    // Cursor and hover refresh themselves on the next pointermove.
  };
  canvas.addEventListener("pointerup", endDrag);
  canvas.addEventListener("pointercancel", endDrag);
}
