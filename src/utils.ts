import { LatLngExpression } from "leaflet";
import {
  BuildingProfile,
  LostBuildingProfile,
  HistoryEntry,
  MonumentProfile,
  Period,
  SourceProfile,
  VocabularyEntry,
} from "./types/types";
import { periods } from "./data/periods";
import { buildings } from "./data/buildings";
import { monuments } from "./data/monuments";
import { lostBuildings } from "./data/lost-buildings";
import { sources } from "./data/sources";
import { vocabulary } from "./data/vocabulary";

const itemSeparator = ";";
const dateSeparator = " - ";

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

const getVocabulary = (): VocabularyEntry[] =>
  vocabulary
    .map((s: { Слово: string; Пояснення: string }) => {
      return s["Слово"]
        .split(",")
        .map((x) => x.trim())
        .filter((x) => !!x)
        .map(
          (x) =>
            ({
              word: x,
              explanation: s["Пояснення"],
            } as VocabularyEntry)
        );
    })
    .flat();
export const mappedVocabulary = getVocabulary();

const getSources = (): SourceProfile[] =>
  sources.map(
    (s: { "№": number; Назва: string; ISBN: string; Посилання?: string }) => {
      return {
        number: Number(s["№"]),
        title: s["Назва"],
        isbn: s["ISBN"],
        link: s["Посилання"],
      };
    }
  );
export const mappedSources = getSources();

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

const parseHistory = (history: string): HistoryEntry[] =>
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
        .map((x) => {
          const number = Number(x);
          return (
            mappedSources.find((s) => s.number === number) ??
            ({
              number: number,
              title: "Unknown",
            } as SourceProfile)
          );
        });
    }

    return {
      date: date,
      description: description,
      sources: sources,
    };
  });

const getBuildings = (): BuildingProfile[] =>
  buildings.map(
    (b: {
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
    }) => {
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
    }
  );
export const mappedBuildings = getBuildings();

const getMonuments = (): MonumentProfile[] =>
  monuments.map(
    (m: {
      Назва: string;
      "Стара назва"?: string;
      Збудовано: string | number;
      Зруйновано?: string | number;
      Історія?: string;
      Довгота?: number | string;
      Широта?: number | string;
    }) => {
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
    }
  );
export const mappedMonuments = getMonuments();

const getLostBuildings = (): LostBuildingProfile[] =>
  lostBuildings.map(
    (b: {
      Назва: string;
      "Стара назва"?: string;
      Збудовано: string | number;
      Зруйновано?: string | number;
      Опис?: string;
      "Архітектурний стиль"?: string;
      Історія?: string;
      Довгота?: number | string;
      Широта?: number | string;
    }) => {
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
    }
  );
export const mappedLostBuildings = getLostBuildings();
