import { TileLayer, MapContainer, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { latLngBounds } from "leaflet";
import BuildingsOverlay from "./BuildingsOverlay.tsx";

export default function Map() {
  const kolomyiaBounds = latLngBounds([48.6184, 24.9379], [48.4868, 25.1415]);
  const initialZoom = 16;
  return (
    <MapContainer
      center={[48.525, 25.0373]}
      zoom={initialZoom}
      minZoom={13}
      zoomControl={false}
      maxBoundsViscosity={0.7}
      maxBounds={kolomyiaBounds}
    >
      <TileLayer url="http://services.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}" />
      <ZoomControl position="topright" />
      <BuildingsOverlay initialZoom={initialZoom} />
    </MapContainer>
  );
}
