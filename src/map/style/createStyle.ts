import type {
  DataDrivenPropertyValueSpecification,
  ExpressionSpecification,
  LayerSpecification,
  StyleSpecification,
} from "maplibre-gl";
import { MapStyle, mapStyleDark, mapStyleLight } from "../../themes.ts";
import { Theme } from "../../themes.ts";

export type CreateStyleOptions = {
  language?: string;
  source?: string;
  glyphs?: string;
  viewport?: "mobile" | "desktop";
};

const DEFAULT_SOURCE = "openmaptiles";

export const GEOJSON_HIGHLIGHT_SOURCE_ID = "highlights";

// Building-highlight tuning (revisit when migrating OMT → Shortbread):
// Single place for the knobs that couple the highlight to the base map.
// On a tile-schema change, re-check these against where the base map draws buildings
// and house numbers (Shortbread's `buildings`/`addresses` differ from OMT).
//
// Two zoom conventions are in play:
// MapLibre uses 512px tiles; Leaflet (via maplibre-gl-leaflet) is offset by +1.
// The style values below are MapLibre zooms;
// HIDE_HIGHLIGHTED_MARKER_ZOOM is a Leaflet zoom (from map.getZoom())
// and is intentionally +1 so it lines up with the same visual moment.
export const HIGHLIGHT_MIN_ZOOM = 17; // MapLibre zoom the highlight turns on
// Edge-mask/separator stroke width ramp: [zoom, width, zoom, width].
export const HIGHLIGHT_OUTLINE_WIDTH: [number, number, number, number] = [
  17, 1.5, 22, 15,
];
// Leaflet zoom at which the footprint takes over and its marker goes transparent
// (kept rendered so footprint clicks still re-fire it).
export const HIDE_HIGHLIGHTED_MARKER_ZOOM = 18;

// One language-resolution rule shared by every label layer:
// prefer the requested localized name,
// then fall back through the raw `name`,
// then legacy `name:latin`.
// After the tiles are regenerated with the updated Lua
// (primary label under `name`, plus `name:uk`/`name:en` where tagged),
// `uk` resolves to `name` and other langs to their `name:<lang>`.
// `name:latin` stays only as a fallback for old tiles.
function nameField(lang: string): ExpressionSpecification {
  return [
    "coalesce",
    ["get", `name:${lang}`],
    ["get", "name"],
    ["get", "name:latin"],
  ];
}

function widthRamp(
  [minZoomWidth, maxZoomWidth]: [number, number],
  minZoom: number = 14,
  maxZoom: number = 20,
): DataDrivenPropertyValueSpecification<number> {
  return [
    "interpolate",
    ["exponential", 1.5],
    ["zoom"],
    minZoom,
    minZoomWidth,
    maxZoom,
    maxZoomWidth,
  ];
}

