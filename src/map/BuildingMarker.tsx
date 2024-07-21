import { Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

import "leaflet/dist/leaflet.css";
import { BuildingProfile } from "../types";
import BuildingHistory from "./BuildingHistory";

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
          {data.name}
        </div>
        <div className="newline" style={{ fontWeight: "bold" }}>
          {data.date}
        </div>
        <div className="newline" style={{ fontStyle: "italic" }}>
          {data.address}
        </div>
        {data.description && <div className="newline">{data.description}</div>}
        {/* TODO Show dynamically */}
        {data.history && <BuildingHistory data={data.history} />}
      </Popup>
    </>
  );
}
