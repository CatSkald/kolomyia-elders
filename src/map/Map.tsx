import { TileLayer, MapContainer, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Building from "./Building";
import { buildings } from "../data/buildings.ts";
import { mapBuildings } from "../utils.ts";
import { latLngBounds } from "leaflet";

export default function Map() {
  const kolomyiaBounds = latLngBounds([48.6184, 24.9379], [48.4868, 25.1415]);

  return (
    <MapContainer
      center={[48.525, 25.0373]}
      zoom={16}
      minZoom={13}
      zoomControl={false}
      maxBoundsViscosity={0.7}
      maxBounds={kolomyiaBounds}
    >
      <TileLayer url="http://services.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}" />
      <ZoomControl position="topright" />
      <>
        {mapBuildings(buildings)
          .filter((b) => !!b.coordinates)
          .map((b) => (
            <Building data={b} />
          ))}
      </>
    </MapContainer>
  );
}
