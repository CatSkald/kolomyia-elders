import { periods } from "../data/periods";
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
  const getImage = (text: string, image: string, onClick: () => void) => (
    <div key={text} className="button" onClick={onClick}>
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
      <div className="mobile-line-break"></div>
      {getImage(
        "збудовані до 1944",
        filters.unknown
          ? getMarkerImage(imageWidth, palette.unknown)
          : getDeselectedImage(imageWidth, palette.unknown),
        () => setFilters({ ...filters, unknown: !filters.unknown })
      )}
      <div className="mobile-line-break"></div>
      {getImage(
        "втрачені",
        filters.lost
          ? getLostBuildingMarkerImage(imageWidth, palette.unknown, false)
          : getDeselectedImage(imageWidth, palette.unknown),
        () => setFilters({ ...filters, lost: !filters.lost })
      )}
      {getImage(
        "пам'ятники",
        filters.monuments
          ? getMonumentMarkerImage(imageWidth, palette.unknown)
          : getDeselectedImage(imageWidth, palette.unknown),
        () => setFilters({ ...filters, monuments: !filters.monuments })
      )}
    </div>
  );
};

export default Legend;
