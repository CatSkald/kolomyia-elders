// Build-time enrichment: 
// fetch OSM building footprints for the Kolomyia bbox,
// spatially join them to the coordinates in buildings.json,
// and emit public/highlights.geojson
// (footprint polygons tagged with the building's period color).
// Unmatched buildings are printed so their coordinate can be adjusted manually.
//
// The OSM fetch depends only on the city's buildings, not on buildings.json, so
// it's cached in tools/overpass-cache.json and reused on later runs. Pass
// `--refresh` to re-fetch when OSM building geometry may have changed.

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { palette } from "../src/themes.ts";
import { mappedBuildings } from "../src/utils.ts";

const here = dirname(fileURLToPath(import.meta.url));
const CACHE_PATH = resolve(here, "overpass-cache.json");
const refresh = process.argv.includes("--refresh");

const OVERPASS_URLS = [
  "https://overpass.kumi.systems/api/interpreter",
  "https://overpass.private.coffee/api/interpreter",
  "https://overpass-api.de/api/interpreter",
];

// [south, west, north, east], derived from mapBoundaries in src/map/MapSettings.ts.
const BBOX = [48.505, 24.95, 48.595, 25.12] as const;

// Only ways: buildings mapped as multipolygon relations
// (rare, usually with courtyards) are skipped and fall back to their marker.
const query = `[out:json][timeout:60];
way["building"](${BBOX.join(",")});
out geom;`;

type Position = [number, number];
type BBox = [number, number, number, number];
type Footprint = { ring: Position[]; bbox: BBox };
type OverpassElement = {
  type: string;
  geometry?: { lat: number; lon: number }[];
};

const bboxOf = (ring: Position[]): BBox => {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const [x, y] of ring) {
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  return [minX, minY, maxX, maxY];
};

const inBbox = ([x, y]: Position, [minX, minY, maxX, maxY]: BBox): boolean =>
  x >= minX && x <= maxX && y >= minY && y <= maxY;

// Ray-casting point-in-polygon on a single (outer) ring.
const pointInRing = ([x, y]: Position, ring: Position[]): boolean => {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
};

async function fetchOverpass(): Promise<unknown> {
  let lastError: unknown;
  for (const url of OVERPASS_URLS) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        console.log(`Querying Overpass at ${url} (attempt ${attempt})…`);
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": "buildings-enrich/1.0 (build script)",
          },
          body: new URLSearchParams({ data: query }).toString(),
          signal: AbortSignal.timeout(45_000),
        });
        if (!res.ok) {
          lastError = new Error(`${res.status} ${res.statusText}`);
          continue;
        }
        return await res.json();
      } catch (err) {
        lastError = err;
      }
    }
  }
  throw new Error(`All Overpass endpoints failed: ${lastError}`);
}

// Return the OSM buildings from the local cache, fetching (and caching) only when
// the cache is missing or `--refresh` was passed.
async function loadOsm(): Promise<{ elements?: OverpassElement[] }> {
  if (!refresh && existsSync(CACHE_PATH)) {
    console.log(`Using cached OSM buildings (pass --refresh to re-fetch).`);
    return JSON.parse(readFileSync(CACHE_PATH, "utf8"));
  }
  const osm = (await fetchOverpass()) as { elements?: OverpassElement[] };
  writeFileSync(CACHE_PATH, JSON.stringify(osm));
  console.log(`Cached OSM buildings → ${CACHE_PATH}`);
  return osm;
}

async function main() {
  const osm = await loadOsm();

  const footprints: Footprint[] = (osm.elements ?? [])
    .filter((el) => el.type === "way" && (el.geometry?.length ?? 0) >= 3)
    .map((el) => {
      const ring = el.geometry!.map(({ lat, lon }) => [lon, lat] as Position);
      const [fx, fy] = ring[0];
      const [lx, ly] = ring[ring.length - 1];
      if (fx !== lx || fy !== ly) ring.push([fx, fy]); // close open rings
      return { ring, bbox: bboxOf(ring) };
    });
  console.log(`Loaded ${footprints.length} building footprints from OSM.`);

  const outFeatures: unknown[] = [];
  const unmatched: string[] = [];
  let withCoordinates = 0;

  for (const b of mappedBuildings) {
    if (!b.coordinates) continue;
    withCoordinates++;

    const [lat, lng] = b.coordinates;
    const point: Position = [lng, lat];

    const hit = footprints.find(
      (f) => inBbox(point, f.bbox) && pointInRing(point, f.ring),
    );

    if (hit) {
      outFeatures.push({
        type: "Feature",
        geometry: { type: "Polygon", coordinates: [hit.ring] },
        properties: {
          // Stable join key back to a runtime BuildingProfile
          // (same value as `coordinates.join(",")` in the app),
          // used for click + filter sync.
          id: b.coordinates.join(","),
          name: b.name,
          address: b.address,
          period: b.period?.name ?? null,
          color: b.period?.color ?? palette.unknown,
        },
      });
    } else {
      unmatched.push(`${b.name} — ${b.address} (${lat}, ${lng})`);
    }
  }

  const outPath = resolve(here, "../public/highlights.geojson");
  writeFileSync(
    outPath,
    JSON.stringify({ type: "FeatureCollection", features: outFeatures }),
  );

  console.log(
    `\nMatched ${outFeatures.length}/${withCoordinates} extant buildings → ${outPath}`,
  );
  if (unmatched.length) {
    console.log(`\n${unmatched.length} unmatched (point outside any footprint):`);
    for (const line of unmatched) console.log(`  - ${line}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
