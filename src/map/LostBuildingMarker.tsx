import { Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import { LostBuildingProfile } from "../types/types";
import { getLostBuildingMarkerImage, palette } from "../themes";
import { DivIcon } from "leaflet";
import Collapsible from "./Collapsible";
import BuildingHistory from "./BuildingHistory";

export default function LostBuildingMarker({
  data,
  markerSize,
  onClick,
}: {
  data: LostBuildingProfile;
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
          html: getLostBuildingMarkerImage(markerSize, markerColor),
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
            {data.date}—{data.destroyed}
          </span>
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
        {data.oldNames && (
          <Collapsible header="Давні назви">
            <div
              className="newline"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              {data.oldNames.map((name, index) => (
                <div key={index} style={{ textAlign: "center" }}>
                  {name}
                </div>
              ))}
            </div>
          </Collapsible>
        )}
        {data.history && <BuildingHistory data={data.history} />}
      </Popup>
    </Marker>
  );
}
