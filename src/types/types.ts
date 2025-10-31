import { LatLngExpression } from "leaflet";

export type Period = {
  name: string;
  startDate: number;
  endDate: number;
  color: string;
};

export type HistoryEntry = SourcedProfile & {
  date?: string;
  description: string;
};

export type SourceEntry = {
  number: number;
  title: string;
  isbn: string;
  link?: string;
};

export type WordDefinition = {
  id: string;
  word: string;
  definition: string;
};

export type LostProfile = {
  destroyed?: number | string;
  periodOfDestruction?: Period;
};

export type AddressProfile = {
  address: string;
  oldStreetNames?: string[];
};

export type SourcedProfile = {
  sources?: SourceEntry[];
};

export type LocationProfile = {
  name: string;
  oldNames?: string[];
  date: number | string;
  coordinates?: LatLngExpression;
  period?: Period;
};

export type BuildingProfile = LocationProfile &
  AddressProfile & {
    description?: string;
    architecture?: string;
    history?: HistoryEntry[];
  };

export type LostBuildingProfile = LocationProfile &
  LostProfile & {
    description?: string;
    architecture?: string;
    history?: HistoryEntry[];
  };

export type MonumentProfile = LocationProfile &
  LostProfile &
  SourcedProfile & {
    history?: string;
  };
