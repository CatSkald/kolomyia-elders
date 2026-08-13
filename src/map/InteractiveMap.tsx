import "@maplibre/maplibre-gl-leaflet";
import * as L from "leaflet";
import "leaflet-hash";
import "leaflet/dist/leaflet.css";
import maplibregl, {
  type FilterSpecification,
  type StyleSpecification,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Protocol } from "pmtiles";
import { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, ZoomControl } from "react-leaflet";
import type { Theme } from "../themes.ts";
import { mappedBuildings } from "../utils.ts";
import BuildingsOverlay from "./BuildingsOverlay.tsx";
import { createStyle, GEOJSON_HIGHLIGHT_SOURCE_ID } from "./createStyle.ts";
import { type Filters, isBuildingVisible } from "./Filters.ts";
import { type MapSettings, mapBoundaries } from "./MapSettings.ts";

const protocol = new Protocol();
maplibregl.addProtocol("pmtiles", protocol.tile);

// Resolve asset URLs against the deployed base (vite `base: "./"`),
// so they work both at `npm run dev` and under a GitHub Pages subpath.
const BASE = new URL(import.meta.env.BASE_URL, document.baseURI)
  .toString()
  .replace(/\/$/, "");
const asset = (path: string) => `${BASE}/${path}`;

const HIGHLIGHT_LAYERS = [
  "building-highlight",
  "building-highlight-outline",
] as const;

const EMPTY_FC: GeoJSON.FeatureCollection = {
  type: "FeatureCollection",
  features: [],
};

// Suspense resource for the highlight footprints:
// loaded once when the (lazy) map chunk evaluates,
// so the shared <Loader> covers it and markers never flash at full size before hiding.
// The parsed collection is reused as inline maplibre source data, so there's no second fetch.
const highlights = (() => {
  let loaded = false;
  let value: GeoJSON.FeatureCollection = EMPTY_FC;
  const promise = fetch(asset("highlights.geojson"))
    .then((response) => response.json())
    .then(
      (geo: GeoJSON.FeatureCollection) => {
        value = geo;
        loaded = true;
      },
      () => {
        loaded = true;
      },
    );

  return {
    read(): GeoJSON.FeatureCollection {
      if (!loaded) throw promise;
      return value;
    },
  };
})();

function buildStyle(
  theme: Theme,
  highlightData: GeoJSON.FeatureCollection,
): StyleSpecification {
  const style = structuredClone(
    createStyle(theme, {
      language: "uk",
      viewport: window.innerWidth <= 768 ? "mobile" : "desktop",
    }),
  ) as StyleSpecification & {
    sources: Record<string, unknown>;
    glyphs?: string;
  };

  // Override self-hosted glyphs
  style.glyphs = asset("assets/glyphs/{fontstack}/{range}.pbf");

  // Override self-hosted tiles
  style.sources["openmaptiles"] = {
    type: "vector",
    url: `pmtiles://${asset("kolomyia.pmtiles")}`,
  };
  style.sources[GEOJSON_HIGHLIGHT_SOURCE_ID] = {
    type: "geojson",
    data: highlightData,
  };

  return style as StyleSpecification;
}

