import { TileLayer, MapContainer, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Building from "./Building";
import { buildings } from "../data/buildings.ts";
import { mapBuildings } from "../utils.ts";

export default function Map() {
  return (
    <MapContainer
      center={[48.525, 25.0373]}
      zoom={16}
      minZoom={13}
      zoomControl={false}
    >
      <TileLayer
        attribution="Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community"
        url="http://services.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
      />
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
