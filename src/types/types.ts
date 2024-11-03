import { LatLngExpression } from "leaflet";

export type Period = {
  startDate: number;
  endDate: number;
  color: string;
};

export type BuildingProfile = {
  name: string;
  date: number | string;
  description?: string;
  history?: HistoryEntry[];
  address: string;
  coordinates?: LatLngExpression;
  period?: Period;
  mapLink?: string;
};

export type HistoryEntry = {
  date: string;
  description: string;
};

export type SourceProfile = {
  title: string;
  isbn: string;
  link?: string;
};
