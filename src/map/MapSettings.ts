import { LatLngBoundsExpression, LatLngExpression } from "leaflet";

export type MapSettings = {
  minZoom: number;
  zoom: number;
  center: LatLngExpression;
  bounds: LatLngBoundsExpression;
};

export const kolomyiaDefault: MapSettings = {
  minZoom: 14,
  zoom: 16,
  center: [48.525, 25.0373],
  bounds: [
    [48.6184, 24.9379],
    [48.4868, 25.1415],
  ],
};
