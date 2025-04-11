import { periods } from "../data/periods";
import { getMarkerImage, palette } from "../themes";

const Legend = () => {
  const getImage = (text: string, color: string) => (
    <div key={text}>
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(
          getMarkerImage(24, color)
        )}`}
        alt={text}
      />
      {text}
    </div>
  );

  return (
    <div className="legend">
      {periods.map((p) => getImage(`${p.startDate}—${p.endDate}`, p.color))}
      {getImage("збудовані до 1944", palette.unknown)}
    </div>
  );
};

export default Legend;