export function createStyle(
  theme: Theme,
  options: CreateStyleOptions = {},
): StyleSpecification {
  const mapStyle: MapStyle =
    theme === Theme.Dark ? mapStyleDark : mapStyleLight;
  const {
    viewport = "mobile",
    language = "uk",
    source = DEFAULT_SOURCE,
    glyphs = "",
  } = options;
  const text = nameField(language);
  const isMobile = viewport === "mobile";

  // https://maplibre.org/maplibre-style-spec/layers
  const layers: LayerSpecification[] = [
    {
      id: "background",
      type: "background",
      paint: { "background-color": mapStyle.background },
    },
    {
      id: "water",
      type: "fill",
      source,
      "source-layer": "water",
      paint: { "fill-color": mapStyle.water.fill, "fill-antialias": true },
    },
    {
      id: "waterway",
      type: "line",
      source,
      "source-layer": "waterway",
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": mapStyle.water.waterway,
        "line-width": widthRamp([2, 26]),
      },
    },
    {
      id: "roads",
      type: "line",
      source,
      "source-layer": "transportation",
      filter: ["!=", ["get", "class"], "rail"],
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": mapStyle.road.line,
        "line-width": widthRamp([2, 26]),
      },
    },
    {
      id: "rail",
      type: "line",
      source,
      "source-layer": "transportation",
      filter: ["==", ["get", "class"], "rail"],
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": mapStyle.rail.line,
        "line-width": widthRamp([1, 22]),
        "line-dasharray": [5, 1, 2, 1],
      },
    },
    {
      id: "building",
      type: "fill",
      source,
      "source-layer": "building",
      paint: {
        "fill-color": mapStyle.building.fill,
        // fill-outline-color on the building layer can't be made thicker.
        // It's a known MapLibre/Mapbox GL limitation:
        // outline width on fill layers is fixed at ~1px regardless of paint values,
        // and it doesn't antialias well at higher device pixel ratios.
        // If we want it to read clearly at zoom 20+
        // we'll need a companion line layer on the same source-layer
        // with a real line-width ramp, rather than relying on fill-outline-color.
        "fill-outline-color": mapStyle.building.outline,
      },
    },
    {
      // Buildings of interest, colored by period.
      // Geometry comes from the build-time spatial join (tools/enrich-buildings.ts);
      // the `highlights` source data is injected in Map.tsx.
      id: "building-highlight",
      type: "fill",
      source: GEOJSON_HIGHLIGHT_SOURCE_ID,
      minzoom: HIGHLIGHT_MIN_ZOOM,
      paint: {
        "fill-color": ["get", "color"],
        "fill-outline-color": mapStyle.building.outline,
      },
    },
    {
      // Background-colored stroke that both masks the grey base-building sliver
      // (from OSM footprint vs. tiled geometry misalignment)
      // and separates adjacent highlighted buildings from each other.
      id: "building-highlight-outline",
      type: "line",
      source: GEOJSON_HIGHLIGHT_SOURCE_ID,
      minzoom: HIGHLIGHT_MIN_ZOOM,
      paint: {
        "line-color": mapStyle.background,
        "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          ...HIGHLIGHT_OUTLINE_WIDTH,
        ],
      },
    },
    {
      id: "boundary",
      type: "line",
      source,
      "source-layer": "boundary",
      maxzoom: 18,
      paint: {
        "line-color": mapStyle.boundary.line,
        "line-width": 1,
        "line-dasharray": [2, 1],
      },
    },
    {
      id: "water_name",
      type: "symbol",
      source,
      "source-layer": "water_name",
      minzoom: 16,
      layout: {
        "symbol-placement": "line",
        "text-field": text,
        "text-font": ["Philosopher Italic"],
        "text-size": widthRamp([isMobile ? 15 : 12, isMobile ? 33 : 28], 16),
        "text-overlap": "never",
        "text-padding": 2,
      },
      paint: {
        "text-color": mapStyle.water.text,
        "text-halo-color": mapStyle.label.halo,
        "text-halo-width": widthRamp([1, 2]),
        "text-halo-blur": 0.6,
      },
    },
    {
      id: "transportation_name",
      type: "symbol",
      source,
      "source-layer": "transportation_name",
      minzoom: 16,
      layout: {
        "symbol-placement": "line",
        "text-field": text,
        "text-font": ["Philosopher Regular"],
        "text-size": widthRamp([isMobile ? 16 : 13, isMobile ? 36 : 30], 16),
        "text-overlap": "never",
        "text-padding": 2,
      },
      paint: {
        "text-color": mapStyle.label.text,
        "text-halo-color": mapStyle.label.halo,
        "text-halo-width": widthRamp([1, 2]),
        "text-halo-blur": 0.6,
      },
    },
    {
      id: "housenumber",
      type: "symbol",
      source,
      "source-layer": "housenumber",
      minzoom: 17,
      layout: {
        "text-field": ["get", "housenumber"],
        "text-font": ["Philosopher Bold"],
        "text-size": widthRamp([isMobile ? 18 : 14, isMobile ? 40 : 25], 17),
        "text-overlap": "always",
        "text-padding": 2,
      },
      paint: {
        "text-color": mapStyle.buildingNumber.text,
        "text-halo-color": mapStyle.buildingNumber.halo,
        "text-halo-width": 0.2,
        "text-halo-blur": 0.9,
      },
    },
    {
      id: "place",
      type: "symbol",
      source,
      "source-layer": "place",
      maxzoom: 16,
      layout: {
        "text-field": text,
        "text-font": ["Philosopher Bold"],
        "text-size": widthRamp([25, 175]),
        "text-overlap": "cooperative",
        "symbol-sort-key": ["coalesce", ["get", "rank"], 100],
        "text-padding": 2,
      },
      paint: {
        "text-color": mapStyle.label.text,
        "text-halo-color": mapStyle.label.halo,
        "text-halo-width": widthRamp([1, 4]),
        "text-halo-blur": 0.6,
      },
    },
  ];

  return {
    version: 8,
    name: "kolomyia-elders",
    glyphs,
    sources: {
      [source]: { type: "vector", url: "" },
      [GEOJSON_HIGHLIGHT_SOURCE_ID]: {
        type: "geojson",
        data: { type: "FeatureCollection", features: [] },
      },
    },
    layers,
  };
}
