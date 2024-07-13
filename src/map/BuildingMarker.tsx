import { Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

import "leaflet/dist/leaflet.css";
import { BuildingProfile } from "../types";

export default function BuildingMarker({ data }: { data: BuildingProfile }) {
  return !data.coordinates ? (
    <></>
  ) : (
    <>
      <Marker
        position={data.coordinates}
        icon={
          new Icon({
            iconUrl: data.markerImage,
            iconSize: [36, 36],
          })
        }
      />
      <Popup>
        <div className="newline" style={{ fontWeight: "bold" }}>
          {data.link ? (
            <a href={data.link} target="_blank">
              {data.name}
            </a>
          ) : (
            data.name
          )}
        </div>
        <div className="newline" style={{ fontWeight: "bold" }}>
          {data.date}
        </div>
        <div className="newline">{data.address}</div>
      </Popup>
    </>
  );
}
