import { FeatureGroup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import BuildingMarker from "./BuildingMarker";
import { BuildingProfile } from "../types";

const MapBuilding = ({
  data,
  markerSize,
}: {
  data: BuildingProfile;
  markerSize: number;
}) => (
  <FeatureGroup>
    <BuildingMarker data={data} markerSize={markerSize} />
  </FeatureGroup>
);

export default MapBuilding;
