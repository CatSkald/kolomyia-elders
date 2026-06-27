import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import { useEffect, useState } from "react";
import "leaflet-hash";
import maplibregl from "maplibre-gl";
import "@maplibre/maplibre-gl-leaflet";
import { colorful, eclipse } from "@versatiles/style";
import { Protocol } from "pmtiles";
import { MapContainer, ZoomControl } from "react-leaflet";
import { Theme } from "../themes.ts";
import BuildingsOverlay from "./BuildingsOverlay.tsx";
import type { Filters } from "./Filters.ts";
import { type MapSettings, mapBoundaries } from "./MapSettings.ts";

const protocol = new Protocol();
maplibregl.addProtocol("pmtiles", protocol.tile);

const PMTILES_URL = "pmtiles:///tiles/kolomyia.pmtiles";
const GLYPHS_URL =
  "https://tiles.versatiles.org/assets/glyphs/{fontstack}/{range}.pbf";

function buildStyle(theme: Theme) {
  const base =
    theme === Theme.Dark
      ? eclipse({ glyphs: GLYPHS_URL })
      : colorful({ glyphs: GLYPHS_URL });

  // @versatiles/style sets a `tiles` array on the vector source; PMTiles
  // requires a `url` property pointing to the .pmtiles file instead.
  const sources = Object.fromEntries(
    Object.entries(base.sources as Record<string, { type?: string }>).map(
      ([key, src]) =>
        src.type === "vector"
          ? [key, { type: "vector", url: PMTILES_URL }]
          : [key, src],
    ),
  );
  return { ...base, sources };
}

// biome-ignore lint/suspicious/noShadowRestrictedNames: Map is a sound name
const Map = ({
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

  const enableCoordinatesInUrl = (map: L.Map) => {
    L.hash(map);
  };

  useEffect(() => {
    const style = buildStyle(theme);

    if (map) {
      if (!tilesLayer) {
        enableCoordinatesInUrl(map);
        const layer = L.maplibreGL({ style }).addTo(map);
        // TODO eslint error react-hooks/set-state-in-effect
        setTilesLayer(layer);
        map.setMaxBounds(mapBoundaries.bounds);
      } else {
        tilesLayer.getMaplibreMap().setStyle(style);
      }
    }
  }, [map, tilesLayer, theme]);

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
      />
    </MapContainer>
  );
};

export default Map;
