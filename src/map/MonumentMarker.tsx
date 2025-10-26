import { Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import { MonumentProfile } from "../types/types";
import { getMonumentMarkerImage, palette } from "../themes";
import { DivIcon } from "leaflet";
import Sources from "./Sources";
import ReadMoreButton from "./ReadMoreButton";
import { useState } from "react";

export default function MonumentMarker({
  data,
  markerSize,
  onClick,
}: {
  data: MonumentProfile;
  markerSize: number;
  onClick: () => void;
}) {
  const [showOldName, setShowOldName] = useState(false);
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
        {data.history && (
          <>
            <hr style={{ margin: "0.5rem 0", width: "100%" }} />
            <div style={{ whiteSpace: "pre-wrap" }}>
              {data.history}
              {data.sources && <Sources data={data.sources} />}
            </div>
          </>
        )}
      </Popup>
    </Marker>
  );
}
