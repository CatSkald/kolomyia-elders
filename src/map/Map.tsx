import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import * as L from "leaflet";
import "leaflet-hash";
import { MapContainer, ZoomControl } from "react-leaflet";
import BuildingsOverlay from "./BuildingsOverlay.tsx";
import {
  MaptilerLayer,
  MaptilerLayerInterface,
} from "@maptiler/leaflet-maptilersdk";
import { Theme } from "../themes.ts";
import { config } from "./MaptilerConfig.ts";
import { Filters } from "./Filters.ts";
import { mapBoundaries, MapSettings } from "./MapSettings.ts";

const x = atob(config.x);

const Map = ({
  theme,
  filters,
  mapSettings,
}: {
  theme: Theme;
  filters: Filters;
  mapSettings: MapSettings;
}) => {
  const [map, setMap] = useState<L.Map | null>(null);
  const [maptiler, setMaptiler] = useState<MaptilerLayerInterface | null>(null);
  const enableCoordinatesInUrl = (map: L.Map) => {
    L.hash(map);
  };

  useEffect(() => {
    const style = theme === Theme.Dark ? config.darkStyle : config.lightStyle;
    const createMaptiler = (map: L.Map): MaptilerLayerInterface => {
      const maptilerOptions = {
        apiKey: x,
        style: style,
      };

      const layer = new MaptilerLayer(maptilerOptions);
      layer.addTo(map);

      return layer;
    };

    if (map) {
      if (!maptiler) {
        enableCoordinatesInUrl(map);
        // TODO Investigate why
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMaptiler(createMaptiler(map));
      } else {
        maptiler.setStyle(style);
      }
    }
  }, [map, maptiler, theme]);

  return (
    <MapContainer
      center={mapSettings.center}
      zoom={mapSettings.zoom}
      minZoom={mapBoundaries.minZoom}
      maxZoom={mapBoundaries.maxZoom}
      zoomControl={false}
      maxBoundsViscosity={0.7}
      maxBounds={mapBoundaries.bounds}
      ref={setMap}
    >
      <ZoomControl position="topright" />
      <BuildingsOverlay initialZoom={mapSettings.zoom} filters={filters} />
    </MapContainer>
  );
};

export default Map;
