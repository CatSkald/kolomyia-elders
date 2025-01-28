import { FeatureGroup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import BuildingMarker from "./BuildingMarker";
import { BuildingProfile } from "../types/types";

const Building = ({
  data,
  markerSize,
  onClick,
}: {
  data: BuildingProfile;
  markerSize: number;
  onClick: () => void;
}) => {
  return (
    <FeatureGroup>
      <BuildingMarker data={data} markerSize={markerSize} onClick={onClick} />
    </FeatureGroup>
  );
};

export default Building;
