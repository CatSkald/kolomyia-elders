# Architectural legacy of the city of Kolomyia

[![Code License: MIT](https://img.shields.io/badge/Code_License-MIT-brightgreen)](/LICENSE)

## License

The code in this repository is released under the [MIT license](./LICENSE).

All texts, data (under `src/data`) and assets (under `src/assets`) are subject to their own licenses as required by the sources and authors.

Generated map data (`pmtiles` and `geojson`) is derived from OpenStreetMap under the [ODbL](https://opendatacommons.org/licenses/odbl/).

## Local development

1. If buildings data is updated: `npm run enrich`.
1. `npm run build` to build and watch.
1. In separate terminal: `npm run preview` to view.
1. `npm run lint -- --fix` to fix linter errors.

### Upgrade packages

`npx npm-check-updates --upgrade`

### Generate tiles

See [this](./docs/Generate_tiles.md).

## Deploy

1. Run `npm run preview`
1. Run `npm run deploy`

## Built with, and thanks to

- **Map data** — [OpenStreetMap](https://www.openstreetmap.org/copyright), © OpenStreetMap, under the [ODbL](https://opendatacommons.org/licenses/odbl/)
- **Tile schema** — [OpenMapTiles](https://openmaptiles.org/)
- **Tile generation** — [tilemaker](https://github.com/systemed/tilemaker)
- **OSM data fetch (highlights)** — [Overpass API](https://overpass-api.de/)
- **Map rendering** — [MapLibre GL JS](https://maplibre.org/), [Leaflet](https://leafletjs.com/) + [React Leaflet](https://react-leaflet.js.org/), [maplibre-gl-leaflet](https://github.com/maplibre/maplibre-gl-leaflet)
- **Tile serving** — [PMTiles](https://github.com/protomaps/PMTiles)
- **Typeface** — [Philosopher](https://fonts.google.com/specimen/Philosopher) by Jovanny Lemonad, under the [SIL Open Font License](./src/vendor/fonts/Philosopher/OFL.txt)
- **App stack** — [React](https://react.dev/), [Vite](https://vitejs.dev/), [TypeScript](https://www.typescriptlang.org/), [Biome](https://biomejs.dev/)
