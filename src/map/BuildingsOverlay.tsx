import type { CircleMarker as LeafletCircleMarker, LatLngTuple } from "leaflet";
import type { RefObject } from "react";
import { useState } from "react";
import { FeatureGroup, useMapEvents } from "react-leaflet";
import { getMarkerSize } from "../themes";
import {
  mappedBuildings,
  mappedLostBuildings,
  mappedMonuments,
} from "../utils";
import { type Filters, isBuildingVisible, matchSearchTerm } from "./Filters";
import BuildingMarker from "./markers/BuildingMarker";
import LostBuildingMarker from "./markers/LostBuildingMarker";
import MonumentMarker from "./markers/MonumentMarker";
import { HIDE_HIGHLIGHTED_MARKER_ZOOM } from "./style/createStyle";

const BuildingsOverlay = ({
  initialZoom,
  onZoom,
  filters,
  onMarkerSelected,
  markerRegistry,
  highlightedIds,
}: {
  initialZoom: number;
  onZoom: (zoom: number) => void;
  filters: Filters;
  onMarkerSelected: (coordinates: LatLngTuple) => void;
  markerRegistry: RefObject<Map<string, LeafletCircleMarker>>;
  highlightedIds: Set<string>;
}) => {
  const [markerSize, setMarkerSize] = useState(getMarkerSize(initialZoom));
  const [zoom, setZoom] = useState(initialZoom);

  const map = useMapEvents({
    zoomend() {
      const zoom = map.getZoom();
      setMarkerSize(getMarkerSize(zoom));
      setZoom(zoom);
      onZoom(zoom);
    },
  });

  const onMarkerClick = (coordinates: LatLngTuple) => {
    const zoom = map.getZoom();
    map.setView(coordinates, zoom < 18 ? 18 : zoom);
    onMarkerSelected(coordinates);
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
              : filters.lost.find((p) => p === b.periodOfDestruction?.name)),
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
        .filter((b) => isBuildingVisible(b, filters))
        .map((b) => {
          const id = b.coordinates!.join(",");
          const hideMarker: boolean =
            zoom >= HIDE_HIGHLIGHTED_MARKER_ZOOM && highlightedIds.has(id);
          return (
            <FeatureGroup key={b.coordinates?.toString()}>
              <BuildingMarker
                data={b}
                markerSize={markerSize}
                hidden={hideMarker}
                onClick={() => onMarkerClick(b.coordinates!)}
                markerRef={(marker) => {
                  if (marker) markerRegistry.current.set(id, marker);
                  else markerRegistry.current.delete(id);
                }}
              />
            </FeatureGroup>
          );
        })}
      {filters.monuments &&
        mappedMonuments
          .filter(
            (b) =>
              !!b.coordinates &&
              (!filters.searchTerm || matchSearchTerm(b, filters)),
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
