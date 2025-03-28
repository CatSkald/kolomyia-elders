import { CircleMarker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import { BuildingProfile } from "../types/types";
import BuildingHistory from "./BuildingHistory";
import { palette, periodUnknownColor } from "../themes";

export default function BuildingMarker({
  data,
  markerSize,
  onClick,
}: {
  data: BuildingProfile;
  markerSize: number;
  onClick: () => void;
}) {
  const markerColor = data.period?.color ?? periodUnknownColor;
  return !data.coordinates ? (
    <></>
  ) : (
    <CircleMarker
      center={data.coordinates}
      radius={markerSize}
      color={palette.overlay}
      opacity={0.5}
      fillColor={markerColor}
      fillOpacity={1}
      stroke={true}
      weight={1}
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
          <span style={{ fontStyle: "italic" }}>{data.address}</span>
          {data.description && (
            <span style={{ marginTop: "0.9rem" }}>{data.description}</span>
          )}
        </div>
        {data.architecture && (
          <>
            <hr style={{ margin: "0.9rem 0" }} />
            <div
              className="newline"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <span>
                Архітектурний стиль:&nbsp;
                <span style={{ fontStyle: "italic" }}>{data.architecture}</span>
              </span>
            </div>
          </>
        )}
        {data.history && <hr style={{ margin: "0.9rem 0" }} />}
        {data.history && <BuildingHistory data={data.history} />}
      </Popup>
    </CircleMarker>
  );
}
