import { LatLngExpression } from "leaflet";
import {
  BuildingProfile,
  LostBuildingProfile,
  HistoryEntry,
  MonumentProfile,
  Period,
  SourceEntry,
  VocabularyEntry,
} from "./types/types";
import { periods, periodsOfDestruction } from "./data/periods";

import buildings from "./data/buildings.json";
import lostBuildings from "./data/lost-buildings.json";
import monuments from "./data/monuments.json";
import sources from "./data/sources.json";
import vocabulary from "./data/vocabulary.json";

const itemSeparator = ";";
const dateSeparator = " - ";
const dashToClean = " - ";
const newLineToClean = "\\";

//TODO second part of date is not bold
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

const getSources = (): SourceEntry[] =>
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

export const getPeriod = (
  periods: Period[],
  date?: string | number
): Period | undefined => {
  let year = undefined;
  if (!date) return undefined;
  else if (typeof date === "number") year = date;
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

const cleanText = (text?: string): string => {
  if (!text) return "";

  return text
    .replaceAll(dashToClean, " — ")
    .replaceAll(newLineToClean, "\n")
    .replace(/(\s?<\d+>)/, "") //TODO implement vocabulary
    .trim();
};

const parseSources = (
  text: string
): {
  hasSources: boolean;
  sourcedText: string | undefined;
  sources: SourceEntry[] | undefined;
} => {
  const sourceMarker = "[";
  const hasSources = text.indexOf(sourceMarker) !== -1;
  let sources = undefined;
  let sourcedText = undefined;

  if (hasSources) {
    const all = text.split("[");
    sourcedText = all[0];
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
          } as SourceEntry)
        );
      });
  }

  return { hasSources, sourcedText, sources };
};

const parseHistory = (history: string): HistoryEntry[] =>
  parseArray(history, itemSeparator)!.map((h) => {
    const noDateMarker = "? - ";
    let date = undefined;
    let description = cleanText(h);
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

    const { sourcedText, sources } = parseSources(description);

    return {
      date: date,
      description: sourcedText ?? description,
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
        name: cleanText(b["Назва"]),
        oldNames: parseArray(b["Стара назва"], itemSeparator)?.map(cleanText),
        oldStreetNames: parseArray(b["Старі назви вулиці"], itemSeparator)?.map(
          cleanText
        ),
        date: cleanDate(b["Дата"])!,
        description: cleanText(b["Опис"]),
        architecture: b["Архітектурний стиль"],
        history: history ? parseHistory(history) : undefined,
        period: getPeriod(periods, date),
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

      const history = m["Історія"];
      const { sourcedText, sources } = parseSources(history ?? "");

      return {
        name: cleanText(m["Назва"]),
        oldNames: parseArray(m["Стара назва"], itemSeparator),
        date: cleanDate(date)!,
        destroyed: cleanDate(m["Зруйновано"]),
        history: cleanText(sourcedText ?? history),
        sources: sources,
        period: getPeriod(periods, date),
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
      const dateLost = b["Зруйновано"];
      const lat = b["Широта"] as number | undefined;
      const lan = b["Довгота"] as number | undefined;
      const coordinates: LatLngExpression | undefined =
        lat && lan ? [lat, lan] : undefined;

      return {
        name: cleanText(b["Назва"]),
        oldNames: parseArray(b["Стара назва"], itemSeparator),
        date: cleanDate(date)!,
        destroyed: cleanDate(dateLost),
        description: cleanText(b["Опис"]),
        architecture: b["Архітектурний стиль"],
        history: history ? parseHistory(history) : undefined,
        period: getPeriod(periods, date),
        periodOfDestruction: getPeriod(periodsOfDestruction, dateLost),
        coordinates: coordinates,
      };
    }
  );
export const mappedLostBuildings = getLostBuildings();
