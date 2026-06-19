/**
 * Pinch detection: turns per-frame hand landmark samples into a grab/release
 * state. Pure — no MediaPipe, no DOM — so the thresholds can be unit-tested
 * and tuned without a camera.
 *
 * A pinch is "thumb tip near index tip", measured RELATIVE to hand size
 * (wrist to middle-finger MCP, roughly palm length) so the gesture works at
 * any distance from the camera. Samples can be in any consistent 2D pixel
 * space; only ratios of distances are used.
 *
 * Hysteresis: the pinch engages below START_RATIO and releases only above
 * RELEASE_RATIO. A single threshold flickers when the ratio hovers at the
 * boundary, dropping grabs mid-drag.
 */

interface XY {
  readonly x: number;
  readonly y: number;
}

export interface PinchSample {
  readonly thumbTip: XY;
  readonly indexTip: XY;
  readonly wrist: XY;
  readonly middleMcp: XY;
}

export interface PinchState {
  /** Currently pinching (after hysteresis). */
  readonly pinching: boolean;
  /** True only on the frame the pinch engaged. */
  readonly started: boolean;
  /** True only on the frame the pinch released. */
  readonly released: boolean;
  /** Midpoint between thumb and index tips — the "cursor" of the gesture. */
  readonly midpoint: XY;
}

/** Engage when thumb-index distance drops below this fraction of palm length. */
const START_RATIO = 0.32;
/** Release only when it rises back above this (hysteresis gap). */
const RELEASE_RATIO = 0.48;

export class PinchDetector {
  private pinching = false;

  update(s: PinchSample): PinchState {
    const palm = dist(s.wrist, s.middleMcp);
    // Degenerate palm (tracking glitch): hold the current state this frame.
    const ratio = palm > 0 ? dist(s.thumbTip, s.indexTip) / palm : Number.POSITIVE_INFINITY;

    let started = false;
    let released = false;
    if (!this.pinching && ratio < START_RATIO) {
      this.pinching = true;
      started = true;
    } else if (this.pinching && ratio > RELEASE_RATIO) {
      this.pinching = false;
      released = true;
    }

    return {
      pinching: this.pinching,
      started,
      released,
      midpoint: {
        x: (s.thumbTip.x + s.indexTip.x) / 2,
        y: (s.thumbTip.y + s.indexTip.y) / 2,
      },
    };
  }

  /** Force-release, e.g. when the hand leaves the frame. */
  reset(): boolean {
    const wasPinching = this.pinching;
    this.pinching = false;
    return wasPinching;
  }
}

function dist(a: XY, b: XY): number {
  return Math.hypot(b.x - a.x, b.y - a.y);
}
