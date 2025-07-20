import { LatLngExpression } from "leaflet";
import {
  BuildingProfile,
  LostBuildingProfile,
  HistoryEntry,
  MonumentProfile,
  Period,
  SourceProfile,
} from "./types/types";
import { periods } from "./data/periods";

const itemSeparator = ";";
const dateSeparator = " - ";

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
  parseArray(history, itemSeparator)!.map((h) => {
    const noDateMarker = "? - ";
    const sourceMarker = "[";
    let date = undefined;
    let description = h.replaceAll(" - ", " — ").replaceAll("\\", "\n");
    let sources = undefined;
    if (h.startsWith(noDateMarker)) {
      description = description.slice(noDateMarker.length).trim();
    } else {
      const dateEndIndex = h.indexOf(dateSeparator);
      if (dateEndIndex !== -1) {
        date = description.slice(0, dateEndIndex).trim() || undefined;
        description = description
          .slice(dateEndIndex + dateSeparator.length)
          .trim();
      }
    }

    if (description.indexOf(sourceMarker) !== -1) {
      const all = description.split("[");
      description = all[0];
      sources = all[1]
        .slice(0, -1)
        .split(",")
        .map((x) => Number(x));
    }

    return {
      date: date,
      description: description,
      sources: sources,
    };
  });

export const mapBuildings = (
  buildings: Array<{
    Назва: string;
    "Стара назва"?: string;
    "Старі назви вулиці"?: string;
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
      oldNames: parseArray(b["Стара назва"], itemSeparator)?.map((x) =>
        x.replaceAll(" - ", " — ")
      ),
      oldStreetNames: parseArray(b["Старі назви вулиці"], itemSeparator)?.map(
        (x) => x.replaceAll(" - ", " — ")
      ),
      date: cleanDate(b["Дата"])!,
      description: b["Опис"],
      architecture: b["Архітектурний стиль"],
      history: history ? parseHistory(history) : undefined,
      period: getPeriod(date),
      address: b["Адреса"],
      coordinates: coordinates,
    };
  });

export const mapMonuments = (
  monuments: Array<{
    Назва: string;
    "Стара назва"?: string;
    Збудовано: string | number;
    Зруйновано?: string | number;
    Історія?: string;
    Довгота?: number | string;
    Широта?: number | string;
  }>
): MonumentProfile[] =>
  monuments.map((m) => {
    const date = m["Збудовано"];
    const lat = m["Широта"] as number | undefined;
    const lan = m["Довгота"] as number | undefined;
    const coordinates: LatLngExpression | undefined =
      lat && lan ? [lat, lan] : undefined;

    return {
      name: m["Назва"],
      oldNames: parseArray(m["Стара назва"], itemSeparator),
      date: cleanDate(date)!,
      destroyed: cleanDate(m["Зруйновано"]),
      history: m["Історія"],
      period: getPeriod(date),
      coordinates: coordinates,
    };
  });

export const mapLostBuildings = (
  buildings: Array<{
    Назва: string;
    "Стара назва"?: string;
    Збудовано: string | number;
    Зруйновано?: string | number;
    Опис?: string;
    "Архітектурний стиль"?: string;
    Історія?: string;
    Довгота?: number | string;
    Широта?: number | string;
  }>
): LostBuildingProfile[] =>
  buildings.map((b) => {
    const history = b["Історія"];
    const date = b["Збудовано"];
    const lat = b["Широта"] as number | undefined;
    const lan = b["Довгота"] as number | undefined;
    const coordinates: LatLngExpression | undefined =
      lat && lan ? [lat, lan] : undefined;

    return {
      name: b["Назва"],
      oldNames: parseArray(b["Стара назва"], itemSeparator),
      date: cleanDate(date)!,
      destroyed: cleanDate(b["Зруйновано"]),
      description: b["Опис"],
      architecture: b["Архітектурний стиль"],
      history: history ? parseHistory(history) : undefined,
      period: getPeriod(date),
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

const cleanDate = (date?: string | number): string | number | undefined =>
  typeof date === "number" ? date : date?.replaceAll(dateSeparator, "—");

const parseArray = (
  value: string | undefined,
  delimiter: string
): string[] | undefined => {
  const result = value
    ?.split(delimiter)
    .map((s) => s.trim())
    .filter((s) => !!s);
  return result?.length ? result : undefined;
};
