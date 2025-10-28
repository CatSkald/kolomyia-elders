import { useState } from "react";
import { FeatureGroup, useMapEvents } from "react-leaflet";
import {
  mappedBuildings,
  mappedLostBuildings,
  mappedMonuments,
} from "../utils";
import { getMarkerSize } from "../themes";
import { LatLngExpression } from "leaflet";
import BuildingMarker from "./BuildingMarker";
import MonumentMarker from "./MonumentMarker";
import { Filters, matchSearchTerm } from "../Filters";
import LostBuildingMarker from "./LostBuildingMarker";

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
      {mappedLostBuildings
        .filter(
          (b) =>
            !!b.coordinates &&
            !!b.periodOfDestruction &&
            (filters.searchTerm
              ? matchSearchTerm(b, filters)
              : filters.lost.find(
                  (p) => p.name === b.periodOfDestruction?.name
                ))
        )
        .map((b) => (
          <FeatureGroup key={b.coordinates?.toString()}>
            <LostBuildingMarker
              data={b}
              markerSize={markerSize}
              onClick={() => onMarkerClick(b.coordinates!)}
            />
          </FeatureGroup>
        ))}
      {mappedBuildings
        .filter(
          (b) =>
            !!b.coordinates &&
            (filters.searchTerm
              ? matchSearchTerm(b, filters)
              : (filters.unknown && !b.period) ||
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
        mappedMonuments
          .filter(
            (b) =>
              !!b.coordinates &&
              (!filters.searchTerm || matchSearchTerm(b, filters))
          )
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
