import * as THREE from "three";

/**
 * On-screen cursors for tracked hands. A hand has no OS pointer, so the scene
 * must show where each pinch-point is and whether it's "down" (pinching).
 *
 * Unlike ShapeLayer this does NOT rebuild: cursors move every video frame, so
 * each hand gets one persistent ring+dot pair that is repositioned in place
 * and hidden when the hand leaves the frame.
 *
 * Positions are world units (== screen pixels), already smoothed upstream.
 * Drawn at z 6, above shapes (z 2..5).
 */

const Z_CURSOR = 6;
const CURSOR_COLOR = 0xffffff;
const PINCH_COLOR = 0x5ad1c2;

interface Cursor {
  ring: THREE.Mesh;
  dot: THREE.Mesh;
  dotMaterial: THREE.MeshBasicMaterial;
}

export class HandCursorLayer {
  readonly group = new THREE.Group();
  private readonly cursors = new Map<string, Cursor>();

  /** Place a hand's cursor; pass null position to hide it. */
  set(key: string, world: { x: number; y: number } | null, pinching: boolean): void {
    let cursor = this.cursors.get(key);
    if (!cursor) {
      if (world === null) return;
      cursor = this.makeCursor();
      this.cursors.set(key, cursor);
    }
    const visible = world !== null;
    cursor.ring.visible = visible;
    cursor.dot.visible = visible;
    if (world === null) return;

    cursor.ring.position.set(world.x, world.y, Z_CURSOR);
    cursor.dot.position.set(world.x, world.y, Z_CURSOR + 0.5);
    // Pinching: the dot swells and takes the accent color — "mouse button down".
    const dotScale = pinching ? 1.8 : 1;
    cursor.dot.scale.set(dotScale, dotScale, 1);
    cursor.dotMaterial.color.set(pinching ? PINCH_COLOR : CURSOR_COLOR);
  }

  private makeCursor(): Cursor {
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(9, 11, 32),
      new THREE.MeshBasicMaterial({
        color: CURSOR_COLOR,
        transparent: true,
        opacity: 0.85,
      }),
    );
    const dotMaterial = new THREE.MeshBasicMaterial({
      color: CURSOR_COLOR,
      transparent: true,
      opacity: 0.95,
    });
    const dot = new THREE.Mesh(new THREE.CircleGeometry(3.5, 20), dotMaterial);
    this.group.add(ring, dot);
    return { ring, dot, dotMaterial };
  }
}
