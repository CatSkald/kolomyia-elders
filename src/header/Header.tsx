import "./Header.css";

import Legend from "./Legend";
import { Theme } from "../themes";
import { Filters } from "../Filters";
import Menu from "../menu/Menu";

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
  return (
    <div className="header">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Menu theme={theme} setTheme={setTheme} />
        <h1>Архітектурна спадщина Коломиї</h1>
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
