import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";
import type { CameraVec, CoordinateSystem } from "../core/coordinates.ts";

/**
 * MediaPipe HandLandmarker wrapper. Owns the model lifecycle and converts
 * each frame's normalized landmarks into CameraVec screen pixels via
 * CoordinateSystem.videoToCamera (which applies the object-fit: cover crop).
 * Everything downstream (pinch detection, picking) works in real pixel/math
 * spaces and never sees MediaPipe types.
 *
 * The WASM runtime and the ~8 MB model file load from CDNs, pinned to the
 * installed package version. For offline use, copy
 * node_modules/@mediapipe/tasks-vision/wasm/ and the .task file into public/
 * and point these URLs there.
 */

const WASM_BASE =
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm";
const MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task";

/** Indices into the 21-point landmark array (MediaPipe hand topology). */
export const LANDMARK = {
  WRIST: 0,
  THUMB_TIP: 4,
  INDEX_TIP: 8,
  MIDDLE_MCP: 9,
} as const;

export interface TrackedHand {
  /**
   * MediaPipe's handedness label. Used as a stable per-hand session key;
   * whether it matches the user's anatomical hand doesn't matter here.
   */
  readonly handedness: "Left" | "Right";
  /** All 21 landmarks as unmirrored screen pixels. */
  readonly landmarks: readonly CameraVec[];
}

export class HandTracker {
  private lastTimestampMs = -1;
  private lastResult: TrackedHand[] = [];

  private constructor(
    private readonly landmarker: HandLandmarker,
    private readonly cs: CoordinateSystem,
  ) {}

  static async create(cs: CoordinateSystem): Promise<HandTracker> {
    const fileset = await FilesetResolver.forVisionTasks(WASM_BASE);
    const landmarker = await HandLandmarker.createFromOptions(fileset, {
      baseOptions: { modelAssetPath: MODEL_URL, delegate: "GPU" },
      runningMode: "VIDEO",
      numHands: 2,
    });
    return new HandTracker(landmarker, cs);
  }

  /**
   * Detect hands in the current video frame. Safe to call every rAF tick:
   * returns [] until the video has pixels, and reuses the last result if the
   * timestamp hasn't advanced (detectForVideo requires increasing timestamps).
   */
  detect(video: HTMLVideoElement, timestampMs: number): TrackedHand[] {
    if (video.readyState < 2 || video.videoWidth === 0) return [];
    if (timestampMs <= this.lastTimestampMs) return this.lastResult;
    this.lastTimestampMs = timestampMs;

    const result = this.landmarker.detectForVideo(video, timestampMs);
    const videoSize = { width: video.videoWidth, height: video.videoHeight };
    this.lastResult = result.landmarks.map((landmarks, i) => ({
      handedness:
        result.handednesses[i]?.[0]?.categoryName === "Left" ? "Left" : "Right",
      landmarks: landmarks.map((l) => this.cs.videoToCamera(l, videoSize)),
    }));
    return this.lastResult;
  }
}
