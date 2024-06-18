import { Marker, Popup } from "react-leaflet";
import { Icon, LatLngExpression } from "leaflet";

import "leaflet/dist/leaflet.css";
import markerIconUrl from "../assets/pin.png";
import { BuildingProfile } from "./Types";

export default function BuildingMarker({
  latLng,
  data,
}: {
  latLng: LatLngExpression;
  data: BuildingProfile;
}) {
  return (
    <>
      <Marker
        position={latLng}
        icon={
          new Icon({
            iconUrl: markerIconUrl,
            iconSize: [36, 36],
            className: "ancient",
          })
        }
      />
      <Popup>
        <div className="newline" style={{ fontWeight: "bold" }}>
          {data.wikipedia ? (
            <a href={data.wikipedia} target="_blank">
              {data.name}
            </a>
          ) : (
            data.name
          )}
        </div>
        <div className="newline" style={{ fontWeight: "bold" }}>
          {data.year}
        </div>
        <div className="newline">вул. {data.address}</div>
      </Popup>
    </>
  );
}
