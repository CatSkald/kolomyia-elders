import { getAgeColor, getMarkerImage } from "../style-utils";
import { Age } from "../types";

const Legend = () => {
  const getImage = (text: string, age: Age) => (
    <div>
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(
          getMarkerImage(24, getAgeColor(age))
        )}`}
        alt={text}
      />
      {text}
    </div>
  );

  return (
    <div className="legend">
      {getImage("1550—1750", Age.Ancient)}
      {getImage("1751—1850", Age.Elder)}
      {getImage("1851—1913", Age.Antique)}
      {getImage("1914—1918", Age.Venerable)}
      {getImage("1919—1944", Age.Vintage)}
    </div>
  );
};

export default Legend;
