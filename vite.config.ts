import react from "@vitejs/plugin-react";
import license from "rollup-plugin-license";
import { defineConfig } from "vite";

function manualChunks(id: string): string | undefined {
  if (id.includes("/src/data/buildings.json")) return "buildings";
  if (id.includes("/src/data/")) return "data";

  if (id.includes("node_modules")) {
    // `@maplibre/maplibre-gl-leaflet` bridges both libraries. 
    // Keeping it with maplibre makes the dependency one-directional 
    // (maplibre -> leaflet) and avoids the circular chunk warning.
    // Order matters: match maplibre first.
    if (id.includes("maplibre")) return "maplibre";
    if (id.includes("leaflet")) return "leaflet";
  }

  return undefined;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    // maplibre-gl is an irreducible ~1 MB WebGL renderer,
    // already code-split into its own async chunk 
    // loaded only on the map view (gzip ~285 kB).
    chunkSizeWarningLimit: 1100,
    rollupOptions: {
      output: {
        manualChunks,
      },
      // Emit notices for the deps that actually end up in the bundle (excl. dev-only)
      plugins: [
        license({
          thirdParty: {
            output: { file: "dist/THIRD-PARTY-LICENSES.txt" },
          },
        }),
      ],
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
