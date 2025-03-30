import { CircleMarker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import { BuildingProfile } from "../types/types";
import BuildingHistory from "./BuildingHistory";
import { palette, periodUnknownColor } from "../themes";
import Collapsible from "./Collapsible";

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
          </span>
          <span style={{ fontStyle: "italic" }}>{data.address}</span>
        </div>
        {(data.description || data.architecture) && (
          <Collapsible header="Опис">
            {data.description && (
              <div style={{ textAlign: "center" }}>{data.description}</div>
            )}
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
                    <span style={{ fontStyle: "italic" }}>
                      {data.architecture}
                    </span>
                  </span>
                </div>
              </>
            )}
          </Collapsible>
        )}
        {data.history && <BuildingHistory data={data.history} />}
      </Popup>
    </CircleMarker>
  );
}
