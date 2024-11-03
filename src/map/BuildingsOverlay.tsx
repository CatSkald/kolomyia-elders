import { useState } from "react";
import { useMapEvents } from "react-leaflet";
import { mapBuildings } from "../utils";
import { buildings } from "../data/buildings";
import Building from "./Building";
import { getMarkerSize } from "../themes";

const BuildingsOverlay = ({ initialZoom }: { initialZoom: number }) => {
  const [markerSize, setMarkerSize] = useState(getMarkerSize(initialZoom));

  const map = useMapEvents({
    zoomend() {
      setMarkerSize(getMarkerSize(map.getZoom()));
    },
  });

  return (
    <>
      {mapBuildings(buildings)
        .filter((b) => !!b.coordinates)
        .map((b) => (
          <Building data={b} markerSize={markerSize} />
        ))}
    </>
  );
};

export default BuildingsOverlay;
