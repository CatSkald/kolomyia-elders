import { LatLngExpression } from "leaflet";

export type Period = {
  name: string;
  startDate: number;
  endDate: number;
  color: string;
};

export type LocationProfile = {
  name: string;
  oldNames?: string[];
  date: number | string;
  coordinates?: LatLngExpression;
  period?: Period;
};

export type BuildingProfile = LocationProfile & {
  oldStreetNames?: string[];
  description?: string;
  architecture?: string;
  history?: HistoryEntry[];
  address: string;
};

export type MonumentProfile = LocationProfile & {
  destroyed?: number | string;
  history?: string;
};

export type LostBuildingProfile = LocationProfile & {
  destroyed?: number | string;
  architecture?: string;
  description?: string;
  history?: HistoryEntry[];
};

export type HistoryEntry = {
  date?: string;
  description: string;
  sources?: SourceProfile[];
};

export type SourceProfile = {
  number: number;
  title: string;
  isbn: string;
  link?: string;
};

export type VocabularyEntry = {
  word: string;
  explanation: string;
};
