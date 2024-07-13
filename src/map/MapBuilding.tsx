import { FeatureGroup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import BuildingMarker from "./BuildingMarker";
import { BuildingProfile } from "../types";

const MapBuilding = ({ data }: { data: BuildingProfile }) => (
  <FeatureGroup>
    <BuildingMarker data={data} />
  </FeatureGroup>
);

export default MapBuilding;
