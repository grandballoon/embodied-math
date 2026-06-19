import * as THREE from "three";
import type { ViewportSize } from "../core/coordinates.ts";

/**
 * The Three.js renderer and orthographic camera.
 *
 * The camera spans -w/2..+w/2 horizontally and -h/2..+h/2 vertically, so world
 * units equal screen pixels and (0,0) is the screen center with +y up. This is
 * the math-convention setup every future transformation will rely on.
 */
export class SceneRenderer {
  readonly scene = new THREE.Scene();
  readonly camera: THREE.OrthographicCamera;
  private readonly renderer: THREE.WebGLRenderer;

  constructor(canvas: HTMLCanvasElement, viewport: ViewportSize) {
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true, // transparent background so the webcam shows through
      antialias: true,
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const { width, height } = viewport;
    this.camera = new THREE.OrthographicCamera(
      -width / 2,
      width / 2,
      height / 2,
      -height / 2,
      -100,
      100,
    );
    this.resize(viewport);
  }

  resize(viewport: ViewportSize): void {
    const { width, height } = viewport;
    this.renderer.setSize(width, height, false);
    this.camera.left = -width / 2;
    this.camera.right = width / 2;
    this.camera.top = height / 2;
    this.camera.bottom = -height / 2;
    this.camera.updateProjectionMatrix();
  }

  render(): void {
    this.renderer.render(this.scene, this.camera);
  }
}
