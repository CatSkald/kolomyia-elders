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

const Map = ({ theme }: { theme: Theme }) => {
  const kolomyiaBounds = latLngBounds([48.6184, 24.9379], [48.4868, 25.1415]);
  const initialZoom = 16;
  const [map, setMap] = useState<L.Map | null>(null);
  const [maptiler, setMaptiler] = useState<MaptilerLayerInterface | null>(null);
  const enableCoordinatesInUrl = (map: L.Map) => {
    L.hash(map);
  };
  const x = atob(config.x);

  const getStyle = (theme: Theme, x: string) =>
    theme === Theme.Dark
      ? `${config.darkStyle}?key=${x}`
      : `${config.lightStyle}?key=${x}`;

  useEffect(() => {
    const enableMaptiler = (map: L.Map) => {
      const maptilerOptions = {
        apiKey: x,
        style: getStyle(theme, x),
      };

      const layer = new MaptilerLayer(maptilerOptions);
      layer.addTo(map);
      setMaptiler(layer);
    };
    if (map) {
      enableCoordinatesInUrl(map);
      enableMaptiler(map);
    }
  }, [map, theme, x]);

  useEffect(() => {
    const style = getStyle(theme, x);
    maptiler?.setStyle(style);
  }, [maptiler, theme, x]);

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
      <BuildingsOverlay initialZoom={initialZoom} />
    </MapContainer>
  );
};

export default Map;
