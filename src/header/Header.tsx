import "./Header.css";

import { MoonStarsFill, SunFill } from "react-bootstrap-icons";
import Legend from "./Legend";
import InfoPopup from "../info/InfoPopup";
import { buttonSize, Theme } from "../themes";
import { Filters } from "../Filters";

const Header = ({
  theme,
  setTheme,
  filters,
  setFilters,
}: {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  filters: Filters;
  setFilters: (filters: Filters) => void;
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
          <List />
        </div> */}
        <h1>Архітектурна спадщина міста Коломиї</h1>
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
        {/* <div className="captioned">
          <div>Герб міста Коломия</div>
          <img
            className="preview"
            src={CoatOfArmsUrl}
            alt="Герб міста Коломия"
            style={{
              maxWidth: "5vh",
            }}
          />
        </div> */}
        <Legend filters={filters} setFilters={setFilters} />
      </div>
    </div>
  );
};

export default Header;
