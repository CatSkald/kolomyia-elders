import { useState } from "react";
import { useMapEvents } from "react-leaflet";
import { mapBuildings } from "../utils";
import { buildings } from "../data/buildings";
import Building from "./Building";
import { getMarkerSize } from "../themes";
import { LatLngExpression } from "leaflet";

const BuildingsOverlay = ({ initialZoom }: { initialZoom: number }) => {
  const [markerSize, setMarkerSize] = useState(getMarkerSize(initialZoom));

  const map = useMapEvents({
    zoomend() {
      setMarkerSize(getMarkerSize(map.getZoom()));
    },
  });

  const onMarkerClick = (coordinates: LatLngExpression) => {
    const zoom = map.getZoom();
    map.setView(coordinates, zoom < 18 ? 18 : zoom);
  };

  return (
    <>
      {mapBuildings(buildings)
        .filter((b) => !!b.coordinates)
        .map((b) => (
          <Building
            data={b}
            markerSize={markerSize}
            onClick={() => onMarkerClick(b.coordinates!)}
          />
        ))}
    </>
  );
};

export default BuildingsOverlay;
