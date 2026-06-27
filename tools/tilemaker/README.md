# Tilemaker configs

In order to generate vector tiles from a `.osm.pbf` file, copy the configs from the current folder into the tilemaker location along with your `kolomyia.osm.pbf`, then use the following command:

```bash
./tilemaker.exe --input kolomyia.osm.pbf --output kolomyia-tiles --config config-openmaptiles.json --process process-openmaptiles.lua

py ~\AppData\Roaming\Python\Python313\Scripts\mb-util --image_format=pbf --scheme=xyz ./public/kolomyia-tiles kolomyia.mbtiles

./pmtiles.exe convert kolomyia.mbtiles kolomyia.pmtiles
```

Note: this uses tilemaker v2.4.
