import { useEffect, useState } from "react";
import { periods, periodsOfDestruction } from "../data/periods";
import { Filters } from "../Filters";
import {
  getDeselectedImage,
  getLostBuildingMarkerImage,
  getMarkerImage,
  getMonumentMarkerImage,
  palette,
} from "../themes";

const Legend = ({
  filters,
  setFilters,
}: {
  filters: Filters;
  setFilters: (filters: Filters) => void;
}) => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const onWindowSizeChange = () => setWindowWidth(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", onWindowSizeChange);
    return () => window.removeEventListener("resize", onWindowSizeChange);
  }, []);
  const isMobile = windowWidth <= 768;

  const [expanded, setExpanded] = useState(!isMobile);

  const getImage = (text: string, image: string, onClick: () => void) => (
    <div key={text} role="button" onClick={onClick}>
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(image)}`}
        alt={text}
      />
      {text}
    </div>
  );
  const imageWidth = 24;
  return (
    <div className="legend">
      {periods.map((p) => {
        const isSelected = filters.periods.find((x) => x.name === p.name);
        return getImage(
          p.name,
          isSelected
            ? getMarkerImage(imageWidth, p.color)
            : getDeselectedImage(imageWidth, p.color),
          () =>
            setFilters({
              ...filters,
              periods: isSelected
                ? filters.periods.filter((x) => x.name !== p.name)
                : filters.periods.concat([p]),
            })
        );
      })}
      {expanded && (
        <>
          <div className="mobile-line-break"></div>
          {getImage(
            "збудовані до 1944",
            filters.unknown
              ? getMarkerImage(imageWidth, palette.unknown)
              : getDeselectedImage(imageWidth, palette.unknown),
            () => setFilters({ ...filters, unknown: !filters.unknown })
          )}
          {getImage(
            "пам'ятники",
            filters.monuments
              ? getMonumentMarkerImage(imageWidth, palette.unknown)
              : getDeselectedImage(imageWidth, palette.unknown),
            () => setFilters({ ...filters, monuments: !filters.monuments })
          )}
          <div className="line-break"></div>
          {periodsOfDestruction.map((p) => {
            const isSelected = filters.lost.find((x) => x.name === p.name);
            return getImage(
              p.name,
              isSelected
                ? getLostBuildingMarkerImage(imageWidth, p.color, false)
                : getDeselectedImage(imageWidth, p.color),
              () =>
                setFilters({
                  ...filters,
                  lost: isSelected
                    ? filters.lost.filter((x) => x.name !== p.name)
                    : filters.lost.concat([p]),
                })
            );
          })}
        </>
      )}
      {isMobile && (
        <div role="button" onClick={() => setExpanded(!expanded)}>
          {expanded ? "▲ Сховати фільтри" : "◆ Більше фільтрів"}
        </div>
      )}
    </div>
  );
};

export default Legend;
