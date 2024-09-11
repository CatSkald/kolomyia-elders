import { LatLngExpression } from "leaflet";
import { BuildingProfile, HistoryEntry, SourceProfile } from "./types";
// TODO Make this dynamic https://stackoverflow.com/a/70024111/8242328
import defaultIconUrl from "./assets/pin.png";
import ancientIconUrl from "./assets/purple.png";
import elderIconUrl from "./assets/red.png";
import antiqueIconUrl from "./assets/orange.png";
import venerableIconUrl from "./assets/yellow.png";
import vintageIconUrl from "./assets/cyan.png";

export const getAge = (date: string | number): string | undefined => {
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

  if (!year || year < 1650) return undefined;
  else if (year < 1751) return "ancient";
  else if (year < 1851) return "elder";
  else if (year < 1914) return "antique";
  else if (year < 1919) return "venerable";
  else return "vintage";
};

export const getImageUrl = (age?: string): string => {
  switch (age) {
    case "ancient":
      return ancientIconUrl;
    case "elder":
      return elderIconUrl;
    case "antique":
      return antiqueIconUrl;
    case "venerable":
      return venerableIconUrl;
    case "vintage":
      return vintageIconUrl;
    default:
      return defaultIconUrl;
  }
};

export const parseHistory = (history: string): HistoryEntry[] =>
  history.split(";").map((h) => {
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
    Опис: string;
    Історія: string;
    Адреса: string;
    Координати?: string;
    "Посилання на карту"?: string;
  }>
): BuildingProfile[] =>
  buildings.map((b) => {
    const date = b["Дата"];
    const age = getAge(date);
    const coordinates = b["Координати"];
    const history = b["Історія"];
    return {
      name: b["Назва"],
      date: typeof date === "number" ? date : date.replace(" - ", "—"),
      description: b["Опис"],
      history: history ? parseHistory(history) : undefined,
      age: age,
      address: b["Адреса"],
      coordinates: coordinates
        ? (coordinates.split("/") as unknown as LatLngExpression)
        : undefined,
      link: b["Посилання на карту"],
      markerImage: getImageUrl(age),
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
