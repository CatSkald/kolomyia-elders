import { LatLngBoundsExpression, LatLngTuple } from "leaflet";

export type MapSettings = {
  zoom: number;
  center: LatLngTuple;
};

export const mapBoundaries = {
  minZoom: 14,
  maxZoom: 23,
  bounds: [
    [48.6184, 24.9379],
    [48.4868, 25.1415],
  ] as LatLngBoundsExpression,
} as const;

export const kolomyiaDefault: MapSettings = {
  zoom: 16,
  center: [48.525, 25.0373],
};
