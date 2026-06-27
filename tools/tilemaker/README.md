# Tilemaker configs

In order to generate vector tiles from a `.osm.pbf` file, copy the configs from the current folder into the tilemaker location along with your `kolomyia.osm.pbf`, then use the following command:

```bash
tilemaker --input kolomyia.osm.pbf --output kolomyia.pmtiles --config config-openmaptiles.json --process process-openmaptiles.lua
```

Note: this uses tilemaker v2.4.
