/**
 * Webcam setup. Requests getUserMedia and binds the stream to the <video>.
 *
 * The mirroring is handled in CSS (transform: scaleX(-1) on #webcam), not
 * here — this module just supplies pixels. Mirroring is a display concern and
 * the coordinate system already knows about it via its `mirrored` flag.
 */

export async function startWebcam(video: HTMLVideoElement): Promise<void> {
  if (!navigator.mediaDevices?.getUserMedia) {
    throw new Error(
      "getUserMedia is unavailable. Serve over https or localhost (npm run dev).",
    );
  }

  const stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
    audio: false,
  });

  video.srcObject = stream;
  await video.play();
}
