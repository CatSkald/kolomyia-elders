import { periods, periodsOfDestruction } from "./data/periods";
import { Filters } from "./map/Filters";
import { retrieve, retrieveArray, store, storeArray } from "./localStorage";
import { getDefaultBrowserTheme, Theme } from "./themes";
import { kolomyiaDefault, mapBoundaries, MapSettings } from "./map/MapSettings";

export class UserPreferences {
  private constructor(
    private _theme: Theme,
    private _filters: Filters,
    private _map: MapSettings
  ) {}

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

  get map() {
    return this._map ?? kolomyiaDefault;
  }

  // TODO Use me
  // const parsePath = (
  //   path: string
  // ): {
  //   path: string;
  //   zoom: number | undefined;
  //   center: LatLngTuple | undefined;
  // } => {
  //   const split = path.split("#");
  //   if (split[1]) {
  //     const [zoom, lat, lang] = split[1].split("/");
  //     return {
  //       path: split[0],
  //       zoom: parseInt(zoom),
  //       center: [parseFloat(lat), parseFloat(lang)],
  //     };
  //   }

  //   return { path: split[0], zoom: undefined, center: undefined };
  // };

  updateMap(value: MapSettings) {
    this._map = value;
    store("map.zoom", this._map.zoom.toString());
    store("map.center.lat", this._map.center[0].toString());
    store("map.center.lng", this._map.center[1].toString());
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

    const mapZoomParsed = parseInt(retrieve("map.zoom") ?? "");
    const mapZoom: number =
      mapZoomParsed &&
      mapZoomParsed > mapBoundaries.minZoom &&
      mapZoomParsed < mapBoundaries.maxZoom
        ? mapZoomParsed
        : kolomyiaDefault.zoom;
    const mapCenterLat = parseFloat(retrieve("map.center.lat") ?? "");
    const mapCenterLng = parseFloat(retrieve("map.center.lng") ?? "");

    return new UserPreferences(theme, filters, {
      zoom: mapZoom,
      center:
        mapCenterLat && mapCenterLng
          ? [mapCenterLat, mapCenterLng]
          : kolomyiaDefault.center,
    });
  }
}
