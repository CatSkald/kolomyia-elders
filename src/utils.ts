import { LatLngExpression } from "leaflet";
import { BuildingProfile, HistoryEntry } from "./types";
// TODO Make this dynamic https://stackoverflow.com/a/70024111/8242328
import defaultIconUrl from "./assets/pin.png";
import ancientIconUrl from "./assets/ancient.png";
import elderIconUrl from "./assets/elder.png";
import oldIconUrl from "./assets/old.png";
import modernIconUrl from "./assets/modern.png";

export const getAge =
  (date: string | number): string | undefined => {
    let year = undefined;
    if (typeof date === "number") year = date;
    else if (date.includes("XVIII ст.")) year = 1701;
    else if (date.includes("XIX ст.")) year = 1801;
    else if (date.includes("XX ст.")) year = 1901;
    else if (date.endsWith("-ті") || date.endsWith("-х"))
      year = parseInt(date.split("-")[0]);
    else if (date.startsWith("після"))
      year = 1 + parseInt(date.split(" ")[1]);

    if (!year || year < 1701) return undefined;
    else if (year < 1801) return "ancient";
    else if (year < 1901) return "elder";
    else if (year < 1919) return "old";
    else return "modern";
  };

export const getImageUrl =
  (age?: string): string => {
    switch (age) {
      case "ancient":
        return ancientIconUrl;
      case "elder":
        return elderIconUrl;
      case "old":
        return oldIconUrl;
      case "modern":
        return modernIconUrl;
      default:
        return defaultIconUrl;
    }
  };

export const parseHistory =
  (history: string): HistoryEntry[] =>
    history.split(";").map(h => {
      const parts = h.trim().split(" - ");
      return {
        date: parts[0],
        description: parts[1]
      }
    });

export const mapBuildings = (buildings: Array<{
  "Назва": string,
  "Дата": string | number,
  "Опис": string,
  "Історія": string,
  "Адреса": string,
  "Координати"?: string,
  "Посилання на карту"?: string
}>): BuildingProfile[] =>
  buildings.map(b => {
    const date = b["Дата"];
    const age = getAge(date);
    const coordinates = b["Координати"];
    const history = b["Історія"];
    return ({
      name: b["Назва"],
      date: typeof date === "number" ? date : date.replace(" - ", "—"),
      description: b["Опис"],
      history: history ? parseHistory(history) : undefined,
      age: age,
      address: b["Адреса"],
      coordinates: coordinates
        ? coordinates.split("/") as unknown as LatLngExpression
        : undefined,
      link: b["Посилання на карту"],
      markerImage: getImageUrl(age),
    })
  });
