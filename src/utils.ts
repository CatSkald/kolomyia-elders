import { LatLngExpression } from "leaflet";
import { BuildingProfile } from "./types";
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
        else if (date.includes("18 ст.")) year = 1701;
        else if (date.includes("19 ст.")) year = 1801;
        else if (date.includes("20 ст.")) year = 1901;
        else if (date.endsWith("-ті.")) year = parseInt(date.split("-")[0]);
        else if (date.startsWith("після")) year = 1 + parseInt(date.split(" ")[1]);

        if (!year) return undefined;
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

export const mapBuildings = (buildings: Array<{
    "Назва": string,
    "Дата": string | number,
    "Адреса": string,
    "Координати"?: string,
    "Посилання на карту"?: string
}>): Array<BuildingProfile> =>
    buildings.map(b => {
        const date = b["Дата"];
        const age = getAge(date);
        const coordinates = b["Координати"];
        return ({
            name: b["Назва"],
            date: date,
            age: age,
            address: b["Адреса"],
            coordinates: coordinates
                ? coordinates.split("/") as unknown as LatLngExpression
                : undefined,
            link: b["Посилання на карту"],
            markerImage: getImageUrl(age),
        })
    });