import { useState } from "react";
import { FeatureGroup, useMapEvents } from "react-leaflet";
import { mapBuildings, mapMonuments } from "../utils";
import { buildings } from "../data/buildings";
import { getMarkerSize } from "../themes";
import { LatLngExpression } from "leaflet";
import BuildingMarker from "./BuildingMarker";
import { monuments } from "../data/monuments";
import MonumentMarker from "./MonumentMarker";
import { Filters } from "../Filters";

const BuildingsOverlay = ({
  initialZoom,
  filters,
}: {
  initialZoom: number;
  filters: Filters;
}) => {
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
        .filter(
          (b) =>
            !!b.coordinates &&
            ((filters.unknown && !b.period) ||
              filters.periods.find((p) => p.name === b.period?.name))
        )
        .map((b) => (
          <FeatureGroup key={b.coordinates?.toString()}>
            <BuildingMarker
              data={b}
              markerSize={markerSize}
              onClick={() => onMarkerClick(b.coordinates!)}
            />
          </FeatureGroup>
        ))}
      {filters.monuments &&
        mapMonuments(monuments)
          .filter((b) => !!b.coordinates)
          .map((b) => (
            <FeatureGroup key={b.coordinates?.toString()}>
              <MonumentMarker
                data={b}
                markerSize={markerSize}
                onClick={() => onMarkerClick(b.coordinates!)}
              />
            </FeatureGroup>
          ))}
    </>
  );
};

export default BuildingsOverlay;
