import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const chunkables = [
  ["buildings", "/src/data/buildings.json"], //TODO this is still too big
  ["data", "/src/data/"],
  ["mapping", "@maptiler", "leaflet"],
  ["maplibre", "maplibre"], //TODO this is still too big
];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    chunkSizeWarningLimit: 999,
    rollupOptions: {
      output: {
        manualChunks(id) {
          for (const [chunk, ...folders] of chunkables) {
            for (const folder of folders) {
              if (id.includes(folder)) return chunk;
            }
          }
        },
      },
    },
  },
  // Enable profiling:
  // resolve: {
  //   alias: [
  //     { find: /^react-dom\/client$/, replacement: "react-dom/profiling" },
  //     { find: "scheduler/tracing", replacement: "scheduler/tracing-profiling" },
  //   ],
  // },
});
