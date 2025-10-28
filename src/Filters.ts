import {
  AddressProfile,
  BuildingProfile,
  LocationProfile,
  LostBuildingProfile,
  MonumentProfile,
  Period,
} from "./types/types";

export type Filters = {
  periods: Period[];
  monuments: boolean;
  unknown: boolean;
  lost: Period[];
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
  if (!filters.searchTerm || filters.searchTerm.length < 2) return false;

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
