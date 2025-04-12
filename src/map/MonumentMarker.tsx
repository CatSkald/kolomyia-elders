import { CircleMarker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import { MonumentProfile } from "../types/types";
import { palette } from "../themes";

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
    <CircleMarker
      center={data.coordinates}
      radius={markerSize / 2}
      color={palette.unknown}
      opacity={0.5}
      fillColor={markerColor}
      fillOpacity={1}
      stroke={true}
      weight={3}
      eventHandlers={{
        click: (event) => {
          onClick();
          event.target.openPopup(data.coordinates);
        },
      }}
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
    </CircleMarker>
  );
}
