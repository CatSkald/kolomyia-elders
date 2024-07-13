import { FeatureGroup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import BuildingMarker from "./BuildingMarker";
import { BuildingProfile } from "../types";

const Building = ({ data }: { data: BuildingProfile }) => {
  return (
    <FeatureGroup>
      <BuildingMarker data={data} />
    </FeatureGroup>
  );
};

export default Building;
