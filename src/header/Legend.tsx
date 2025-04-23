import { periods } from "../data/periods";
import { getMarkerImage, getMonumentMarkerImage, palette } from "../themes";

const Legend = () => {
  const imageWidth = 24;
  const getImage = (text: string, image: string) => (
    <div key={text}>
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(image)}`}
        alt={text}
      />
      {text}
    </div>
  );

  return (
    <div className="legend">
      {periods.map((p) =>
        getImage(
          `${p.startDate}—${p.endDate}`,
          getMarkerImage(imageWidth, p.color)
        )
      )}
      {getImage(
        "збудовані до 1944",
        getMarkerImage(imageWidth, palette.unknown)
      )}
      {getImage(
        "пам'ятники",
        getMonumentMarkerImage(imageWidth, palette.unknown)
      )}
    </div>
  );
};

export default Legend;
