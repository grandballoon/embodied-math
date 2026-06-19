import { type CoordinateSystem, cameraVec, worldVec } from "../core/coordinates.ts";
import { type Point, Points } from "../core/geometry/index.ts";
import { PinchDetector } from "../core/pinch.ts";
import { OneEuroFilter2D } from "../core/smoothing.ts";
import { HAND_TOLERANCE, type ShapeDriver } from "./shapeDriver.ts";
import { LANDMARK, type TrackedHand } from "./handTracker.ts";
import type { HandCursorLayer } from "./handCursors.ts";

/**
 * Hand front-end for the ShapeDriver: per tracked hand, runs the pinch state
 * machine and One-Euro smoothing, then issues the same grab/move/release/
 * hover calls the pointer does — under a "hand:Left"/"hand:Right" session
 * key, so two hands (and the mouse) can manipulate shapes simultaneously.
 *
 * Coordinate path per hand:
 *   CameraVec landmarks (from HandTracker, already cover-cropped)
 *     -> pinch midpoint -> cameraToWorld (mirrored=true: a hand on the
 *        user's right lands on the right of the plane)
 *     -> One-Euro smoothing in world px -> worldToMath -> Point -> driver.
 *
 * Smoothing happens in world pixels (filter params are tuned for px), AFTER
 * the mirror flip and BEFORE the zoom division, so it's stable across
 * pixelsPerUnit changes.
 *
 * A hand that vanishes mid-pinch keeps its grab for a short grace period —
 * MediaPipe drops single frames routinely, and releasing instantly would
 * fling shapes loose mid-drag.
 */

const GRACE_MS = 250;

interface HandState {
  readonly pinch: PinchDetector;
  readonly filter: OneEuroFilter2D;
  lastSeenMs: number;
}

export class HandInput {
  private readonly states = new Map<string, HandState>();

  constructor(
    private readonly cs: CoordinateSystem,
    private readonly driver: ShapeDriver,
    private readonly cursors: HandCursorLayer,
  ) {}

  update(hands: readonly TrackedHand[], timeMs: number): void {
    const seen = new Set<string>();

    for (const hand of hands) {
      const key = `hand:${hand.handedness}`;
      seen.add(key);
      let state = this.states.get(key);
      if (!state) {
        state = {
          pinch: new PinchDetector(),
          filter: new OneEuroFilter2D(),
          lastSeenMs: timeMs,
        };
        this.states.set(key, state);
      }
      state.lastSeenMs = timeMs;

      const pinch = state.pinch.update({
        thumbTip: hand.landmarks[LANDMARK.THUMB_TIP],
        indexTip: hand.landmarks[LANDMARK.INDEX_TIP],
        wrist: hand.landmarks[LANDMARK.WRIST],
        middleMcp: hand.landmarks[LANDMARK.MIDDLE_MCP],
      });

      const world = this.cs.cameraToWorld(
        cameraVec(pinch.midpoint.x, pinch.midpoint.y),
      );
      const smoothed = state.filter.filter(world, timeMs);
      const m = this.cs.worldToMath(worldVec(smoothed.x, smoothed.y));
      const p: Point = Points.point(m.x, m.y);

      if (pinch.started) {
        this.driver.grab(key, p, HAND_TOLERANCE);
      } else if (pinch.pinching) {
        this.driver.move(key, p);
      } else {
        if (pinch.released) this.driver.release(key);
        this.driver.hover(key, p, HAND_TOLERANCE);
      }
      this.cursors.set(key, smoothed, pinch.pinching);
    }

    // Hands not in this frame: hold their state through the grace window,
    // then release whatever they were doing and retire them.
    for (const [key, state] of this.states) {
      if (seen.has(key) || timeMs - state.lastSeenMs <= GRACE_MS) continue;
      if (state.pinch.reset()) this.driver.release(key);
      this.driver.hover(key, null);
      this.cursors.set(key, null, false);
      this.states.delete(key);
    }
  }
}
