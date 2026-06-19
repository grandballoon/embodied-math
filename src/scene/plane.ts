import * as THREE from "three";
import {
  type PlaneConfig,
  MIN_PIXELS_BETWEEN_GRIDLINES,
} from "../core/config.ts";
import type { ViewportSize } from "../core/coordinates.ts";

/**
 * Builds and maintains the Cartesian plane mesh group.
 *
 * Key rendering decisions carried over from the original build:
 *  - Axes are thin rectangle MESHES, not LineSegments. WebGL clamps line width
 *    to 1px on virtually every platform, so any line needing visible thickness
 *    must be a PlaneGeometry rectangle.
 *  - The minor grid IS LineSegments (1px is fine, and meshing every gridline
 *    would be wasteful).
 *  - Labels are canvas-texture sprites cached by string. The cache stabilizes
 *    around ~40 entries at typical zoom; don't reach for MSDF text until/unless
 *    labels become a measured bottleneck.
 *
 * Coordinate convention: origin at (0,0) center, +y up. The orthographic camera
 * spans -w/2..+w/2 and -h/2..+h/2, so world units equal screen pixels and
 * positioning in pixels "just works" with no conversion.
 */

const AXIS_THICKNESS = 3;
const AXIS_COLOR = 0xffffff;
const GRID_COLOR = 0xffffff;
const ACCENT_COLOR = 0x5ad1c2;

export class CartesianPlane {
  readonly group = new THREE.Group();

  private labelCache = new Map<string, THREE.CanvasTexture>();

  // Shared materials live for the lifetime of the plane; per-rebuild geometry
  // and per-rebuild materials are disposed on each rebuild. The whitelist below
  // is what we must NOT dispose during a rebuild sweep.
  private gridMaterial = new THREE.LineBasicMaterial({
    color: GRID_COLOR,
    transparent: true,
    opacity: 0.18,
  });
  private frameMaterial = new THREE.MeshBasicMaterial({
    color: ACCENT_COLOR,
    transparent: true,
    opacity: 0.5,
  });
  private readonly persistentMaterials = new Set<THREE.Material>([
    this.gridMaterial,
    this.frameMaterial,
  ]);

  /** Rebuild the entire plane for the current viewport + config. */
  rebuild(viewport: ViewportSize, config: PlaneConfig): void {
    this.clearGroup();

    const pixelsBetween = config.pixelsPerUnit * config.step;
    // Density guard: refuse absurd settings rather than spawn millions of lines.
    if (pixelsBetween < MIN_PIXELS_BETWEEN_GRIDLINES) return;

    const { width, height } = viewport;
    const half = config.displayMode === "framed" ? 0.9 : 1;
    const bx = (width / 2) * half;
    const by = (height / 2) * half;

    if (config.showGrid) this.addGrid(bx, by, pixelsBetween);
    this.addAxes(bx, by);
    if (config.displayMode === "framed") this.addFrame(bx, by);
    if (config.showLabels) this.addLabels(bx, by, config);
  }

  private addGrid(bx: number, by: number, spacing: number): void {
    const coords: number[] = [];
    for (let x = spacing; x <= bx; x += spacing) {
      coords.push(x, -by, 0, x, by, 0, -x, -by, 0, -x, by, 0);
    }
    for (let y = spacing; y <= by; y += spacing) {
      coords.push(-bx, y, 0, bx, y, 0, -bx, -y, 0, bx, -y, 0);
    }
    if (coords.length === 0) return;
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.Float32BufferAttribute(coords, 3));
    this.group.add(new THREE.LineSegments(geom, this.gridMaterial));
  }

  private addAxes(bx: number, by: number): void {
    const mat = new THREE.MeshBasicMaterial({
      color: AXIS_COLOR,
      transparent: true,
      opacity: 0.9,
    });
    const axisX = new THREE.Mesh(
      new THREE.PlaneGeometry(bx * 2, AXIS_THICKNESS),
      mat,
    );
    const axisY = new THREE.Mesh(
      new THREE.PlaneGeometry(AXIS_THICKNESS, by * 2),
      mat,
    );
    this.group.add(axisX, axisY);
  }

  private addFrame(bx: number, by: number): void {
    const t = 2;
    const top = new THREE.Mesh(new THREE.PlaneGeometry(bx * 2, t), this.frameMaterial);
    top.position.y = by;
    const bottom = new THREE.Mesh(new THREE.PlaneGeometry(bx * 2, t), this.frameMaterial);
    bottom.position.y = -by;
    const left = new THREE.Mesh(new THREE.PlaneGeometry(t, by * 2), this.frameMaterial);
    left.position.x = -bx;
    const right = new THREE.Mesh(new THREE.PlaneGeometry(t, by * 2), this.frameMaterial);
    right.position.x = bx;
    this.group.add(top, bottom, left, right);
  }

  private addLabels(bx: number, by: number, config: PlaneConfig): void {
    const spacing = config.pixelsPerUnit * config.step;
    const fmt = (n: number) => Number(n.toFixed(4)).toString();

    for (let x = spacing, u = config.step; x <= bx; x += spacing, u += config.step) {
      this.addLabelSprite(fmt(u), x, -12);
      this.addLabelSprite(fmt(-u), -x, -12);
    }
    for (let y = spacing, u = config.step; y <= by; y += spacing, u += config.step) {
      this.addLabelSprite(fmt(u), 14, y);
      this.addLabelSprite(fmt(-u), 14, -y);
    }
  }

  private addLabelSprite(text: string, x: number, y: number): void {
    const tex = this.labelTexture(text);
    const mat = new THREE.SpriteMaterial({ map: tex, transparent: true });
    const sprite = new THREE.Sprite(mat);
    sprite.position.set(x, y, 1);
    sprite.scale.set(tex.image.width, tex.image.height, 1);
    this.group.add(sprite);
  }

  private labelTexture(text: string): THREE.CanvasTexture {
    const cached = this.labelCache.get(text);
    if (cached) return cached;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    const font = "600 12px system-ui, sans-serif";
    ctx.font = font;
    const w = Math.ceil(ctx.measureText(text).width) + 12;
    const h = 15;
    canvas.width = w;
    canvas.height = h;

    // Subtle dark backing for legibility against the video feed.
    ctx.fillStyle = "rgba(0,0,0,0.45)";
    ctx.fillRect(0, 0, w, h);
    ctx.font = font;
    ctx.fillStyle = "#fff";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText(text, w / 2, h / 2 + 1);

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    this.labelCache.set(text, tex);
    return tex;
  }

  /** Dispose per-rebuild geometry/materials; keep persistent ones + cached label textures. */
  private clearGroup(): void {
    for (const child of [...this.group.children]) {
      this.group.remove(child);
      const obj = child as THREE.Mesh | THREE.LineSegments | THREE.Sprite;
      if ("geometry" in obj && obj.geometry) obj.geometry.dispose();
      const mat = (obj as THREE.Mesh).material;
      if (mat) {
        const mats = Array.isArray(mat) ? mat : [mat];
        for (const m of mats) {
          // Don't dispose shared materials; their textures (label sprites) are
          // cached and reused, so leave SpriteMaterials' maps intact too.
          if (!this.persistentMaterials.has(m)) m.dispose();
        }
      }
    }
  }
}
