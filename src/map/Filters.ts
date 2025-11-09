import { periods, periodsOfDestruction } from "../data/periods";
import {
  AddressProfile,
  BuildingProfile,
  LocationProfile,
  LostBuildingProfile,
  MonumentProfile,
} from "../types/types";

export type Filters = {
  periods: (typeof periods)[number]["name"][];
  monuments: boolean;
  unknown: boolean;
  lost: (typeof periodsOfDestruction)[number]["name"][];
  searchTerm?: string;
};

export function matchSearchTerm(
  x:
    | LocationProfile
    | AddressProfile
    | BuildingProfile
    | LostBuildingProfile
    | MonumentProfile,
  filters: Filters
): boolean {
  if (!filters.searchTerm) return false;

  const searchTerm = filters.searchTerm!.toUpperCase();

  return (
    Object.values(x).filter((value) => {
      if (typeof value === "string")
        return value.toUpperCase().includes(searchTerm);
      else if (typeof value === "number")
        return value.toString().includes(searchTerm);
      else if (Array.isArray(value)) {
        return (
          value.filter((v) => {
            if (typeof v === "string")
              return v.toUpperCase().includes(searchTerm);
            else if (typeof v === "object" && "description" in v)
              return v.description.toUpperCase().includes(searchTerm);
            else return false;
          }).length > 0
        );
      }
    }).length > 0
  );
}
