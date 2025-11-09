import { Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import { LostBuildingProfile } from "../../types/types";
import { getLostBuildingMarkerImage, palette } from "../../themes";
import { DivIcon } from "leaflet";
import BuildingHistory from "../popup/BuildingHistory";
import { useState } from "react";
import ReadMoreButton from "../popup/ReadMoreButton";
import RichText from "../popup/RichText";

export default function LostBuildingMarker({
  data,
  markerSize,
  onClick,
}: {
  data: LostBuildingProfile;
  markerSize: number;
  onClick: () => void;
}) {
  const [showOldName, setShowOldName] = useState(false);

  const markerColor = data.periodOfDestruction?.color ?? palette.unknown;
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
          html: getLostBuildingMarkerImage(markerSize, markerColor, true),
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
          <RichText
            data={data.name}
            style={{
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          />
          <span
            style={{
              fontSize: "0.9rem",
            }}
          >
            {data.date}—{data.destroyed}
          </span>
          {data.oldNames && (
            <div style={showOldName ? { display: "none" } : {}}>
              <ReadMoreButton
                text="давні назви"
                onClick={() => setShowOldName(true)}
              />
            </div>
          )}
          {data.oldNames && (
            <>
              <div
                className="newline"
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  display: showOldName ? "flex" : "none",
                }}
              >
                {data.oldNames.map((name, index) => (
                  <div key={index} style={{ textAlign: "center" }}>
                    {name}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        {data.description && (
          <>
            <hr style={{ margin: "0.5rem 0", width: "100%" }} />
            <RichText data={data.description} style={{ textAlign: "center" }} />
          </>
        )}
        {data.architecture && (
          <>
            <hr style={{ margin: "0.5rem 0", width: "100%" }} />
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
                <RichText
                  data={data.architecture}
                  style={{ fontStyle: "italic" }}
                />
              </span>
            </div>
          </>
        )}
        {data.history && <BuildingHistory data={data.history} />}
      </Popup>
    </Marker>
  );
}
