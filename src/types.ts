import { LatLngExpression } from "leaflet";

export enum Age {
  Ancient = "ancient",
  Elder = "elder",
  Antique = "antique",
  Venerable = "venerable",
  Vintage = "vintage",
}

export type BuildingProfile = {
  name: string;
  date: number | string;
  description?: string;
  history?: HistoryEntry[];
  address: string;
  coordinates?: LatLngExpression;
  age?: Age;
  mapLink?: string;
  color: string;
};

export type HistoryEntry = {
  date: string;
  description: string;
};

export enum Theme {
  Light = "light",
  Dark = "dark",
}

export type SourceProfile = {
  title: string;
  isbn: string;
  link?: string;
};
