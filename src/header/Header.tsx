import "./Header.css";
import CoatOfArmsUrl from "../assets/coat_of_arms.svg";

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
  const toggleTheme = () => setTheme(isDarkTheme ? Theme.Light : Theme.Dark);

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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "end",
            columnGap: "0.5rem",
          }}
        >
          <div className="button" onClick={toggleTheme}>
            {isDarkTheme ? (
              <MoonStarsFill size={buttonSize} />
            ) : (
              <SunFill size={buttonSize} />
            )}
          </div>
          <InfoPopup />
        </div>
      </div>
      <hr />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <img
          src={CoatOfArmsUrl}
          alt="Герб міста Коломия"
          style={{ maxWidth: "5vh", paddingRight: "0.5rem" }}
        />
        <Legend />
      </div>
    </div>
  );
};

export default Header;
