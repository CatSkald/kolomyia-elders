import ancientIconUrl from "../assets/purple.png";
import elderIconUrl from "../assets/red.png";
import antiqueIconUrl from "../assets/orange.png";
import venerableIconUrl from "../assets/yellow.png";
import vintageIconUrl from "../assets/cyan.png";

const Legend = () => {
  return (
    <div className="legend">
      <div>
        <img src={ancientIconUrl} alt="1650—1750" />
        1650—1750
      </div>
      <div>
        <img src={elderIconUrl} alt="1751—1850" />
        1751—1850
      </div>
      <div>
        <img src={antiqueIconUrl} alt="1851—1913" />
        1851—1913
      </div>
      <div>
        <img src={venerableIconUrl} alt="1914—1918" />
        1914—1918
      </div>
      <div>
        <img src={vintageIconUrl} alt="1919—1944" />
        1919—1944
      </div>
    </div>
  );
};

export default Legend;
