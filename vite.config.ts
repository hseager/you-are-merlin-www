import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import wasm from "vite-plugin-wasm";
// import topLevelAwait from "vite-plugin-top-level-await";

// TODO topLevelAwait() not working with bun

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), wasm()],
  build: {
    target: "esnext", //browsers can handle the latest ES features
  },
});
