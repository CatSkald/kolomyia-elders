import "./Header.css";

import Legend from "./Legend";
import { Theme } from "../themes";
import { Filters } from "../Filters";
import Menu from "../menu/Menu";
import { SiteMap } from "../pages/SiteMap";

const Header = ({
  theme,
  setTheme,
  filters,
  setFilters,
  activePage,
  setActivePage,
}: {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  filters: Filters;
  setFilters: (filters: Filters) => void;
  activePage: SiteMap;
  setActivePage: (page?: SiteMap) => void;
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
        <Menu theme={theme} setTheme={setTheme} setActivePage={setActivePage} />
        <h1>Архітектурна спадщина Коломиї</h1>
      </div>
      <hr />
      {activePage === SiteMap.Map && (
        <Legend filters={filters} setFilters={setFilters} />
      )}
    </div>
  );
};

export default Header;
