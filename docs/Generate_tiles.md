# Generate vector tiles

This guide explains how to install tilemaker inside WSL2/Ubuntu, used to generate OpenMapTiles vector tiles locally.

## 1. Install WSL (PowerShell as Administrator)

```powershell
wsl --install
```

Installs WSL2 + Ubuntu by default. **Reboot** if prompted. To pick a specific distro:

```powershell
wsl --list --online          # see options
wsl --install -d Ubuntu-24.04
```

## 2. Build tilemaker inside Ubuntu

No apt package exists, so compile from source (one-time build):

```bash
sudo apt update
sudo apt install -y build-essential libboost-dev libboost-filesystem-dev \
  libboost-program-options-dev libboost-iostreams-dev libsqlite3-dev \
  zlib1g-dev libshp-dev rapidjson-dev luajit libluajit-5.1-dev git

git clone https://github.com/systemed/tilemaker.git
cd tilemaker
make -j$(nproc)
sudo make install            # optional; puts `tilemaker` on PATH
```

> **Lua note:** tilemaker's Makefile detects Lua by *running the interpreter* (it prefers LuaJIT). Installing only `liblua5.1-0-dev` (headers/library, no interpreter binary) makes the build fail with `Couldn't find Lua libraries` and a blank `Using` line. Install `luajit` + `libluajit-5.1-dev` (as above), or plain `lua5.1` alongside `liblua5.1-0-dev`. After fixing, run `make clean && make -j$(nproc)`.

Verify:

```bash
./tilemaker --help             # or ./tilemaker --help if you skipped make install
```

## 3. Accessing project files from WSL

Open terminal in Ubuntu, then open VSCode in WSL in the tilemaker folder: `code .`.

The Windows workspace is also reachable at:

```bash
cd /mnt/p/github/kolomyia-elders/tools/tilemaker
```

> ⚠️ **Performance:** disk I/O across `/mnt/p/...` is slow. For a large `.osm.pbf`, copy the input into the native Linux filesystem first (e.g. `~/kolomyia/`), generate there, then copy the resulting `.pmtiles` back to `/mnt/p/...`.

## 4. Generate tiles

Use the **full standard** OpenMapTiles config + lua (includes the `transportation` layer — see plan.md Step 1).

**Direct PMTiles output (production file):**

```bash
./tilemaker --input kolomyia.osm.pbf --output kolomyia.pmtiles \
  --config resources/config-openmaptiles.json \
  --process resources/process-openmaptiles.lua
```

This generates the `kolomyia.pmtiles` which has to be copied manually into the repo: `public/kolomyia.pmtiles` (commit this).

## 5. Label languages (name fields)

By default tilemaker's `process-openmaptiles.lua` writes the primary label into an attribute **named `name:latin`** and emits nothing else:

```lua
preferred_language = nil
preferred_language_attribute = "name:latin"   -- raw OSM name dumped here
additional_languages = { }
```

For Kolomyia this is misleading: OSM's `name` is Ukrainian (Cyrillic), so every feature ends up with a single `name:latin` field holding Cyrillic text — there is no `name`, no `name:uk`, and (since this Lua has no transliteration) no real Latin name. The map style then can't resolve `name:uk` / `name` and labels go blank.

**Fix** — edit the config block at the top of `resources/process-openmaptiles.lua` so the canonical label lives under the OMT primary field `name`, plus any tagged localized variants:

```lua
preferred_language = nil
preferred_language_attribute = "name"       -- was "name:latin"
default_language_attribute = "name_int"
additional_languages = { "uk", "en" }       -- was { }
```

After this, features carry `name` (Ukrainian) always, and `name:uk` / `name:en` where OSM has them. The style's label expression coalesces `name:<lang>` → `name`, so Ukrainian renders by default and a future language toggle can use `name:en`.

> **Limitation:** tilemaker's Lua does **not** transliterate. `name:en` / a Latin variant only exist where OSM itself carries `name:en` / `int_name`; there is no automatic Cyrillic→Latin conversion here. True transliteration needs a separate step (e.g. an ICU / Unidecode pass) and is out of scope for this config.

Regenerate (Section 4) after editing the Lua, then recopy `kolomyia.pmtiles`.

---

## 6. Building highlights (footprints) and tile regeneration

The colored buildings-of-interest are **not** baked into the tiles. They come from `public/highlighted-buildings.geojson`, produced by `tools/enrich-buildings.ts`:

1. Fetch every building footprint in the Kolomyia bbox from **Overpass** (live OSM).
2. Spatially join each footprint to the coordinates in `src/data/buildings.json` (point-in-polygon).
3. Write the matched footprints, tagged with the building's period `color` and a stable `id`. Unmatched entries are printed so their coordinate can be nudged.

Run it after each Excel → JSON export:

```powershell
npm run enrich                 # reuses the cached OSM fetch
npm run enrich -- --refresh    # re-fetch OSM first (see below)
```

The Overpass response depends only on the **city's** buildings, not on `buildings.json`, so it's cached in `tools/overpass-cache.json` and reused. A normal run only redoes the spatial join — no network — which covers the everyday case of a non-technical editor adding rows in Excel.

### When to `--refresh`

`--refresh` re-fetches OSM. The trigger is **"OSM building geometry changed"** — which is the same reason you'd regenerate the tiles. So:

- **Adding a building that already exists in OSM** → no `--refresh`, no tile regen. The cached footprint is already there; a plain `npm run enrich` suffices.
- **A building of interest that is new/redrawn in OSM** → regenerate the tiles (Sections 4–5) **and** run `enrich --refresh`.

Do both **from the same OSM state**: the grey base building (tiles) and the red highlight (geojson) are both derived from OSM, so refreshing one without the other lets their geometry drift apart and widens the misalignment sliver under the highlight. Rule of thumb: **whenever you regenerate tiles, also run `enrich --refresh`.**

> A newly-OSM'd building will still show its marker in the meantime; only the footprint highlight waits for a `--refresh`.
