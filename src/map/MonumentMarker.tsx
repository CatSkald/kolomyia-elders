import { Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import { MonumentProfile } from "../types/types";
import { getMonumentMarkerImage, palette } from "../themes";
import { DivIcon } from "leaflet";

export default function MonumentMarker({
  data,
  markerSize,
  onClick,
}: {
  data: MonumentProfile;
  markerSize: number;
  onClick: () => void;
}) {
  const markerColor = data.period?.color ?? palette.unknown;
  return !data.coordinates ? (
    <></>
  ) : (
    <Marker
      position={data.coordinates}
      eventHandlers={{
        click: (event) => {
          onClick();
          event.target.openPopup(data.coordinates);
        },
      }}
      icon={
        new DivIcon({
          className: "marker",
          iconSize: [markerSize, markerSize],
          iconAnchor: [markerSize / 2, markerSize],
          html: getMonumentMarkerImage(markerSize, markerColor),
        })
      }
    >
      <Popup className="marker-popup" autoPan={false}>
        <div
          className="newline"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          >
            {data.name}
          </span>
          <span
            style={{
              fontSize: "0.9rem",
            }}
          >
            {data.date}
            {data.destroyed ? `—${data.destroyed}` : ""}
          </span>
        </div>
        {data.history && (
          <div style={{ textAlign: "center" }}>{data.history}</div>
        )}
      </Popup>
    </Marker>
  );
}
