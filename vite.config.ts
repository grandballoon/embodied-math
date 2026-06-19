import { defineConfig } from "vite";

export default defineConfig({
  server: {
    // getUserMedia requires a secure context. localhost counts as secure,
    // so `npm run dev` gives you webcam access out of the box — this was
    // the whole reason for moving off the Claude artifact sandbox.
    host: "localhost",
    port: 5173,
  },
});
