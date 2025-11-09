import { CircleMarker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import { BuildingProfile } from "../../types/types";
import BuildingHistory from "../popup/BuildingHistory";
import { palette } from "../../themes";
import ReadMoreButton from "../popup/ReadMoreButton";
import { useState } from "react";
import RichText from "../popup/RichText";

export default function BuildingMarker({
  data,
  markerSize,
  onClick,
}: {
  data: BuildingProfile;
  markerSize: number;
  onClick: () => void;
}) {
  const [showOldName, setShowOldName] = useState(false);
  const [showOldStreetName, setShowOldStreetName] = useState(false);
  const markerColor = data.period?.color ?? palette.unknown;
  return !data.coordinates ? (
    <></>
  ) : (
    <CircleMarker
      center={data.coordinates}
      radius={markerSize / 2}
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
            {data.date}
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
              <hr style={{ margin: "0.5rem 0", width: "100%" }} />
            </>
          )}
          <span style={{ fontStyle: "italic" }}>{data.address}</span>
          {data.oldStreetNames && (
            <div style={showOldStreetName ? { display: "none" } : {}}>
              <ReadMoreButton
                text="давні назви вулиці"
                onClick={() => setShowOldStreetName(true)}
              />
            </div>
          )}
          {data.oldStreetNames && (
            <>
              <div
                className="newline"
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  display: showOldStreetName ? "flex" : "none",
                }}
              >
                {data.oldStreetNames.map((name, index) => (
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
    </CircleMarker>
  );
}
