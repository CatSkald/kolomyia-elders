import { LatLngExpression } from "leaflet";
import {
  BuildingProfile,
  HistoryEntry,
  Period,
  SourceProfile,
} from "./types/types";
import { periods } from "./data/periods";

export const getPeriod = (date: string | number): Period | undefined => {
  let year = undefined;
  if (typeof date === "number") year = date;
  else if (date.includes("II пол. XVIII ст.")) year = 1751;
  else if (date.includes("кін. XVIII ст.")) year = 1800;
  else if (date.includes("XVIII ст.")) year = 1701;
  else if (date.includes("II пол. XIX ст.")) year = 1851;
  else if (date.includes("кін. XIX ст.")) year = 1900;
  else if (date.includes("XIX ст.")) year = 1801;
  else if (date.includes("XX ст.")) year = 1901;
  else if (date.includes("-ті") || date.includes("-х"))
    year = parseInt(date.split("-")[0].slice(-4));
  else if (date.startsWith("після"))
    year = 1 + parseInt(date.split(" ")[1].substring(0, 4));

  if (!year) return undefined;
  return periods.find((p) => p.startDate <= year && p.endDate >= year);
};

export const parseHistory = (history: string): HistoryEntry[] =>
  history
    .split(";")
    .filter((h) => !!h)
    .map((h) => {
      const parts = h.trim().split(" - ");
      return {
        date: parts[0],
        description: parts[1],
      };
    });

export const mapBuildings = (
  buildings: Array<{
    Назва: string;
    Дата: string | number;
    Опис?: string;
    "Архітектурний стиль"?: string;
    Історія?: string;
    Адреса: string;
    Довгота?: number | string;
    Широта?: number | string;
  }>
): BuildingProfile[] =>
  buildings.map((b) => {
    const date = b["Дата"];
    const history = b["Історія"];
    const lat = b["Широта"] as number | undefined;
    const lan = b["Довгота"] as number | undefined;
    const coordinates: LatLngExpression | undefined =
      lat && lan ? [lat, lan] : undefined;

    return {
      name: b["Назва"],
      date: typeof date === "number" ? date : date.replace(" - ", "—"),
      description: b["Опис"],
      architecture: b["Архітектурний стиль"],
      history: history ? parseHistory(history) : undefined,
      period: getPeriod(date),
      address: b["Адреса"],
      coordinates: coordinates,
    };
  });

export const mapSources = (
  sources: Array<{
    Назва: string;
    ISBN: string;
    Посилання?: string;
  }>
): SourceProfile[] =>
  sources.map((s) => {
    return {
      title: s["Назва"],
      isbn: s["ISBN"],
      link: s["Посилання"],
    };
  });
