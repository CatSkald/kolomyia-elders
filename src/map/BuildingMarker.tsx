import { CircleMarker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import { BuildingProfile } from "../types/types";
import BuildingHistory from "./BuildingHistory";
import { palette, periodUnknownColor } from "../themes";

export default function BuildingMarker({
  data,
  markerSize,
}: {
  data: BuildingProfile;
  markerSize: number;
}) {
  const markerColor = data.period?.color ?? periodUnknownColor;
  return !data.coordinates ? (
    <></>
  ) : (
    <>
      <CircleMarker
        center={data.coordinates}
        radius={markerSize}
        color={palette.overlay}
        opacity={0.5}
        fillColor={markerColor}
        fillOpacity={1}
        stroke={true}
        weight={1}
      />
      <Popup>
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
              textDecoration: "underline",
              fontSize: "1rem",
            }}
          >
            {data.name}
          </span>
          <span
            style={{
              fontWeight: "bold",
              fontSize: "0.9rem",
            }}
          >
            {data.date}
          </span>
          {data.description && (
            <span style={{ marginTop: "0.9rem" }}>{data.description}</span>
          )}
          <span style={{ marginTop: "0.9rem", fontStyle: "italic" }}>
            {data.address}
          </span>
        </div>
        {data.history && <hr style={{ margin: "0.9rem 0" }} />}
        {data.history && <BuildingHistory data={data.history} />}
      </Popup>
    </>
  );
}
