import { LatLngBoundsExpression, LatLngTuple } from "leaflet";

export type MapSettings = {
  zoom: number;
  center: LatLngTuple;
};

export const mapBoundaries = {
  minZoom: 14,
  maxZoom: 20,
  bounds: [
    [48.595, 24.95],
    [48.505, 25.12],
  ] as LatLngBoundsExpression,
} as const;

export const kolomyiaDefault: MapSettings = {
  zoom: 16,
  center: [48.525, 25.0373],
};
