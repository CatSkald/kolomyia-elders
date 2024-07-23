import { LatLngExpression } from "leaflet";

export type BuildingProfile = {
  name: string;
  date: number | string;
  description?: string;
  history?: HistoryEntry[];
  address: string;
  coordinates?: LatLngExpression;
  age?: string;
  mapLink?: string;
  markerImage: string;
};

export type HistoryEntry = {
  date: string;
  description: string;
};
