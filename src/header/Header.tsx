import "./Header.css";

import { MoonStarsFill, SunFill } from "react-bootstrap-icons";
import Legend from "./Legend";
import InfoPopup from "../info/InfoPopup";
import { buttonSize, Theme } from "../themes";

const Header = ({
  theme,
  setTheme,
}: {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}) => {
  const isDarkTheme = theme === "dark";

  return (
    <div className="header">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* <div className="button" style={{ marginRight: "0.5rem" }}>
          <ListFill />
        </div> */}
        <h1>Історичні будівлі Коломиї</h1>
        {isDarkTheme ? (
          <div className="button" onClick={() => setTheme(Theme.Light)}>
            <MoonStarsFill size={buttonSize} />
          </div>
        ) : (
          <div className="button" onClick={() => setTheme(Theme.Dark)}>
            <SunFill size={buttonSize} />
          </div>
        )}
      </div>
      <hr />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "end",
        }}
      >
        <Legend />
        <InfoPopup />
      </div>
    </div>
  );
};

export default Header;
