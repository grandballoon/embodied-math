import type { CoordinateSystem } from "../core/coordinates.ts";
import { type Point, Points } from "../core/geometry/index.ts";
import {
  constrainPosition,
  constrainSize,
  hitTestBody,
  moveHandle,
  pickHandle,
  snapRole,
  snapToGridHandle,
  snapToGridPosition,
  snapToGridResize,
  translateShape,
} from "../core/shapes.ts";
import type { ShapeEntry, ShapeLayer } from "./shapeLayer.ts";

/**
 * Input-agnostic drag state machine for the shape layer. Each input source
 * (the mouse pointer, each tracked hand) is a SESSION keyed by a string, so
 * multiple sources can hover and grab concurrently — two hands can drag two
 * shapes while the mouse hovers a third. A shape grabbed by one session
 * cannot be grabbed by another until released.
 *
 * Front-ends (shapePointer.ts, handInput.ts) translate device events into the
 * grab/move/release/hover calls here, always in MATH units; this class does
 * the picking and applies the pure manipulation functions from
 * core/shapes.ts. It never touches the DOM or device APIs.
 *
 * Picking rules: handles win over bodies; among overlaps, the later-drawn
 * (topmost) shape wins. Tolerances are given in screen pixels per call, since
 * a fingertip needs a far bigger target than a mouse cursor.
 */

export interface PickTolerance {
  readonly handlePx: number;
  readonly bodyPx: number;
}

export const POINTER_TOLERANCE: PickTolerance = { handlePx: 12, bodyPx: 8 };
export const HAND_TOLERANCE: PickTolerance = { handlePx: 28, bodyPx: 20 };

type Session =
  | { mode: "handle"; id: number; handleIndex: number }
  | { mode: "body"; id: number; last: Point };

export class ShapeDriver {
  private readonly sessions = new Map<string, Session>();
  private readonly hovers = new Map<string, number>();
  private focusedId: number | null = null;
  private snapEnabled = false;

  /**
   * Fired after anything observable changes: a grab/release, a drag step, or
   * the focused shape changing. The facts panel re-reads `focused()` here.
   */
  onUpdate?: () => void;

  constructor(
    private readonly layer: ShapeLayer,
    private readonly cs: CoordinateSystem,
  ) {}

  /**
   * Toggle grid snapping for subsequent drags. Driver-wide, so pointer and hand
   * input share one setting (there is a single driver instance).
   */
  setSnapEnabled(enabled: boolean): void {
    this.snapEnabled = enabled;
  }

  /**
   * The shape whose details should be displayed: the most recently CLICKED
   * (grabbed) one, STICKY — hovering only highlights, so the fact sheet switches
   * on click and stays put after the cursor leaves or a manipulation ends.
   */
  focused(): ShapeEntry | null {
    if (this.focusedId === null) return null;
    return this.layer.shapes.find((s) => s.id === this.focusedId) ?? null;
  }

  /**
   * Programmatically focus a shape, so the fact sheet follows it without a
   * click — e.g. a freshly generated square, so the user can act on it (and
   * generate the next one) immediately. No-op if it's already focused.
   */
  focus(id: number): void {
    if (this.focusedId === id) return;
    this.focusedId = id;
    this.onUpdate?.();
  }

  /**
   * Drop the focus (e.g. after the focused shape is deleted), so the fact sheet
   * clears. No-op if it's already unfocused (or focused on a different id when
   * `id` is given).
   */
  blur(id?: number): void {
    if (this.focusedId === null) return;
    if (id !== undefined && this.focusedId !== id) return;
    this.focusedId = null;
    this.onUpdate?.();
  }

  /**
   * Update a source's hover position (null = source left the canvas/frame).
   * Returns whether something is under it, for cursor feedback. Hovering only
   * drives the highlight (lit set) — it does NOT change the focused shape; the
   * fact sheet follows clicks (see grab()), not the cursor.
   */
  hover(source: string, p: Point | null, tol: PickTolerance = POINTER_TOLERANCE): boolean {
    const hit = p === null ? null : this.pick(p, tol);
    if (hit === null) this.hovers.delete(source);
    else this.hovers.set(source, hit.id);
    this.pushLit();
    return hit !== null;
  }

  /** Try to start a drag at `p`. Returns whether something was grabbed. */
  grab(source: string, p: Point, tol: PickTolerance = POINTER_TOLERANCE): boolean {
    this.release(source);
    const hit = this.pick(p, tol, this.grabbedIds());
    if (!hit) return false;
    this.sessions.set(source, hit);
    this.hovers.delete(source);
    this.focusedId = hit.id;
    this.pushLit();
    this.onUpdate?.();
    return true;
  }

  /** Continue a drag. No-op if the source isn't currently grabbing. */
  move(source: string, p: Point): void {
    const session = this.sessions.get(source);
    if (!session) return;
    const entry = this.layer.shapes.find((s) => s.id === session.id);
    if (!entry) return;
    if (session.mode === "handle") {
      let next = moveHandle(entry.shape, session.handleIndex, p);
      // Grid snapping (when on): the role of the dragged handle decides what
      // snaps — its center (position), its rim (circumference), or nothing
      // (e.g. a fraction circle's fill knob). Applied before locks, so a
      // size/position lock still wins over a snap.
      if (this.snapEnabled) {
        const role = snapRole(entry.shape, session.handleIndex);
        if (role === "position") next = snapToGridPosition(next);
        else if (role === "resize") next = snapToGridResize(next, p);
        else if (role === "handle")
          next = snapToGridHandle(next, session.handleIndex);
      }
      // A size-locked shape keeps its scalar size; other manipulation is intact.
      if (entry.sizeLocked) next = constrainSize(entry.shape, next);
      // A position-locked shape keeps its anchor pinned (resize/rotate still
      // works); the two locks are independent and compose.
      if (entry.positionLocked) next = constrainPosition(entry.shape, next);
      this.layer.updateShape(session.id, next);
    } else if (!entry.positionLocked) {
      // Body drags translate the shape — skipped entirely when position-locked.
      const delta = Points.displacement(session.last, p);
      let next = translateShape(entry.shape, delta);
      if (this.snapEnabled) next = snapToGridPosition(next);
      this.layer.updateShape(session.id, next);
      session.last = p;
    }
    this.onUpdate?.();
  }

  release(source: string): void {
    if (!this.sessions.delete(source)) return;
    this.pushLit();
    this.onUpdate?.();
  }

  private pick(
    p: Point,
    tol: PickTolerance,
    excluded?: ReadonlySet<number>,
  ): Session | null {
    const handleTol = tol.handlePx / this.cs.pixelsPerUnit;
    const bodyTol = tol.bodyPx / this.cs.pixelsPerUnit;
    const entries = this.layer.shapes;
    for (let i = entries.length - 1; i >= 0; i--) {
      const { id, shape } = entries[i];
      if (excluded?.has(id)) continue;
      const handleIndex = pickHandle(shape, p, handleTol);
      if (handleIndex !== null) return { mode: "handle", id, handleIndex };
    }
    for (let i = entries.length - 1; i >= 0; i--) {
      const { id, shape } = entries[i];
      if (excluded?.has(id)) continue;
      if (hitTestBody(shape, p, bodyTol)) return { mode: "body", id, last: p };
    }
    return null;
  }

  private grabbedIds(): Set<number> {
    return new Set([...this.sessions.values()].map((s) => s.id));
  }

  private pushLit(): void {
    this.layer.setLit([
      ...this.grabbedIds(),
      ...this.hovers.values(),
    ]);
  }
}
