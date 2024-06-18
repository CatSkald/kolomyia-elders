import { FeatureGroup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import BuildingMarker from "./BuildingMarker";
import { LatLngExpression } from "leaflet";
import { BuildingProfile } from "./Types";

const Building = ({
  latLng,
  data,
}: {
  latLng: LatLngExpression;
  data: BuildingProfile;
}) => {
  return (
    <FeatureGroup>
      <BuildingMarker latLng={latLng} data={data} />
    </FeatureGroup>
  );
};

export default Building;
