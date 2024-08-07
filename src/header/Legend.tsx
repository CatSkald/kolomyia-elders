import ancientIconUrl from "../assets/ancient.png";
import elderIconUrl from "../assets/elder.png";
import oldIconUrl from "../assets/old.png";
import modernIconUrl from "../assets/modern.png";

const Legend = () => {
  return (
    <div className="legend">
      <div>
        <img src={ancientIconUrl} alt="XVIII століття" /> XVIII ст.
      </div>
      <div>
        <img src={elderIconUrl} alt="XIX століття" /> XIX ст.
      </div>
      <div>
        <img src={oldIconUrl} alt="початок XX століття" /> поч. XX ст.
      </div>
      <div>
        <img src={modernIconUrl} alt="сучасний" /> з 1919 р.
      </div>
    </div>
  );
};

export default Legend;
