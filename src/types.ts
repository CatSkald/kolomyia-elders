import { LatLngExpression } from "leaflet";

export type BuildingProfile = {
  name: string;
  date: number | string;
  address: string;
  coordinates?: LatLngExpression;
  age?: string;
  link?: string;
  markerImage: string;
};
