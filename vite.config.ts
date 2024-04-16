import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import wasm from "vite-plugin-wasm";
import icons from "unplugin-icons/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    wasm(),
    icons({
      compiler: "jsx",
      jsx: "react",
      autoInstall: true,
    }),
  ],
  build: {
    target: "esnext", //browsers can handle the latest ES features
  },
  base: "/you-are-merlin-www/",
});
