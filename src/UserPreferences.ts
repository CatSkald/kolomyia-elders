import { periods, periodsOfDestruction } from "./data/periods";
import { Filters } from "./map/Filters";
import { retrieve, retrieveArray, store, storeArray } from "./localStorage";
import { getDefaultBrowserTheme, Theme } from "./themes";

export class UserPreferences {
  private constructor(private _theme: Theme, private _filters: Filters) {}

  get theme() {
    return this._theme;
  }

  updateTheme(value: Theme) {
    this._theme = value;
    store("theme", this._theme);
  }

  get filters() {
    return this._filters;
  }

  updateFilters(value: Filters) {
    this._filters = value;
    storeArray("filters.periods", this._filters.periods);
    storeArray("filters.lost", this._filters.lost);
    store("filters.monuments", this._filters.monuments.toString());
    store("filters.unknown", this._filters.unknown.toString());
  }

  static load(): UserPreferences {
    const storedTheme = retrieve("theme");
    const theme =
      storedTheme && Object.values(Theme).includes(storedTheme as Theme)
        ? (storedTheme as Theme)
        : getDefaultBrowserTheme();

    const filteredPeriods = retrieveArray("filters.periods");
    const filteredLost = retrieveArray("filters.lost");

    const filters = {
      periods:
        filteredPeriods && filteredPeriods.length >= 1
          ? periods
              .filter((p) => filteredPeriods.includes(p.name))
              .map((p) => p.name)
          : periods.map((p) => p.name),
      monuments: retrieve("filters.monuments") !== "false",
      unknown: retrieve("filters.unknown") !== "false",
      lost:
        filteredLost && filteredLost.length >= 1
          ? periodsOfDestruction
              .filter((p) => filteredLost.includes(p.name))
              .map((p) => p.name)
          : [],
    };

    return new UserPreferences(theme, filters);
  }
}
