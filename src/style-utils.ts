import { Age } from "./types";

export const buttonSize = "23px";
export const markerImageStrokeColor = "#646464bf";

export const getMarkerSize = (zoom: number): number => {
  if (zoom >= 18) return 38;
  return zoom - 11;
};

export const getMarkerImage = (size: number, color: string) =>
  `<svg viewBox="0 0 ${size} ${size}" width="${size}px" height="${size}px" fill="${color}" xmlns="http://www.w3.org/2000/svg"><path stroke="${markerImageStrokeColor}"
        strokeWidth="1" d="M12,1a9,9,0,0,0-9,9c0,8,9,13,9,13s9-5,9-13A9,9,0,0,0,12,1Zm0,13a4,4,0,1,1,4-4A4,4,0,0,1,12,14Z"/></svg>`;

// https://digitalherald.org/2021/01/hexcodes-for-heraldic-tinctures/
export const getAgeColor = (age?: Age): string => {
  switch (age) {
    case Age.Ancient:
      return "#8811DD";
    case Age.Elder:
      return "#D60000";
    case Age.Antique:
      return "orange";
    case Age.Venerable:
      return "gold";
    case Age.Vintage:
      return "cyan";
    default:
      return "black";
  }
};