const InteractiveMap = ({
  theme,
  filters,
  mapSettings,
  onZoom,
  onMarkerSelected,
}: {
  theme: Theme;
  filters: Filters;
  mapSettings: MapSettings;
  onZoom: (zoom: number) => void;
  onMarkerSelected: (coordinates: L.LatLngTuple) => void;
}) => {
  const [map, setMap] = useState<L.Map | null>(null);
  const [tilesLayer, setTilesLayer] = useState<L.MaplibreGL | null>(null);

  // Suspends (via the shared <Loader>) until the highlight footprints are ready.
  const highlightData = highlights.read();
  const highlightedBuildingIds = useMemo(
    () =>
      new Set(
        highlightData.features
          .map((f) => f.properties?.id as string | undefined)
          .filter((id): id is string => !!id),
      ),
    [highlightData],
  );
  // Markers keyed by `coordinates.join(",")`,
  // so a click on the maplibre highlight footprint can re-fire the matching marker's click.
  const markerRegistry = useRef<Map<string, L.CircleMarker>>(new Map());

  // Latest highlight-layer filter, reapplied after every setStyle (theme swap).
  const highlightFilter = useRef<FilterSpecification | null>(null);

  const highlightIds = useMemo(
    () =>
      mappedBuildings
        .filter((b) => isBuildingVisible(b, filters))
        .map((b) => b.coordinates!.join(",")),
    [filters],
  );

  const enableCoordinatesInUrl = (map: L.Map) => {
    L.hash(map);
  };

  // Wire highlight-layer interactivity.
  // maplibre-gl-leaflet runs the GL map with `interactive: false`,
  // so MapLibre never fires its own click/hover events — Leaflet is the interaction layer.
  // We hit-test Leaflet clicks/moves into the GL map with queryRenderedFeatures,
  // and reapply the filter after theme swaps.
  useEffect(() => {
    if (!map || !tilesLayer) return;

    const mapLibreMap = tilesLayer.getMaplibreMap();
    const LAYER = "building-highlight";

    const idAt = (coordinates: L.LatLng): string | undefined => {
      if (!mapLibreMap.getLayer(LAYER)) return undefined;

      const point = mapLibreMap.project([coordinates.lng, coordinates.lat]);
      const feature = mapLibreMap.queryRenderedFeatures([point.x, point.y], {
        layers: [LAYER],
      })[0];

      return feature?.properties?.id as string | undefined;
    };

    const onClick = (e: L.LeafletMouseEvent) => {
      const id = idAt(e.latlng);
      if (id) {
        markerRegistry.current.get(id)?.fire("click");
      }
    };

    // Coalesce hover hit-testing to one queryRenderedFeatures per frame.
    let moveAnimationFrame = 0;
    let lastLatLng: L.LatLng | null = null;
    const onMove = (e: L.LeafletMouseEvent) => {
      lastLatLng = e.latlng;
      if (moveAnimationFrame) return;

      moveAnimationFrame = requestAnimationFrame(() => {
        moveAnimationFrame = 0;
        if (lastLatLng) {
          map.getContainer().style.cursor = idAt(lastLatLng) ? "pointer" : "";
        }
      });
    };

    // Detect touch devices by checking if pointer is hover-capable.
    // Used to skip the per-move hit-testing (displaying pointer cursor)
    // on touch devices where hovering is not used.
    const canHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;

    map.on("click", onClick);
    if (canHover) map.on("mousemove", onMove);

    return () => {
      map.off("click", onClick);
      if (canHover) map.off("mousemove", onMove);
      if (moveAnimationFrame) cancelAnimationFrame(moveAnimationFrame);
    };
  }, [map, tilesLayer]);

  // Keep the highlight footprints in sync with the marker filters.
  useEffect(() => {
    const filter: FilterSpecification = [
      "in",
      ["get", "id"],
      ["literal", highlightIds],
    ];
    highlightFilter.current = filter;
    if (tilesLayer) {
      const mapLibreMap = tilesLayer.getMaplibreMap();
      for (const id of HIGHLIGHT_LAYERS) {
        if (mapLibreMap.getLayer(id)) {
          mapLibreMap.setFilter(id, filter);
        }
      }
    }
  }, [tilesLayer, highlightIds]);

  useEffect(() => {
    if (!map) return;

    const style = buildStyle(theme, highlightData);

    let mapLibreMap: maplibregl.Map;
    if (!tilesLayer) {
      enableCoordinatesInUrl(map);
      const layer = L.maplibreGL({ style }).addTo(map);
      // TODO eslint error react-hooks/set-state-in-effect
      setTilesLayer(layer);
      map.setMaxBounds(mapBoundaries.bounds);
      mapLibreMap = layer.getMaplibreMap();
    } else {
      mapLibreMap = tilesLayer.getMaplibreMap();
      mapLibreMap.setStyle(style);
    }

    // Reapply the highlight filter once the (re)built style exposes the layer,
    // then detach — avoids reacting to every later tile-load styledata.
    const reapplyFilter = () => {
      if (
        !highlightFilter.current ||
        !mapLibreMap.getLayer("building-highlight")
      )
        return;

      for (const id of HIGHLIGHT_LAYERS) {
        if (mapLibreMap.getLayer(id)) {
          mapLibreMap.setFilter(id, highlightFilter.current);
        }
      }

      mapLibreMap.off("styledata", reapplyFilter);
    };
    mapLibreMap.on("styledata", reapplyFilter);

    return () => {
      mapLibreMap.off("styledata", reapplyFilter);
    };
  }, [map, tilesLayer, theme, highlightData]);

  return (
    <MapContainer
      center={mapSettings.center}
      zoom={mapSettings.zoom}
      minZoom={mapBoundaries.minZoom}
      maxZoom={mapBoundaries.maxZoom}
      zoomControl={false}
      maxBoundsViscosity={0.75}
      maxBounds={mapBoundaries.bounds}
      ref={setMap}
    >
      <ZoomControl position="topright" />
      <BuildingsOverlay
        initialZoom={mapSettings.zoom}
        onZoom={onZoom}
        filters={filters}
        onMarkerSelected={onMarkerSelected}
        markerRegistry={markerRegistry}
        highlightedIds={highlightedBuildingIds}
      />
    </MapContainer>
  );
};

export default InteractiveMap;
