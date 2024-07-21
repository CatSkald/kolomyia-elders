import { LatLngExpression } from "leaflet";

export type BuildingProfile = {
  name: string;
  date: number | string;
  description?: string;
  history?: string;
  address: string;
  coordinates?: LatLngExpression;
  age?: string;
  mapLink?: string;
  markerImage: string;
};
