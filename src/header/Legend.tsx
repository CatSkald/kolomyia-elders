import defaultIconUrl from "../assets/pin.png";
import ancientIconUrl from "../assets/ancient.png";
import elderIconUrl from "../assets/elder.png";
import oldIconUrl from "../assets/old.png";
import modernIconUrl from "../assets/modern.png";

const Legend = () => {
  return (
    <div className="legend">
      <div>
        <img src={ancientIconUrl} alt="до 19 століття" /> до 19 століття
      </div>
      <div>
        <img src={elderIconUrl} alt="19 століття" /> 19 століття
      </div>
      <div>
        <img src={oldIconUrl} alt="До 1951" /> перша половина 20 століття
      </div>
      <div>
        <img src={modernIconUrl} alt="Сучасний" /> з середини 20 століття
      </div>
      <div>
        <img src={defaultIconUrl} alt="Невідомо" /> невідомо
      </div>
    </div>
  );
};

export default Legend;
