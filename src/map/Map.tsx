import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import * as L from "leaflet";
import "leaflet-hash";
import { MapContainer, ZoomControl } from "react-leaflet";
import { latLngBounds } from "leaflet";
import BuildingsOverlay from "./BuildingsOverlay.tsx";
import {
  MaptilerLayer,
  MaptilerLayerInterface,
} from "@maptiler/leaflet-maptilersdk";
import { Theme } from "../themes.ts";
import { config } from "./MaptilerConfig.ts";
import { Filters } from "../Filters.ts";

const Map = ({ theme, filters }: { theme: Theme; filters: Filters }) => {
  const kolomyiaBounds = latLngBounds([48.6184, 24.9379], [48.4868, 25.1415]);
  const initialZoom = 16;
  const [map, setMap] = useState<L.Map | null>(null);
  const [maptiler, setMaptiler] = useState<MaptilerLayerInterface | null>(null);
  const enableCoordinatesInUrl = (map: L.Map) => {
    L.hash(map);
  };

  useEffect(() => {
    const style = theme === Theme.Dark ? config.darkStyle : config.lightStyle;
    const x = atob(config.x);
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
        setMaptiler(createMaptiler(map));
      } else {
        maptiler.setStyle(style);
      }
    }
  }, [map, maptiler, theme]);

  return (
    <MapContainer
      center={[48.525, 25.0373]}
      zoom={initialZoom}
      minZoom={14}
      zoomControl={false}
      maxBoundsViscosity={0.7}
      maxBounds={kolomyiaBounds}
      ref={setMap}
    >
      <ZoomControl position="topright" />
      <BuildingsOverlay initialZoom={initialZoom} filters={filters} />
    </MapContainer>
  );
};

export default Map;
