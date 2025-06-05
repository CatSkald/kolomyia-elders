import { LatLngExpression } from "leaflet";

export type Period = {
  startDate: number;
  endDate: number;
  color: string;
};

export type BuildingProfile = {
  name: string;
  oldNames?: string[];
  oldStreetNames?: string[];
  date: number | string;
  description?: string;
  architecture?: string;
  history?: HistoryEntry[];
  address: string;
  coordinates?: LatLngExpression;
  period?: Period;
};

export type MonumentProfile = {
  name: string;
  oldNames?: string[];
  date: number | string;
  destroyed?: number | string;
  history?: string;
  coordinates?: LatLngExpression;
  period?: Period;
};

export type HistoryEntry = {
  date?: string;
  description: string;
};

export type SourceProfile = {
  title: string;
  isbn: string;
  link?: string;
};
