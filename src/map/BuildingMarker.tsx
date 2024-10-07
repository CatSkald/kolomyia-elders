import { CircleMarker, Marker, Popup } from "react-leaflet";
import { DivIcon } from "leaflet";

import "leaflet/dist/leaflet.css";
import { BuildingProfile } from "../types";
import BuildingHistory from "./BuildingHistory";
import { getMarkerImage, markerImageStrokeColor } from "../style-utils";

export default function BuildingMarker({
  data,
  markerSize,
}: {
  data: BuildingProfile;
  markerSize: number;
}) {
  return !data.coordinates ? (
    <></>
  ) : (
    <>
      {markerSize < 30 ? (
        <CircleMarker
          center={data.coordinates}
          radius={markerSize}
          color={markerImageStrokeColor}
          opacity={0.5}
          fillColor={data.color}
          fillOpacity={1}
          stroke={true}
          weight={1}
        />
      ) : (
        <Marker
          position={data.coordinates}
          icon={
            new DivIcon({
              className: "marker",
              iconSize: [markerSize, markerSize],
              iconAnchor: [markerSize / 2, markerSize],
              html: getMarkerImage(markerSize, data.color),
            })
          }
        />
      )}
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
