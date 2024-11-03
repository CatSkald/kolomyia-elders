import { FeatureGroup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import BuildingMarker from "./BuildingMarker";
import { BuildingProfile } from "../types/types";

const Building = ({
  data,
  markerSize,
}: {
  data: BuildingProfile;
  markerSize: number;
}) => {
  return (
    <FeatureGroup>
      <BuildingMarker data={data} markerSize={markerSize} />
    </FeatureGroup>
  );
};

export default Building;
