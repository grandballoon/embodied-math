/**
 * Coordinate-system module.
 *
 * The spec calls for a single module owning conversion between the three
 * coordinate spaces, with every other module asking it. This is that module.
 *
 * For V1 the origin is LOCKED to viewport center, so world<->screen is a
 * trivial fixed mapping (a scale by pixels-per-unit, no camera offset). When
 * pan/zoom eventually arrives, this is the one place that changes — callers
 * never touch raw conversions.
 *
 * Branded types make the three spaces non-interchangeable: you cannot pass a
 * pixel coordinate where a world coordinate is expected. This catches the
 * classic "my right hand grabs the left term" class of bug before it happens.
 */

type Brand<T, B> = T & { readonly __brand: B };

/** Pixels from MediaPipe / DOM events. Top-left origin, +y DOWN, UNMIRRORED. */
export type CameraVec = Brand<{ x: number; y: number }, "camera">;

/** Three.js world units. Center origin, +y UP. For V1, 1 unit == 1 pixel. */
export type WorldVec = Brand<{ x: number; y: number }, "world">;

/** Math units (what the user reads off the axes). */
export type MathVec = Brand<{ x: number; y: number }, "math">;

export interface ViewportSize {
  width: number;
  height: number;
}

export function cameraVec(x: number, y: number): CameraVec {
  return { x, y } as CameraVec;
}
export function worldVec(x: number, y: number): WorldVec {
  return { x, y } as WorldVec;
}
export function mathVec(x: number, y: number): MathVec {
  return { x, y } as MathVec;
}

export class CoordinateSystem {
  constructor(
    private viewport: ViewportSize,
    /** Zoom: world-units (== pixels in V1) per one math unit. */
    public pixelsPerUnit: number,
    /** Whether the displayed feed is mirrored (scaleX(-1)). */
    public readonly mirrored: boolean = true,
  ) {}

  setViewport(size: ViewportSize): void {
    this.viewport = size;
  }

  /**
   * Normalized video-frame coordinates (MediaPipe landmarks, 0..1 relative to
   * the raw frame) -> screen pixels (CameraVec).
   *
   * The feed is displayed with `object-fit: cover`, which scales the frame up
   * until it fills the viewport and crops the overflow, centered. A landmark's
   * screen position must apply that same scale-and-crop, so `norm.x * width`
   * is wrong whenever the aspect ratios differ. The result is UNMIRRORED, like
   * all CameraVecs — the CSS mirror is display-only and cameraToWorld owns
   * the flip.
   */
  videoToCamera(norm: { x: number; y: number }, video: ViewportSize): CameraVec {
    const { width, height } = this.viewport;
    const scale = Math.max(width / video.width, height / video.height);
    const shownW = video.width * scale;
    const shownH = video.height * scale;
    return cameraVec(
      norm.x * shownW - (shownW - width) / 2,
      norm.y * shownH - (shownH - height) / 2,
    );
  }

  /**
   * Camera pixels -> world units.
   *
   * Two flips happen here, and ONLY here:
   *  - y is flipped because camera-space y points down, world-space y points up.
   *  - x is flipped when the feed is mirrored, so a hand on the user's right
   *    (which MediaPipe reports on the left in unmirrored image coords) lands
   *    on the right of the world plane.
   *
   * The hand-tracking layer uses a mirrored instance of this class; the
   * pointer layer uses an unmirrored one (mouse events are already in screen
   * space). Same conversions, different flag.
   */
  cameraToWorld(p: CameraVec): WorldVec {
    const { width, height } = this.viewport;
    const px = this.mirrored ? width - p.x : p.x;
    return worldVec(px - width / 2, height / 2 - p.y);
  }

  /** World units -> math units (divide out the zoom). */
  worldToMath(p: WorldVec): MathVec {
    return mathVec(p.x / this.pixelsPerUnit, p.y / this.pixelsPerUnit);
  }

  /** Math units -> world units (apply the zoom). */
  mathToWorld(p: MathVec): WorldVec {
    return worldVec(p.x * this.pixelsPerUnit, p.y * this.pixelsPerUnit);
  }

  /**
   * The math-space rectangle currently visible (origin locked at viewport
   * center). Used by anything that must span the screen, e.g. sampling a
   * function graph across the visible domain.
   */
  mathBounds(): { minX: number; maxX: number; minY: number; maxY: number } {
    const hw = this.viewport.width / 2 / this.pixelsPerUnit;
    const hh = this.viewport.height / 2 / this.pixelsPerUnit;
    return { minX: -hw, maxX: hw, minY: -hh, maxY: hh };
  }
}
